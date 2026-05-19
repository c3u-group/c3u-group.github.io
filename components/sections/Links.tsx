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
            className="flex items-center justify-center bg-white dark:bg-gray-800/60 p-5 rounded-xl shadow-sm border border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-100 dark:hover:border-gray-700 h-full"
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
