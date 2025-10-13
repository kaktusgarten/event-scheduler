export default async function deleteUser(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await fetch(`http://localhost:3001/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 204) {
      // ✅ Erfolgreich gelöscht (kein Body zurück)
      alert(`User ${id} erfolgreich gelöscht`);
      return true;
    }

    if (response.status === 404) {
      // ❌ User nicht gefunden
      alert(`User ${id} wurde nicht gefunden`);
      return false;
    }

    // ❌ Unerwartete Fehler (z. B. FOREIGN KEY Fehler)
    const errorData = await response.json();
    alert("Fehler beim Löschen:", errorData);
    throw new Error(errorData.error || "Unbekannter Fehler beim Löschen");
  } catch (err) {
    alert("DELETE Request fehlgeschlagen:", err);
    throw err;
  }
}
