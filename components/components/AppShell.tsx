"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
	const [currentsection, setCurrentSection] = useState<string>("general");


	useEffect(() => {
		console.log("Current Section:", currentsection);
	}, [currentsection]);

	return (
		<div className={`app-shell bg-zinc-50 min-h-screen flex flex-col w-full dark:bg-black`}>
            <Header />
			<main className="main-content flex-1 flex items-center justify-center pt-16 w-full">{children}</main>
        </div>
	);
}
