"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, MouseEvent } from "react";

const HEADER_TEXT = "燃烧碳捕集技术课题组";

const NAV_ITEMS = [
  { id: "general", label: "课题组概况" },
  { id: "news", label: "新闻动态" },
  { id: "about", label: "团队简介" },
  { id: "research", label: "学术经纬" },
  { id: "members", label: "团队成员" },
  { id: "contact", label: "联系我们" },
];

const HEADER_OFFSET = 72; // px: approximate header height for offset calculations
const HIGHLIGHT_BUFFER = 48; // px: extra buffer to shift the highlight boundary downward

export default function Header() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const activeIdRef = useRef(activeId);
  const tickingRef = useRef(false);

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const marker = window.scrollY + HEADER_OFFSET + HIGHLIGHT_BUFFER;
        const sections = sectionIds
          .map((id) => document.getElementById(id))
          .filter((node): node is HTMLElement => Boolean(node));

        if (!sections.length) {
          tickingRef.current = false;
          return;
        }

        // Choose the last section whose top is at or above the marker
        let nextId = sections[0].id;
        for (const section of sections) {
          if (marker >= section.offsetTop) {
            nextId = section.id;
          } else {
            break;
          }
        }

        // If user scrolled beyond last section top, stick to last section
        const last = sections[sections.length - 1];
        if (marker >= last.offsetTop) {
          nextId = last.id;
        }

        if (nextId !== activeIdRef.current) {
          activeIdRef.current = nextId;
          setActiveId(nextId);
        }

        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (window.location.pathname !== "/") {
      setIsOpen(false);
      return; // Allow Link to navigate back to home with hash
      
    }

    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <header
      className="topnav fixed top-0 left-0 w-full z-30 bg-white shadow-md h-16 px-6 flex items-center"
      aria-label="Site header"
    >
      <Link href="/" className="mr-6 flex items-center">
        <img src="/C3U_logo.png" alt="C³U Logo" className="h-10 w-auto" />
        {/* <h2 className="text-xl font-semibold text-gray-900" title={HEADER_TEXT}>
          {HEADER_TEXT}
        </h2> */}
      </Link>
      <div className="header-actions absolute right-6 top-0 h-16 flex items-center">
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open menu</span>
          <div className="flex flex-col gap-1">
            <span className={`block h-0.5 w-5 bg-gray-800 transition ${isOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gray-800 transition ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gray-800 transition ${isOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </div>
        </button>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId.startsWith(item.id);
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    onClick={(event) => handleNavClick(event, item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-sm font-medium transition-colors pb-1 ${
                      isActive
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div
        className={`md:hidden absolute left-0 top-16 w-full bg-white shadow-lg border-t border-gray-100 transform origin-top transition-all duration-200 ease-out ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col py-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    onClick={(event) => handleNavClick(event, item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`block px-6 py-3 text-sm font-medium transition-colors ${
                      isActive ? "text-green-600" : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}