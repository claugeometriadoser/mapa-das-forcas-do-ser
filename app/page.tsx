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

  const openWhatsApp = (type: "direcao" | "agendar") => {
    const msg = type === "direcao" 
      ? `Oi, Claudia. Vi meu Mapa das Forças. Minha Energia Pessoal é ${map.personal.name}. Quero transformar isso em direção.`
      : `Oi, Claudia. Quero agendar a conversa gratuita de 20 min. Minha Energia Pessoal é ${map.personal.name}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        {step === "start" && (
          <Card>
            <div className="space-y-6 text-center">
              <StepHeader title="Mapa das Forças do SER" subtitle="Descubra sua Energia Pessoal (Qi) e entenda o que te move." />
              <Button onClick={() => setStep("form")}>Começar Leitura</Button>
            </div>
          </Card>
        )}

        {step === "form" && (
          <Card>
            <div className="space-y-6">
              <StepHeader title="Seus dados" subtitle="A data e o sexo definem a geometria da sua energia." />
              <div className="space-y-4">
                <input type="date" value={birthDateRaw} onChange={(e) => setBirthDateRaw(e.target.value)} className="w-full rounded-xl border p-3" />
                <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full rounded-xl border p-3">
                  <option value="">Sexo...</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                </select>
              </div>
              <Button onClick={handleCalculate} disabled={!birthDateRaw || !sex}>Ver Meu Qi</Button>
            </div>
          </Card>
        )}

        {step === "result" && map && (
          <Card>
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Sua Energia Pessoal (Qi)</span>
                <h1 className="text-5xl font-black text-zinc-900">{map.personal.number}</h1>
                <h2 className="text-xl font-semibold text-zinc-800">{map.personal.name}</h2>
              </div>

              <div className="space-y-4 border-t border-zinc-100 pt-4">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Como a vida te move (Essência)</h3>
                  <p className="text-sm text-zinc-600">{map.personal.essence}</p>
                </div>
                <div className="rounded-lg bg-zinc-50 p-3">
                  <h3 className="text-sm font-bold text-zinc-900">Onde você trava (Sombra)</h3>
                  <p className="text-sm text-zinc-600">{map.personal.shadow}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border p-3 text-center">
                  <span className="text-[10px] uppercase text-zinc-400">Força Essencial</span>
                  <div className="font-bold">{map.essential.number}</div>
                </div>
                <div className="rounded-xl border p-3 text-center">
                  <span className="text-[10px] uppercase text-zinc-400">Força de Expressão</span>
                  <div className="font-bold">{map.expression.number}</div>
                </div>
              </div>

              <Button onClick={() => setStep("cta")}>Transformar em Direção</Button>
            </div>
          </Card>
        )}

        {step === "cta" && (
          <Card>
            <div className="space-y-6">
              <StepHeader title="O que fazer com isso?" subtitle="Saber seu número é o início. Entender como ele governa suas decisões é o que traz paz." />
              <div className="space-y-3">
                <Button onClick={() => openWhatsApp("direcao")}>Falar com Claudia no WhatsApp</Button>
                <Button variant="ghost" onClick={() => openWhatsApp("agendar")}>Agendar conversa (20 min)</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
