import { useContext } from "react";
import { DropdownContext } from "./DropdownMenu";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function DropdownElement({ children, onClick }: Props) {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("DropdownContext should be used within a context provider");
  }

  const { setIsMenuOpen } = context;

  return (
    <button
      onClick={() => {
        onClick();
        setIsMenuOpen(false);
      }}
      className="hover:bg-orange-400"
    >
      {children}
    </button>
  );
}
