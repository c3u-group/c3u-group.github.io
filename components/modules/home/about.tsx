"use client";

import React from "react";
import Image from "next/image";

export default function About() {
    const focusAreas = [
        {
            title: "燃烧与碳捕集",
            icon: "fa-fire",
            items: ["富氧/无焰燃烧", "S/N/Hg 一体化脱除", "锅炉低碳改造"],
            color: "from-orange-500 to-red-500",
        },
        {
            title: "吸附材料与机理",
            icon: "fa-flask",
            items: ["固体吸附与钙循环", "相变/离子液体吸收剂", "吸收剂构-效研究"],
            color: "from-blue-500 to-indigo-500",
        },
        {
            title: "CO₂利用一体化",
            icon: "fa-seedling", 
            items: ["加氢制合成气/甲醇", "高温吸附-重整耦合", "交能融合关键技术"],
            color: "from-emerald-500 to-green-500",
        },
    ];

    const leftItems = [
        "燃后CO₂吸收/吸附技术",
        "富氧燃烧碳捕集技术",
        "CO₂加氢制甲醇",
        "燃煤污染物生成及控制",
    ];

    const rightItems = [
        "化学链及光热制氢",
        "CaO/CaCO₃储热",
        "交能融合关键技术",
        "技术经济评价",
    ];

    const roadmap = [
        "水泥与钢铁工艺的富氧碳捕集示范",
        "汽车与交通领域的全流程 CO₂ 捕集利用",
        "CO₂ 捕集协同污染物脱除的小型示范",
        "CCUS 与碳中和一体化平台迭代",
    ];

    const quickFacts = [
        { value: "2 个", label: "国家重点研发计划", icon: "fa-microscope" },
        { value: "20+", label: "国家/省部级项目", icon: "fa-file-signature" },
        { value: "万吨级", label: "固体捕集示范规模", icon: "fa-industry" },
        { value: "6 大", label: "低碳技术方向", icon: "fa-layer-group" },
    ];

    const researchProgress = [
        "富氧/无焰燃烧与一体化污染物脱除，形成氧燃料双分级燃烧与 SCR 优化改造方案。",
        "煤掺氨燃烧稳定性与低 NOx 控制，耦合超细颗粒与喷射策略的无焰燃烧路径。",
        "固体吸附剂粉体到颗粒成型，建设钙循环捕集平台，推进万吨级固体捕集示范。",
        "燃烧后 CO₂ 吸收剂的构-效关系与反应热数据库，相变胺/离子液体体系及再生催化。",
        "CO₂ 加氢制合成气与甲醇的新型催化剂，钙钛矿增强重整与压缩纯化一体化技术。",
        "高温 CO₂ 吸附强化重整制氢、电化学捕集与交能融合的系统评价方法。",
    ];

    return (
        <section
            id="about"
            className="relative scroll-mt-16 overflow-hidden"
        >
            {/* Background Decorations */}
            {/* <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none"> */}
                {/* <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl filter dark:bg-emerald-900/20" />
                <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl filter dark:bg-blue-900/20" />
                <div className="absolute left-1/2 top-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/50 dark:border-white/5" />
                <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/50 dark:border-white/5" /> */}
            {/* </div> */}

            <div className="relative z-10 mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center">
                    {/* <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-emerald-700 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-300">
                        About Us
                    </span> */}
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        团队简介
                    </h2>
                    <div className="mt-4 mx-auto w-24 border-b-4 border-emerald-500 rounded-full"></div>
                    <p className="mx-auto mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                        <span className="inline-block">团队围绕能源的低碳清洁利用开展研究，</span>
                        <span className="inline-block">聚焦“燃烧 + 新能源”的交叉领域，</span>
                        <span className="inline-block">构建从基础研究、材料与装备开发</span>
                        <span className="inline-block">到系统集成的完整技术链。</span>
                        <span className="block h-2" />
                        <span className="inline-block">近年来主持国家重点研发计划、</span>
                        <span className="inline-block">国家自然科学基金等项目 20 余项，</span>
                        <span className="inline-block">形成“燃烧碳捕集-利用-储热-评价”闭环方案。</span>
                    </p>
                </div>

                {/* Quick Facts */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                    {quickFacts.map((item, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-xl dark:bg-slate-900"
                        >
                            {/* <div className="absolute right-0 top-0 -mr-8 -mt-8 h-24 w-24 rounded-full bg-emerald-100/50 transition-all group-hover:scale-150 dark:bg-emerald-500/10" /> */}
                            <div className="relative flex items-center justify-between">
                                <div>
                                    <div className="text-4xl font-extrabold text-slate-900 dark:text-white">
                                        {item.value}
                                    </div>
                                    <div className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                                        {item.label}
                                    </div>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                                    <i className={`fas ${item.icon} text-xl`}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Architecture Diagram (Desktop) */}
                <div className="hidden lg:flex flex-col items-center justify-center py-12 mb-10">
                     <div className="relative flex w-full items-center justify-center">
                        {/* Connecting Lines */}
                         <div className="absolute left-[20%] right-[20%] top-1/2 h-0.5 -translate-y-1/2 bg-slate-200 dark:bg-slate-700"></div>

                         {/* Left Side */}
                        <div className="flex flex-col gap-6 w-1/3 items-end pr-12 relative z-10">
                            {leftItems.map((item, idx) => (
                                <div key={idx} className="group flex items-center gap-4 transition-transform hover:-translate-x-2">
                                     <div className="text-right text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                        {item}
                                     </div>
                                     <div className="h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-black"></div>
                                </div>
                            ))}
                        </div>

                        {/* Center Core */}
                        <div className="relative z-20 flex h-48 w-48 shrink-0 flex-col items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-2xl ring-8 ring-emerald-50 dark:ring-emerald-900/20">
                             <div className="relative z-10 flex flex-col items-center justify-center">
                                <Image src="C3U_ico_white.png" alt="C³U Logo" width={65} height={65} className="mb-2 text-4xl opacity-80" />
                                <div className="text-xl font-bold">燃烧 + 新能源</div>
                             </div>
                        </div>

                         {/* Right Side */}
                        <div className="flex flex-col gap-6 w-1/3 items-start pl-12 relative z-10">
                            {rightItems.map((item, idx) => (
                                <div key={idx} className="group flex items-center gap-4 transition-transform hover:translate-x-2">
                                     <div className="h-3 w-3 rounded-full bg-sky-500 ring-4 ring-white dark:ring-black"></div>
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
                        <i className="fas fa-atom text-3xl mb-3 opacity-90"></i>
                        <h3 className="text-xl font-bold">燃烧 + 新能源技术架构</h3>
                     </div>
                     <div className="grid gap-3 sm:grid-cols-2">
                         {[...leftItems, ...rightItems].map((item, idx) => (
                             <div key={idx} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                                 <i className={`fas fa-check-circle ${idx < 4 ? 'text-emerald-500' : 'text-sky-500'}`}></i>
                                 <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                             </div>
                         ))}
                     </div>
                </div>

                {/* Focus Areas Cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
                    {focusAreas.map((block, index) => (
                        <div
                            key={block.title}
                            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900 border-t-4 border-emerald-500"
                        >
                            <div className="mb-6 flex items-center gap-4">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${block.color} text-white shadow-lg`}>
                                    <i className={`fas ${block.icon} text-lg`}></i>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {block.title}
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {block.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <i className="fas fa-chevron-right mt-1 text-xs text-slate-400 group-hover:text-emerald-500"></i>
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Progress & Future */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Research Progress */}
                    <div className="col-span-1 lg:col-span-2 rounded-3xl bg-slate-50 dark:bg-slate-900/50 h-full p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="mb-6 flex items-center gap-3">
                            <i className="fas fa-microscope text-2xl text-emerald-600 dark:text-emerald-400"></i>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">研发进展速览</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                             {researchProgress.map((text, idx) => (
                                 <div key={idx} className="rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800">
                                     <div className="mb-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">研发进展 {idx+1}</div>
                                     <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300" style={{whiteSpace: 'pre-line'}}>{text}</p>
                                 </div>
                             ))}
                        </div>
                    </div>

                    {/* Future Work */}
                    <div className="rounded-3xl bg-linear-to-br from-white to-emerald-50/50 p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="mb-6 flex items-center gap-3">
                            <i className="fas fa-rocket text-2xl text-emerald-500"></i>
                            <h3 className="text-2xl font-bold">未来工作</h3>
                        </div>
                        <ul className="space-y-6">
                            {roadmap.map((item, idx) => (
                                <li key={idx} className="relative pl-6">
                                    <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                                    <span className="font-base">{item}</span>
                                </li>
                            ))}
                        </ul>
                         <div className="mt-8 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-sm text-slate-600 text-center">
                                持续深化 CCUS 与碳中和平台建设，<br />实现能源清洁利用的终极目标。
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}


{ /*
研发进展一： 富氧燃烧CO2捕集技术
- 富氧燃烧碳捕集技术
- 基础研究-装备及技术研发-系统（工艺）集成
- “氧-燃料”双分级富氧燃烧技术
- 无焰富燃烧技术
- S/N/Hg一体化脱除技术

研发进展二 ： 煤掺氨燃烧研究进展
- 掺氨燃烧：煤电碳减排的重要技术路径
- 技术难点：燃烧稳定性差
- 技术难点：NOx排放浓度高
- 氨煤无焰燃烧
- 超细颗粒与氨煤无焰燃烧相结合
- 预混方式和喷射策略的影响

研发进展三 ： 燃煤锅炉机组低碳清洁改造
- SCR脱硝装置优化设计
- 富氧燃烧器改造设计
- 富氧燃烧锅炉改造

研发进展四： 固体吸附CO2捕集技术
- 吸附剂粉体合成
- 吸附剂颗粒成型
- 反应器能质传递强化
- 建立了钙循环捕集CO2的相关反应平台
- 固体吸附CO2捕集与储热耦合
- 钙基双功能材料的CO2捕集转化一体化
- 高温CO2吸附增强CxHy燃料重整制氢
- 吉利甲醇重卡车载尾气CO2捕集系统
- 燃煤电厂年万吨级固体吸附捕集CO2

研发进展五： 燃烧后CO2吸收技术
- 燃烧后CO2吸收技术原理
- CO2吸收剂的发展历程
- 关键问题1：吸收剂与CO2捕集性能的“构-效”关系
- 关键问题2：吸收剂碳捕集性能评价机制
- 揭示分子构型与反应热的构-效关系
- 建立吸收剂反应热数据库
- 提出基于CO2反应热的吸收剂性能评价新方法
- 开发多胺/叔胺相变CO2吸收剂
- 开发离子液体/混合胺类相变吸收剂
- 开发胺类CO2吸收剂再生催化剂
- 设计电化学法CO2捕集系统

研发进展六： CO2利用与纯化技术
- CO2热催化转化技术的关键问题
- 发明了CO2加氢制合成气的新型催化剂
- 提出煤焦CO2催化气化的新方法
- 提出新型钙钛矿增强甲烷CO2重整制合成气
- CO2压缩纯化的关键问题
- 压缩纯化污染物一体化脱除技术
- 碳捕集协同污染物一体化脱除技术
- 碳捕集利用制甲醇协同污染物一体化系统集成与中试


未来工作
- 氧气高炉低碳冶炼-富氧燃烧新工艺
- 水泥生料煅烧过程中的CO2捕集
- 探索水泥旋窑的富氧燃烧碳捕集
- 汽车行业全流程CO2捕集-利用技术
- 建设CO2捕集协同污染物脱除小型示范
- 深化CCUS与碳中和平台建设


                    */ }
