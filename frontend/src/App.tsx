import { Layout } from "./components/Layout";

function App() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center relative">
        {/* Darker purple glow effect behind title */}
        <div className="absolute inset-0 blur-3xl bg-purple-800/20 -z-10 rounded-full"></div>

        <h1 className="text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-400 drop-shadow-lg">
          Game of Thrones
        </h1>

        <p className="text-2xl mb-12 text-purple-200/80 leading-relaxed">
          Control the battlefield with strategy and skill. Capture territories,
          form alliances, and dominate the realm in this intense area control
          game.
        </p>

        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 text-xl font-bold rounded-lg bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-700/30 border border-purple-700/30">
            Enter Management Board
          </button>
          <button className="px-8 py-4 text-xl font-bold rounded-lg bg-transparent hover:bg-purple-900/30 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-700/30 border border-purple-400/30">
            View Rules
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default App;
