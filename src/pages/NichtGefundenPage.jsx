import { Link } from "react-router";

const NichtGefundenPage = () => {
  return (
    <>
      <div className="p-5 grid grid-cols-1 justify-items-center">
        <h1 className="text-3xl mb-10">
          404- Diese Seite wurde leider nicht gefunden
        </h1>
        <img
          src="/img/404.gif"
          alt="404 - Seite nicht gefunden"
          className="mb-10"
        ></img>
        <p>
          <Link to="/">
            <button className="btn">Zurück zur Homepage</button>
          </Link>
        </p>
      </div>
    </>
  );
};

export default NichtGefundenPage;
