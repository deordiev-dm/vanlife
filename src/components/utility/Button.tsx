import { Link } from "react-router-dom";

type ButtonProps = {
  children: string;
  to?: string;
  colors: "orange" | "black";
};

function Button({ children, to, colors }: ButtonProps) {
  const commonClasses =
    "flex items-center justify-center min-h-12 w-full rounded-lg p-2 font-bold text-white transition-all";

  let colorClasses;

  if (colors === "orange") {
    colorClasses = "bg-orange-400 hover:bg-orange-500 active:bg-orange-600";
  } else if (colors === "black") {
    colorClasses =
      "bg-slate-950 text-white hover:bg-slate-700 active:bg-slate-600";
  }

  return to ? (
    <Link className={`${commonClasses} ${colorClasses} inline-block`} to={to}>
      {children}
    </Link>
  ) : (
    <button className={`${commonClasses} ${colorClasses}`}>{children}</button>
  );
}

export default Button;
