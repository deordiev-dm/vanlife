type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function DropdownElement({ children, onClick }: Props) {
  return (
    <button onClick={onClick} className="hover:bg-orange-400">
      {children}
    </button>
  );
}
