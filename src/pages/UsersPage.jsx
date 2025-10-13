import { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await fetch("http://localhost:3001/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Fehler beim Laden der User (Status: ${response.status})`
          );
        }

        const data = await response.json();
        setUsers(data.results);
        console.log(data);

        return data;
      } catch (error) {
        console.error("GET Request fehlgeschlagen:", error);
        alert(
          "Die API ist nicht erreichbar. Für dieses Demo-Projekt muss die API lokal auf eurem Rechner installiert und ausgeführt werden :-) Link zur API: https://github.com/WebDev-WBSCodingSchool/events-api"
        );
        throw error;
      }
    }

    getAllUsers();
  }, []);

  return (
    <>
      <div className="p-5">
        <h1 className="text-3xl mb-10">Benutzerübersicht</h1>
        <ul>
          {users?.map((user) => (
            <li className="border p-3 m-3">
              {user.id} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UsersPage;
