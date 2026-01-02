import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";


function App() {
    return (
        <>
            <Navbar />

            <main style={{ padding: "24px" }}>
                <AppRouter />

            </main>
        </>
    );
}

export default App;
