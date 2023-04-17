import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import routes from './router.config';


const Router = () => {
    const { isAuth } = useAuth();

    console.log("Auth: ", isAuth); //check auth

    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        route.auth && !isAuth ?
                            <Navigate to="/" replace={true} /> :
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <route.component />
                            </React.Suspense>}
                />
            ))}
        </Routes>
    )
};

export default Router;