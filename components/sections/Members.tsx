"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import TeacherCard from "@/components/cards/TeacherCard";
import TeacherDetail from "@/components/cards/TeacherDetail";
import MemberMarquee from "@/components/cards/MemberMarquee";
import members from "@/data/members.json";
import type { Member, MembersData } from "@/types";

export default function Members() {
  const [selectedTeacher, setSelectedTeacher] = useState<Member | null>(null);
  const { teacher, doctor, master, alumni } = members as MembersData;

  return (
    <Section id="members">
      <SectionHeader title="团队成员" />

      {/* Teachers */}
      <div className="w-full mb-24">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-12 text-center flex items-center justify-center gap-4">
          <span className="h-0.5 w-8 bg-green-200 dark:bg-green-900" />
          教师队伍
          <span className="h-0.5 w-8 bg-green-200 dark:bg-green-900" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full mx-auto">
          {teacher.map((m) => (
            <TeacherCard key={m.name} member={m} onSelect={setSelectedTeacher} />
          ))}
        </div>
      </div>

      {/* Students */}
      <div className="w-full space-y-16">
        <MemberMarquee members={doctor} type="博士生" typeEn="doctor" />
        <MemberMarquee members={master} type="硕士生" typeEn="master" />
        <MemberMarquee members={alumni} type="毕业生" typeEn="alumni" />
      </div>

      {selectedTeacher && (
        <TeacherDetail member={selectedTeacher} onClose={() => setSelectedTeacher(null)} />
      )}
    </Section>
  );
}
