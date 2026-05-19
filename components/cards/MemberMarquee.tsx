import Image from "next/image";
import type { Member } from "@/types";

export default function MemberMarquee({
  members,
  type,
  typeEn,
}: {
  members: Member[];
  type: string;
  typeEn: string;
}) {
  if (!members || members.length === 0) return null;

  return (
    <div className="w-full mb-4 last:mb-0">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center flex items-center justify-center gap-4">
        <span className="h-0.5 w-8 bg-green-200 dark:bg-green-900" />
        {type}
        <span className="h-0.5 w-8 bg-green-200 dark:bg-green-900" />
      </h3>
      <div className="relative w-full overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-30" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-30" />

        <div
          className="flex gap-8 w-max py-4 animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration: `${members.length * 5}s` }}
        >
          {[...members, ...members].map((member, idx) => (
            <div
              key={`${member.name}-${idx}`}
              className="flex flex-col items-center w-40 group/item"
            >
              <div
                className="relative rounded-xl overflow-hidden mb-3 transition-all duration-500 bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700"
                style={{ width: "110px", height: "135px" }}
              >
                <Image
                  src={`/res/members_img/${typeEn.toLowerCase()}/${member.avatar}`}
                  alt={member.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover/item:scale-110"
                />
              </div>
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 text-center group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors">
                {member.name}
              </h4>
              {member.year && (
                <p className="text-[11px] leading-tight text-gray-500 dark:text-gray-400 text-center mt-1 px-2 line-clamp-2">
                  {member.year}
                </p>
              )}
              {member.research_topic && (
                <p className="text-[11px] leading-tight text-gray-500 dark:text-gray-400 text-center mt-1 px-2 line-clamp-2 italic">
                  {member.research_topic}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
