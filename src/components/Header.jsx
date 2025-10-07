import { NavLink } from "react-router";

export default function Header() {
  const title = "Event-Scheduler";

  return (
    <>
      <header className="p-4 overflow-auto">
        <h1 className="text-3xl ">{title}</h1>
        {/* Navigation! */}
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
          </ul>
        </nav>
      </header>
    </>
  );
}
