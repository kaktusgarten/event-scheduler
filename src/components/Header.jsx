import { use } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";
import { NavLink } from "react-router";

export default function Header() {
  const { localStorageToken } = use(GesamtseitenContext);

  return (
    <>
      <header className="p-4 py-10 overflow-auto">
        <div
          className="p-10 mb-5"
          style={{
            backgroundImage: 'url("./img/header-image-2.jpg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: "black",
          }}
        >
          <h1
            className="text-3xl mb-2 font-black"
            style={{ textShadow: "1px 1px 2px black" }}
          >
            Der Veran&shy;stal&shy;tungs&shy;Planer (DVP)
          </h1>
          <p
            className="mb-6 text-2xl"
            style={{ textShadow: "1px 1px 2px black" }}
          >
            Deine Veranstal&shy;tungen im Überblick!
          </p>
        </div>

        <div className="flex justify-between items-end">
          {/* Navigation! */}
          <nav className="">
            <ul className="flex gap-6 flex-wrap">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login / Logout</NavLink>
              </li>
            </ul>
          </nav>

          <nav
            className=""
            // style={{ display: !localStorageToken ? "none" : "block" }}
          >
            <div className="text-xs mb-2">Admin-Navi:</div>
            {localStorageToken ? (
              <ul className="flex gap-6 flex-wrap">
                <li>
                  <NavLink to="/neues-event">Neues Event</NavLink>
                </li>
                <li>
                  <NavLink to="/benutzeruebersicht">Benutzerübersicht</NavLink>
                </li>
              </ul>
            ) : (
              <>
                <p>Bitte erst anmelden!</p>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
