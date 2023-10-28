"use client";
import { Music } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";

export default function Header() {
  return (
    <header className="fixed left-14 top-0 z-50 flex h-[12dvh] w-full flex-col justify-center gap-y-2.5 bg-background px-7">
      <Breadcrumbs />
      <div className="flex items-center gap-3">
        <Music className="stroke-[3]" />
        <h1 className="text-2xl font-semibold">drum-drum</h1>
      </div>
    </header>
  );
}
