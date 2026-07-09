"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-triggered reveal for below-the-fold sections. Kept out of the hero on
 * purpose (that uses CSS animation for a fast LCP). Framer honours
 * prefers-reduced-motion via its built-in reduced-motion handling.
 */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({
  children,
  className,
  stagger = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger ? container : item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
