"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import members from "@/public/res/members.json";

type Member = {
	name: string;
	avatar: string;
	research_topic?: string;
	email?: string;
	extern_url?: string;
	title?: string;
	role?: string;
	office?: string;
	introduction?: string[];
	year?: string;
};

export default function Members() {
	const [selectedTeacher, setSelectedTeacher] = useState<Member | null>(null);

	const handleTeacherSelect = (member: Member) => {
		setSelectedTeacher(member);
	};

	const MemberCollection = ({
		members,
		type,
		type_en,
	}: {
		members: Member[];
		type: string;
		type_en: string;
	}) => {
		if (!members || members.length === 0) return null;

		return (
			<div className="w-full mb-4 last:mb-0">
				<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center flex items-center justify-center gap-4">
					<span className="h-0.5 w-8 bg-green-200 dark:bg-green-900"></span>
					{type}
					<span className="h-0.5 w-8 bg-green-200 dark:bg-green-900"></span>
				</h3>
				<div className="relative w-full overflow-hidden group">
					{/* Gradient Masks */}
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
										src={`/res/members_img/${type_en.toLowerCase()}/${member.avatar}`}
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
	};

	const TeacherCollection = ({
		member,
		onSelect,
	}: { member: Member; onSelect: (member: Member) => void }) => {
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

					<span className="text-sm text-gray-500">
						{member.role}
					</span>
					

					<div className="flex flex-col items-center space-y-2.5 m-2 w-full">
						<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
							<svg className="w-4 h-4 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m-4 22h4" /></svg>
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
								<svg className="w-4 h-4 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
								{member.email}
							</div>
						)}
					</div>

					<p className="text-sm text-gray-600 dark:text-gray-400 text-center line-clamp-4 leading-relaxed italic border-t border-gray-100 dark:border-gray-700/50 pt-6">
						{ member.introduction && member.introduction.map((intro, index) => (
							<span key={member.name+"_intro_"+index}>&emsp;&emsp;{intro}<br /></span>
						))}
					</p>
				</div>
			</button>
		);
	};

	return (
		<section id="members" className="scroll-mt-24 px-4 py-16 flex flex-col">
			<div className="relative z-10 mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-10 text-center">
					<h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
						团队成员
					</h2>
					<div className="mt-4 mx-auto w-24 border-b-4 border-emerald-500 rounded-full"></div>
				</div>

				{/* Teachers Section */}
				<div className="w-full mb-24">
					<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-12 text-center flex items-center justify-center gap-4">
						<span className="h-0.5 w-8 bg-green-200 dark:bg-green-900"></span>
						教师队伍
						<span className="h-0.5 w-8 bg-green-200 dark:bg-green-900"></span>
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full mx-auto">
						{members.teacher.map((member) => (
							<TeacherCollection key={member.name} member={member} onSelect={handleTeacherSelect} />
						))}
					</div>
				</div>

				<div className="w-full space-y-16">
					{MemberCollection({
						members: members.doctor,
						type: "博士生",
						type_en: "doctor",
					})}

					{MemberCollection({
						members: members.master,
						type: "硕士生",
						type_en: "master",
					})}

					{MemberCollection({
						members: members.alumni,
						type: "毕业生",
						type_en: "alumni",
					})}
				</div>
			</div>

			<style jsx global>{`
				@keyframes marquee {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}

				@keyframes overlayFade {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				@keyframes cardPop {
					from {
						opacity: 0;
						transform: translateY(12px) scale(0.98);
					}
					to {
						opacity: 1;
						transform: translateY(0) scale(1);
					}
				}

				.animate-marquee {
					animation: marquee linear infinite;
					will-change: transform;
				}

				.overlay-fade {
					animation: overlayFade 200ms ease-out;
				}

				.card-pop {
					animation: cardPop 220ms ease-out;
				}
			`}</style>

			{selectedTeacher && (
				<div
					className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/50 backdrop-blur-sm p-4 overlay-fade overflow-y-auto"
					onClick={() => setSelectedTeacher(null)}
				>
					<div
						className="relative max-w-2xl w-full card-pop"
						onClick={(e) => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-label="Teacher detail"
					>
						<button
							type="button"
							onClick={() => setSelectedTeacher(null)}
							className="absolute -top-3 -right-3 text-sm text-white hover:text-amber-600 fas fa-close focus:outline-none"
						/>
						<Link
							href={selectedTeacher.extern_url ? selectedTeacher.extern_url : "/#members"}
							target="_blank"
							rel="noopener noreferrer"
							className="block focus:outline-none"
						>
							<div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-2xl overflow-y-auto max-h-[90vh] md:max-h-none md:overflow-hidden">
								<div className="grid md:grid-cols-2 gap-0">
									<div className="relative h-full flex flex-col items-center justify-center">
										<div className="h-72 w-60 relative m-8">
											<Image
												src={`/res/members_img/teacher/${selectedTeacher.avatar}`}
												alt={selectedTeacher.name}
												fill
												className="object-cover"
												priority
											/>
										</div>

										<div>
											<h4 className="text-2xl font-bold text-gray-900 dark:text-white m-2">
												{selectedTeacher.name}
												{selectedTeacher.title && (
													<span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
														&emsp;{selectedTeacher.title}
													</span>
												)}
											</h4>
										</div>

										<span className="text-sm text-gray-500">
											{selectedTeacher.role}
										</span>
										<div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 m-2">
											{selectedTeacher.office && (
												<div className="flex items-center gap-2 m-2">
													<svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m-4 22h4" /></svg>
													<span>{selectedTeacher.office}</span>
												</div>
											)}
											{selectedTeacher.email && (
												<div
													className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer gap-2 m-2"
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();
														window.location.href = `mailto:${selectedTeacher.email}`;
													}}
												>
													<svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
													<span>{selectedTeacher.email}</span>
												</div>
											)}
										</div>

									</div>
									<div className="p-8 flex flex-col gap-4 sm:border-l-2 border-gray-100 dark:border-gray-700">
										{selectedTeacher.introduction && (
											<p className="text-sm leading-relaxed text-gray-600">
												{ selectedTeacher.introduction && selectedTeacher.introduction.map((intro, index) => (
													<span key={selectedTeacher.name+"_intro_"+index}>&emsp;&emsp;{intro}<br /></span>
												))}
											</p>
										)}
									</div>
								</div>
							</div>
						</Link>
					</div>
				</div>
			)}
		</section>
	);
}