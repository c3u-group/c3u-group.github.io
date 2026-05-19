import React from "react";
import WeighClient from "./weighClient";

export const metadata = {
  title: "称量药品小游戏 | C³U 团队",
};

export default function Home() {
  return (
    <div id="games_weigh" className="flex flex-col h-full items-center justify-start font-sans w-full">
      <WeighClient />
    </div>
  );
}