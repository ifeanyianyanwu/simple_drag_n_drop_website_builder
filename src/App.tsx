import "./App.css";

import { Routes, Route } from "react-router-dom";
import { PortfolioTemplate } from "./components/PortfolioTemplate";
import { HomePage } from "./components/HomePage";
import { Template } from "./components/Template";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (!localStorage.templates) {
      localStorage.templates = JSON.stringify([]);
    }
  }, []);

  return (
    <main className="h-screen flex flex-col gap-2 p-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio_template" element={<PortfolioTemplate />} />
        <Route path="/:id" element={<Template />} />
      </Routes>
    </main>
  );
}

export default App;
