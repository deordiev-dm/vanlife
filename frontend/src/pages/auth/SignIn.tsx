import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail } from "@/lib/utils/validateEmail";
import FormField from "@/components/forms/FormField";
import WarningNotification from "@/components/ui/WarningNotification";

const FORM_FIELDS = [
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
    minLength: 6,
  },
];

export default function SignIn() {
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [warning, setWarning] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // path non-authorized user tried to access.
  const [pathToRedirect] = useState(location.state?.pathname || "/host");
  const [nonAuthorized, setNonAuthorized] = useState(
    location.state?.triedToAccessProtectedRoute,
  );

  // this effect ensures that message is shown once.
  useEffect(() => {
    if (nonAuthorized) {
      setWarning(
        "Sign in into your account or create one to access host features.",
      );
      setIsModalOpen(true);
    }
    setNonAuthorized(null);
    navigate(location, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleInput(target: EventTarget & HTMLInputElement): void {
    setWarning(null);
    setIsModalOpen(false);

    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setWarning(null);
    setIsModalOpen(false);
    setStatus("submitting");

    const { email, password } = { ...formData };

    if (!validateEmail(email)) {
      setStatus("idle");
      setIsModalOpen(true);
      setWarning("Invalid email. Please try again.");

      return;
    }

    try {
      await loginUser(email, password);
      // if everything is ok, redirect user
      navigate(pathToRedirect, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setWarning(error.message);
        setIsModalOpen(true);
      }
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main>
      {isModalOpen && warning && (
        <WarningNotification message={warning} setIsOpen={setIsModalOpen} />
      )}
      <div className="container pb-16 pt-36">
        <h1 className="mb-8 text-center text-3xl font-bold md:mb-12 md:text-4xl">
          Sign in to your account
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
            className="disabled:bg-zinc-200 disabled:shadow-none"
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
