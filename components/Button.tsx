"use client";

import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base =
    "w-full rounded-xl px-4 py-3 text-sm font-medium transition border";
  const primary =
    "bg-black text-white border-black hover:bg-zinc-800";
  const ghost =
    "bg-transparent text-black border-zinc-300 hover:bg-zinc-50";

  const styles = variant === "ghost" ? ghost : primary;

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
