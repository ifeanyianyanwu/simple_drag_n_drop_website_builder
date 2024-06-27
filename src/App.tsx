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
      <div className="lg:block hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio_template" element={<PortfolioTemplate />} />
          <Route path="/:id" element={<Template />} />
        </Routes>
      </div>
      <div className="grid place-content-center lg:hidden h-full p-5">
        <h1 className="font-semibold text-3xl">
          This webpage is not available on Mobile Devices
        </h1>
      </div>
    </main>
  );
}

export default App;
