import { use } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";

const HomePage = () => {
  const { sampleText } = use(GesamtseitenContext);
  console.log("sampleText");
  console.log(sampleText);

  return (
    <>
      <div className="border p-5">
        <h1 className="text-3xl">Events</h1>
        <p className="pb-10">Hier werden unsere Event-Einträge angezeigt:</p>
        <div className="border p-10 bg-black">
          Ein Event Eintrag... {sampleText}
        </div>
      </div>
    </>
  );
};

export default HomePage;
