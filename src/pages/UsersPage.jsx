import { useEffect, useState } from "react";
import getAllUsers from "../data/GetAllUsers";
import deleteUser from "../data/DeleteUser";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const deleteUser = async (id) => {
    alert("Lösche User: " + id);
  };

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

  return (
    <>
      <div className="p-5">
        <h1 className="text-3xl mb-10">Benutzerübersicht</h1>
        <ul>
          {users?.map((user, index) => (
            <li
              key={user.id}
              className={`p-3 m-3 ${
                index % 2 === 0 ? "bg-[#111c2b]" : "bg-black"
              }`}
            >
              <div className="grid md:grid-cols-[80px_1fr_150px_auto] gap-4">
                <div>{user.id}</div>
                <div>{user.email}</div>
                <div>Konto aktiv: {user.isActive ? "Ja" : "Nein"}</div>
                <div className="grid justify-end">
                  <button
                    className="btn btn-secondary"
                    onClick={(e) => {
                      deleteUser(user.id);
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
