import { NavLink } from "react-router";

export default function Footer() {
  return (
    <>
      <footer className="p-4 overflow-auto">
        {/* Footer Navigation! */}
        <nav className="my-5">
          <ul className="flex gap-3 flex-wrap">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
