import React from "react";

import "./styles/index.scss";
import AppItems from "./components/AppItems/Component";


const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>AppItems</h1>
        </section>
        <AppItems />
      </main>
    </>
  );
};

export default App;
