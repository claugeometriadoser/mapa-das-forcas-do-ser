"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StepHeader } from "@/components/StepHeader";
import { WHATSAPP_NUMBER } from "@/config";
import { calculateMap } from "@/utils/jiugong";

type Step = "start" | "form" | "result_full" | "cta";

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
    `Oi, Claudia! Fiz meu Mapa completo (3 forças).\n\n` +
    `Data: ${birthDate}\n` +
    `Sexo: ${sex}\n\n` +
    `Energia Pessoal (Qi): ${personal.number} - ${personal.name}\n` +
    `Essência: ${essential.number} - ${essential.name}\n` +
    `Expressão: ${expression.number} - ${expression.name}\n\n` +
    `Quero aprofundar a leitura completa com você.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

export default function Page() {
  const [step, setStep] = React.useState<Step>("start");
  const [birthDateRaw, setBirthDateRaw] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [map, setMap] = React.useState<any>(null);

  const birthDate = formatDateBR(birthDateRaw);

  const goBack = () => {
    if (step === "form") setStep("start");
    else if (step === "result_full") setStep("form");
    else if (step === "cta") setStep("result_full");
  };

  const handleCalculate = () => {
    const date = new Date(birthDateRaw + "T00:00:00");
    const result = calculateMap(date, sex);
    setMap(result);
    setStep("result_full");
  };

  const openWhatsApp = () => {
    if (!map) return;
    const url = buildWhatsAppUrl({
      phone: WHATSAPP_NUMBER,
      birthDate: birthDate || "[TO BE COMPLETED]",
      sex: sex || "[TO BE COMPLETED]",
      essential: map.essential,
      expression: map.expression,
      personal: map.personal,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        {/* START */}
        {step === "start" && (
          <Card>
            <div className="space-y-6 text-center">
              <StepHeader
                title="Mapa completo"
                subtitle="Essência, Expressão e Energia Pessoal (Qi)."
              />
              <Button onClick={() => setStep("form")}>Começar</Button>

              <div>
                <Link href="/">
                  <Button variant="ghost">Ir para leitura gratuita (Qi)</Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        {/* FORM */}
        {step === "form" && (
          <Card>
            <div className="space-y-6">
              <StepHeader
                title="Seus dados"
                subtitle="Data e sexo para gerar seu mapa completo."
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
                  Ver meu mapa completo
                </Button>
                <Button variant="ghost" onClick={goBack}>
                  Voltar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* RESULT (MAPA COMPLETO) */}
        {step === "result_full" && map && (
          <Card>
            <div className="space-y-6">
              <StepHeader
                title="Suas 3 forças"
                subtitle="Essência, Expressão e Energia Pessoal (Qi)."
              />

              <div className="rounded-xl bg-zinc-100 p-4 text-sm text-zinc-800 space-y-1">
                <div>
                  <span className="font-medium">Data:</span> {birthDate}
                </div>
                <div>
                  <span className="font-medium">Sexo:</span> {sex}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-zinc-200 bg-white p-3">
                  <div className="text-[10px] font-bold uppercase text-zinc-400">
                    Essência
                  </div>

                  {map.essential.trigram && (
                    <div className="text-3xl leading-none mt-1" aria-label="Trigrama">
                      {map.essential.trigram}
                    </div>
                  )}

                  <div className="text-2xl font-black text-zinc-900 mt-1">
                    {map.essential.number}
                  </div>
                  <div className="text-xs text-zinc-600">{map.essential.name}</div>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-3">
                  <div className="text-[10px] font-bold uppercase text-zinc-400">
                    Expressão
                  </div>

                  {map.expression.trigram && (
                    <div className="text-3xl leading-none mt-1" aria-label="Trigrama">
                      {map.expression.trigram}
                    </div>
                  )}

                  <div className="text-2xl font-black text-zinc-900 mt-1">
                    {map.expression.number}
                  </div>
                  <div className="text-xs text-zinc-600">{map.expression.name}</div>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-3">
                  <div className="text-[10px] font-bold uppercase text-zinc-400">
                    Qi
                  </div>

                  {map.personal.trigram && (
                    <div className="text-3xl leading-none mt-1" aria-label="Trigrama">
                      {map.personal.trigram}
                    </div>
                  )}

                  <div className="text-2xl font-black text-zinc-900 mt-1">
                    {map.personal.number}
                  </div>
                  <div className="text-xs text-zinc-600">{map.personal.name}</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={() => setStep("cta")}>
                  Quero fazer a leitura completa com a Claudia (WhatsApp)
                </Button>
                <Button variant="ghost" onClick={goBack}>
                  Voltar
                </Button>
              </div>

              <p className="text-xs text-zinc-500">
                Ao clicar, você será direcionada(o) para o WhatsApp com uma mensagem pronta.
              </p>
            </div>
          </Card>
        )}

        {/* CTA */}
        {step === "cta" && map && (
          <Card>
            <div className="space-y-6 text-center">
              <StepHeader
                title="Vamos conversar?"
                subtitle="Me diga em uma frase o que você quer entender — e eu te ajudo a transformar esse mapa em direção."
              />

              <div className="space-y-3">
                <Button onClick={openWhatsApp}>
                  Abrir WhatsApp e falar com a Claudia
                </Button>
                <Button variant="ghost" onClick={goBack}>
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
