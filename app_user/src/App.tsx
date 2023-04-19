import "./styles/index.scss";
import React from "react";
import AppUser from "./components/AppUser";

const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>User Area</h1>
        </section>
        <AppUser />
      </main>
    </>
  );
};

export default App;
