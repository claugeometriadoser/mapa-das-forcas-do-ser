"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

const energias: any = {
  1: { nome: "Água", comportamento: "tende a se retrair diante de pressão" },
  2: { nome: "Terra", comportamento: "tende a assumir mais do que deveria" },
  3: { nome: "Trovão", comportamento: "tende a agir rápido e ajustar depois" },
  4: { nome: "Vento", comportamento: "tende a ajustar antes de se posicionar" },
  5: { nome: "Centro", comportamento: "tende a analisar demais antes de agir" },
  6: { nome: "Céu", comportamento: "tende a saber o que precisa, mas não sustenta execução" },
  7: { nome: "Lago", comportamento: "tende a agradar antes de se posicionar" },
  8: { nome: "Montanha", comportamento: "tende a conter e evitar movimento" },
  9: { nome: "Fogo", comportamento: "tende a se empolgar e não concluir" },
};

function parseDate(input: string): Date {
  const [y, m, d] = input.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// 🔥 MOTOR REAL DE LEITURA (COMBINATÓRIO)
function gerarDiagnostico(e: number, ex: number, ext: number) {

  const ess = energias[e];
  const exp = energias[ex];
  const amb = energias[ext];

  // 👉 NOME DINÂMICO
  let nome = "Ajuste constante sem sustentação";

  if (e === ex && ex === ext) {
    nome = "Repetição automática de padrão";
  } else if (e === ext) {
    nome = "Clareza interna com bloqueio externo";
  } else if (ex === ext) {
    nome = "Movimento sem direção clara";
  } else if (e !== ex && ex !== ext) {
    nome = "Desalinhamento entre intenção e ação";
  }

  // 👉 LEITURA
  const leitura = `
Você ${ess.comportamento}.
Mas quando precisa agir, ${exp.comportamento}.
E o ambiente ${amb.comportamento}.

Isso não parece um problema isolado.

Parece um padrão.
`;

  // 👉 SOMBRA (AQUI ENTRA O IMPACTO)
  const sombra = `
Isso te coloca em um lugar difícil de perceber:

Você começa com intenção.
Mas não sustenta o suficiente para ver resultado.

E quando percebe,
já está ajustando de novo.
`;

  // 👉 LOOP REAL
  const loop = `
E aí você entra num ciclo:

começa → ajusta → força → cansa → recomeça

E com o tempo,
isso vira sua forma de funcionar.
`;

  // 👉 LIMITE (SEU TEXTO)
  const limite = `
Ver o padrão traz clareza.
Mas não muda o resultado.

O que muda é como você age a partir disso.
`;

  // 👉 CTA (SEU)
  const cta = `
Na Sessão de Realinhamento,
esse padrão é organizado com você —

e você sai com clareza do que ajustar na sua vida hoje.
`;

  return { nome, leitura, sombra, loop, limite, cta };
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

  // TELA INICIAL
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

  // INPUT
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

  // RESULTADO
  return (
    <div className="p-6 bg-[#f5f5f5] min-h-screen space-y-6">

      <h2 className="text-xl font-semibold">
        Seu padrão dominante: {res.diagnostico.nome}
      </h2>

      <div className="bg-gray-200 p-5 rounded-xl whitespace-pre-line">
        {res.diagnostico.leitura}
      </div>

      <div className="bg-gray-100 p-5 rounded-xl whitespace-pre-line">
        {res.diagnostico.sombra}
      </div>

      <div className="bg-gray-100 p-5 rounded-xl whitespace-pre-line">
        {res.diagnostico.loop}
      </div>

      <div className="text-sm text-gray-600 whitespace-pre-line">
        {res.diagnostico.limite}
      </div>

      <div className="bg-gray-200 p-5 rounded-xl whitespace-pre-line">
        {res.diagnostico.cta}
      </div>

      <a
        href="https://wa.me/5511987545477?text=Quero%20entender%20o%20meu%20padr%C3%A3o%20com%20clareza"
        target="_blank"
        className="block w-full bg-black text-white py-4 rounded-xl text-center"
      >
        👉 Quero entender meu padrão com clareza
      </a>

    </div>
  );
}
