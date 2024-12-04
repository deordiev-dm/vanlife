type BadgeProps = {
  type: "simple" | "luxury" | "rugged";
  className?: string;
};

function Badge({ type, className }: BadgeProps) {
  return (
    <div
      className={`inline-block rounded-2xl bg-orange-500 px-3 py-2 text-center font-bold capitalize text-white opacity-90 ${className}`}
    >
      {type}
    </div>
  );
}

export default Badge;
