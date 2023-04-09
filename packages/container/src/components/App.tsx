import "../styles/index.scss"
import React from "react"

const AppHome = React.lazy(() => import("app_home/CounterAppHome"));
// const AppLogin = React.lazy(() => import("app_login/CounterAppLogin"));


const App = () => {
  return <>
    <React.Suspense>
      <AppHome />
    </React.Suspense>

    {/* <React.Suspense>
      <AppLogin />
    </React.Suspense> */}
    <h1>This is container</h1>
  </>
}

export default App