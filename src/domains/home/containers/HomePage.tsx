'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiVelog } from 'react-icons/si';
import FeatureCard from '../components/FeatureCard';

const features = [
  {
    image: '/images/landing3.svg',
    title: '대시보드 설정',
    description: '대시보드 사진과 이름을 변경할 수 있어요.',
  },
  {
    image: '/images/landing4.svg',
    title: '초대',
    description: '팀원을 초대하여 함께 관리해요.',
  },
  {
    image: '/images/landing5.svg',
    title: '구성원',
    description: '구성원을 관리할 수 있어요.',
  },
];

export default function HomePage() {
  return (
    <div className=" min-h-screen bg-black">
      <div className="mx-auto w-full max-w-7xl px-6">
        <header className="flex items-center justify-between py-4">
          <span className="font-bold text-2xl text-white">Taskify</span>

          <div className="flex gap-6">
            <Link href="/auth/login" className="hover:opacity-50 text-white">
              로그인
            </Link>
            <Link href="/auth/signup" className="hover:opacity-50 text-white">
              회원가입
            </Link>
          </div>
        </header>

        <main className="flex flex-col gap-10">
          <section className="mx-auto max-w-7xl py-10 flex flex-col items-center gap-8">
            <Image src="/images/taskifymain.svg" alt="main" width={700} height={420} />
            <span className="text-6xl text-white font-bold">
              새로운 일정 관리 <span className="text-[#5534DA]">Taskify</span>
            </span>
            <Link
              href="/auth/login"
              className="inline-flex h-13.5 w-70 my-15 items-center justify-center rounded-lg bg-[#5534DA] text-white hover:opacity-85"
            >
              로그인하기
            </Link>
          </section>

          <section>
            <div className="flex flex-col justify-between overflow-hidden lg:flex-row rounded-2xl bg-[#171717]">
              <div className="flex flex-col px-8 py-8 text-white md:px-14 md:py-14">
                <p className="text-gray-400">Point 1</p>
                <h2 className="text-4xl font-bold mt-20 leading-tight">
                  일의 우선순위를
                  <br />
                  관리하세요
                </h2>
              </div>

              <Image
                src="/images/landing1.svg"
                alt="landing1"
                width={454}
                height={200}
                className="mt-12 self-center lg:mt-15 lg:self-end"
              />
            </div>
          </section>

          <section className="mt-10">
            <div className="flex flex-col-reverse overflow-hidden lg:flex-row lg:justify-around rounded-2xl bg-[#171717]">
              <Image
                src="/images/landing2.svg"
                alt="landing2"
                width={336}
                height={200}
                className="mt-12 self-center lg:mt-15 lg:self-end"
              />

              <div className="flex flex-col px-14 py-14 gap-10 text-white md:px-14 md:py-14">
                <p className="text-gray-400">Point 2</p>
                <h2 className="text-4xl font-bold mt-20 leading-tight">
                  해야 할 일을
                  <br />
                  등록하세요
                </h2>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <span className="text-white inline-block mb-6 font-bold text-[28px]">
              생산성을 높이는 다양한 설정 ⚡{' '}
            </span>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  image={feature.image}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </section>
        </main>

        <footer className="mx-auto flex flex-col w-full max-w-7xl items-center gap-5 py-10 text-[#9FA6B2] md:flex-row md:justify-between ">
          <p>@ucastle - 2026</p>

          <div className="flex gap-6">
            <p>Privacy Policy</p>
            <p>FAQ</p>
          </div>

          <div className="flex gap-4 text-[#FFFFFF]">
            <a
              href="https://github.com/Ucastle98"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://velog.io/@ucastle_/posts"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Velog"
            >
              <SiVelog size={20} />
            </a>

            <a href="mailto:skaska007@naver.com" aria-label="Email">
              <MdEmail size={20} />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
