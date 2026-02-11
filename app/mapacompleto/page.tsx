"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StepHeader } from "@/components/StepHeader";
import { WHATSAPP_NUMBER } from "@/config";
import { calculateMap } from "@/utils/jiugong";

type Step = "form" | "result";

function formatDateBR(value: string) {
  if (!value) return "";
  const [y, m, d] = value.split("-");
  if (!y || !m || !d) return value;
  return `${d}/${m}/${y}`;
}

function buildWhatsAppUrl({
  phone,
  birthDate,
  sex,
  essential,
  expression,
  personal,
}: {
  phone: string;
  birthDate: string;
  sex: string;
  essential: { number: number; name: string };
  expression: { number: number; name: string };
  personal: { number: number; name: string };
}) {
  const msg =
    `Oi, Claudia! Fiz meu Mapa Completo.\n\n` +
    `Data: ${birthDate}\n` +
    `Sexo: ${sex}\n\n` +
    `Essência: ${essential.number} - ${essential.name}\n` +
    `Expressão: ${expression.number} - ${expression.name}\n` +
    `Energia Externa: ${personal.number} - ${personal.name}\n\n` +
    `O que mais me chamou atenção foi: __________.\n\n` +
    `Gostaria da sua leitura sobre como essas forças estão se organizando.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

export default function MapaCompletoPage() {
  const [step, setStep] = React.useState<Step>("form");
  const [birthDateRaw, setBirthDateRaw] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [map, setMap] = React.useState<any>(null);

  const birthDate = formatDateBR(birthDateRaw);

  const handleCalculate = () => {
    const date = new Date(birthDateRaw + "T00:00:00");
    const result = calculateMap(date, sex);
    setMap(result);
    setStep("result");
  };

  const openWhatsApp = () => {
    if (!map) return;
    const url = buildWhatsAppUrl({
      phone: WHATSAPP_NUMBER,
      birthDate: birthDate || "[não informado]",
      sex: sex || "[não informado]",
      essential: map.essential,
      expression: map.expression,
      personal: map.personal,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">

        {/* FORM */}
        {step === "form" && (
          <Card>
            <div className="space-y-6">
              <StepHeader
                title="Mapa Completo — 3 forças"
                subtitle="Como suas forças se organizam — e por que você repete certos padrões."
              />

              <div className="space-y-4">
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Data de nascimento</span>
                  <input
                    type="date"
                    value={birthDateRaw}
                    onChange={(e) => setBirthDateRaw(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 text-sm"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium">Sexo</span>
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 text-sm"
                  >
                    <option value="">Selecione…</option>
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                  </select>
                </label>
              </div>

              <div className="space-y-3">
                <Button onClick={handleCalculate} disabled={!birthDateRaw || !sex}>
                  Gerar meu Mapa Completo
                </Button>

                <Button variant="ghost" onClick={() => window.history.back()}>
                  Voltar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* RESULT */}
        {step === "result" && map && (
          <Card>
            <div className="space-y-6">

              <StepHeader
                title="Seu Mapa Completo"
                subtitle="Três forças. Uma dinâmica."
              />

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-zinc-200 bg-white p-3">
                  <div className="text-xs font-bold uppercase text-zinc-400">
                    Essência
                  </div>
                  <div className="text-3xl mt-1">{map.essential.trigram}</div>
                  <div className="text-xl font-black mt-1">
                    {map.essential.number}
                  </div>
                  <div className="text-xs text-zinc-600">
                    {map.essential.name}
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-3">
                  <div className="text-xs font-bold uppercase text-zinc-400">
                    Expressão
                  </div>
                  <div className="text-3xl mt-1">{map.expression.trigram}</div>
                  <div className="text-xl font-black mt-1">
                    {map.expression.number}
                  </div>
                  <div className="text-xs text-zinc-600">
                    {map.expression.name}
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-3">
                  <div className="text-xs font-bold uppercase text-zinc-400">
                    Energia Externa
                  </div>
                  <div className="text-3xl mt-1">{map.personal.trigram}</div>
                  <div className="text-xl font-black mt-1">
                    {map.personal.number}
                  </div>
                  <div className="text-xs text-zinc-600">
                    {map.personal.name}
                  </div>
                </div>
              </div>

              <p className="text-sm text-zinc-700 text-center">
                O Mapa das Forças do I Ching revela as energias que moldam seu
                temperamento e seus ciclos de vida.  
                O que flui — e o que se repete — nasce do equilíbrio ou do conflito
                entre essas forças.
              </p>

              <div className="rounded-lg bg-zinc-50 p-4 text-center space-y-2">
                <h3 className="text-sm font-bold text-zinc-900">
                  Vamos traduzir isso para sua vida?
                </h3>
                <p className="text-sm text-zinc-700">
                  Se quiser, me diga o que mais chamou sua atenção — e eu te ajudo
                  a ler o mapa com precisão.
                </p>
              </div>

              <div className="space-y-3">
                <Button onClick={openWhatsApp}>
                  Quero entender esse mapa na minha vida (WhatsApp)
                </Button>

                <Button variant="ghost" onClick={() => setStep("form")}>
                  Voltar
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
