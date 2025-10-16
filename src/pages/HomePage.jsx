import { use, useEffect, useState } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const HomePage = () => {
  // Wichtig für function speicherLoginToken(token):
  const { sampleText, setLocalStorageToken, localStorageToken } =
    use(GesamtseitenContext);

  const [events, setEvents] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllEvents() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/events?page=1&limit=10",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Fehler beim Laden (Status: ${response.status})`);
        }

        const data = await response.json();
        setEvents(data.results);

        return data;
      } catch (error) {
        console.error("GET Request fehlgeschlagen:", error);
        alert(
          "Die API ist nicht erreichbar. Für dieses Demo-Projekt muss die API lokal auf eurem Rechner installiert und ausgeführt werden :-) Link zur API: https://github.com/WebDev-WBSCodingSchool/events-api"
        );
        throw error;
      }
    }

    getAllEvents();
  }, []);

  let objDescription = {};
  let eventURL = "";
  let eventDescription = "";

  function isJsonString(text) {
    if (typeof text !== "string") {
      return false;
    }
    try {
      var json = JSON.parse(text);
      return typeof json === "object";
    } catch (error) {
      return false;
    }
  }

  // Holt aus der Description die URL und Description wenn vorhanden
  function getJSONFromDescription(description) {
    objDescription = [];
    eventURL = "";
    eventDescription = "";
    if (description !== undefined) {
      if (isJsonString(description)) {
        objDescription = JSON.parse(description);
        eventURL = objDescription["URL"];
        eventDescription = objDescription["Description"];
      } else {
        //        objDescription["Description"] = description;
        eventDescription = description;
      }
      console.log("eventDescription: ", eventDescription);
      console.log("eventURL: ", eventURL);
    }
  }

  function hasImgUrl(description) {
    getJSONFromDescription(description);
    if (eventURL) {
      return true;
    } else {
      return false;
    }
  }

  function getImgUrl(description) {
    getJSONFromDescription(description);
    if (eventURL) {
      console.log("http");
      return eventURL;
    } else {
      console.log("local");
      return "./img/header-image-2.jpg";
    }
  }

  const Test = (e) => {
    e.preventDefault();
    console.log("Hai Fisch!");
    navigate("/neues-event");
  };

  return (
    <>
      <div className="p-5">
        <h1 className="text-4xl">Events</h1>
        <p className="pb-10">Übersicht der aktuellen Veranstaltungen:</p>
        {events?.map((event) => (
          <>
            <Link to={`/event-details/${event.id}`} key={event.id}>
              <article
                className="border border-gray-800 p-8 mb-5 rounded-xl 
             bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-md 
             shadow-lg transition-all duration-500 ease-out
             hover:-translate-y-2 hover:shadow-[0_0_30px_#3b82f6aa] hover:border-cyan-600
             cursor-pointer"
              >
                <h3 className="text-3xl mb-5">{event.title}</h3>
                <div className="flex gap-7 sm:flex-row flex-col place-items-start">
                  <div
                    className="sm:w-1/4 w-1/1  min-h-[200px] aspect-square"
                    style={{
                      backgroundImage: `url("${getImgUrl(event.description)}")`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "black",
                    }}
                  ></div>
                  <div className="sm:w-3/4">
                    <h4 className="italic text-amber-200">
                      Veranstaltungsort:
                    </h4>
                    <p className="pb-4">{event.location}</p>
                    <p className="italic text-amber-200">Datum:</p>
                    <p className="pb-4">{event.date}</p>
                    <p className="italic text-amber-200">Beschreibung:</p>
                    <p>{eventDescription}</p>
                    <div className="pt-10">
                      <Link to={`/edit-event/${event.id}`}>
                        <button className="btn">
                          {localStorageToken
                            ? "Edit me!"
                            : "Zum Bearbeiten bitte hier anmelden"}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </>
        ))}
      </div>
    </>
  );
};

export default HomePage;

// <form>
//   <button
//     className="px-5 rounded-2xl bg-amber-500 mt-2"
//     type="submit"
//     onClick={() => {
//       Test();
//     }}
//   >
//     Edit
//   </button>
// </form>
