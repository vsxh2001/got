interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-violet-950 to-indigo-950 text-white flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center relative">
        {/* Darker purple glow effect behind content */}
        <div className="absolute inset-0 blur-3xl bg-purple-800/20 -z-10 rounded-full"></div>
        {children}
      </div>
    </div>
  );
}
