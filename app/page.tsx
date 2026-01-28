"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StepHeader } from "@/components/StepHeader";
import { CALENDLY_URL, WHATSAPP_NUMBER } from "@/config";

type Step = "start" | "form" | "result" | "cta";

function formatDateBR(value: string) {
  // value esperado: YYYY-MM-DD (input type="date")
  if (!value) return "";
  const [y, m, d] = value.split("-");
  if (!y || !m || !d) return value;
  return `${d}/${m}/${y}`;
}

function buildWhatsAppUrl({
  phone,
  birthDate,
  sex,
}: {
  phone: string;
  birthDate: string;
  sex: string;
}) {
  const msg = `Oi, Claudia. Quero transformar leitura em direção. Minha data de nascimento é ${birthDate} e meu sexo é ${sex}.`;
  const text = encodeURIComponent(msg);
  return `https://wa.me/${phone}?text=${text}`;
}

export default function Page() {
  const [step, setStep] = React.useState<Step>("start");

  const [birthDateRaw, setBirthDateRaw] = React.useState("");
  const [sex, setSex] = React.useState("");
  const birthDate = formatDateBR(birthDateRaw);

  const openWhatsApp = () => {
    const url = buildWhatsAppUrl({
      phone: WHATSAPP_NUMBER,
      birthDate: birthDate || "[TO BE COMPLETED]",
      sex: sex || "[TO BE COMPLETED]",
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openSchedule = () => {
  const msg = `Oi, Claudia. Quero agendar a conversa gratuita de 20 min. Minha data de nascimento é ${birthDate || "[TO BE COMPLETED]"} e meu sexo é ${sex || "[TO BE COMPLETED]"}.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

  const goBack = () => {
    if (step === "form") setStep("start");
    else if (step === "result") setStep("form");
    else if (step === "cta") setStep("result");
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        {step === "start" && (
          <Card>
            <div className="space-y-6">
              <StepHeader
                title="Mapa das Forças do SER"
                subtitle="Uma leitura simples para você entender onde está gastando energia — e o que te devolve coerência."
              />
              <Button onClick={() => setStep("form")}>Começar</Button>
            </div>
          </Card>
        )}

        {step === "form" && (
          <Card>
            <div className="space-y-6">
              <StepHeader
                title="Me diga sua data e seu sexo"
                subtitle="Isso é o suficiente para a gente iniciar a leitura."
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
                    <option value="outro">Outro</option>
                    <option value="prefiro não dizer">Prefiro não dizer</option>
                  </select>
                </label>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setStep("result")}
                  disabled={!birthDateRaw || !sex}
                >
                  Ver minha Energia
                </Button>
                <Button variant="ghost" onClick={goBack}>
                  Voltar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === "result" && (
          <Card>
            <div className="space-y-6">
              <StepHeader
                title="Sua leitura (prévia)"
                subtitle="Aqui entra o cálculo do Qi. Por enquanto, este é um placeholder para você já testar o fluxo e a CTA."
              />

              <div className="rounded-xl bg-zinc-100 p-4 text-sm text-zinc-800">
                <div>
                  <span className="font-medium">Data:</span> {birthDate}
                </div>
                <div>
                  <span className="font-medium">Sexo:</span> {sex}
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={() => setStep("cta")}>Próximo passo</Button>
                <Button variant="ghost" onClick={goBack}>
                  Voltar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === "cta" && (
          <Card>
            <div className="space-y-6">
              <StepHeader
                title="Quer transformar leitura em direção?"
                subtitle="Me chama no WhatsApp. A gente olha juntas: onde você está gastando energia e o que te devolve coerência."
              />

              <div className="space-y-3">
                <Button onClick={openWhatsApp}>Falar comigo no WhatsApp</Button>
                <Button variant="ghost" onClick={openSchedule}>
                  Agendar conversa gratuita (20 min)
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
