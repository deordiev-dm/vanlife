import { CSSProperties, useState } from "react";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function DropdownMenu({ children, title }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuStyles: CSSProperties = {
    visibility: isMenuOpen ? "visible" : "hidden",
    transform: isMenuOpen ? "scale(1)" : "scale(0)",
    transition: "all ease-in-out 150ms",
  };

  return (
    <span
      tabIndex={0}
      className="relative inline-flex items-center space-x-1 rounded-md text-black"
      onClick={() => setIsMenuOpen((prevState) => !prevState)}
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <span>{title}</span>
      <ChevronDownIcon
        className={`${isMenuOpen ? "rotate-180" : "rotate-0"} transition-transform`}
      />
      <div
        style={menuStyles}
        className="absolute right-0 top-full z-10 w-36 px-1 py-2"
      >
        <div className="flex flex-col overflow-clip rounded bg-white text-black shadow-xl *:border-b-[1px] *:px-4 *:py-1 *:transition-colors last:border-none">
          {children}
        </div>
      </div>
    </span>
  );
}
