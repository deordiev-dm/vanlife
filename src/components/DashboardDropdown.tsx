type DashboardDropdownProps = {
  setNumberOfDays: React.Dispatch<React.SetStateAction<number>>;
};

export default function DashboardDropdown({
  setNumberOfDays,
}: DashboardDropdownProps) {
  return (
    <div className="menu invisible absolute left-0 top-6 flex w-32 scale-0 flex-col rounded-xl border bg-white text-black transition-all *:border *:px-4 *:py-1 *:transition-colors group-hover:visible group-hover:flex group-hover:scale-100">
      <button
        onClick={() => {
          setNumberOfDays(7);
        }}
        className="hover:bg-slate-100"
      >
        7 days
      </button>
      <button
        onClick={() => {
          setNumberOfDays(30);
        }}
        className="hover:bg-slate-100"
      >
        30 days
      </button>
      <button
        onClick={() => {
          setNumberOfDays(90);
        }}
        className="hover:bg-slate-100"
      >
        90 days
      </button>
      <button
        onClick={() => {
          setNumberOfDays(365);
        }}
        className="hover:bg-slate-100"
      >
        365 days
      </button>
    </div>
  );
}
