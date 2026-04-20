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
  1: "se retrair diante de pressão",
  2: "assumir mais do que deveria",
  3: "agir rápido e ajustar depois",
  4: "ajustar antes de se posicionar",
  5: "analisar demais antes de agir",
  6: "saber o que precisa, mas não sustentar execução",
  7: "agradar antes de se posicionar",
  8: "conter e evitar movimento",
  9: "se empolgar e não concluir",
};

function parseDate(input: string): Date {
  const [y, m, d] = input.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// 🔥 ABERTURA DINÂMICA (PADRÃO OCULTO)
function gerarPadraoOculto(e: number, ex: number, ext: number) {

  if (e === 6 && ex === 3 && ext === 8) {
    return `Você sabe o que precisa ser feito.
Mas não sustenta o tempo necessário para isso acontecer.`;
  }

  if (e === 7 && ex === 1 && ext === 2) {
    return `Você sente o que precisa fazer.
Mas se retrai quando precisa agir.`;
  }

  if (e === 8 && ex === 8) {
    return `Você segura mais do que deveria.
E isso está travando o seu movimento.`;
  }

  if (ex === 9) {
    return `Você começa com intensidade.
Mas não sustenta até o fim.`;
  }

  return `Você faz.
Mas algo não se sustenta no processo.`;
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

        {/* 🔥 PADRÃO OCULTO */}
        <h2 className="text-xl font-semibold leading-snug">
          O seu <b>PADRÃO OCULTO</b> é:
        </h2>

        <p className="text-lg font-semibold leading-snug whitespace-pre-line">
          {gerarPadraoOculto(res.e, res.ex, res.ext)}
        </p>

        {/* 🔥 BLOCO DAS ENERGIAS */}
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

        {/* 🔥 LEITURA */}
        <div className="bg-white p-6 rounded-xl text-sm leading-relaxed space-y-4">

          <p>
            O que você pode não estar percebendo:
          </p>

          <p>
            Você começa com intenção, mas ajusta no meio do caminho.<br />
            Quanto mais tenta resolver, mais esforço precisa fazer.
          </p>

          <p>
            E sem perceber, você entra num ciclo:<br />
            <i>começa → ajusta → força → cansa → recomeça</i>
          </p>

          <p>
            E com o tempo, isso vira a sua forma de funcionar.
          </p>

          <p>
            O desgaste não está no quanto você faz.<br />
            Mas em <b>COMO</b> você está tentando fazer.
          </p>

          <p className="font-bold uppercase">
            VER O PADRÃO TRAZ CLAREZA.<br />
            MAS NÃO MUDA O RESULTADO.<br />
            O QUE MUDA É COMO VOCÊ AGE A PARTIR DISSO.
          </p>

          <p>
            Quer saber o como? Clica no botão aí embaixo agora.
          </p>

        </div>

        {/* CTA */}
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
