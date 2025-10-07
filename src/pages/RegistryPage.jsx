import { useActionState, useState } from "react";

const RegistryPage = () => {
  const inpEMail = document.getElementById("inputEMail");
  const inpPassword = document.getElementById("inputPassword");
  const [formState, setFormState] = useState(false);
  const [formErrors, setACtionState] = useActionState(action, null);

  async function register(email, password) {
    console.log("email", email);
    console.log("password", password);
    const response = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then();
    if (response.ok) {
      setFormState(false);
      console.log("Alles gut");
    } else {
      setFormState(true);
      console.log("Status: ", response.status);
    }
  }

  return (
    <>
      <div className="border p-5">
        <h1 className="text-3xl">Registry-Page</h1>

        <button
          className="btn mt-5"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Register
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key to cancel.</p>
            <form method="dialog">
              <input
                type="text"
                placeholder="Type email here"
                className="input"
                id="inputEMail"
              />
              {formState && (
                <p className="text-red-600 mt-1 font-semibold">{"Fehler"}</p>
              )}

              <input
                type="password"
                placeholder="Type password here"
                className="input mt-2"
                id="inputPassword"
              />
              <div className="flex justify-end">
                <button
                  className="btn"
                  onClick={() => register(inpEMail.value, inpPassword.value)}
                >
                  Register now
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default RegistryPage;
