"use client";

import { useState } from "react";
import { calculateMap } from "./calculateMap";

function getCycle(e: number) {
  switch (e) {
    case 1:
      return "pensa → evita → adia → acumula → trava → recomeça";
    case 2:
      return "cuida → cede → se sobrecarrega → se anula → cansa → recomeça";
    case 3:
      return "começa → acelera → se empolga → dispersa → abandona → recomeça";
    case 4:
      return "analisa → ajusta → duvida → se perde → trava → recomeça";
    case 5:
      return "tenta controlar → perde o centro → oscila → sobrecarrega → colapsa → recomeça";
    case 6:
      return "define → começa → ajusta → força → cansa → recomeça";
    case 7:
      return "percebe → adapta → cede → se desconecta → frustra → recomeça";
    case 8:
      return "segura → evita → resiste → acumula → trava → recomeça";
    case 9:
      return "começa → expande → se empolga → se dispersa → esgota → recomeça";
    default:
      return "começa → ajusta → força → cansa → recomeça";
  }
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [map, setMap] = useState<any>(null);

  function handleSubmit() {
    if (!data || !sexo) return;

    const [d, m, y] = data.split("/");
    const date = new Date(`${y}-${m}-${d}`);

    const result = calculateMap(date, sexo);
    setMap(result);
    setStep(2);
  }

  function getWhatsAppLink() {
    if (!map) return "#";

    const texto = encodeURIComponent(
      `Quero entender meu padrão com clareza.

Essência: ${map.essential.number} ${map.essential.name}
Expressão: ${map.expression.number} ${map.expression.name}
Externa: ${map.personal.number} ${map.personal.name}`
    );

    return `https://wa.me/5511987545477?text=${texto}`;
  }

  if (step === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-xl w-full">
          <h1 className="text-3xl font-bold mb-4">
            ENGENHARIA DOS PADRÕES PESSOAIS
          </h1>
          <p className="text-gray-500 mb-6">
            O problema não é esforço.
            <br />
            É como sua energia está sendo aplicada.
          </p>
          <button
            onClick={() => setStep(1)}
            className="bg-black text-white px-6 py-3 rounded-xl w-full"
          >
            Começar
          </button>
        </div>
      </main>
    );
  }

  if (step === 1) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-xl">
          <h2 className="text-xl font-semibold mb-6">
            Insira sua data de nascimento e o seu sexo
          </h2>

          <input
            placeholder="dd/mm/aaaa"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="border p-3 rounded mb-4 w-full"
          />

          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="border p-3 rounded mb-4 w-full"
          >
            <option value="">Sexo</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-3 rounded-xl w-full"
          >
            Ver minha engenharia
          </button>
        </div>
      </main>
    );
  }

  if (!map) return null;

  const e = map.essential;
  const ex = map.expression;
  const p = map.personal;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Você sabe o que precisa ser feito — mas algo trava na execução.
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[e, ex, p].map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow text-center"
          >
            <div className="text-sm text-gray-500 mb-1">
              {i === 0 ? "Essência" : i === 1 ? "Expressão" : "Externa"}
            </div>
            <div className="text-xl">{item.trigram}</div>
            <div className="text-2xl font-bold">{item.number}</div>
            <div>{item.name.split(" ")[0]}</div>
          </div>
        ))}
      </div>

      {/* LEITURA */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p className="mb-4">
          Você sabe o que precisa ser feito. Mas não sustenta o tempo necessário
          para isso acontecer.
        </p>

        <p className="mb-4">
          Por dentro, você tende a saber o que precisa, mas não sustenta execução.
          Na prática, você tende a agir rápido e ajustar depois. E no ambiente,
          você tende a conter e evitar movimento.
        </p>

        <p className="mb-2">Isso cria um padrão silencioso:</p>

        <p>Você começa com intenção.</p>
        <p>Mas ajusta no meio do caminho.</p>

        <p className="mt-4">
          E quanto mais tenta resolver,
          <br />
          mais esforço precisa fazer.
        </p>

        <p className="mt-4">
          O desgaste não está no quanto você faz.
          <br />
          Mas em como você está tentando fazer.
        </p>

        <p className="mt-4 italic">{getCycle(e.number)}</p>

        <p className="mt-6 text-base">
          Ver o <strong className="uppercase">padrão</strong> traz{" "}
          <strong className="uppercase">clareza</strong>.<br />
          Mas não muda o{" "}
          <strong className="uppercase">resultado</strong>.<br />
          O que muda é como você{" "}
          <strong className="uppercase">age</strong> a partir disso.
        </p>
      </div>

      {/* CTA */}
      <a href={getWhatsAppLink()} target="_blank">
        <button className="bg-black text-white px-6 py-4 rounded-xl w-full">
          👉 Quero entender meu padrão com clareza
        </button>
      </a>
    </main>
  );
}
