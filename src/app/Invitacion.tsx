"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { CalendarPlus, Clock, Disc3, MapPin, MessageCircle, Navigation, Play, Shirt } from "lucide-react";

// ---- Datos de la fiesta: editá acá ----
const PARTY = new Date("2026-10-02T20:30:00-03:00");
const ADDRESS = "Olga Cosettini 1170";
const WHATSAPP = "5491136236651"; // +54 9 11 3623-6651

const ics = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
const CALENDAR_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  "BACK TO THE 80s! Cumple de Nani 🪩⚡",
)}&dates=${ics(PARTY)}/${ics(new Date(PARTY.getTime() + 6 * 36e5))}&location=${encodeURIComponent(ADDRESS)}`;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ADDRESS}, Buenos Aires`)}`;
const RSVP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("¡Confirmo! Voy al cumple ochentoso de Nani 🪩⚡")}`;
const NEON = ["#ff2e88", "#00f0ff", "#fff200", "#b026ff"];
// Ojo: font-pixel (Press Start 2P) no trae mayúsculas con tilde, por eso esos textos van sin acento.

const boom = () => {
  const base = { colors: NEON, disableForReducedMotion: true };
  confetti({ ...base, particleCount: 120, spread: 100, origin: { y: 0.6 } });
  confetti({ ...base, particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } });
  confetti({ ...base, particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } });
};

