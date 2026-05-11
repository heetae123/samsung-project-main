'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { SolutionVisual } from '@/components/solution-visual';
import type { SolutionLandingItem } from '@/lib/system-landings';

type SolutionScrollHeroProps = {
  landing: SolutionLandingItem;
};

export function SolutionScrollHero({ landing }: SolutionScrollHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const firstChapter = landing.chapters[0];
  const secondChapter = landing.chapters[1] ?? landing.chapters[0];
  const textOneOpacity = useTransform(scrollYProgress, [0, 0.28, 0.42], [1, 1, 0]);
  const textOneY = useTransform(scrollYProgress, [0, 0.42], [0, -28]);
  const textTwoOpacity = useTransform(scrollYProgress, [0.36, 0.52, 1], [0, 1, 1]);
  const textTwoY = useTransform(scrollYProgress, [0.36, 0.72], [36, 0]);
  const visualScale = useTransform(scrollYProgress, [0, 0.46, 1], [0.86, 1.04, 1.2]);
  const visualY = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, -36]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.12, 0.92, 1], [0, 1, 1, 0.96]);
  const visualRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -4]);
  const visualRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 0, 3]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.25]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.24, 0.42, 0.22]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="relative h-[230vh] bg-[#09111f]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(37,99,235,0.36),transparent_34%),linear-gradient(180deg,#10203d_0%,#09111f_68%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#09111f] to-transparent" />

        <div className="relative z-10 mx-auto grid h-full max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.42fr_0.58fr] lg:px-8">
          <div className="relative min-h-[360px] max-w-xl">
            <motion.div style={{ opacity: textOneOpacity, y: textOneY }} className="absolute inset-x-0 top-0">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
                {firstChapter.eyebrow}
              </p>
              <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.05em] text-white sm:text-5xl">
                {firstChapter.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">{firstChapter.description}</p>
            </motion.div>

            <motion.div style={{ opacity: textTwoOpacity, y: textTwoY }} className="absolute inset-x-0 top-0">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
                {secondChapter.eyebrow}
              </p>
              <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.05em] text-white sm:text-5xl">
                {secondChapter.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">{secondChapter.description}</p>
            </motion.div>

            <div className="absolute bottom-0 flex flex-wrap gap-3">
              <Link
                href={landing.children[0]?.href ?? '/products'}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-500"
              >
                상세 제품 보기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50"
              >
                도입 상담 요청
              </Link>
            </div>
          </div>

          <div className="relative h-[58vh] min-h-[420px] lg:h-[86vh] lg:min-h-[700px] [perspective:1800px]">
            <motion.div
              style={{
                opacity: glowOpacity,
                scale: glowScale,
              }}
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.48),transparent_62%)] blur-3xl"
            />
            <motion.div
              style={{
                opacity: visualOpacity,
                scale: visualScale,
                y: visualY,
                rotateX: visualRotateX,
                rotateY: visualRotateY,
              }}
              className="absolute inset-0 flex items-center justify-center will-change-transform [transform-style:preserve-3d]"
            >
              <SolutionVisual
                kind={landing.visualKind}
                image={landing.primaryImage}
                imageAlt={landing.primaryImageAlt}
                secondaryImage={landing.secondaryImage}
                secondaryImageAlt={landing.secondaryImageAlt}
              />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 h-1 w-[min(420px,calc(100vw-48px))] -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
          <motion.div style={{ width: progressWidth }} className="h-full rounded-full bg-blue-400" />
        </div>
      </div>
    </section>
  );
}
