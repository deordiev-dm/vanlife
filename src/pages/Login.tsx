import { useState } from "react";
import Button from "../components/utility/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdError } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const pathToRedirect = location.state?.pathname
    ? location.state.pathname
    : "/host";

  const { loginUser } = useAuth();
  function handleInput(target: EventTarget & HTMLInputElement): void {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    loginUser(formData.email, formData.password)
      .then(() => {
        navigate(pathToRedirect, { replace: true });
      })
      .catch((err) => setError(err))
      .finally(() => setStatus("idle"));
  }

  return (
    <main className="relative flex flex-col items-center justify-center px-6 pb-12 pt-6">
      <div className="max-w-96">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Sign in to your account
        </h1>
        <form className="mb-8 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            onChange={(e) => handleInput(e.target as HTMLInputElement)}
            value={formData.email}
            className="w-full rounded-lg border p-3 transition-colors hover:border-orange-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleInput(e.target as HTMLInputElement)}
            value={formData.password}
            className="w-full rounded-lg border p-3 transition-colors hover:border-orange-400"
          />
          <Button
            as="button"
            disabled={status === "submitting"}
            colors="orange"
            className={
              status === "submitting"
                ? "bg-slate-300 hover:bg-slate-300 active:bg-slate-300"
                : ""
            }
          >
            {status === "submitting" ? "Logging in..." : "Sign in"}
          </Button>
        </form>
        <p className="text-center font-medium">
          Don't have an account?{" "}
          <Link className="text-orange-400 hover:underline" to="">
            Create on now
          </Link>
        </p>
      </div>
      {error?.message && (
        <div className="absolute bottom-2 z-10 flex items-center gap-x-2 rounded bg-red-500 px-4 py-2 font-semibold text-slate-50">
          <MdError className="h-5 w-5" />
          {error.message}
        </div>
      )}
      {location.state?.message && (
        <div className="absolute bottom-2 flex items-center gap-x-2 rounded bg-red-500 px-4 py-2 font-semibold text-slate-50">
          <MdError className="h-5 w-5" />
          {location.state.message}
        </div>
      )}
    </main>
  );
}