function Countdown() {
  // ponytail: null hasta montar, así el HTML estático no choca con la hora del cliente
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, PARTY.getTime() - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  if (left === 0) return <p className="font-pixel text-sm led blink py-2">¡ES HOY! A BAILAR 🕺</p>;
  const units: [string, number][] = [
    ["DIAS", 864e5],
    ["HRS", 36e5],
    ["MIN", 6e4],
    ["SEG", 1e3],
  ];
  const mods = [Infinity, 24, 60, 60];
  return (
    <div className="grid grid-cols-4 gap-2">
      {units.map(([label, ms], i) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-lcd text-5xl leading-none led tabular-nums">
            {left === null ? "--" : String(Math.floor(left / ms) % mods[i]).padStart(2, "0")}
          </span>
          <span className="font-pixel text-[8px] text-white/70 mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}

// Bola de boliche en SVG: el emoji 🪩 no existe en muchos celulares/Windows viejos.
const TILES = ["#e8ecf5", "#8d96ad", "#ff9ff3", "#6b7390", "#ffffff", "#aab3c8", "#9ff8ff", "#7c86a0", "#d7dcea"];
const SPARKLE = "M0-7 1.6-1.6 7 0 1.6 1.6 0 7-1.6 1.6-7 0-1.6-1.6Z";

function DiscoBall() {
  return (
    <svg viewBox="0 0 100 120" className="disco float -mt-8 w-24" aria-hidden>
      <defs>
        <pattern id="tiles" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#1b1464" />
          {TILES.map((c, i) => (
            <rect key={i} x={(i % 3) * 8 + 0.5} y={Math.floor(i / 3) * 8 + 0.5} width="7" height="7" fill={c} />
          ))}
        </pattern>
        <radialGradient id="shade" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#0b0019" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0b0019" stopOpacity="0.8" />
        </radialGradient>
        <clipPath id="ball">
          <circle cx="50" cy="72" r="40" />
        </clipPath>
      </defs>
      <line x1="50" y1="0" x2="50" y2="33" stroke="#aab3c8" strokeWidth="2" />
      <g clipPath="url(#ball)">
        <rect className="disco-tiles" x="-14" y="32" width="128" height="80" fill="url(#tiles)" />
        <circle cx="50" cy="72" r="40" fill="url(#shade)" />
      </g>
      <g transform="translate(22 50)">
        <path className="sparkle" d={SPARKLE} fill="#fff" />
      </g>
      <g transform="translate(84 98) scale(.8)">
        <path className="sparkle" d={SPARKLE} fill="#fff200" style={{ animationDelay: "0.6s" }} />
      </g>
      <g transform="translate(88 48) scale(.6)">
        <path className="sparkle" d={SPARKLE} fill="#00f0ff" style={{ animationDelay: "1.1s" }} />
      </g>
    </svg>
  );
}

// Foto sorpresa: aparece con un rebote cuando entra en pantalla al scrollear.
function Sorpresa() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal neon neon-pink w-full overflow-hidden p-1.5 ${shown ? "in" : ""}`}>
      <Image
        src="/sorpresa.webp"
        alt="Es sorpresa, así que shhh"
        width={1086}
        height={1448}
        sizes="(max-width: 448px) 100vw, 448px"
        className="rounded-xl"
      />
    </div>
  );
}

export default function Invitacion({ song }: { song?: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasSong, setHasSong] = useState(!!song);

  const start = () => {
    // play() dentro del toque: los celulares solo dejan arrancar audio así
    audio.current?.play().catch(() => setHasSong(false));
    setStarted(true);
    boom();
  };
  const toggle = () => (audio.current?.paused ? audio.current.play().catch(() => {}) : audio.current?.pause());

  return (
    <>
      {song && (
        <audio
          ref={audio}
          src={song}
          loop
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setHasSong(false)}
        />
      )}

      <div className="scene" aria-hidden>
        <div className="stars" />
        <div className="sun" />
        <div className="floor" />
      </div>
      <div className="scanlines" aria-hidden />

      <main className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-7 px-4 pt-8 pb-32 text-center">
        <p className="font-pixel text-[10px] text-cyan blink">★ TENES UNA INVITACION ★</p>

        <h1 className="-mt-2">
          <span className="logo-script">Back to the</span>
          <span className="logo-chrome">80s!</span>
        </h1>
        <DiscoBall />

        <p className="neon neon-purple px-5 py-4 text-2xl leading-tight">
          Prepará los <b className="text-yellow">calentadores</b>, el <b className="text-cyan">neón</b> y tus mejores
          pasos, porque festejamos <b className="text-pink">el cumpleaños de Nani</b> a puro ritmo retro.
        </p>

        <section className="neon neon-pink w-full px-4 pt-3 pb-4" aria-label="Cuenta regresiva">
          <p className="font-pixel text-[10px] glow mb-3">▶ FALTAN</p>
          <Countdown />
        </section>

        <section className="grid w-full grid-cols-2 gap-3" aria-label="Datos de la fiesta">
          <a href={CALENDAR_URL} target="_blank" rel="noopener" className="neon flex flex-col items-center gap-1 px-2 py-4">
            <span className="font-pixel text-[9px] glow">¿CUANDO?</span>
            <span className="font-chrome text-lg">VIERNES</span>
            <span className="font-chrome text-4xl leading-none glow">2/10</span>
            <span className="mt-2 flex items-center gap-1 rounded-full bg-cyan px-3 py-1 font-pixel text-[8px] text-black">
              <CalendarPlus size={12} /> AGENDAR
            </span>
          </a>

          <div className="neon neon-yellow flex flex-col items-center gap-1 px-2 py-4">
            <span className="font-pixel text-[9px] glow">¿A QUE HORA?</span>
            <Clock className="glow my-1" size={22} />
            <span className="font-chrome text-4xl leading-none glow">20:30</span>
            <span className="font-chrome text-lg">HS</span>
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener"
            className="neon neon-pink col-span-2 flex items-center gap-4 p-4 text-left"
          >
            <MapPin className="glow shrink-0" size={40} />
            <span className="flex-1">
              <span className="block font-pixel text-[9px] glow">¿DONDE?</span>
              <span className="block font-chrome text-2xl leading-tight">{ADDRESS}</span>
            </span>
            <span className="flex shrink-0 flex-col items-center gap-1 rounded-xl bg-pink px-3 py-2 font-pixel text-[8px]">
              <Navigation size={16} /> IR
            </span>
          </a>
        </section>

        <section className="neon neon-purple relative w-full px-5 pt-5 pb-8">
          <h2 className="flex items-center justify-center gap-2 font-pixel text-xs glow">
            <Shirt size={18} /> DRESS CODE
          </h2>
          <p className="mt-3 text-2xl leading-tight">
            🕶️ <b className="text-cyan">80s icons</b>, <b className="text-pink">neón</b>,{" "}
            <b className="text-yellow">cuero</b> o tu mejor look ochentoso.
          </p>
          <p className="sticker absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-2 font-pixel text-[9px]">
            ¡OBLIGATORIO VENIR CON ONDA!
          </p>
        </section>

        <section className="mt-4 flex w-full flex-col items-center gap-4">
          <p className="ink text-2xl leading-tight">
            Confirmá tu asistencia lo antes posible para tener tu <b className="text-yellow">trago listo</b>. 📼✨
          </p>
          <Sorpresa />
          <a
            href={RSVP_URL}
            target="_blank"
            rel="noopener"
            onClick={boom}
            className="rsvp ink flex w-full items-center justify-center gap-3 rounded-2xl px-4 py-5 font-pixel text-sm"
          >
            <MessageCircle size={22} /> CONFIRMAR
          </a>
        </section>

        <p className="font-pixel text-[8px] text-white/50">SEA AMABLE, REBOBINE 📼</p>
      </main>

      {hasSong && started && (
        <button
          onClick={toggle}
          aria-label={playing ? "Pausar música" : "Reproducir música"}
          className="neon neon-pink fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full!"
        >
          <Disc3 size={30} className={`glow ${playing ? "spin" : "opacity-60"}`} />
        </button>
      )}

      <div
        className={`intro fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 px-6 text-center ${started ? "off" : ""}`}
      >
        <p className="font-pixel text-[10px] text-cyan blink">● REC 02·10·1986</p>
        <p className="logo-script">Back to the</p>
        <p className="logo-chrome -mt-6">80s!</p>
        <button
          onClick={start}
          className="rsvp ink flex items-center gap-3 rounded-2xl px-8 py-5 font-pixel text-base"
        >
          <Play size={22} fill="currentColor" /> PLAY
        </button>
        <p className="font-pixel text-[9px] text-white/60">🔊 SUBI EL VOLUMEN</p>
      </div>
    </>
  );
}
