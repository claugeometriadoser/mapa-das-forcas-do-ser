"use client";

import { Card } from "@/components/Card";
import { StepHeader } from "@/components/StepHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <Card>
          <div className="space-y-6 text-center">
            <StepHeader
              title="Geometria do SER"
              subtitle="Site em transição."
            />
          </div>
        </Card>
      </div>
    </main>
  );
}
