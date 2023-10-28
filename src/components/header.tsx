"use client";
import { Music } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";

export default function Header() {
  return (
    <header className="flex flex-col gap-4 px-7 py-5">
      <Breadcrumbs />
      <div className="flex items-center gap-3">
        <Music className="stroke-[3]" />
        <h1 className="text-2xl font-semibold">drum-drum</h1>
      </div>
    </header>
  );
}
