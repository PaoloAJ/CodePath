import { useNavigate } from "react-router-dom";
import { DarkModeToggle } from "./components/DarkModeToggle";
import "./App.css";
import ShowCreators from "./pages/ShowCreators";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <DarkModeToggle />
      <main className="container">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <hgroup>
            <h1>creator verse</h1>
            <p>discover and manage your favorite content creators</p>
          </hgroup>
          <button onClick={() => navigate("/add")}>add creator</button>
        </header>
        <ShowCreators />
      </main>
    </>
  );
}

export default App;
