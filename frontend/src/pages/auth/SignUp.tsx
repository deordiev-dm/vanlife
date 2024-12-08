import { useState } from "react";
import Button from "@/components/ui/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import FormField from "@/components/forms/FormField";
import WarningNotification from "@/components/ui/WarningNotification";

const FORM_FIELDS = [
  {
    name: "name",
    label: "Your name",
    placeholder: "e.g. Joe Doe",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "example@mail.com",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "at least 6 characters",
    required: true,
    minLength: 6,
  },
  {
    name: "passwordConfirmation",
    label: "Confirm password",
    type: "password",
    placeholder: "re-enter your password",
    required: true,
    minLength: 6,
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
  const [warning, setWarning] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pathToRedirect = location.state?.pathname
    ? location.state.pathname
    : "/host";

  const { registerUser } = useAuth();

  function handleInput(target: EventTarget & HTMLInputElement): void {
    setWarning(null);
    setIsModalOpen(false);

    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");

    setWarning(null);
    setIsModalOpen(false);

    const { name, role, email, password, passwordConfirmation } = {
      ...formData,
    };

    if (password != passwordConfirmation) {
      setWarning("Passwords do not match");
      setIsModalOpen(true);
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
      .catch((err) => {
        if (err instanceof Error) {
          setWarning(err.message);
          setIsModalOpen(true);
        }
      })
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
              handleInput={handleInput}
              value={formData[field.name as "email" | "password"]}
              {...field}
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
      {warning && isModalOpen && (
        <WarningNotification message={warning} setIsOpen={setIsModalOpen} />
      )}
    </main>
  );
}
