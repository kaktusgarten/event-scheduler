import { use, useEffect, useState } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";

const HomePage = () => {
  // Wichtig für function speicherLoginToken(token):
  const { sampleText, setLocalStorageToken, localStorageToken } =
    use(GesamtseitenContext);

  const [events, setEvents] = useState();

  // Sample Funktion zum speichern des Login Tokens:
  // function speicherLoginToken(token) {
  //   console.log(`Login mit Token: ${token}`);
  //   localStorage.setItem("token", JSON.stringify(token));
  //   setLocalStorageToken(token);
  // }

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
        console.log("Events:", data);
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
        <h1 className="text-3xl">Events</h1>
        <p className="pb-10">Übersicht der aktuellen Veranstaltungen:</p>
        {events?.map((event) => (
          <article key={event.id} className="border p-10 bg-black mb-5">
            <h3 className="text-2xl">{event.title}</h3>
            <p className="pb-2">{event.location}</p>
            <p className="pb-2">Datum: {event.date}</p>
            <p className="pb-2">{event.description}</p>
          </article>
        ))}
      </div>
    </>
  );
};

export default HomePage;
