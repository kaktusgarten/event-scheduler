import { useActionState } from "react";
import { use } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";

const NewEventPage = () => {
  const [state, formAction] = useActionState(action, {
    errors: null,
    input: null,
    reset: true,
  });

  const { setLocalStorageToken, localStorageToken } = use(GesamtseitenContext);

  async function saveNewEvent({
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
    const response = await fetch("http://localhost:3001/api/events", {
      method: "POST",
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
      alert("Your event is successful saved");
    } else {
      alert("Cant save event!");
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
      console.log("Fehler Title!");
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

    console.log("Action!");

    if (Object.keys(formErrors).length === 0) {
      // Anmelden
      console.log("create new event!");
      //      login(iEMail, iPassword);
      saveNewEvent(validateDate);
      return { errors: null, input: null, reset: true };
    }

    return { errors: formErrors, input: validateDate, reset: false };
  }

  return (
    <>
      <div className="p-5">
        <h1 className="text-3xl mb-5">Neues Event eintragen:</h1>
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
            <section className="grid grid-cols-2 gap-5">
              <div className="[ LINKE_SPALTE ] flex flex-col mt-2 gap-4">
                <div className="">
                  <label htmlFor="inpTitle" className="w-26 mr-3">
                    Titel:
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    id="inpTitle"
                    name="inpTitle"
                    className="input w-[100%] mt-3"
                    defaultValue={state.input?.inpTitle}
                  />
                </div>
                {state.errors?.inpTitle && (
                  <p className="">{state.errors.inpTitle}</p>
                )}
                <div>
                  <label htmlFor="inpDate" className="w-26 mr-3">
                    Datum:
                  </label>
                  <input
                    type="date"
                    placeholder=""
                    id="inpDate"
                    name="inpDate"
                    className="input w-[100%] mt-3"
                    defaultValue={state.input?.inpDate}
                  />
                </div>
                {state.errors?.inpDate && (
                  <p className="">{state.errors.inpDate}</p>
                )}

                <div>
                  <label htmlFor="inpImageURL" className="w-26 mr-3">
                    URL des Bildes:
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    id="inpImageURL"
                    name="inpImageURL"
                    className="input w-[100%] mt-3"
                    defaultValue={state.input?.inpImageURL}
                  />
                </div>

                <div>
                  <label htmlFor="inpLocation" className="w-26 mr-3">
                    Veranstalungsort:
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    id="inpLocation"
                    name="inpLocation"
                    className="input w-[100%] mt-3"
                    defaultValue={state.input?.inpLocation}
                  />
                </div>
                {state.errors?.inpLocation && (
                  <p className="">{state.errors.inpLocation}</p>
                )}

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="inpLat" className="w-26 mr-3">
                      Latetude:
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      id="inpLat"
                      name="inpLat"
                      className="input mt-3"
                      defaultValue={state.input?.inpLat || 0}
                    />
                  </div>

                  <div>
                    <label htmlFor="inpLon" className="w-26 mr-3 w-[100%]">
                      Longitude:
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      id="inpLon"
                      name="inpLon"
                      className="input mt-3 w-[100%]"
                      defaultValue={state.input?.inpLon || 0}
                    />
                  </div>
                </div>
              </div>

              <div className="[ RECHTE_SPALTE ]">
                <div className="h-[100%]">
                  <label htmlFor="inpDescription" className="w-26 mr-3">
                    Beschreibung:
                  </label>
                  <textarea
                    placeholder=""
                    id="inpDescription"
                    name="inpDescription"
                    className="textarea w-[100%] h-[90%] mt-5"
                    defaultValue={state.input?.inpDescription}
                  />
                </div>
                {state.errors?.inpDescription && (
                  <p className="">{state.errors.inpDescription}</p>
                )}
              </div>
            </section>

            <div className="flex justify-end w-110 mt-5">
              <button type="submit" className="btn w-1/1">
                Event eintragen
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewEventPage;
