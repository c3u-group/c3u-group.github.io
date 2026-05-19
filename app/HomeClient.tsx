import General from "@/components/sections/General";
import NewsPreview from "@/components/sections/NewsPreview";
import About from "@/components/sections/About";
import Research from "@/components/sections/Research";
import Members from "@/components/sections/Members";
import Contact from "@/components/sections/Contact";
import Links from "@/components/sections/Links";

export default function HomeClient() {
  return (
    <main className="w-full px-4 lg:px-6 space-y-6 h-full flex flex-col">
      <General />
      <NewsPreview />
      <About />
      <Research />
      <Members />
      <Contact />
      <Links />
    </main>
  );
}
