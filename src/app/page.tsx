
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4 selection:bg-pink-500 selection:text-white">
      <main className="flex flex-col items-center text-center max-w-xl p-8 rounded-2xl border border-pink-500/30 bg-neutral-950/80 shadow-[0_0_50px_rgba(236,72,153,0.2)]">
        <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-6 font-mono">
          Scaffold Listo 📼
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent uppercase mb-4">
          Fiesta 80s
        </h1>
        <p className="text-neutral-400 text-lg sm:text-xl font-light mb-8">
          Invitación de Cumpleaños Retro 80s. El proyecto Next.js está conectado a GitHub y Vercel con éxito.
        </p>
        <div className="flex items-center gap-2 text-sm text-neutral-500 font-mono">
          <span>Próximo paso:</span>
          <span className="text-cyan-400 font-medium">Diseño & Contenido de la Invitación</span>
        </div>
      </main>
    </div>
  );
}
