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
        throw error;
      }
    }

    getAllEvents();
  }, []);

  return (
    <>
      <div className="border p-5">
        <h1 className="text-4xl">Events</h1>
        <p className="pb-10">Übersicht der aktuellen Veranstaltungen:</p>
        {events?.map((event) => (
          <Link to={`/event-details/${event.id}`} key={event.id}>
            <article className="border p-8 bg-black mb-5">
              <h3 className="text-3xl">{event.title}</h3>
              <p className="pb-2">{event.location}</p>
              <p className="pb-4">
                Datum:<br></br> {event.date}
              </p>
              <p className="pb-4">
                Beschreibung:<br></br> {event.description}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
