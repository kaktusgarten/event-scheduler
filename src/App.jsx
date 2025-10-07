import { useState } from "react";
import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegistryPage from "./pages/RegistryPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import NichtGefundenPage from "./pages/NichtGefundenPage.jsx";
import NewEventPage from "./pages/NewEventPage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/registrieren" element={<RegistryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/event-details" element={<DetailsPage />} />
        <Route path="/neues-event" element={<NewEventPage />} />
        <Route path="/benutzeruebersicht" element={<UsersPage />} />
        <Route path="/nicht-gefunden" element={<NichtGefundenPage />} />
      </Route>
    </Routes>
  );
}

export default App;
