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

function parseDate(input: string): Date {
  const [y, m, d] = input.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getCycle(e: number) {
  const ciclos: Record<number, string> = {
    1: "pensa → evita → adia → acumula → trava → recomeça",
    2: "cuida → cede → assume demais → se sobrecarrega → cansa → recomeça",
    3: "começa → acelera → se empolga → dispersa → abandona → recomeça",
    4: "analisa → revisa → duvida → se perde → trava → recomeça",
    5: "tenta controlar → perde o centro → oscila → sobrecarrega → colapsa → recomeça",
    6: "define → começa → ajusta → força → cansa → recomeça",
    7: "percebe → se adapta → evita conflito → se anula → acumula → recomeça",
    8: "segura → posterga → acumula → trava → paralisa → recomeça",
    9: "expande → se empolga → assume demais → dispersa → perde foco → recomeça",
  };

  return ciclos[e];
}

function gerarLeituraDetalhada(e: number, ex: number, ext: number) {

  const baseEssencia: Record<number, string> = {
    1: "Você pensa antes de agir, mas isso vira adiamento.",
    2: "Você sustenta tudo, mas se sobrecarrega.",
    3: "Você começa rápido, mas perde consistência.",
    4: "Você analisa demais e trava.",
    5: "Você tenta controlar tudo e perde o centro.",
    6: "Você sabe o que precisa, mas exige demais de si.",
    7: "Você evita conflito e se adapta demais.",
    8: "Você segura demais e trava o fluxo.",
    9: "Você expande, mas se dispersa."
  };

  const expressao: Record<number, string> = {
    1: "Na prática, você tende a se retrair diante da ação.",
    2: "Na prática, você assume mais do que deveria.",
    3: "Na prática, você começa rápido e se empolga.",
    4: "Na prática, você revisa demais antes de agir.",
    5: "Na prática, você oscila entre controle e desorganização.",
    6: "Na prática, você entra em ação com pressão interna.",
    7: "Na prática, você busca aprovação antes de se posicionar.",
    8: "Na prática, você segura e posterga decisões.",
    9: "Na prática, você se expõe e depois perde consistência."
  };

  const ambiente: Record<number, string> = {
    1: "No ambiente, você tende a se retrair diante da pressão.",
    2: "No ambiente, você absorve demandas dos outros.",
    3: "No ambiente, tudo pede velocidade e reação.",
    4: "No ambiente, há excesso de análise e pouca decisão.",
    5: "No ambiente, tudo muda o tempo inteiro.",
    6: "No ambiente, há cobrança e exigência por resultado.",
    7: "No ambiente, você tende a agradar antes de se posicionar.",
    8: "No ambiente, há contenção e dificuldade de avanço.",
    9: "No ambiente, há intensidade e exposição constante."
  };

  return `${baseEssencia[e]}

${expressao[ex]}

${ambiente[ext]}

Sem perceber, você entra num ciclo:
${getCycle(e)}

E com o tempo, isso vira sua forma de funcionar.`;
}

function gerarPadraoOculto(e: number, ex: number, ext: number) {
  return gerarLeituraDetalhada(e, ex, ext)
    .split("\n")
    .find(linha => linha.trim() !== "") || "";
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

    setRes({ e, ex, ext });
  }

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

  if (!res) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="bg-white p-8 rounded-2xl w-[90%] max-w-md space-y-4">

          <h2 className="text-lg font-semibold text-center">
            Insira sua data de nascimento e o seu sexo
          </h2>

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
    <div className="min-h-screen bg-[#f5f5f5] px-6 py-8 flex justify-center">
      
      <div className="w-full max-w-xl space-y-6">

        <h2 className="text-xl font-semibold leading-snug">
          O seu <b>PADRÃO OCULTO</b> é:
        </h2>

        <p className="text-lg font-semibold leading-snug whitespace-pre-line">
          {gerarPadraoOculto(res.e, res.ex, res.ext)}
        </p>

        <div className="border rounded-xl p-4 bg-white space-y-2">

          <p>
            Em <b>ESSÊNCIA</b> você é <b>{arquétipos[res.e]}</b> porque sua energia é {trigramas[res.e]} {res.e} {nomes[res.e]}
          </p>

          <p>
            Na <b>EXPRESSÃO</b> você é <b>{arquétipos[res.ex]}</b> porque sua energia é {trigramas[res.ex]} {res.ex} {nomes[res.ex]}
          </p>

          <p>
            No <b>AMBIENTE EXTERNO</b> você é <b>{arquétipos[res.ext]}</b> porque sua energia é {trigramas[res.ext]} {res.ext} {nomes[res.ext]}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl text-sm leading-relaxed space-y-4">

          <p>O que você pode não estar percebendo:</p>

          <p className="whitespace-pre-line">
            {gerarLeituraDetalhada(res.e, res.ex, res.ext)}
          </p>

          <p>
            O desgaste não está no quanto você faz.<br />
            Mas em <b>COMO</b> você está tentando fazer.
          </p>

          <p>
            Ver o <b>PADRÃO</b> traz <b>CLAREZA</b>.<br/>
            Mas não muda o <b>RESULTADO</b>.<br/>
            O que muda é como você <b>AGE</b> a partir disso.
          </p>

          <p>Quer saber o como? Clica no botão aí embaixo agora.</p>

        </div>

        <a
          href={`https://wa.me/5511987545477?text=${encodeURIComponent("Quero entender meu padrão com clareza")}`}
          target="_blank"
          className="block w-full bg-black text-white py-4 rounded-xl text-center"
        >
          👉 Quero entender meu padrão com clareza
        </a>

      </div>

    </div>
  );
}
