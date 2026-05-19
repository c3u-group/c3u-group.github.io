import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";
import about from "@/data/about.json";

type FocusArea = { title: string; icon: string; items: string[]; color: string };
type QuickFact = { value: string; label: string; icon: string };

export default function About() {
  const { intro, quickFacts, focusAreas, leftItems, rightItems, researchProgress, roadmap } = about;

  return (
    <Section id="about">
      <SectionHeader title="团队简介" />
      <p className="mx-auto mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300 text-center max-w-4xl">
        {intro}
      </p>

      {/* Quick Facts */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 my-10">
        {(quickFacts as QuickFact[]).map((item, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-xl dark:bg-slate-900"
          >
            <div className="relative flex items-center justify-between">
              <div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white transition-transform duration-300 group-hover:scale-110 origin-left">
                  {item.value}
                </div>
                <div className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.label}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <i className={`fas ${item.icon} text-xl`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Diagram (Desktop) */}
      <div className="hidden lg:flex flex-col items-center justify-center py-12 mb-10">
        <div className="relative flex w-full items-center justify-center">
          <div className="absolute left-[20%] right-[20%] top-1/2 h-0.5 -translate-y-1/2 bg-slate-200 dark:bg-slate-700" />
          <div className="flex flex-col gap-6 w-1/3 items-end pr-12 relative z-10">
            {(leftItems as string[]).map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-4 transition-transform hover:-translate-x-2"
              >
                <div className="text-right text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                  {item}
                </div>
                <div className="h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-black" />
              </div>
            ))}
          </div>

          <div className="relative z-20 flex h-48 w-48 shrink-0 flex-col items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-2xl ring-8 ring-emerald-50 dark:ring-emerald-900/20">
            <Image
              src="/C3U_ico_white.png"
              alt="C³U Logo"
              width={65}
              height={65}
              className="mb-2 opacity-80"
            />
            <div className="text-xl font-bold">燃烧 + 新能源</div>
          </div>

          <div className="flex flex-col gap-6 w-1/3 items-start pl-12 relative z-10">
            {(rightItems as string[]).map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-4 transition-transform hover:translate-x-2"
              >
                <div className="h-3 w-3 rounded-full bg-sky-500 ring-4 ring-white dark:ring-black" />
                <div className="text-left text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Mobile */}
      <div className="lg:hidden mb-16 space-y-4">
        <div className="rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 p-6 text-center text-white shadow-lg">
          <i className="fas fa-atom text-3xl mb-3 opacity-90" />
          <h3 className="text-xl font-bold">燃烧 + 新能源技术架构</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[...leftItems, ...rightItems].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800"
            >
              <i
                className={`fas fa-check-circle ${idx < 4 ? "text-emerald-500" : "text-sky-500"}`}
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Areas Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
        {(focusAreas as FocusArea[]).map((block) => (
          <div
            key={block.title}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900 border-t-4 border-emerald-500"
          >
            <div className="mb-6 flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${block.color} text-white shadow-lg`}
              >
                <i className={`fas ${block.icon} text-lg`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {block.title}
              </h3>
            </div>
            <ul className="space-y-3">
              {block.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <i className="fas fa-chevron-right mt-1 text-xs text-slate-400 group-hover:text-emerald-500" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Progress & Future */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2 rounded-3xl bg-slate-50 dark:bg-slate-900/50 h-full p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="mb-6 flex items-center gap-3">
            <i className="fas fa-microscope text-2xl text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              研发进展速览
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(researchProgress as string[]).map((text, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800"
              >
                <div className="mb-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  研发进展 {idx + 1}
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-linear-to-br from-white to-emerald-50/50 p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="mb-6 flex items-center gap-3">
            <i className="fas fa-rocket text-2xl text-emerald-500" />
            <h3 className="text-2xl font-bold">未来工作</h3>
          </div>
          <ul className="space-y-6">
            {(roadmap as string[]).map((item, idx) => (
              <li key={idx} className="relative pl-6">
                <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-base">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-slate-600 text-center">
              持续深化 CCUS 与碳中和平台建设，实现能源清洁利用的终极目标。
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
