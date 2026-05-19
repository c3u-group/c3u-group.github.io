"use client";

import Image from "next/image";
import Link from "next/link";
import type { Member } from "@/types";

export default function TeacherDetail({
  member,
  onClose,
}: {
  member: Member;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-overlay-fade overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full animate-card-pop"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Teacher detail"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 text-sm text-white hover:text-amber-600 fas fa-close focus:outline-none"
        />
        <Link
          href={member.extern_url ? member.extern_url : "/#members"}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus:outline-none"
        >
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-2xl overflow-y-auto max-h-[90vh] md:max-h-none md:overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-full flex flex-col items-center justify-center">
                <div className="h-72 w-60 relative m-8">
                  <Image
                    src={`/res/members_img/teacher/${member.avatar}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white m-2">
                    {member.name}
                    {member.title && (
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        &emsp;{member.title}
                      </span>
                    )}
                  </h4>
                </div>
                <span className="text-sm text-gray-500">{member.role}</span>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 m-2">
                  {member.office && (
                    <div className="flex items-center gap-2 m-2">
                      <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m-4 22h4" />
                      </svg>
                      <span>{member.office}</span>
                    </div>
                  )}
                  {member.email && (
                    <div
                      className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer gap-2 m-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = `mailto:${member.email}`;
                      }}
                    >
                      <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{member.email}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-8 flex flex-col gap-4 sm:border-l-2 border-gray-100 dark:border-gray-700">
                {member.introduction && (
                  <p className="text-sm leading-relaxed text-gray-600">
                    {member.introduction.map((intro, idx) => (
                      <span key={idx}>&emsp;&emsp;{intro}<br /></span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
