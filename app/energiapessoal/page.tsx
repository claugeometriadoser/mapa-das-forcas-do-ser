"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StepHeader } from "@/components/StepHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        <Card>
          <div className="space-y-6 text-center">
            <StepHeader
              title="Geometria do SER"
              subtitle="Escolha a experiência que você quer acessar."
            />

            <div className="space-y-3">
              <Link href="/energiapessoal">
                <Button>Energia Pessoal (Qi)</Button>
              </Link>

              <Link href="/mapacompleto">
                <Button variant="ghost">Mapa completo (3 forças)</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
