import { useEffect, useState } from "react";
import getAllUsers from "../data/GetAllUsers";
import deleteUser from "../data/DeleteUser";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

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
