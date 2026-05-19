import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";
import researchLinks from "@/data/research.json";
import type { ResearchLink } from "@/types";

function ResearchCard({ item }: { item: ResearchLink }) {
  return (
    <div className="flex flex-col h-full group items-center p-6">
      <Link
        href={item.href}
        className="mt-5 justify-center items-center flex flex-col transition-all hover:-translate-y-1 hover:scale-105"
      >
        <p className={`fas fa-7x ${item.icon} text-green-700/75 mb-6`} />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {item.title}
        </h3>
      </Link>
    </div>
  );
}

export default function Research() {
  return (
    <Section id="research">
      <SectionHeader title="学术经纬" />
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6 w-[80%] flex-1">
          {(researchLinks as ResearchLink[]).map((item) => (
            <ResearchCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
