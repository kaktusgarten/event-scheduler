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
                <NavLink
                  to="/"
                  className="relative text-white hover:text-white after:block after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:via-purple-500 after:to-pink-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="relative text-white hover:text-white after:block after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:via-purple-500 after:to-pink-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  Login / Logout
                </NavLink>
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
                  <NavLink
                    to="/neues-event"
                    className="relative text-white hover:text-white after:block after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:via-purple-500 after:to-pink-400 hover:after:w-full after:transition-all after:duration-300"
                  >
                    Neues Event
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/benutzeruebersicht"
                    className="relative text-white hover:text-white after:block after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:via-purple-500 after:to-pink-400 hover:after:w-full after:transition-all after:duration-300"
                  >
                    Benutzerübersicht
                  </NavLink>
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
