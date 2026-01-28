"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StepHeader } from "@/components/StepHeader";
import { WHATSAPP_NUMBER } from "@/config";
import { calculatePersonalEnergy } from "@/utils/jiugong";

export default function Page() {
  const [step, setStep] = React.useState("start");
  const [birthDateRaw, setBirthDateRaw] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [personalEnergy, setPersonalEnergy] = React.useState<any>(null);

  const handleCalculate = () => {
    const date = new Date(birthDateRaw + "T00:00:00");
    const energy = calculatePersonalEnergy(date, sex);
    setPersonalEnergy(energy);
    setStep("result");
  };

  const openWhatsApp = (type: "direcao" | "agendar") => {
    const msg = type === "direcao" 
      ? `Oi, Claudia. Descobri minha Energia Pessoal: ${personalEnergy.name}. Quero entender como isso se traduz em direção.`
      : `Oi, Claudia. Quero agendar a conversa gratuita de 20 min. Minha Energia Pessoal é ${personalEnergy.name}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        {step === "start" && (
          <Card>
            <div className="space-y-6 text-center">
              <StepHeader 
                title="Mapa das Forças do SER" 
                subtitle="Descubra sua Energia Pessoal (Qi) — a força que move você e onde você trava." 
              />
              <Button onClick={() => setStep("form")}>Descobrir meu Qi</Button>
            </div>
          </Card>
        )}

        {step === "form" && (
          <Card>
            <div className="space-y-6">
              <StepHeader 
                title="Sua data e seu sexo" 
                subtitle="Essas duas informações revelam sua geometria energética." 
              />
              <div className="space-y-4">
                <input 
                  type="date" 
                  value={birthDateRaw} 
                  onChange={(e) => setBirthDateRaw(e.target.value)} 
                  className="w-full rounded-xl border border-zinc-300 p-3 text-sm" 
                />
                <select 
                  value={sex} 
                  onChange={(e) => setSex(e.target.value)} 
                  className="w-full rounded-xl border border-zinc-300 p-3 text-sm"
                >
                  <option value="">Selecione seu sexo...</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <Button onClick={handleCalculate} disabled={!birthDateRaw || !sex}>
                Calcular minha Energia Pessoal
              </Button>
            </div>
          </Card>
        )}

        {step === "result" && personalEnergy && (
          <Card>
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Sua Energia Pessoal (Qi)
                </span>
                <div className="text-5xl font-black text-zinc-900">
                  {personalEnergy.number}
                </div>
                <h1 className="text-2xl font-bold text-zinc-800">
                  {personalEnergy.name}
                </h1>
                <div className="text-sm text-zinc-600">
                  Elemento: {personalEnergy.element}
                </div>
              </div>

              <div className="space-y-4 border-t border-zinc-100 pt-4">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Como a vida te move
                  </h3>
                  <p className="text-sm text-zinc-700 leading-relaxed">
                    {personalEnergy.essence}
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-50 p-4">
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Onde você trava (Desafio)
                  </h3>
                  <p className="text-sm text-zinc-700 leading-relaxed">
                    {personalEnergy.shadow}
                  </p>
                </div>
              </div>

              <Button onClick={() => setStep("cta")}>
                Transformar essa leitura em direção
              </Button>
            </div>
          </Card>
        )}

        {step === "cta" && (
          <Card>
            <div className="space-y-6">
              <StepHeader 
                title="O que fazer com essa informação?" 
                subtitle="Saber seu número é o início. Entender como ele governa suas decisões é o que traz paz e direção." 
              />
              <div className="space-y-3">
                <Button onClick={() => openWhatsApp("direcao")}>
                  Falar com Claudia no WhatsApp
                </Button>
                <Button variant="ghost" onClick={() => openWhatsApp("agendar")}>
                  Agendar conversa gratuita (20 min)
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
