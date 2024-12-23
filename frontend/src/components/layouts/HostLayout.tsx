import { NavLink, Outlet } from "react-router-dom";

const LINKS = [
  { label: "Dashboard", path: ".", end: true },
  { label: "Income", path: "income" },
  { label: "Vans", path: "vans" },
  { label: "Reviews", path: "reviews" },
];

export default function HostLayout() {
  return (
    <main>
      <div className="container pb-16 pt-24">
        <nav className="mb-10 flex flex-wrap gap-3">
          {LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `nav-link ${isActive && "_active"} _sm`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>
    </main>
  );
}
