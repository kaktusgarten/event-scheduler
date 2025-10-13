import { useActionState } from "react";
import { Link } from "react-router";

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

async function register(email, password) {
  const response = await fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then();
  if (response.ok) {
    document.getElementById("modal_registered").showModal();
  } else {
    alert("Email always used!");
    console.log("Status: ", response.status);
  }
}

async function action(previousState, formData) {
  const validateDate = Object.fromEntries(formData);
  const formErrors = validateForm(validateDate);

  const iEMail = formData.get("inpEmail");
  const iPassword = formData.get("inpPassword");

  if (Object.keys(formErrors).length === 0) {
    // registrieren
    register(iEMail, iPassword);
    return { errors: null, input: null, reset: true };
  }

  return { errors: formErrors, input: null, reset: false };
}

const RegistryPage = () => {
  const [state, formAction] = useActionState(action, {
    errors: null,
    input: null,
    reset: true,
  });

  return (
    <>
      {/* POPUP - Registrierung erfolgreich */}
      {/* Open the modal using document.getElementById('modal_registered').showModal() method */}
      <dialog id="modal_registered" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Registierung erfolgreich!</h3>
          <p className="py-4">
            Du hast die erfolgreich registriert. Melde dich jetzt mit deinen
            Registrierungsdaten im{" "}
            <Link to="/login" className="underline">
              Login Bereich
            </Link>{" "}
            an!
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div className="p-5 flex flex-col items-center">
        <h1 className="text-3xl mb-5">Registrierung</h1>
        <p className="mb-5">
          Um Events zu bearbeiten muss du dich erst registrieren:
        </p>

        <form action={formAction}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <label className="label">E-Mail</label>
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

            <label className="label">Passwort</label>
            <input
              type="password"
              name="inpPassword"
              id="inpPassword"
              placeholder="Type your password here"
              autoComplete="current-password"
              className="input input-md"
            />
            {state.errors?.inpPassword && (
              <p className="">{state.errors.inpPassword}</p>
            )}

            <div className="flex flex-col mt-2 ">
              <button type="submit" className="btn btn-neutral mt-4">
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default RegistryPage;
