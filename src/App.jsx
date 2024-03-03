import React from "react";
import { ScrollProvider } from "./helpers/scrollProvider";
import Home from "./pages/Home/Home";

function App() {
  return (
    <main>
      <ScrollProvider>
        <Home />
      </ScrollProvider>
    </main>
  );
}

export default App;
