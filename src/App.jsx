import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Verifier from "./pages/Verifier";
import "./App.css";

function App() {
  const [view, setView] = useState("dashboard");

  return (
    <div className="page">
      <nav className="nav">
        <button
          className={`nav-tab ${view === "dashboard" ? "active" : ""}`}
          onClick={() => setView("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`nav-tab ${view === "verifier" ? "active" : ""}`}
          onClick={() => setView("verifier")}
        >
          Verifier
        </button>
      </nav>
      {view === "dashboard" ? <Dashboard /> : <Verifier />}
    </div>
  );
}

export default App;