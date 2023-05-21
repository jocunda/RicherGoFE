import React from "react";
import CounterAppLogin from "./components/CounterAppLogin/Component";

import "./styles/index.scss";

const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>Hi, React_login222</h1>
        </section>
        <CounterAppLogin />
      </main>
    </>
  );
};

export default App;
