export default function Home() {
  return (
    <main className="grid h-[70dvh] place-items-center text-3xl">
      <div className="flex flex-col items-center gap-2">
        <p>
          Welcome to the{" "}
          <span className="font-semibold line-through">GuitarGuitar</span>{" "}
          <span className="font-semibold text-orange-500">DrumDrum</span>{" "}
          website!
        </p>
        <p>Navigate to pages with the taskbar on the left</p>
      </div>
    </main>
  );
}
