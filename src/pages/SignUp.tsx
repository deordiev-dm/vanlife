import { useState } from "react";
import Button from "../components/utils/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { MdError } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { validateEmail } from "../utils/validateEmail";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const pathToRedirect = location.state?.pathname
    ? location.state.pathname
    : "/host";

  const { createUser } = useAuth();
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

    const { email, password, passwordConfirmation } = { ...formData };

    if (!validateEmail(email)) {
      setError(new Error("Invalid email"));
      setStatus("idle");
      return;
    } else if (password.length < 6) {
      setError(new Error("Password is too short"));
      setStatus("idle");
      return;
    } else if (password != passwordConfirmation) {
      setError(new Error("Passwords do not match"));
      setStatus("idle");
      return;
    }

    createUser(email, password)
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
          Create your profile
        </h1>
        <form className="mb-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 inline-block pl-1" htmlFor="email">
              Email address<span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="example@mail.com"
              required
              onChange={(e) => handleInput(e.target as HTMLInputElement)}
              value={formData.email}
              className="w-full rounded-lg border p-3 transition-colors hover:border-orange-400"
            />
          </div>
          <div>
            <label className="mb-1 inline-block pl-1" htmlFor="password">
              Password<span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="at least 6 characters"
              onChange={(e) => handleInput(e.target as HTMLInputElement)}
              value={formData.password}
              className="w-full rounded-lg border p-3 transition-colors hover:border-orange-400"
            />
          </div>
          <div>
            <label
              className="mb-1 inline-block pl-1"
              htmlFor="passwordConfirmation"
            >
              Confirm password<span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              placeholder="re-enter your password"
              onChange={(e) => handleInput(e.target as HTMLInputElement)}
              value={formData.passwordConfirmation}
              className="w-full rounded-lg border p-3 transition-colors hover:border-orange-400"
            />
          </div>
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
            {status === "submitting" ? "Logging in..." : "Create account"}
          </Button>
        </form>
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
