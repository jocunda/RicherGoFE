import "./styles/index.scss";
import React from "react";
import AppError from "./components/AppError/Component";

const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>Error Area</h1>
        </section>
        <AppError />
      </main>
    </>
  );
};

export default App;
