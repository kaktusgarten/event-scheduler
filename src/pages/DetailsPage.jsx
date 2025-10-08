import { useEffect, useState } from "react";
// SLUG - useParams:
import { useParams } from "react-router";

const DetailsPage = () => {
  const [articleData, setArticleData] = useState();
  // SLUG:
  const { slug } = useParams();
  console.log("Folgender Slug steht in der URL: " + slug);

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
        console.log(data);
        setArticleData(data);

        return data;
      } catch (error) {
        console.error("GET Request fehlgeschlagen:", error);
        throw error;
      }
    }
    getEventDetails();
  }, []);

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
};

export default DetailsPage;
