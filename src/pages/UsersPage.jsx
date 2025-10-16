import { useEffect, useState, use } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";
import getAllUsers from "../data/GetAllUsers";
import deleteUser from "../data/DeleteUser";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserData, setCurrentUserData] = useState({
    name: "",
    email: "",
    isActive: "",
  });

  const { localStorageToken, setLocalStorageToken } = use(GesamtseitenContext);
  const token = "someTopSecret";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch {
        alert("Die Api ist leider nicht erreichbar:-)");
      }
    };
    fetchUsers();
  }, []);

  const EditUser = (id) => {
    // filter ginge nicht, weil filter() immer ein Array zurück gibt. find() nicht.
    const userData = users.find((user) => user.id === id);
    console.log(userData);
    setCurrentUserData(userData);
    document.getElementById("my_modal_3").showModal();
  };

  const formAction = async (e) => {
    e.preventDefault();

    // 1. Formulardaten sammeln
    const formData = new FormData(e.target);

    // 2. In ein Objekt umwandeln
    const updatedUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      isActive: formData.get("active") === "true", // String → Boolean
    };

    console.log("Updated User:", updatedUser);

    // // 3. PUT-Request an API
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${currentUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Fehler beim Aktualisieren (Status: ${response.status})`
        );
      }

      const data = await response.json();
      console.log("Erfolgreich aktualisiert:", data);

      //   // Optional: Liste aktualisieren
      //   setUsers((prev) =>
      //     prev.map((user) => (user.id === currentUserId ? data : user))
      //   );

      //   // Modal schließen
      //   document.getElementById("my_modal_3").close();
    } catch (error) {
      console.error("PUT Request fehlgeschlagen:", error);
      alert(
        "Ein Fehler ist aufgetreten, ODER: Die API ist nicht erreichbar. Für dieses Demo-Projekt muss die API lokal auf eurem Rechner installiert und ausgeführt werden :-)\nLink zur API: https://github.com/WebDev-WBSCodingSchool/events-api"
      );
    }
  };

  return (
    <>
      {/* MODAL */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={formAction}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
              <legend className="fieldset-legend">
                Benutzer bearbeiten, ID: {currentUserId}
              </legend>

              <label className="label">Benutzername</label>
              <input
                defaultValue={currentUserData?.name}
                name="name"
                type="text"
                className="input w-[100%] mb-4"
                placeholder="Name eingeben"
              />

              <label className="label">Email</label>
              <input
                defaultValue={currentUserData?.email}
                name="email"
                type="email"
                className="input w-[100%] mb-4"
                placeholder="E-Mail eingeben"
              />

              <label className="label">Passwort</label>
              <input
                name="password"
                type="text"
                className="input w-[100%] mb-4"
                placeholder="Password eingeben"
              />
              <label className="label">Kontoaktivierung</label>
              <select
                defaultValue={
                  currentUserData ? String(currentUserData.isActive) : "false"
                }
                name="active"
                className="select w-[100%] mb-4"
              >
                <option value="true" defaultChecked>
                  aktiv
                </option>
                <option value="false">inaktiv</option>
              </select>

              <button type="submit" className="btn btn-neutral mt-4">
                Speichern
              </button>
            </fieldset>
          </form>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>

      <div className="py-5">
        <h1 className="text-3xl mb-10 pl-3">Benutzerübersicht</h1>
        <ul>
          {users?.map((user, index) => (
            <li
              key={user.id}
              className={`p-4 m-3 ${
                index % 2 === 0 ? "bg-[#111c2b]" : "bg-black"
              }`}
            >
              <div className="grid md:grid-cols-[80px_1fr_150px_auto] gap-4">
                <div>ID: {user.id}</div>
                <div>
                  <p className="mb-2 text-xl">{user.email}</p>

                  <p className="text-xs font-[#e5e5e5] pl-3">
                    Kontoerstellung: {user.createdAt}
                  </p>
                </div>
                <div>Konto aktiv: {user.isActive ? "Ja" : "Nein"}</div>
                <div className="grid justify-end">
                  {/* BUTTON EDIT */}
                  <button
                    className="btn btn-primary mb-4"
                    onClick={() => {
                      setCurrentUserId(user.id);
                      EditUser(user.id);
                    }}
                  >
                    bearbeiten
                  </button>
                  {/* BUTTON DELETE */}
                  <button
                    className="btn btn-secondary"
                    onClick={async () => {
                      const ok = await deleteUser(user.id);
                      if (ok) {
                        setUsers((prev) =>
                          prev.filter((u) => u.id !== user.id)
                        );
                      }
                    }}
                  >
                    löschen
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UsersPage;
