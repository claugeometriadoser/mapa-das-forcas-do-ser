"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StepHeader } from "@/components/StepHeader";
import { WHATSAPP_NUMBER } from "@/config";
import { calculateMap } from "@/utils/jiugong";

export default function Page() {
  const [step, setStep] = React.useState("start");
  const [birthDateRaw, setBirthDateRaw] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [map, setMap] = React.useState<any>(null);

  const handleCalculate = () => {
    const date = new Date(birthDateRaw + "T00:00:00");
    const result = calculateMap(date, sex);
    setMap(result);
    setStep("result");
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        {step === "start" && (
          <Card>
            <div className="space-y-6 text-center">
              <StepHeader title="Mapa das Forças do SER" subtitle="Descubra sua Energia Pessoal (Qi) através da Geometria do SER." />
              <Button onClick={() => setStep("form")}>Começar</Button>
            </div>
          </Card>
        )}

        {step === "form" && (
          <Card>
            <div className="space-y-6">
              <StepHeader title="Seus dados" subtitle="A leitura precisa da sua data e sexo biológico." />
              <div className="space-y-4">
                <input type="date" value={birthDateRaw} onChange={(e) => setBirthDateRaw(e.target.value)} className="w-full rounded-xl border p-3" />
                <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full rounded-xl border p-3">
                  <option value="">Sexo...</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                </select>
              </div>
              <Button onClick={handleCalculate} disabled={!birthDateRaw || !sex}>Ver Meu Mapa</Button>
            </div>
          </Card>
        )}

        {step === "result" && map && (
          <Card>
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Sua Energia Pessoal (Qi)</span>
                <h1 className="text-6xl font-black text-zinc-900">{map.personal.number}</h1>
                <h2 className="text-xl font-semibold text-zinc-800">{map.personal.name}</h2>
              </div>

              <div className="grid grid-cols-2 gap-3 border-y border-zinc-100 py-4">
                <div className="text-center">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Essência</span>
                  <div className="text-lg font-bold text-zinc-800">{map.essential.number}</div>
                </div>
                <div className="text-center">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Expressão</span>
                  <div className="text-lg font-bold text-zinc-800">{map.expression.number}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">O que te move</h3>
                  <p className="text-sm text-zinc-600">{map.personal.essence}</p>
                </div>
                <div className="rounded-lg bg-zinc-50 p-3">
                  <h3 className="text-sm font-bold text-zinc-900">Seu desafio (Sombra)</h3>
                  <p className="text-sm text-zinc-600">{map.personal.shadow}</p>
                </div>
              </div>

              <Button onClick={() => setStep("cta")}>Transformar em Direção</Button>
            </div>
          </Card>
        )}

        {step === "cta" && (
          <Card>
            <div className="space-y-6">
              <StepHeader title="Próximo Passo" subtitle="Entender esses números é o início da sua transição consciente." />
              <Button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Oi Claudia, meu Qi é ${map.personal.number}. Quero agendar minha conversa.`, "_blank")}>
                Falar com Claudia no WhatsApp
              </Button>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
