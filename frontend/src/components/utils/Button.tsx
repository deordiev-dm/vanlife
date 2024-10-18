import { Link } from "react-router-dom";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  as: "button";
  colors: "orange" | "black";
};

type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
  as: "a";
  to: string;
  colors: "orange" | "black";
};

type CustomButtonProps = ButtonProps | LinkProps;

const Button: React.FC<CustomButtonProps> = (props) => {
  const commonClasses =
    "flex items-center justify-center min-h-12 w-full rounded-lg p-2 font-bold text-white transition-all";

  let colorClasses;

  if (props.colors === "orange") {
    colorClasses = "bg-orange-400 hover:bg-orange-500 active:bg-orange-600";
  } else if (props.colors === "black") {
    colorClasses =
      "bg-slate-950 text-white hover:bg-slate-700 active:bg-slate-600";
  }

  if (props.as === "button") {
    return (
      <button
        {...props}
        className={`${commonClasses} ${colorClasses} ${props.className ?? ""}`}
      >
        {props.children}
      </button>
    );
  } else if (props.as === "a") {
    return (
      <Link
        {...props}
        className={`${commonClasses} ${colorClasses} inline-block ${props.className ?? ""}`}
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
