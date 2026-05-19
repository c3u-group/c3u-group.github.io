import React from "react";
import DrummingClient from "./drummingClient";

export const metadata = {
  title: "击鼓传花 | C³U 团队",
};

export default function Home() {
  return (
    <div id="games_drumming" className="flex flex-col h-full items-center justify-start font-sans w-full">
      <DrummingClient />
    </div>
  );
}