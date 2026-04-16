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

function parseDate(input: string): Date {
  const [y, m, d] = input.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// 🔥 HEADLINE DINÂMICA
function gerarHeadline(e: number, ex: number, ext: number) {

  if (e === ex && ex === ext) {
    return "Você repete o mesmo padrão — mesmo quando tenta fazer diferente.";
  }

  if (e === 6) {
    return "Você sabe o que precisa fazer — mas algo trava na execução.";
  }

  if (ex === 3) {
    return "Você começa rápido — mas não sustenta o ritmo.";
  }

  if (ext === 8) {
    return "Você tenta avançar — mas o ambiente te segura.";
  }

  if (e === 7) {
    return "Você sente muito — mas se ajusta demais antes de agir.";
  }

  if (ex === 9) {
    return "Você se empolga — mas perde consistência no caminho.";
  }

  return "Você faz — mas sente que não sai do lugar.";
}

// 🔥 PRIMEIRA FRASE DINÂMICA
function gerarAbertura(e: number, ex: number, ext: number) {

  if (e === 6 && ex === 3) {
    return "Você sabe o que precisa ser feito. Mas não sustenta o tempo necessário para isso acontecer.";
  }

  if (e === 7 && ex === 1) {
    return "Você sente o que precisa fazer. Mas se retrai quando precisa agir.";
  }

  if (e === 8 && ex === 8) {
    return "Você segura mais do que deveria. E isso trava o movimento.";
  }

  if (ex === 9) {
    return "Você começa com intensidade. Mas não sustenta até o fim.";
  }

  return "Você faz. Mas sente que algo não avança como deveria.";
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
          {gerarHeadline(res.e, res.ex, res.ext)}
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {[res.e, res.ex, res.ext].map((n: number, i: number) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm">

              <div className="text-xs text-gray-500">
                {i === 0 ? "Essência" : i === 1 ? "Expressão" : "Externa"}
              </div>

              <div className="text-lg">{trigramas[n]}</div>
              <div className="text-2xl font-semibold">{n}</div>
              <div className="text-sm">{nomes[n]}</div>

              <div className="text-xs text-gray-400">
                {arquétipos[n]}
              </div>

            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl text-sm leading-relaxed space-y-4">

          <p>{gerarAbertura(res.e, res.ex, res.ext)}</p>

          <p>
            Por dentro, você {comportamento[res.e]}.
            Na prática, você {comportamento[res.ex]}.
            E o ambiente {comportamento[res.ext]}.
          </p>

          <p>Isso cria um padrão silencioso:</p>

          <p>
            Você começa com intenção.<br />
            Mas ajusta no meio do caminho.
          </p>

          <p>
            E quanto mais tenta resolver,<br />
            mais esforço precisa fazer.
          </p>

          <p>
            O desgaste não está no quanto você faz.<br />
            Mas em como você está tentando fazer.
          </p>

          <p className="text-sm font-bold uppercase">
            VER O PADRÃO TRAZ CLAREZA.<br />
            MAS NÃO MUDA O RESULTADO.<br />
            O QUE MUDA É COMO VOCÊ AGE A PARTIR DISSO.
          </p>

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
