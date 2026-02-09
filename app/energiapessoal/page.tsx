"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StepHeader } from "@/components/StepHeader";
import { WHATSAPP_NUMBER } from "@/config";
import { calculateMap } from "@/utils/jiugong";

type Step = "start" | "form" | "result" | "cta";

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
  personal,
}: {
  phone: string;
  birthDate: string;
  sex: string;
  personal: { number: number; name: string };
}) {
  const msg =
    `Oi, Claudia! Fiz a leitura da minha Energia Pessoal (Qi) segundo o I-Ching.\n\n` +
    `Data: ${birthDate}\n` +
    `Sexo: ${sex}\n\n` +
    `Energia Pessoal (Qi): ${personal.number} - ${personal.name}\n\n` +
    `Você pode me ajudar a aplicar isso na prática?`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

export default function EnergiaPessoal() {
  const [step, setStep] = React.useState<Step>("start");
  const [birthDateRaw, setBirthDateRaw] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [map, setMap] = React.useState<any>(null);

  const birthDate = formatDateBR(birthDateRaw);

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
    const url = buildWhatsAppUrl({
      phone: WHATSAPP_NUMBER,
      birthDate: birthDate || "[TO BE COMPLETED]",
      sex: sex || "[TO BE COMPLETED]",
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
                title="Energia Pessoal (Qi)"
                subtitle="Descubra agora a sua Energia Pessoal segundo o I-Ching."
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
                subtitle="Data e sexo para gerar sua Energia Pessoal."
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

        {/* RESULT */}
        {step === "result" && map && (
          <Card>
            <div className="space-y-6">
              <StepHeader
                title="Sua Energia Pessoal (Qi)"
                subtitle="Essa é a leitura gratuita da sua Energia Pessoal neste momento."
              />

              <div className="text-center space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Energia Pessoal (Qi)
                </div>

                {map.personal.trigram && (
                  <div className="text-5xl leading-none">
                    {map.personal.trigram}
                  </div>
                )}

                <div className="text-6xl font-black text-zinc-900">
                  {map.personal.number}
                </div>

                <div className="text-xl font-semibold text-zinc-800">
                  {map.personal.name}
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={() => setStep("cta")}>
                  Quero entender esta força na minha vida
                </Button>
                <Button variant="ghost" onClick={goBack}>
                  Voltar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* CTA */}
        {step === "cta" && map && (
          <Card>
            <div className="space-y-6 text-center">
              <StepHeader
                title="Vamos conversar?"
                subtitle="Levo essa energia para a sua realidade."
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
