type ButtonProps = {
  children: string;
};

function Button({ children }: ButtonProps) {
  return (
    <button className="min-h-12 w-full rounded-lg bg-orange-500 p-2 font-bold transition-colors hover:bg-orange-700">
      {children}
    </button>
  );
}

export default Button;
