"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { StepHeader } from "@/components/StepHeader";

export default function Energias() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        <Card>
          <div className="space-y-6 text-center">
            <StepHeader
              title="As 9 Energias"
              subtitle="Uma visão geral das forças que se manifestam nos ciclos da vida segundo o I-Ching."
            />

            <p className="text-sm text-zinc-600">
              Cada energia representa um padrão recorrente de experiência.
              Ao reconhecê-los, você amplia sua leitura de contexto e suas
              possibilidades de escolha.
            </p>

            {/* aqui depois você pode listar as 9 energias, cards, etc */}

            <div className="pt-4">
              <Link href="/energiaexterna">
                <Button variant="ghost">
                  Voltar para Energia Externa
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
