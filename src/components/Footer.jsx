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
            <li>
              <NavLink to="/registrieren">Registrieren</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/eventdetails">Event-Details</NavLink>
            </li>
            <li>
              <NavLink to="/benutzeruebersicht">Benutzerübersicht</NavLink>
            </li>
            <li>
              <NavLink to="/nicht-gefunden">404-Page</NavLink>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
