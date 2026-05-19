export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-10 text-center group">
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-24" />
    </div>
  );
}
