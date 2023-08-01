import React from "react";

import "./styles/index.scss";
import AppInventories from "./components/AppInventories/Component";


const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <AppInventories />
      </main>
    </>
  );
};

export default App;
