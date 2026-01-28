import * as React from "react";

export function StepHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {subtitle ? (
        <p className="text-zinc-600 leading-relaxed">{subtitle}</p>
      ) : null}
    </div>
  );
}
