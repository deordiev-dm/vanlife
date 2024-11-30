import { Link } from "react-router-dom";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  as: "button";
};

type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
  as: "a";
  to: string;
};

type CustomButtonProps = ButtonProps | LinkProps;

const Button: React.FC<CustomButtonProps> = (props) => {
  const commonClasses =
    "text-center text-xl w-full py-3 rounded-lg px-4 font-bold text-zinc-50 transition-all hover:shadow-lg bg-orange-500 hover:bg-orange-600 active:bg-orange-700";

  if (props.as === "button") {
    return (
      <button
        {...props}
        className={`${commonClasses} ${props.className ?? ""}`}
      >
        {props.children}
      </button>
    );
  } else if (props.as === "a") {
    return (
      <Link
        {...props}
        className={`${commonClasses} inline-block ${props.className ?? ""}`}
        to={props.to}
      >
        {props.children}
      </Link>
    );
  } else {
    return null;
  }
};

export default Button;
