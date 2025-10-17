import { useActionState, useState, useEffect } from "react";
import { use } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";
import { useParams } from "react-router";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const EditEventPage = () => {
  const [state, formAction] = useActionState(action, {
    errors: null,
    input: null,
    reset: true,
  });

  const { setLocalStorageToken, localStorageToken } = use(GesamtseitenContext);
  const navigate = useNavigate();

  // Bestehende Daten holen
  // SLUG:
  const { slug } = useParams();
  const [articleData, setArticleData] = useState();

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

  // End bestehende ...

  async function updateEvent({
    inpTitle,
    inpDescription,
    inpDate,
    inpImageURL,
    inpLocation,
    inpLat,
    inpLon,
  }) {
    let hideUrlInDescription = "";

    if (!inpImageURL) {
      hideUrlInDescription = inpDescription;
    } else {
      hideUrlInDescription = JSON.stringify({
        Description: inpDescription,
        URL: inpImageURL,
      });
    }
    const response = await fetch(`http://localhost:3001/api/events/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
      body: JSON.stringify({
        title: inpTitle,
        description: hideUrlInDescription,
        date: inpDate,
        location: inpLocation,
        latitude: inpLat,
        longitude: inpLon,
      }),
    }).then();
    if (response.ok) {
      alert("Your event is successful updated");
      navigate("/");
    } else {
      alert("Cant update event!");
    }
  }

  // Felder zu prüfen: inpTitle inpDescription inpDate inpImageURL inpLocation inpLat inpLon
  function validateForm({
    inpTitle,
    inpDescription,
    inpDate,
    inpImageURL,
    inpLocation,
    inpLat,
    inpLon,
  }) {
    const validationErrors = {};

    if (!inpTitle.trim()) {
      validationErrors.inpTitle = "Title is required";
    }

    if (!inpDescription.trim()) {
      validationErrors.inpDescription = "Description is required";
    }

    if (!inpDate.trim()) {
      validationErrors.inpDate = "Date is required";
    }

    if (!inpLocation.trim()) {
      validationErrors.inpLocation = "Location is required";
    }
    {
      /** 
    if (!inpLat.trim()) {
      validationErrors.inpLat = "Lat is required";
    }

    if (!inpLon.trim()) {
      validationErrors.inpLon = "Lon is required";
    }
*/
    }
    return validationErrors;
  }

  async function action(previousState, formData) {
    const validateDate = Object.fromEntries(formData);
    const formErrors = validateForm(validateDate);

    const iEMail = formData.get("inpEmail");
    const iPassword = formData.get("inpPassword");

    if (Object.keys(formErrors).length === 0) {
      // Anmelden
      console.log("create new event!");
      //      login(iEMail, iPassword);
      updateEvent(validateDate);
      return { errors: null, input: null, reset: true };
    }

    return { errors: formErrors, input: validateDate, reset: false };
  }

  function convertDate(DateString) {
    let testdatum = new Date();

    if (!DateString) return;
    testdatum = new Date(DateString);
    return testdatum.toISOString().substr(0, 10);
  }

  let objDescription = {};

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

  function getURLFromDescription(description) {
    if (description !== undefined) {
      if (isJsonString(description)) {
        objDescription = JSON.parse(description);
      } else {
        objDescription["Description"] = description;
      }
    }
  }

  getURLFromDescription(articleData?.description);

  return (
    <>
      <div className="p-5">
        <h1 className="text-3xl mb-5">Event aktualisieren:</h1>
        <div>
          {/**
           * Einzugeben
           * title
           * description
           * date
           * location
           * lat und lon
           *
           * Rückgabe: 201 events created oder 400 Bad Request
           *
           * id, title, description, date, location, lat, lon, organizerid, created, updated
           */}
          <form action={formAction}>
            <div className="flex flex-col mt-2 gap-4">
              <div className="">
                <label htmlFor="inpTitle" className="input w-26 mr-3">
                  Title
                </label>
                <input
                  type="text"
                  placeholder=""
                  id="inpTitle"
                  name="inpTitle"
                  className="input"
                  defaultValue={
                    state.input ? state.input?.inpTitle : articleData?.title
                  }
                />
              </div>
              {state.errors?.inpTitle && (
                <p className="">{state.errors.inpTitle}</p>
              )}

              <div>
                <label htmlFor="inpDescription" className="input w-26 mr-3">
                  Description
                </label>
                <input
                  type="text"
                  placeholder=""
                  id="inpDescription"
                  name="inpDescription"
                  className="input"
                  defaultValue={
                    state.input
                      ? state.input?.inpDescription
                      : objDescription["Description"]
                  }
                />
              </div>
              {state.errors?.inpDescription && (
                <p className="">{state.errors.inpDescription}</p>
              )}
              <div>
                <label htmlFor="inpDate" className="input w-26 mr-3">
                  Date
                </label>
                <input
                  type="date"
                  placeholder=""
                  id="inpDate"
                  name="inpDate"
                  className="input"
                  defaultValue={convertDate(
                    state.input ? state.input?.inpDate : articleData?.date
                  )}
                />
              </div>
              {state.errors?.inpDate && (
                <p className="">{state.errors.inpDate}</p>
              )}

              <div>
                <label htmlFor="inpImageURL" className="input w-26 mr-3">
                  URL to Image
                </label>
                <input
                  type="text"
                  placeholder=""
                  id="inpImageURL"
                  name="inpImageURL"
                  className="input"
                  defaultValue={
                    state.input
                      ? state.input?.inpImageURL
                      : objDescription["URL"]
                  }
                />
              </div>

              <div>
                <label htmlFor="inpLocation" className="input w-26 mr-3">
                  Location
                </label>
                <input
                  type="text"
                  placeholder=""
                  id="inpLocation"
                  name="inpLocation"
                  className="input"
                  defaultValue={
                    state.input
                      ? state.input?.inpLocation
                      : articleData?.location
                  }
                />
              </div>
              {state.errors?.inpLocation && (
                <p className="">{state.errors.inpLocation}</p>
              )}

              <div>
                <label htmlFor="inpLat" className="input w-26 mr-3">
                  Lat
                </label>
                <input
                  type="text"
                  placeholder=""
                  id="inpLat"
                  name="inpLat"
                  className="input"
                  defaultValue={
                    state.input ? state.input?.inpLat : articleData?.latitude
                  }
                />
              </div>

              <div>
                <label htmlFor="inpLon" className="input w-26 mr-3">
                  Lon
                </label>
                <input
                  type="text"
                  placeholder=""
                  id="inpLon"
                  name="inpLon"
                  className="input"
                  defaultValue={
                    state.input ? state.input?.inpLon : articleData?.longitude
                  }
                />
              </div>
            </div>

            <div className="flex justify-end w-110 mt-5">
              <button type="submit" className="btn w-1/1">
                Event aktualisieren
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditEventPage;
