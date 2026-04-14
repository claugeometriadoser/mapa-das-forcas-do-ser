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
  1: {
    nome: "Água",
    arquétipo: "A Sensitiva",
    luz: "percebe profundamente",
    sombra: "se retrai",
    missao: "confiar na própria percepção",
    comportamento: "sente antes de agir",
  },
  2: {
    nome: "Terra",
    arquétipo: "A Sustentadora",
    luz: "acolhe e sustenta",
    sombra: "se sobrecarrega",
    missao: "cuidar sem se anular",
    comportamento: "assume responsabilidades",
  },
  3: {
    nome: "Trovão",
    arquétipo: "A Iniciadora",
    luz: "começa e movimenta",
    sombra: "se precipita",
    missao: "sustentar o que começa",
    comportamento: "age rápido",
  },
  4: {
    nome: "Vento",
    arquétipo: "A Influenciadora",
    luz: "comunica e conecta",
    sombra: "se dispersa",
    missao: "alinhar comunicação com direção",
    comportamento: "ajusta antes de se posicionar",
  },
  5: {
    nome: "Centro",
    arquétipo: "A Integradora",
    luz: "equilibra",
    sombra: "se perde no caos",
    missao: "organizar o centro",
    comportamento: "oscila entre controle e confusão",
  },
  6: {
    nome: "Céu",
    arquétipo: "A Estrategista",
    luz: "direciona com clareza",
    sombra: "trava na execução",
    missao: "agir com consistência",
    comportamento: "sabe o que precisa ser feito",
  },
  7: {
    nome: "Lago",
    arquétipo: "A Comunicadora",
    luz: "expressa e conecta",
    sombra: "busca aprovação",
    missao: "se expressar com verdade",
    comportamento: "agrada antes de se posicionar",
  },
  8: {
    nome: "Montanha",
    arquétipo: "A Guardiã",
    luz: "sustenta e estrutura",
    sombra: "bloqueia movimento",
    missao: "liberar no tempo certo",
    comportamento: "contém e segura",
  },
  9: {
    nome: "Fogo",
    arquétipo: "A Visionária",
    luz: "expande e ilumina",
    sombra: "se dispersa",
    missao: "focar para realizar",
    comportamento: "se empolga e perde continuidade",
  },
};

function gerarHeadline(e: number, ex: number, ext: number) {
  const base = [
    "Você faz, mas sente que não sai do lugar.",
    "Existe um padrão silencioso na forma como você vive.",
    "Você sabe o que precisa fazer — mas algo não sustenta.",
    "Você começa com clareza, mas perde força no caminho.",
  ];
  return base[(e + ex + ext) % base.length];
}

function gerarLeitura(e: number, ex: number, ext: number) {
  const E = energias[e];
  const EX = energias[ex];
  const EXT = energias[ext];

  return `
Por dentro, você ${E.comportamento}.
Na prática, você ${EX.comportamento}.
E o ambiente tende a ${EXT.comportamento}.

Isso cria um padrão:

Você começa com uma lógica interna clara.
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
      leitura: gerarLeitura(e, ex, ext),
      headline: gerarHeadline(e, ex, ext),
    });

    setStep(2);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 shadow">

        {/* CAPA */}
        {step === 0 && (
          <>
            <h1 className="text-3xl font-bold text-center">
              ENGENHARIA<br />DOS PADRÕES PESSOAIS
            </h1>
            <p className="text-center mt-4 text-gray-500">
              O problema não é esforço.<br />
              É como sua energia está sendo aplicada.
            </p>

            <button
              onClick={() => setStep(1)}
              className="mt-6 w-full bg-black text-white py-3 rounded-xl"
            >
              Começar
            </button>
          </>
        )}

        {/* INPUT */}
        {step === 1 && (
          <>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full border p-3 rounded mb-4"
            />

            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="w-full border p-3 rounded mb-4"
            >
              <option value="">Sexo</option>
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
            </select>

            <button
              onClick={calcular}
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              Ver minha engenharia
            </button>
          </>
        )}

        {/* RESULTADO */}
        {step === 2 && resultado && (
          <>
            <h2 className="text-xl font-semibold mb-6">
              {resultado.headline}
            </h2>

            {/* RESUMO */}
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              {[resultado.e, resultado.ex, resultado.ext].map((n, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold">{n}</div>
                  <div>{energias[n].nome}</div>
                </div>
              ))}
            </div>

            {/* LUZ / SOMBRA / MISSÃO */}
            {[resultado.e, resultado.ex, resultado.ext].map((n, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold">
                  {energias[n].nome} — {energias[n].arquétipo}
                </h3>
                <p>Luz: {energias[n].luz}</p>
                <p>Sombra: {energias[n].sombra}</p>
                <p>Missão: {energias[n].missao}</p>
              </div>
            ))}

            {/* LEITURA */}
            <div className="bg-gray-100 p-4 rounded-xl whitespace-pre-line mb-6">
              {resultado.leitura}
            </div>

            <button className="w-full bg-black text-white py-3 rounded-xl">
              Quero entender meu padrão com clareza
            </button>
          </>
        )}

      </div>
    </div>
  );
}
