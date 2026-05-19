"use client";

import Image from "next/image";
import type { Member } from "@/types";

export default function TeacherCard({
  member,
  onSelect,
}: {
  member: Member;
  onSelect: (member: Member) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(member)}
      className="group w-full text-left focus:outline-none"
    >
      <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm p-8 transition-all duration-500 h-full flex flex-col items-center hover:shadow-lg">
        <div className="mb-6 relative">
          <div
            className="relative rounded-2xl overflow-hidden dark:ring-gray-700 transition-all duration-500"
            style={{ width: "160px", height: "190px" }}
          >
            <Image
              src={`/res/members_img/teacher/${member.avatar}`}
              alt={member.name}
              fill
              className="object-cover object-center transition-transform duration-700"
            />
          </div>
        </div>
        <h4 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-1">
          {member.name}
          {member.title && (
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              &ensp;{member.title}
            </span>
          )}
        </h4>
        <span className="text-sm text-gray-500">{member.role}</span>

        <div className="flex flex-col items-center space-y-2.5 m-2 w-full">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m-4 22h4" />
            </svg>
            {member.office}
          </div>
          {member.email && (
            <div
              className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `mailto:${member.email}`;
              }}
            >
              <svg className="w-4 h-4 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {member.email}
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center line-clamp-4 leading-relaxed italic border-t border-gray-100 dark:border-gray-700/50 pt-6">
          {member.introduction?.map((intro, idx) => (
            <span key={idx}>&emsp;&emsp;{intro}<br /></span>
          ))}
        </p>
      </div>
    </button>
  );
}
