"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import General from "@/components/modules/home/general";
import News from "@/components/modules/home/news";
import About from "@/components/modules/home/about";
import Research from "@/components/modules/home/research";
import Members from "@/components/modules/home/members";
import Contact from "@/components/modules/home/contact";
import Links from "@/components/modules/home/links";

const SECTION_IDS = ["general", "news", "about", "research", "members", "contact", "links"];
const HEADER_HEIGHT = 72;

export default function HomeClient() {

  return (
      <main className="w-full px-4 lg:px-6 space-y-6 h-full flex flex-col">
        <div>
          <General />
          <News />
          <About />
          <Research />
          <Members />
          <Contact />
          <Links />
        </div>
      </main>
  );
}
