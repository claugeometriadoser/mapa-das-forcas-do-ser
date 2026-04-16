"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

const arquétipos: any = {
  1: "A Profunda",
  2: "A Sustentadora",
  3: "A Iniciadora",
  4: "A Estrategista",
  5: "A Integradora",
  6: "A Estrategista",
  7: "A Comunicadora",
  8: "A Guardiã",
  9: "A Visionária",
};

const trigramas: any = {
  1: "☵",
  2: "☷",
  3: "☳",
  4: "☴",
  5: "☯️",
  6: "☰",
  7: "☱",
  8: "☶",
  9: "☲",
};

const nomes: any = {
  1: "Água",
  2: "Terra",
  3: "Trovão",
  4: "Vento",
  5: "Centro",
  6: "Céu",
  7: "Lago",
  8: "Montanha",
  9: "Fogo",
};

const comportamento: any = {
  1: "tende a se retrair diante de pressão",
  2: "tende a assumir mais do que deveria",
  3: "tende a agir rápido e ajustar depois",
  4: "tende a ajustar antes de se posicionar",
  5: "tende a analisar demais antes de agir",
  6: "tende a saber o que precisa, mas não sustenta execução",
  7: "tende a agradar antes de se posicionar",
  8: "tende a conter e evitar movimento",
  9: "tende a se empolgar e não concluir",
};

function gerarDiagnostico(e: number, ex: number, ext: number) {

  let nomePadrao = "Desalinhamento entre intenção e ação";

  if (e === ex && ex === ext) nomePadrao = "Repetição automática de padrão";
  else if (e === ext) nomePadrao = "Clareza interna com bloqueio externo";
  else if (ex === ext) nomePadrao = "Movimento sem direção clara";

  return {
    nomePadrao,
    leitura: `
Você ${comportamento[e]}.
Mas quando precisa agir, ${comportamento[ex]}.
E o ambiente ${comportamento[ext]}.

Isso não parece um problema isolado.
Parece um padrão.
`,

    sombra: `
Você começa com intenção.
Mas não sustenta o suficiente para ver resultado.

E quando percebe,
já está ajustando de novo.
`,

    loop: `
começa → ajusta → força → cansa → recomeça

E com o tempo,
isso vira sua forma de funcionar.
`,
  };
}

function parseDate(input: string): Date {
  const [y, m, d] = input.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export default function Page() {

  const [step, setStep] = useState(0);
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [res, setRes]: any = useState(null);

  function calcular() {
    const map = calculateMap(parseDate(data), sexo);

    const e = map.essential.number;
    const ex = map.expression.number;
    const ext = map.personal.number;

    const diagnostico = gerarDiagnostico(e, ex, ext);

    setRes({ e, ex, ext, diagnostico });
  }

  // 🔹 TELA INICIAL (NÃO MEXI)
  if (step === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="bg-white p-10 rounded-2xl text-center w-[90%] max-w-md">
          <h1 className="text-2xl font-bold">
            ENGENHARIA<br />DOS PADRÕES PESSOAIS
          </h1>

          <p className="text-gray-500 mt-4">
            O problema não é esforço.<br />
            É como sua energia está sendo aplicada.
          </p>

          <button
            onClick={() => setStep(1)}
            className="mt-6 w-full bg-black text-white py-4 rounded-xl"
          >
            Começar
          </button>
        </div>
      </div>
    );
  }

  // 🔹 INPUT (NÃO MEXI)
  if (!res) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="bg-white p-8 rounded-2xl w-[90%] max-w-md space-y-4">

          <input
            type="date"
            onChange={(e) => setData(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <select
            onChange={(e) => setSexo(e.target.value)}
            className="w-full border p-4 rounded-xl"
          >
            <option>Sexo</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>

          <button
            onClick={calcular}
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            Ver minha engenharia
          </button>
        </div>
      </div>
    );
  }

  // 🔥 RESULTADO AJUSTADO
  return (
    <div className="p-6 bg-[#f5f5f5] min-h-screen space-y-6">

      <h2 className="text-xl font-semibold">
        Seu padrão dominante: {res.diagnostico.nomePadrao}
      </h2>

      {/* 🔥 TOPO COM AS 3 ENERGIAS (VOLTOU) */}
      <div className="grid grid-cols-3 gap-4">

        {[res.e, res.ex, res.ext].map((n: number, i: number) => (
          <div key={i} className="bg-gray-200 p-4 rounded-xl text-center">

            <div className="text-sm text-gray-500">
              {i === 0 ? "Essência" : i === 1 ? "Expressão" : "Externa"}
            </div>

            <div className="text-xl">{trigramas[n]}</div>

            <div className="text-2xl font-bold">{n}</div>

            <div className="text-sm">{nomes[n]}</div>

            <div className="text-xs text-gray-500">
              {arquétipos[n]}
            </div>
          </div>
        ))}

      </div>

      {/* 🔥 BLOCO ÚNICO (SEM QUEBRA EXCESSIVA) */}
      <div className="bg-gray-200 p-6 rounded-xl whitespace-pre-line leading-relaxed">

        {res.diagnostico.leitura}

        {"\n"}
        {res.diagnostico.sombra}

        {"\n"}
        Isso cria um padrão:

        {"\n"}
        {res.diagnostico.loop}

        {"\n\n"}
        Ver o padrão traz clareza.
        Mas não muda o resultado.

        O que muda é como você age a partir disso.

      </div>

      {/* CTA */}
      <a
        href="https://wa.me/5511987545477?text=Quero%20entender%20meu%20padr%C3%A3o%20com%20clareza"
        target="_blank"
        className="block w-full bg-black text-white py-4 rounded-xl text-center"
      >
        👉 Quero entender meu padrão com clareza
      </a>

    </div>
  );
}
