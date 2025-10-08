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
              <NavLink to="/login">Login / Logout</NavLink>
            </li>
          </ul>
        </nav>

        <nav className="my-5">
          <div className="underline text-xs mb-2">Admin-Navi:</div>
          <ul className="flex gap-3 flex-wrap">
            <li>
              <NavLink to="/neues-event">Neues Event</NavLink> -
            </li>
            <li>
              <NavLink to="/benutzeruebersicht">Benutzerübersicht</NavLink> -
            </li>

            <li>
              <NavLink to="/event-details/1">
                Event-Details-Seite (Vorschau)
              </NavLink>{" "}
              -
            </li>
            <li>
              <NavLink to="/nicht-gefunden">404-Page (Vorschau)</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
