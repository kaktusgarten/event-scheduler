  export default async function getAllUsers() {
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

        return data.results;
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