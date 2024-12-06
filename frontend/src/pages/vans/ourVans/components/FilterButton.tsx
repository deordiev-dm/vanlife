type FilterButtonProps = {
  filterOption: string;
  typeFilter: string | null;
  onClick: () => void;
  children: React.ReactNode;
};

function FilterButton({
  filterOption,
  typeFilter,
  onClick,
  children,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${typeFilter === filterOption ? "bg-orange-600" : "bg-orange-400"} rounded-2xl px-4 py-2 capitalize text-white transition-colors hover:bg-orange-500`}
    >
      {children}
    </button>
  );
}

export default FilterButton;
