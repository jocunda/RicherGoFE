import React from "react";

import "./styles/index.scss";
import AppCart from "./components/AppCart/Component";


const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>AppCart</h1>
        </section>
        <AppCart />
      </main>
    </>
  );
};

export default App;
