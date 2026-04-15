"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

const energias: any = {
  1: { nome: "Água", arquetipo: "A Adaptadora", luz: "flui e se ajusta", sombra: "evita confronto", missao: "confiar no fluxo com direção", comportamento: "tende a se adaptar demais e evitar confronto", trigram: "☵" },
  2: { nome: "Terra", arquetipo: "A Sustentadora", luz: "cuida e suporta", sombra: "se sobrecarrega", missao: "nutrir sem se anular", comportamento: "tende a assumir responsabilidades demais", trigram: "☷" },
  3: { nome: "Trovão", arquetipo: "A Iniciadora", luz: "começa e movimenta", sombra: "se precipita", missao: "sustentar o que começa", comportamento: "tende a agir rápido e ajustar depois", trigram: "☳" },
  4: { nome: "Vento", arquetipo: "A Influenciadora", luz: "comunica e influencia", sombra: "se dispersa", missao: "alinhar comunicação com intenção", comportamento: "tende a ajustar antes de se posicionar", trigram: "☴" },
  5: { nome: "Centro", arquetipo: "A Integradora", luz: "equilibra", sombra: "se perde", missao: "organizar o centro", comportamento: "tende a oscilar entre controle e caos", trigram: "☯️" },
  6: { nome: "Céu", arquetipo: "A Estrategista", luz: "direciona com clareza", sombra: "trava na execução", missao: "agir com consistência", comportamento: "tende a saber o que precisa, mas não sustenta execução", trigram: "☰" },
  7: { nome: "Lago", arquetipo: "A Comunicadora", luz: "expressa e conecta", sombra: "busca aprovação", missao: "se expressar com verdade", comportamento: "tende a agradar antes de se posicionar", trigram: "☱" },
  8: { nome: "Montanha", arquetipo: "A Guardiã", luz: "sustenta e estrutura", sombra: "bloqueia movimento", missao: "liberar no tempo certo", comportamento: "tende a conter e evitar movimento", trigram: "☶" },
  9: { nome: "Fogo", arquetipo: "A Visionária", luz: "expande e ilumina", sombra: "se dispersa", missao: "focar para realizar", comportamento: "tende a se empolgar e não concluir", trigram: "☲" },
};

function parseDate(input: string): Date {
  const [year, month, day] = input.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function gerarLeitura(e: number, ex: number, ext: number) {
  return `
Por dentro, você ${energias[e].comportamento}.
Na prática, você ${energias[ex].comportamento}.
O ambiente ${energias[ext].comportamento}.

Isso cria um padrão:

Você começa com uma lógica clara.
Mas precisa ajustar no meio do caminho.

E quanto mais tenta resolver,
mais esforço precisa fazer.

O desgaste não está no quanto você faz.

Mas em como você está tentando fazer.
`;
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [res, setRes]: any = useState(null);

  function calcular() {
    const map = calculateMap(parseDate(data), sexo);

    setRes({
      e: map.essential.number,
      ex: map.expression.number,
      ext: map.personal.number,
      texto: gerarLeitura(
        map.essential.number,
        map.expression.number,
        map.personal.number
      ),
    });
  }

  if (step === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="bg-white p-10 rounded-2xl shadow text-center w-[90%] max-w-md">
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

  return (
    <div className="p-6 bg-[#f5f5f5] min-h-screen">

      <h2 className="text-xl font-semibold mb-6">
        Você faz, mas sente que não sai do lugar.
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {[res.e, res.ex, res.ext].map((n, i) => {
          const en = energias[n];
          const labels = ["Essência", "Expressão", "Externa"];

          return (
            <div key={i} className="bg-gray-100 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">{labels[i]}</p>
              <div className="text-xl">{en.trigram}</div>
              <div className="text-2xl font-bold">{n}</div>
              <p>{en.nome}</p>
              <small className="text-gray-400">{en.arquetipo}</small>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
        {[res.e, res.ex, res.ext].map((n, i) => {
          const en = energias[n];
          return (
            <div key={i}>
              <p><b>Luz:</b> {en.luz}</p>
              <p><b>Sombra:</b> {en.sombra}</p>
              <p><b>Missão:</b> {en.missao}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-200 p-6 rounded-xl mt-6 whitespace-pre-line">
        {res.texto}
      </div>

      <button className="mt-6 w-full bg-black text-white py-4 rounded-xl">
        Quero entender meu padrão com clareza
      </button>

    </div>
  );
}
