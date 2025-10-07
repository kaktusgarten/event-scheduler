import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { use, useEffect } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";

export default function MainLayout() {
  // REACT Context Daten:
  const { setLocalStorageToken } = use(GesamtseitenContext);
  // Token im LocalStorage inital anlegen:
  useEffect(() => {
    const tokenInStore = localStorage.getItem("token");
    if (tokenInStore) {
      setLocalStorageToken(JSON.parse(tokenInStore));
    } else {
      const token = null;
      localStorage.setItem("token", JSON.stringify(token));
    }
  }, []);

  return (
    <>
      <div className="page flex flex-col min-h-screen">
        <div className="bg-black">
          <div className="container m-auto">
            <Header></Header>
          </div>
        </div>

        <div className="container m-auto flex-1 my-4">
          <main>
            <Outlet></Outlet>
          </main>
        </div>

        <div className="bg-black">
          <div className="container m-auto">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
}
