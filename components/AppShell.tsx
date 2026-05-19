"use client";

import Header from "@/components/Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell bg-zinc-50 min-h-screen flex flex-col w-full dark:bg-black">
      <Header />
      <main className="main-content flex-1 flex items-start justify-center pt-16 w-full">
        {children}
      </main>
    </div>
  );
}
