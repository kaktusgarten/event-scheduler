import { Outlet } from "react-router";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <>
      <div className="bg-black">
        <div className="container m-auto mb-4">
          <Header></Header>
        </div>
      </div>

      <div className="container m-auto">
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
}
