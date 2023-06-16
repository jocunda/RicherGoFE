import "./styles/index.scss";
import React from "react";
import AppUser from "./components/AppUser/Component";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>

      <section className="hero"></section>
      <main>
        <section>
          <h1>User Area</h1>
        </section>
        <AppUser />
        <Outlet />
      </main>
    </>
  );
};

export default App;
