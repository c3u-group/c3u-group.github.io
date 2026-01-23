"use client";
import Link from "next/link";


const researchLinks = [
    {
        href: "/research/funds",
        icon: "fa-flask-vial",
        title: "科研项目",
    },
    {
        href: "/research/journals",
        icon: "fa-book",
        title: "期刊论文",
    },
    {
        href: "/research/conferences",
        icon: "fa-users",
        title: "学术会议",
    },
    {
        href: "/research/patents",
        icon: "fa-file-contract",
        title: "专利获奖",
    },
    {
        href: "/research/competitions",
        icon: "fa-microscope",
        title: "竞赛获奖",
    },
    {
        href: "/research/databases",
        icon: "fa-database",
        title: "数据共享",
    },
];

function researchCollection({item, key}: {item: {href: string; icon: string; title: string}; key?: string}) {
    return (
        <div key={key} className="flex flex-col h-full group cursor-pointer items-center p-6 ">
            <Link href={item.href} className="mt-5 justify-center items-center flex flex-col transition-all hover:-translate-y-1 hover:scale-105">
                <p className={`fas fa-7x ${item.icon} text-green-700/75 mb-6`}></p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            </Link>
        </div>

    );
}

export default function Research() {


        return (
        <section id="research" className="scroll-mt-24 px-4 py-12 flex flex-col">
            <div className="flex flex-col items-center">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        学术经纬
                    </h2>
                    <div className="mt-4 mx-auto max-w-[80%] w-24 border-b-4 border-emerald-500 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6 w-[80%] flex-1">

                    {
                        researchLinks.map((item, idx) =>
                            researchCollection({item: item, key: "item.title_" + idx})
                        )
                    }

                </div>

                
            </div>
        </section>
    );
}