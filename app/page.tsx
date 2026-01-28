"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StepHeader } from "@/components/StepHeader";
import { WHATSAPP_NUMBER } from "@/config";
import { calculateMap } from "@/utils/jiugong";

type Step = "start" | "form" | "result_free" | "result_full" | "cta";

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
    `Oi, Claudia! Fiz meu Mapa das Forças do SER.\n\n` +
    `Data: ${birthDate}\n` +
    `Sexo: ${sex}\n\n` +
    `Energia Pessoal (Qi): ${personal.number} - ${personal.name}\n` +
    `Essência: ${essential.number} - ${essential.name}\n` +
    `Expressão: ${expression.number} - ${expression.name}\n\n` +
    `Quero entender meu mapa com você e transformar isso em direção prática.`;

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
    else if (step === "result_free") setStep("form");
    else if (step === "result_full") setStep("result_free");
    else if (step === "cta") setStep("result_full");
  };

  const handleCalculate = () => {
    const date = new Date(birthDateRaw + "T00:00:00");
    const result = calculateMap(date, sex);
    setMap(result);
    setStep("result_free");
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
                title="Mapa das Forças do SER"
                subtitle="Descubra gratuitamente sua Energia Pessoal (Qi)."
              />
              <Button onClick={() => setStep("form")}>Começar</Button>

              <div>
                <Link href="/energias">
                  <Button variant="ghost">Conheça as 9 Energias</Button>
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
                subtitle="Data e sexo para gerar sua Energia Pessoal (Qi)."
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
                  Ver minha Energia Pessoal (Qi)
                </Button>
                <Button variant="ghost" onClick={goBack}>
                  Voltar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* RESULT (GRÁTIS) */}
        {step === "result_free" && map && (
          <Card>
            <div className="space-y-6">
              <StepHeader
                title="Sua Energia Pessoal (Qi)"
                subtitle="Essa é a leitura gratuita. Se quiser, você pode ver suas 3 forças depois."
              />

              <div className="rounded-xl bg-zinc-100 p-4 text-sm text-zinc-800 space-y-1">
                <div>
                  <span className="font-medium">Data:</span> {birthDate}
                </div>
                <div>
                  <span className="font-medium">Sexo:</span> {sex}
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Energia Pessoal (Qi)
                </div>

                {/* Trigrama */}
                {map.personal.trigram && (
                  <div className="text-5xl leading-none" aria-label="Trigrama">
                    {map.personal.trigram}
                  </div>
                )}

                <div className="text-6xl font-black text-zinc-900">
                  {map.personal.number}
                </div>
                <div className="text-xl font-semibold text-zinc-800">
                  {map.personal.name}
                </div>
                <div className="text-sm text-zinc-600">
                  Elemento: {map.personal.element}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">O que te move</h3>
                  <p className="text-sm text-zinc-700">{map.personal.essence}</p>
                </div>

                <div className="rounded-lg bg-zinc-50 p-4">
                  <h3 className="text-sm font-bold text-zinc-900">Onde você trava</h3>
                  <p className="text-sm text-zinc-700">{map.personal.shadow}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={() => setStep("result_full")}>
                  Quero ver minhas 3 forças
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
                  Quero entender meu mapa com a Claudia (WhatsApp)
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
                subtitle="Me diga em uma frase o que você está vivendo agora — e eu te ajudo a transformar esse mapa em direção."
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
