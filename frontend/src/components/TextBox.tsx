export const TextBox = ({ children }: { children: React.ReactNode }) => (
  <div className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
    <div className="relative px-7 py-6 bg-slate-800/50 ring-1 ring-gray-700/50 rounded-lg leading-none mb-8">
      <div className="text-gray-300 space-y-3">{children}</div>
    </div>
  </div>
);
