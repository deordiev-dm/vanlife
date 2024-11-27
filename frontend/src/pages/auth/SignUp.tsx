import { useState } from "react";
import Button from "@/components/ui/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail } from "@/lib/utils/validateEmail";
import FormField from "@/components/forms/FormField";
import ErrorPopup from "@/components/ui/ErrorPopup";

const FORM_FIELDS = [
  {
    name: "name",
    label: "Your name",
    type: "text",
    placeholder: "e.g. Joe Doe",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    type: "text",
    placeholder: "example@mail.com",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "at least 6 characters",
    required: true,
  },
  {
    name: "passwordConfirmation",
    label: "Confirm password",
    type: "password",
    placeholder: "re-enter your password",
    required: true,
  },
];

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "host" as const,
    passwordConfirmation: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const pathToRedirect = location.state?.pathname
    ? location.state.pathname
    : "/host";

  const { registerUser } = useAuth();
  function handleInput(target: EventTarget & HTMLInputElement): void {
    setError(null);

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

    const { name, role, email, password, passwordConfirmation } = {
      ...formData,
    };

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

    registerUser({
      name,
      email,
      password,
      role,
    })
      .then(() => {
        navigate(pathToRedirect, { replace: true });
      })
      .catch((err) => setError(err))
      .finally(() => setStatus("idle"));
  }

  return (
    <main>
      <div className="container pb-16 pt-36">
        <h1 className="mb-8 text-center text-3xl font-bold md:mb-12 md:text-4xl">
          Create your profile
        </h1>
        <form
          className="mb-8 space-y-8 md:mx-auto md:w-[540px]"
          onSubmit={handleSubmit}
        >
          {FORM_FIELDS.map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              handleInput={handleInput}
              value={formData[field.name as "email" | "password"]}
              required={field.required}
            />
          ))}
          <Button
            as="button"
            disabled={status === "submitting"}
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
      {error && <ErrorPopup error={error} key={Date.now()} />}
    </main>
  );
}
