type Props = {
  children: React.ReactNode;
};

export default function DropdownMenu({ children }: Props) {
  return (
    <div className="menu invisible absolute left-0 top-6 flex w-32 scale-0 flex-col overflow-clip rounded bg-white text-black shadow-xl transition-all *:px-4 *:py-1 *:transition-colors group-hover:visible group-hover:flex group-hover:scale-100">
      {children}
    </div>
  );
}
