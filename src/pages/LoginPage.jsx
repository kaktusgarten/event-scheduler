import { useActionState } from "react";

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
    alert("You are successful logged in");
    const data = await response.json();
    //    console.log("response: ", data["token"]);
  } else {
    alert("Email is unknown!");
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
    // Anmelden und token holen
    login(iEMail, iPassword);
    return { errors: null, input: null, reset: true };
  }

  return { errors: formErrors, input: null, reset: false };
}

const LoginPage = () => {
  const [state, formAction] = useActionState(action, {
    errors: null,
    input: null,
    reset: true,
  });

  return (
    <>
      <div className="border p-5">
        <h1 className="text-3xl">Login-Page</h1>
        <div className="flex flex-col mt-3 border w-3xs">
          <form action={formAction}>
            <input
              type="email"
              name="inpEmail"
              id="inpEmail"
              placeholder="Type your email here"
              className="input input-md"
            />
            {state.errors?.inpEmail && (
              <p className="">{state.errors.inpEmail}</p>
            )}

            <input
              type="password"
              name="inpPassword"
              id="inpPassword"
              placeholder="Type your password here"
              className="input input-md"
            />
            {state.errors?.inpPassword && (
              <p className="">{state.errors.inpPassword}</p>
            )}

            <div className="flex mt-2 justify-end">
              <button type="submit" className="btn btn-outline">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
