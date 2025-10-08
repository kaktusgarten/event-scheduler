import { useEffect, useState } from "react";
// SLUG - useParams:
import { Link, useParams } from "react-router";

const DetailsPage = () => {
  const [articleData, setArticleData] = useState();
  // SLUG:
  const { slug } = useParams();

  useEffect(() => {
    async function getEventDetails() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/events/${slug}`,
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
        setArticleData(data);
        return data;
      } catch (error) {
        console.error("GET Request fehlgeschlagen:", error);
        throw error;
      }
    }
    getEventDetails();
  }, []);

  if (articleData && articleData.id == slug) {
    return (
      <div className="border p-5 py-20 flex flex-col items-center bg-black">
        <h1 className="text-5xl pb-5">{articleData?.title}</h1>
        <p className="pb-2 text-center">{articleData?.location}</p>
        <p className="pb-4 text-center">
          Datum:<br></br> {articleData?.date}
        </p>
        <p className="pb-4 text-center">
          Beschreibung:<br></br> {articleData?.description}
        </p>
        <div className="text-sm text-center">
          <div>Organizer-ID: {articleData?.organizerId}</div>
          <div>
            Geo-Location: ({articleData?.latitude} / {articleData?.longitude})
          </div>
          <div>Letzte Aktualisierung: {articleData?.updatedAt}</div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="p-4">
          <h2 className="text-3xl mb-9">
            {`Der Eintrag mit der ID: "${slug}" wurde nicht gefunden.`}
          </h2>
          <Link to="/">
            <button className="btn">Zurück zur Homepage</button>
          </Link>
        </div>
      </>
    );
  }
};

export default DetailsPage;
