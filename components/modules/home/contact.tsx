"use client";
import Link from "next/link";
import Image from "next/image";

export default function Contact() {
    return (
        <section
            id="contact"
            className="relative scroll-mt-16 overflow-hidden"
        >
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        联系我们
                    </h2>
                    <div className="mt-4 mx-auto w-24 border-b-4 border-emerald-500 rounded-full"></div>
                </div>
            <Link href="https://open.weixin.qq.com/qr/code?username=gh_4586a77d26e2" target="_blank" className="grid grid-cols-1 gap-10 ">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm p-8 m-auto flex flex-col items-center">
                    <Image src="/C3U_logo.png" alt="清洁燃烧、碳捕集与利用课题组" width={200} height={200} className="mx-auto mb-2"/>
                    <Image src="/res/wxgzh.png" alt="微信公众号" width={200} height={200} className="mx-auto"/>
                </div>
            </Link>
            </div>
        </section>
    );
}