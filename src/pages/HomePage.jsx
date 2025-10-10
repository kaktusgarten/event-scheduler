import { use, useEffect, useState } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";
import { Link } from "react-router";

const HomePage = () => {
  // Wichtig für function speicherLoginToken(token):
  const { sampleText, setLocalStorageToken, localStorageToken } =
    use(GesamtseitenContext);

  const [events, setEvents] = useState();

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

    return eventURL;
  }

  return (
    <>
      <div className="p-5">
        <h1 className="text-4xl">Events</h1>
        <p className="pb-10">Übersicht der aktuellen Veranstaltungen:</p>
        {events?.map((event) => (
          <Link to={`/event-details/${event.id}`} key={event.id}>
            <article className="border p-8 bg-black mb-5">
              <h3 className="text-3xl">{event.title}</h3>
              {hasImgUrl(event.description) && (
                <img src={getImgUrl(event.description)} className="w-32 h-32" />
              )}
              <p className="pb-2">{event.location}</p>
              <p className="pb-4">
                Datum:<br></br> {event.date}
              </p>
              <p className="pb-4">
                Beschreibung:<br></br> {eventDescription}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
