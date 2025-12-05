import React from "react";
import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";

const App = () => {
    return (
        <>
            <Navbar />
            <AppRouter />
        </>
    );
};

export default App;
