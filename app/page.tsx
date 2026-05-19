import React from "react";
import HomeClient from "./HomeClient";

export const metadata = {
  title: "C³U 团队",
};

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-stone-50 font-sans dark:bg-neutral-950 w-full">
      <HomeClient />
    </div>
  );
}
