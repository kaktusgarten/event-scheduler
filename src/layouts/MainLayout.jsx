import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
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
          <div className="container m-auto mb-4">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
}
