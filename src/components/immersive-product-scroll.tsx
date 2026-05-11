'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef, useState } from 'react';

export type ImmersiveProductItem = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};

type ImmersiveProductScrollProps = {
  items: ImmersiveProductItem[];
};

type LayerRange = {
  start: number;
  peak: number;
  end: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function buildLayerRange(index: number, total: number): LayerRange {
  const segment = 1 / total;
  const start = segment * index;
  const peak = start + segment * 0.48;
  const end = start + segment;

  return { start, peak, end };
}

function ShowcaseCopyLayer({
  item,
  index,
  total,
  progress,
  active,
}: {
  item: ImmersiveProductItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const range = buildLayerRange(index, total);
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const opacity = useTransform(
    progress,
    isFirst
      ? [0, range.peak, range.end]
      : isLast
        ? [range.start, range.peak, 1]
        : [range.start, range.peak, range.end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 0],
  );
  const y = useTransform(
    progress,
    isFirst
      ? [0, range.end]
      : isLast
        ? [range.start, range.peak]
        : [range.start, range.peak, range.end],
    isFirst ? [0, -30] : isLast ? [30, 0] : [30, 0, -30],
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, y, pointerEvents: active ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      <p className="text-sm font-semibold uppercase text-blue-700">{item.eyebrow}</p>
      <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {item.title}
      </h2>
      <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{item.description}</p>
      <Link
        href={item.href}
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
      >
        자세히 보기
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}

function ShowcaseImageLayer({
  item,
  index,
  total,
  progress,
}: {
  item: ImmersiveProductItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const range = buildLayerRange(index, total);
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const opacity = useTransform(
    progress,
    isFirst
      ? [0, range.peak, range.end]
      : isLast
        ? [range.start, range.peak, 1]
        : [range.start, range.peak, range.end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 0],
  );
  const scale = useTransform(
    progress,
    isFirst
      ? [0, range.peak, range.end]
      : isLast
        ? [range.start, range.peak, 1]
        : [range.start, range.peak, range.end],
    isFirst ? [1, 1.06, 1.13] : isLast ? [0.9, 1.06, 1.12] : [0.9, 1.06, 1.13],
  );
  const y = useTransform(
    progress,
    isFirst
      ? [0, range.end]
      : isLast
        ? [range.start, range.peak, 1]
        : [range.start, range.peak, range.end],
    isFirst ? [0, -28] : isLast ? [56, 0, -12] : [56, 0, -36],
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
        scale,
        y,
        filter: 'drop-shadow(0 44px 70px rgba(15, 23, 42, 0.22))',
        willChange: 'transform, opacity',
      }}
    >
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 920px"
        className="object-contain object-bottom"
      />
    </motion.div>
  );
}

export function ImmersiveProductScroll({ items }: ImmersiveProductScrollProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.min(items.length - 1, Math.floor(clamp(latest, 0, 0.9999) * items.length));
    setActiveIndex(nextIndex);
  });

  return (
    <section ref={sectionRef} className="relative h-[300svh] bg-[#eef5ff]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#eef5ff]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(37,99,235,0.18),transparent_38%)]" />
        <div className="relative mx-auto grid h-full w-full max-w-7xl items-center gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div className="z-10 max-w-xl self-start pt-8 sm:pt-12 lg:self-center lg:pt-0">
            <div className="relative min-h-[360px] sm:min-h-[390px]">
              {items.map((item, index) => (
                <ShowcaseCopyLayer
                  key={item.href}
                  item={item}
                  index={index}
                  total={items.length}
                  progress={scrollYProgress}
                  active={activeIndex === index}
                />
              ))}
            </div>

            <div className="mt-10 flex gap-2">
              {items.map((item, index) => (
                <span
                  key={item.href}
                  className={[
                    'h-1.5 rounded-full transition-all duration-300',
                    index === activeIndex ? 'w-10 bg-blue-700' : 'w-3 bg-slate-300',
                  ].join(' ')}
                />
              ))}
            </div>
          </div>

          <div className="relative h-[56svh] min-h-[310px] w-full self-end lg:h-[78svh] lg:min-h-[560px] lg:self-center">
            {items.map((item, index) => (
              <ShowcaseImageLayer
                key={item.href}
                item={item}
                index={index}
                total={items.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
