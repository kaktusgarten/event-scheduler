import { useState } from "react";
import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegistryPage from "./pages/RegistryPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/registrieren" element={<RegistryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/eventdetails" element={<DetailsPage />} />
        <Route path="/benutzeruebersicht" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
