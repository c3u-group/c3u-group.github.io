export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-4 mx-auto w-24 border-b-4 border-emerald-500 rounded-full" />
    </div>
  );
}
