import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RulesPage } from "./pages/RulesPage";

function HomePage() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 h-screen flex items-center">
        <div className="text-center w-full">
          <h1 className="text-6xl sm:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-red-200 to-amber-100">
            Game of Thrones
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Control the battlefield with strategy and skill. Capture territories,
            form alliances, and dominate the realm in this intense area control game.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-all duration-300 ease-in-out transform hover:scale-105">
              Enter Management Board
            </button>
            <Link
              to="/rules"
              className="rounded-md ring-1 ring-indigo-200/10 px-6 py-3 text-sm font-semibold text-gray-200 hover:text-white hover:ring-indigo-200/20 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-500/10"
            >
              View Rules
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rules" element={<RulesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
