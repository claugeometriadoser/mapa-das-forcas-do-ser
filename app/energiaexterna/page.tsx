"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StepHeader } from "@/components/StepHeader";
import { WHATSAPP_NUMBER } from "@/config";
import { calculateMap } from "@/utils/jiugong";

type Step = "start" | "form" | "result";

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
  energy,
}: {
  phone: string;
  birthDate: string;
  sex: string;
  energy: { number: number; name: string };
}) {
  const msg =
    `Oi, Claudia! Fiz a leitura da minha ENERGIA EXTERNA.\n\n` +
    `Data: ${birthDate}\n` +
    `Sexo: ${sex}\n\n` +
    `Energia Externa: ${energy.number} - ${energy.name}\n\n` +
    `Gostaria de entender melhor como aplicar essa leitura na minha vida agora.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

export default function EnergiaExternaPage() {
  const [step, setStep] = React.useState<Step>("start");
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
      energy: map.personal,
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
                title="ENERGIA EXTERNA"
                subtitle="Descubra a ENERGIA EXTERNA que afeta sua VIDA segundo o I-Ching."
              />

              <p className="text-sm text-zinc-600">
                Identifica situações recorrentes na vida que servem como oportunidades
                de crescimento ou superação de obstáculos.
              </p>

              <Button onClick={() => setStep("form")}>Começar</Button>
            </div>
          </Card>
        )}

        {/* FORM */}
        {step === "form" && (
          <Card>
            <div className="space-y-6">
              <StepHeader
                title="Seus dados"
                subtitle="Data e sexo para calcular sua Energia Externa."
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
                  Ver minha Energia Externa
                </Button>

                <Button variant="ghost" onClick={() => setStep("start")}>
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
                title="Sua Energia Externa"
                subtitle="Essa é a leitura da SUA Energia Externa."
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
                  Energia Externa
                </div>

                {map.personal.trigram && (
                  <div className="text-5xl leading-none">{map.personal.trigram}</div>
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
                  <h3 className="text-sm font-bold text-zinc-900">
                    Movimento predominante
                  </h3>
                  <p className="text-sm text-zinc-700">
                    {map.personal.essence}
                  </p>
                </div>

                <div className="rounded-lg bg-zinc-50 p-4">
                  <h3 className="text-sm font-bold text-zinc-900">
                    Ponto de atenção
                  </h3>
                  <p className="text-sm text-zinc-700">
                    {map.personal.shadow}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <Button onClick={openWhatsApp}>
                  Quero entender essa energia na minha vida (WhatsApp)
                </Button>

                <Link href="/energias">
                  <Button variant="ghost">Conheça as 9 Energias</Button>
                </Link>

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
