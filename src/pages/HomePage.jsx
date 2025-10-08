import { use } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";

const HomePage = () => {
  // Wichtig für function speicherLoginToken(token):
  const { sampleText, setLocalStorageToken, localStorageToken } =
    use(GesamtseitenContext);
  
  // Sample Funktion zum speichern des Login Tokens:
  // function speicherLoginToken(token) {
  //   console.log(`Login mit Token: ${token}`);
  //   localStorage.setItem("token", JSON.stringify(token));
  //   setLocalStorageToken(token);
  // }

  return (
    <>
      <div className="border p-5">
        <h1 className="text-3xl">Events</h1>
        <p className="pb-10">Hier werden unsere Event-Einträge angezeigt:</p>
        <div className="border p-10 bg-black">
          <p className="pb-7">Ein Event Eintrag... {sampleText}</p>

          <p>Token: {localStorageToken}</p>
        </div>
        {/* <button
          className="border p-5 btn m-5"
          onClick={() => {
            speicherLoginToken(
              "ich bin der login token 1232134123123123 bla..."
            );
          }}
        >
          Sample Token global Speichern
        </button>
        <button
          className="border p-5 btn m-5"
          onClick={() => {
            speicherLoginToken(null);
          }}
        >
          Clear Token
        </button> */}
      </div>
    </>
  );
};

export default HomePage;
