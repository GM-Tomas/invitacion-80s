import { readdirSync } from "node:fs";
import Invitacion from "./Invitacion";

// Usa el primer audio que haya en public/musica, sin importar el nombre (se lee al hacer el build).
const song = readdirSync("public/musica").find((f) => /\.(mp3|m4a|aac|ogg|wav)$/i.test(f));

export default function Home() {
  return <Invitacion song={song && `/musica/${encodeURIComponent(song)}`} />;
}
