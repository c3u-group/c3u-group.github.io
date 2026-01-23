"use client";
import Link from "next/link";
import Image from "next/image";
import links from "@/public/res/links.json"

export default function Links() {
    return (
        <section id="links" className="scroll-mt-24 px-4 py-16 flex flex-col">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        相关链接
                    </h2>
                    <div className="mt-4 mx-auto w-24 border-b-4 border-emerald-500 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3  auto-rows-fr gap-6">

                    {(links as { name: string; url: string; logo: string }[]).map((link) => (
                            <Link
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center space-x-4 hover:scale-105 transition-transform bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-full"
                            >
                                <div className="relative w-full flex items-center justify-center">
                                    <Image
                                        src={`/res/links_img/${link.logo}`}
                                        alt={link.name}
                                        height={320}
                                        width={320}
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                        ))
                    }
                </div>



                {/*
                
                学校

                学院

                煤燃烧

                

                
                
                */}
            </div>
        </section>
    );
}