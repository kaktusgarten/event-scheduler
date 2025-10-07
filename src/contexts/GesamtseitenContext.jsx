// React Context Api
// Daten die auf der ganzen Seite zur verfügung stehen
import { useState, createContext } from "react";

export const GesamtseitenContext = createContext();
export default function GesamtseitenContextProvider({ children }) {
  // Global vergügbare Daten hier auflisten / erstellen:

  const [sampleText, setSampleText] = useState(
    "Ich bin ein Text der global verfügbar ist :-)"
  );
  const [localStorageData, setLocalStorageData] = useState();

  return (
    // Global verfügbare Daten hier nochmal eintragen:
    <GesamtseitenContext
      value={{
        sampleText,
        setSampleText,
        localStorageData,
        setLocalStorageData,
      }}
    >
      {children}
    </GesamtseitenContext>
  );
}
