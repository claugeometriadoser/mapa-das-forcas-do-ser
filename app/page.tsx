"use client";

import * as React from "react";
import Link from "next/link";
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

  const goBack = () => {
    if (step === "form") setStep("start");
    else if (step === "result") setStep("form");
    else if (step === "cta") setStep("result");
  };

  const handleCalculate = () => {
    const date = new Date(birthDateRaw + "T00:00:00");
    const result = calculateMap(date, sex);
    setMap(result);
    setStep("result");
  };

  const openWhatsApp = () => {
    if (!map) return;
    const msg = `Oi, Claudia! Fiz meu Mapa das Forças do SER.\n\nEnergia Pessoal (Qi): ${map.personal.number} - ${map.personal.name}\n\nQuero entender como isso vira direção na prática.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        {step === "start" && (
          <Card>
            <div className="space-y-6 text-center">
              <StepHeader title="Mapa das Forças do SER" subtitle="Descubra sua Energia Pessoal (Qi)." />
              <Button onClick={() => setStep("form")}>Começar</Button>
              <div>
                <Link href="/energias">
                  <Button variant="ghost">Conheça as 9 Energias</Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        {step === "form" && (
          <Card>
            <div className="space-y-6">
              <StepHeader title="Seus dados" subtitle="Data e sexo para gerar seu mapa." />
              <div className="space-y-4">
                <input type="date" value={birthDateRaw} onChange={(e) => setBirthDateRaw(e.target.value)} className="w-full rounded-xl border p-3" />
                <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full rounded-xl border p-3">
                  <option value="">Sexo...</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                </select>
              </div>
              <Button onClick={handleCalculate} disabled={!birthDateRaw || !sex}>Ver meu Mapa</Button>
              <Button variant="ghost" onClick={goBack}>Voltar</Button>
            </div>
          </Card>
        )}

        {step === "result" && map && (
          <Card>
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase text-zinc-500">Energia Pessoal (Qi)</span>
                <h1 className="text-5xl font-black text-zinc-900">{map.personal.number}</h1>
                <h2 className="text-xl font-semibold">{map.personal.name}</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="border rounded-xl p-3"><div className="text-[10px] uppercase text-zinc-400">Essência</div><div className="font-bold">{map.essential.number}</div></div>
                <div className="border rounded-xl p-3"><div className="text-[10px] uppercase text-zinc-400">Expressão</div><div className="font-bold">{map.expression.number}</div></div>
              </div>
              <div className="space-y-3">
                <div><h3 className="font-bold text-sm">O que te move</h3><p className="text-sm text-zinc-600">{map.personal.essence}</p></div>
                <div className="bg-zinc-50 rounded-lg p-3"><h3 className="font-bold text-sm">Onde você trava</h3><p className="text-sm text-zinc-600">{map.personal.shadow}</p></div>
              </div>
              <Button onClick={() => setStep("cta")}>Falar com Claudia no WhatsApp</Button>
              <Button variant="ghost" onClick={goBack}>Voltar</Button>
            </div>
          </Card>
        )}

        {step === "cta" && (
          <Card>
            <div className="space-y-6 text-center">
              <StepHeader title="Próximo passo" subtitle="Vamos conversar sobre seu mapa?" />
              <Button onClick={openWhatsApp}>Abrir WhatsApp</Button>
              <Button variant="ghost" onClick={goBack}>Voltar</Button>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
