"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

type Energia = {
  nome: string;
  arquétipo: string;
  luz: string;
  sombra: string;
  missao: string;
  comportamento: string;
};

const energias: Record<number, Energia> = {
  1: { nome: "Água", arquétipo: "A Sensitiva", luz: "percebe profundamente", sombra: "se retrai", missao: "confiar na própria percepção", comportamento: "sente antes de agir" },
  2: { nome: "Terra", arquétipo: "A Sustentadora", luz: "acolhe e sustenta", sombra: "se sobrecarrega", missao: "cuidar sem se anular", comportamento: "assume responsabilidades" },
  3: { nome: "Trovão", arquétipo: "A Iniciadora", luz: "começa e movimenta", sombra: "se precipita", missao: "sustentar o que começa", comportamento: "age rápido" },
  4: { nome: "Vento", arquétipo: "A Influenciadora", luz: "comunica e conecta", sombra: "se dispersa", missao: "alinhar comunicação com direção", comportamento: "ajusta antes de se posicionar" },
  5: { nome: "Centro", arquétipo: "A Integradora", luz: "equilibra", sombra: "se perde", missao: "organizar o centro", comportamento: "oscila entre controle e caos" },
  6: { nome: "Céu", arquétipo: "A Estrategista", luz: "direciona com clareza", sombra: "trava na execução", missao: "agir com consistência", comportamento: "sabe o que precisa ser feito" },
  7: { nome: "Lago", arquétipo: "A Comunicadora", luz: "expressa e conecta", sombra: "busca aprovação", missao: "se expressar com verdade", comportamento: "agrada antes de se posicionar" },
  8: { nome: "Montanha", arquétipo: "A Guardiã", luz: "sustenta e estrutura", sombra: "bloqueia movimento", missao: "liberar no tempo certo", comportamento: "contém e segura" },
  9: { nome: "Fogo", arquétipo: "A Visionária", luz: "expande e ilumina", sombra: "se dispersa", missao: "focar para realizar", comportamento: "se empolga e perde continuidade" },
};

const trigramas: Record<number, string> = {
  1: "☵", 2: "☷", 3: "☳", 4: "☴", 5: "✚", 6: "☰", 7: "☱", 8: "☶", 9: "☲"
};

function gerarHeadline(e: number, ex: number, ext: number) {
  const frases = [
    "Existe um padrão silencioso na forma como você está vivendo.",
    "Você faz, mas sente que não sai do lugar.",
    "Você começa com clareza, mas não sustenta o tempo necessário.",
    "Você sabe o que precisa fazer — mas algo trava no caminho.",
  ];
  return frases[(e + ex + ext) % frases.length];
}

function gerarLeitura(e: number, ex: number, ext: number) {
  const E = energias[e];
  const EX = energias[ex];
  const EXT = energias[ext];

  return `
Por dentro, você tende a ${E.comportamento}.
Na prática, você tende a ${EX.comportamento}.
O ambiente tende a ${EXT.comportamento}.

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
  const [resultado, setResultado] = useState<any>(null);

  function calcular() {
    if (!data || !sexo) return;

    const map = calculateMap(new Date(data + "T00:00:00"), sexo);

    const e = map.essential.number;
    const ex = map.expression.number;
    const ext = map.personal.number;

    setResultado({
      e,
      ex,
      ext,
      headline: gerarHeadline(e, ex, ext),
      leitura: gerarLeitura(e, ex, ext),
    });

    setStep(2);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow">

        {step === 0 && (
          <>
            <h1 className="text-3xl font-bold text-center">
              ENGENHARIA<br />DOS PADRÕES PESSOAIS
            </h1>
            <p className="text-center mt-4 text-gray-500">
              O problema não é esforço.<br />
              É como sua energia está sendo aplicada.
            </p>
            <button onClick={() => setStep(1)} className="mt-6 w-full bg-black text-white py-3 rounded-xl">
              Começar
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="w-full border p-3 rounded mb-4" />
            <select value={sexo} onChange={(e) => setSexo(e.target.value)} className="w-full border p-3 rounded mb-4">
              <option value="">Sexo</option>
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
            </select>
            <button onClick={calcular} className="w-full bg-black text-white py-3 rounded-xl">
              Ver minha engenharia
            </button>
          </>
        )}

        {step === 2 && resultado && (
          <>
            <h2 className="text-lg font-semibold mb-6">{resultado.headline}</h2>

            {/* CARDS */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[resultado.e, resultado.ex, resultado.ext].map((n, i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">
                    {i === 0 ? "Essência" : i === 1 ? "Expressão" : "Externa"}
                  </div>
                  <div className="text-xl">{trigramas[n]}</div>
                  <div className="text-3xl font-bold">{n}</div>
                  <div className="text-sm">{energias[n].nome}</div>
                  <div className="text-xs text-gray-400">{energias[n].arquétipo}</div>
                </div>
              ))}
            </div>

            {/* LUZ SOMBRA MISSÃO */}
            <div className="grid grid-cols-3 gap-6 mb-6 text-sm">
              {[resultado.e, resultado.ex, resultado.ext].map((n, i) => (
                <div key={i}>
                  <p><strong>Luz:</strong> {energias[n].luz}</p>
                  <p><strong>Sombra:</strong> {energias[n].sombra}</p>
                  <p><strong>Missão:</strong> {energias[n].missao}</p>
                </div>
              ))}
            </div>

            {/* LEITURA */}
            <div className="bg-gray-100 p-5 rounded-xl whitespace-pre-line mb-6">
              {resultado.leitura}
            </div>

            <button className="w-full bg-black text-white py-4 rounded-xl">
              Quero entender meu padrão com clareza
            </button>
          </>
        )}

      </div>
    </div>
  );
}
