import { useActionState, use } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";

// LOGIN PAGE:
const LoginPage = () => {
  // const für Globalen Token:
  const { localStorageToken, setLocalStorageToken } = use(GesamtseitenContext);

  const [state, formAction] = useActionState(action, {
    errors: null,
    input: null,
    reset: true,
  });

  async function login(email, password) {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then();
    if (response.ok) {
      document.getElementById("modal_login").showModal();
      const data = await response.json();
      // Token global speicher:
      const token = data["token"];
      // in LocalStorage
      localStorage.setItem("token", JSON.stringify(token));
      // in globalen React Context
      setLocalStorageToken(token);
    } else {
      alert("Unbekannte E-Mail!");
      console.log("Status: ", response.status);
    }
  }

  function validateForm({ inpEmail, inpPassword }) {
    const validationErrors = {};

    if (!inpEmail.trim()) {
      validationErrors.inpEmail = "EMail ist erforderlich";
    }
    if (!inpPassword.trim()) {
      validationErrors.inpPassword = "Passwort ist erforderlich";
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
      login(iEMail, iPassword);
      return { errors: null, input: null, reset: true };
    }

    return { errors: formErrors, input: null, reset: false };
  }

  return (
    <>
      <div className="p-5 flex flex-col items-center">
        {/* Open the modal using document.getElementById('modal_logout').showModal() method */}
        <dialog id="modal_logout" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Abmeldung</h3>
            <p className="py-4">Du hast dich erfolgreich abgemeldet!</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {/* Open the modal using document.getElementById('modal_login').showModal() method */}
        <dialog id="modal_login" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Anmeldung</h3>
            <p className="py-4">
              Du hast dich erfolgreich angemeldet! Oben rechts in der Navigation
              stehen dir jetzt weitere Admin-Einstellung zur Verfügung
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {localStorageToken ? (
          <>
            <h1 className="text-3xl mb-5">Abmelden</h1>
            <p className="mb-5">
              Du bist angemeldet. Hier kannst du dich abmelden:
            </p>
            <button
              className="btn w-[400px] max-w-1/1"
              onClick={() => {
                localStorage.setItem("token", JSON.stringify(""));
                setLocalStorageToken("");
                document.getElementById("modal_logout").showModal();
              }}
            >
              Abmelden
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl mb-5">Anmeldung</h1>
            <p className="mb-5">Bitte melde dich hier an:</p>

            <form action={formAction}>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="inpEmail"
                  id="inpEmail"
                  placeholder="Type your email here"
                  className="input input-md"
                  autoComplete="email"
                />
                {state.errors?.inpEmail && (
                  <p className="">{state.errors.inpEmail}</p>
                )}

                <label className="label">Password</label>
                <input
                  type="password"
                  name="inpPassword"
                  id="inpPassword"
                  placeholder="Type your password here"
                  className="input input-md"
                  autoComplete="current-password"
                />
                {state.errors?.inpPassword && (
                  <p className="">{state.errors.inpPassword}</p>
                )}

                <div className="flex flex-col mt-2 ">
                  <button type="submit" className="btn btn-neutral mt-4">
                    Anmelden
                  </button>
                </div>
              </fieldset>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default LoginPage;
