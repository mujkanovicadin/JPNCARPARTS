"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/80">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 4%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 4%) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 20% 20%, black, transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute -left-32 top-1/2 size-[36rem] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24 sm:py-28"
      >
        <motion.span
          variants={item}
          className="font-mono text-xs uppercase tracking-widest text-primary"
        >
          日本製 · Genuine &amp; performance parts
        </motion.span>
        <motion.h1
          variants={item}
          className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Japanese automotive parts, delivered internationally.
        </motion.h1>
        <motion.p variants={item} className="max-w-xl text-muted-foreground">
          OEM and performance parts for Japanese vehicles, sourced directly from
          Japan and shipped to enthusiasts, workshops, and collectors worldwide.
        </motion.p>
        <motion.div variants={item}>
          <Link
            href="/parts"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Browse parts
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
