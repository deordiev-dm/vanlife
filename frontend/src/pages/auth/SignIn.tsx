import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail } from "@/lib/utils/validateEmail";
import ErrorPopup from "@/components/ui/ErrorPopup";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // path non-authorized user tried to access.
  const [pathToRedirect] = useState(location.state?.pathname || "/host");
  const [nonAuthorized, setNonAuthorized] = useState(location.state?.message);

  // this effect ensures that message is shown once.
  useEffect(() => {
    if (nonAuthorized) {
      setModalOpen(true);
    }
    setNonAuthorized(null);
    navigate(location, { replace: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { loginUser } = useAuth();

  function handleInput(target: EventTarget & HTMLInputElement): void {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const { email, password } = { ...formData };

    if (!validateEmail(email)) {
      setError(new Error("Invalid email. Please try again."));
      setStatus("idle");
      setModalOpen(true);
      return;
    } else if (password.length < 6) {
      setError(new Error("Password is too short. Please try again."));
      setStatus("idle");
      setModalOpen(true);
      return;
    }

    try {
      await loginUser(email, password);
      navigate(pathToRedirect, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        setModalOpen(true);
      }
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center px-6 pb-12 pt-6">
      <div className="max-w-96">
        {isModalOpen && (
          <ErrorPopup setModalOpen={setModalOpen} text={error?.message} />
        )}
        <h1 className="mb-8 text-center text-3xl font-bold">
          Sign in to your account
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
          {error ? <p className="text-orange-500">{error.message}</p> : null}
          <Button
            as="button"
            disabled={status === "submitting"}
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
          <Link className="text-orange-400 hover:underline" to="/signup">
            Create on now!
          </Link>
        </p>
      </div>
    </main>
  );
}
