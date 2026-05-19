import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";
import Image from "next/image";
import links from "@/data/links.json";
import type { LinkItem } from "@/types";

export default function Links() {
  return (
    <Section id="links">
      <SectionHeader title="相关链接" />
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-6">
        {(links as LinkItem[]).map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-105 transition-transform bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-full"
          >
            <div className="relative w-full flex items-center justify-center">
              <Image
                src={`/res/links_img/${link.logo}`}
                alt={link.name}
                height={320}
                width={320}
                className="object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
