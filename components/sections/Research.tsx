import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";
import researchLinks from "@/data/research.json";
import type { ResearchLink } from "@/types";

function ResearchCard({ item }: { item: ResearchLink }) {
  return (
    <Link
      href={item.href}
      className="flex flex-col items-center p-8 rounded-2xl bg-white dark:bg-gray-800/60 shadow-sm border border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-100 dark:hover:border-emerald-900/30 group"
    >
      <span className={`fas fa-5x ${item.icon} text-emerald-600/70 mb-5 transition-transform duration-300 group-hover:scale-110`} />
      <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">
        {item.title}
      </h3>
    </Link>
  );
}

export default function Research() {
  return (
    <Section id="research">
      <SectionHeader title="学术经纬" />
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-4xl">
          {(researchLinks as ResearchLink[]).map((item) => (
            <ResearchCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
