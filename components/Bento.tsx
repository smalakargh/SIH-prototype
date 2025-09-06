'use client';

import { motion, Variants } from 'framer-motion';
import { TbRoute, TbMapPin, TbClock, TbBus, TbBolt, TbHeart } from 'react-icons/tb';
import { ReactNode } from 'react';

type BentoItem = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  // spans for desktop (4x4 grid)
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
  // spans for mobile (2x2 grid)
  colSpanSm?: 1 | 2;
  rowSpanSm?: 1 | 2;
  accent?: string; // e.g., 'from-[#36E0A3]'
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 220, damping: 20 },
  },
};

/**
 * Layout goal:
 * - Desktop: 4x4 square grid (aspect-square), mixed spans that perfectly fill the square.
 *   We use grid-auto-flow-dense so the items pack tightly.
 * - Mobile: 2x2 square grid with simplified spans to keep readability.
 */
const items: BentoItem[] = [
  {
    id: 'routes',
    title: 'Live Routes',
    description: 'Real-time paths with ETA confidence.',
    icon: <TbRoute className="text-xl sm:text-2xl" />,
    colSpan: 2,
    rowSpan: 2, // Big card (2x2)
    colSpanSm: 2,
    rowSpanSm: 1,
    accent: 'from-[#36E0A3]',
  },
  {
    id: 'stops',
    title: 'Nearby Stops',
    description: 'Pinned stops with walk times.',
    icon: <TbMapPin className="text-xl sm:text-2xl" />,
    colSpan: 2,
    rowSpan: 1, // Wide (2x1)
    colSpanSm: 2,
    rowSpanSm: 1,
    accent: 'from-[#12C2E9]',
  },
  {
    id: 'eta',
    title: 'Accurate ETAs',
    description: 'Adaptive predictions that learn.',
    icon: <TbClock className="text-xl sm:text-2xl" />,
    colSpan: 1,
    rowSpan: 1, // Small (1x1)
    colSpanSm: 1,
    rowSpanSm: 1,
    accent: 'from-[#F6D365]',
  },
  {
    id: 'fleet',
    title: 'Fleet Health',
    description: 'Utilization and delays at a glance.',
    icon: <TbBus className="text-xl sm:text-2xl" />,
    colSpan: 1,
    rowSpan: 1, // Small
    colSpanSm: 1,
    rowSpanSm: 1,
    accent: 'from-[#F093FB]',
  },
  {
    id: 'speed',
    title: 'Fast & Light',
    description: 'Optimized for small-city networks.',
    icon: <TbBolt className="text-xl sm:text-2xl" />,
    colSpan: 1,
    rowSpan: 1, // Tall (1x2)
    colSpanSm: 2,
    rowSpanSm: 1,
    accent: 'from-[#84FAB0]',
  },
  {
    id: 'community',
    title: 'Made for People',
    description: 'Feedback loops, joyful UX.',
    icon: <TbHeart className="text-xl sm:text-2xl" />,
    colSpan: 1,
    rowSpan: 1, // Small
    colSpanSm: 1,
    rowSpanSm: 1,
    accent: 'from-[#FF9A9E]',
  },
  {
    id: 'cta',
    title: 'NavigateMe',
    description: 'Live routes. Local clarity.',
    icon: <TbBolt className="text-xl sm:text-2xl rotate-12" />,
    colSpan: 1,
    rowSpan: 1, // Small
    colSpanSm: 1,
    rowSpanSm: 1,
    accent: 'from-[#12E0D4]',
  },
];

function spanClass(col: number, row: number): string {
  const colMap: Record<number, string> = { 1: 'col-span-1', 2: 'col-span-2' };
  const rowMap: Record<number, string> = { 1: 'row-span-1', 2: 'row-span-2' };
  return `${colMap[col]} ${rowMap[row]}`;
}

export default function BentoSquare(): React.ReactElement {
  return (
    <section className="relative w-full flex items-center justify-center px-3 sm:px-4 py-10 sm:py-16">
      {/* Brand background */}
      <div className="absolute inset-0" style={{ backgroundColor: '#000' }} />
      {/* Subtle radial highlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.10),transparent_45%)]" />
      {/* Soft grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[length:22px_22px]" />

      {/* Square container */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl aspect-[4/5] sm:aspect-[5/4] h-[130vh] sm:h-[100vh]"
      >
        {/* Desktop 4x4 grid; Mobile 2 cols with auto rows */}
        <div className="grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-4 gap-2.5 sm:gap-4 grid-flow-dense h-full w-full auto-rows-[minmax(90px,1fr)] sm:auto-rows-auto">
          {items.map((item, idx) => (
            <motion.article
              key={item.id}
              variants={card}
              whileHover={{ y: -6, scale: 1.01, boxShadow: '0 16px 40px rgba(0,0,0,0.35)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={[
                // Mobile spans
                item.colSpanSm && item.rowSpanSm
                  ? `sm:${spanClass(item.colSpan, item.rowSpan)} ${spanClass(item.colSpanSm, item.rowSpanSm)}`
                  : `${spanClass(1, 1)} sm:${spanClass(item.colSpan, item.rowSpan)}`,
                'group relative overflow-hidden rounded-xl sm:rounded-2xl ring-1 ring-white/10 hover:ring-white/20',
                'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl text-white',
                'p-3.5 sm:p-5 md:p-6',
                'flex flex-col shadow-[0_0_0_1px_rgba(255,255,255,0.04)]'
              ].join(' ')}
            >
              {/* Accent glow */}
              <div
                className={`pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-2xl bg-gradient-to-br ${item.accent ?? 'from-[#36E0A3]'} to-transparent`}
              />

              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="grid place-items-center h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-white/10 ring-1 ring-inset ring-white/10">
                  {item.icon}
                </div>
                <h3 className="font-poppins text-[13px] sm:text-base md:text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
              </div>

              <p className="mt-1.5 sm:mt-2 text-[11.5px] sm:text-sm text-white/80 leading-relaxed line-clamp-3">
                {item.description}
              </p>

              {/* Live Routes preview image */}
              {item.id === 'routes' && (
                <div className="mt-2.5 sm:mt-4 relative aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                  <img
                    src="/Map-HeroSection.png"
                    alt="Live routes preview"
                    className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              )}

              {/* CTA special layout */}
              {item.id === 'cta' ? (
                <div className="mt-auto flex flex-wrap items-center gap-2 sm:gap-3">
                </div>
              ) : (
                // Bottom band: subtle progress shimmer
                <motion.span aria-hidden className="mt-auto h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.span
                    className="block h-full w-1/3 rounded-full bg-gradient-to-r from-white/60 to-white/0"
                    initial={{ x: '-120%' }}
                    whileHover={{ x: '120%' }}
                    transition={{ repeat: Infinity, repeatType: 'loop', duration: 1.4, ease: 'easeInOut' }}
                  />
                </motion.span>
              )}

              {/* Floating micro-dot */}
              <motion.div
                className="absolute bottom-3 right-3 text-white/40"
                initial={{ y: 0 }}
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.1 }}
              >
                •
              </motion.div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
