import "./styles/index.scss";
import React from "react";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>Header</h1>
        </section>
        <Header />
      </main>
    </>
  );
};

export default App;
