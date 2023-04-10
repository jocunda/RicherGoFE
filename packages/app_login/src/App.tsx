import "./styles/index.scss"
import React from "react"
import CounterAppLogin from "./components/CounterAppLogin"

const App = () => {
    return <>
        <section className="hero"></section>
        <main>
            <section>
                <h1>Hi, React_login</h1>
            </section>
            <CounterAppLogin />
        </main>

    </>
}

export default App