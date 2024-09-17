import { CSSProperties, useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

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

  const arrowStyles: CSSProperties = {
    transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
  };

  return (
    <div
      tabIndex={0}
      className="relative flex items-center space-x-1 rounded-md text-black"
      onClick={() => setIsMenuOpen((prevState) => !prevState)}
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <span>{title}</span>
      <MdOutlineKeyboardArrowUp
        style={arrowStyles}
        className="transition-transform"
      />
      <div
        style={menuStyles}
        className="absolute right-0 top-full z-10 w-36 px-1 py-2"
      >
        <div className="flex flex-col overflow-clip rounded bg-white text-black shadow-xl *:border-b-[1px] *:px-4 *:py-1 *:transition-colors last:border-none">
          {children}
        </div>
      </div>
    </div>
  );
}
