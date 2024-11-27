import { NavLink, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { useWindowSize, useClickAway } from "react-use";

const LINKS = [
  { label: "Homepage", path: "" },
  { label: "About", path: "/about" },
  { label: "Our Vans", path: "/vans" },
  { label: "Host", path: "/host" },
  { label: "Sign-in", path: "login" },
];

function Header() {
  const { width } = useWindowSize();

  return (
    <header className="fixed left-0 top-0 z-[100] w-full items-center justify-between text-slate-950">
      <div className="header-container container flex min-h-16 items-center justify-between py-1 md:py-4">
        <Link
          to="."
          className="relative z-[51] text-3xl font-extrabold tracking-tight"
        >
          #VANLIFE
        </Link>
        {/* render mobile or desktop menu based on screen width */}
        {width < 768 ? <MobileNav /> : <DesktopNav />}
      </div>
    </header>
  );
}

function DesktopNav() {
  return (
    <div>
      <nav className="relative z-[51] flex items-center space-x-5">
        {LINKS.map((link) => (
          <NavLink
            key={link.label}
            to={link.path}
            className={({ isActive }) => `nav-link ${isActive && "_active"}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

function MobileNav() {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setOpen(false);
  });

  return (
    <div className="" ref={ref}>
      <nav
        className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center space-y-12 overflow-y-auto bg-orange-50 pb-16 pt-32 text-3xl font-semibold"
        style={{
          transform: isOpen ? "translateX(0%)" : "translateX(100%)",
          transitionProperty: "transform",
          transitionDuration: "400ms",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        {LINKS.map((link) => (
          <NavLink
            key={link.label}
            to={link.path}
            className={({ isActive }) =>
              `nav-link ${isActive && "_active"} _lg`
            }
            onClick={() => setOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="relative z-[51]">
        <Hamburger size={32} toggled={isOpen} toggle={setOpen} rounded />
      </div>
    </div>
  );
}

export default Header;
