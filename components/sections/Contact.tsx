import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";
import Image from "next/image";

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeader title="联系我们" />
      <Link
        href="https://open.weixin.qq.com/qr/code?username=gh_4586a77d26e2"
        target="_blank"
        className="grid grid-cols-1 gap-10"
      >
        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm p-10 m-auto flex flex-col items-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <Image
            src="/C3U_logo.png"
            alt="清洁燃烧与碳循环利用团队"
            width={200}
            height={200}
            className="mx-auto mb-2"
          />
          <Image
            src="/res/wxgzh.png"
            alt="微信公众号"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
      </Link>
    </Section>
  );
}
