"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, MouseEvent } from "react";

export default function SubHeader() {
  return (
    <header
      className="topnav fixed top-0 left-0 w-full z-30 bg-white shadow-md h-16 px-6 flex items-center"
      aria-label="Site header"
    >
    </header>
  );
}