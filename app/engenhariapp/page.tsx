"use client";

import { useState } from "react";

type Energia = {
  nome: string;
  trigrama: string;
  arquétipo: string;
  luz: string;
  sombra: string;
  missao: string;
  comportamento: string;
};

const energias: Record<number, Energia> = {
  1: { nome: "Água", trigrama: "☵", arquétipo: "A Sensível", luz: "profundidade", sombra: "medo", missao: "confiar", comportamento: "se retrai diante de pressão" },
  2: { nome: "Terra", trigrama: "☷", arquétipo: "A Sustentadora", luz: "apoia", sombra: "se sobrecarrega", missao: "se priorizar", comportamento: "assume mais do que deveria" },
  3: { nome: "Trovão", trigrama: "☳", arquétipo: "A Iniciadora", luz: "começa", sombra: "se precipita", missao: "sustentar", comportamento: "age rápido e depois ajusta" },
  4: { nome: "Vento", trigrama: "☴", arquétipo: "A Influenciadora", luz: "comunica", sombra: "se dispersa", missao: "direcionar", comportamento: "ajusta antes de se posicionar" },
  5: { nome: "Centro", trigrama: "✚", arquétipo: "A Integradora", luz: "equilibra", sombra: "se perde", missao: "organizar", comportamento: "oscila entre controle e caos" },
  6: { nome: "Céu", trigrama: "☰", arquétipo: "A Estrategista", luz: "direciona", sombra: "trava", missao: "executar", comportamento: "sabe o que fazer, mas trava na execução" },
  7: { nome: "Lago", trigrama: "☱", arquétipo: "A Comunicadora", luz: "expressa", sombra: "busca aprovação", missao: "ser verdadeira", comportamento: "agrada antes de se posicionar" },
  8: { nome: "Montanha", trigrama: "☶", arquétipo: "A Guardiã", luz: "sustenta", sombra: "bloqueia", missao: "liberar", comportamento: "contém e segura movimento" },
  9: { nome: "Fogo", trigrama: "☲", arquétipo: "A Visionária", luz: "expande", sombra: "se dispersa", missao: "focar", comportamento: "se empolga e não conclui" },
};

function reduzir(numero: number) {
  while (numero > 9) {
    numero = numero.toString().split("").reduce((a, b) => a + Number(b), 0);
  }
  return numero;
}

function calcularNumeroBase(data: Date) {
  const soma =
    data.getFullYear() +
    (data.getMonth() + 1) +
    data.getDate();

  return reduzir(soma);
}

function calcularEnergia(data: Date, genero: string) {
  let base = calcularNumeroBase(data);

  let numero =
    genero === "masculino"
      ? 11 - base
      : base + 4;

  if (numero > 9) numero -= 9;
  if (numero === 5) numero = genero === "masculino" ? 2 : 8;

  return numero;
}

function gerarHeadline(e: number, ex: number, ext: number) {
  return `Você sente um atrito interno entre o que sabe, o que faz e o que a vida permite.`;
}

function gerarLeitura(e: number, ex: number, ext: number) {
  const E = energias[e];
  const EX = energias[ex];
  const EXT = energias[ext];

  return `
Por dentro, você ${E.comportamento}.
Na prática, você ${EX.comportamento}.
O ambiente ${EXT.comportamento}.

Isso cria um padrão:

Você começa com uma lógica clara,
mas precisa ajustar no meio do caminho.

E quanto mais tenta resolver,
mais esforço precisa fazer.

O desgaste não está no quanto você faz.

Mas em como você está tentando fazer.
`;
}

export default function Page() {
  const [data, setData] = useState("");
  const [genero, setGenero] = useState("feminino");
  const [resultado, setResultado] = useState<any>(null);

  function calcular() {
    if (!data) return;

    const date = new Date(data);

    const e = calcularEnergia(date, genero);
    const ex = reduzir(e + 2);
    const ext = reduzir(e + 4);

    setResultado({
      e,
      ex,
      ext,
      headline: gerarHeadline(e, ex, ext),
      leitura: gerarLeitura(e, ex, ext),
    });
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* CAPA */}
      {!resultado && (
        <div className="bg-gray-100 p-10 rounded-3xl text-center">
          <h1 className="text-3xl font-bold">ENGENHARIA DOS PADRÕES PESSOAIS</h1>
          <p className="text-gray-500 mt-2">
            O problema não é esforço. É como sua energia está sendo aplicada.
          </p>
          <button
            onClick={() => setResultado({})}
            className="mt-6 bg-black text-white px-8 py-3 rounded-xl"
          >
            Começar
          </button>
        </div>
      )}

      {/* FORM */}
      {resultado && !resultado.e && (
        <div className="bg-gray-100 p-6 rounded-2xl mt-6">
          <input
            type="date"
            className="w-full p-3 rounded mb-4"
            onChange={(e) => setData(e.target.value)}
          />
          <select
            className="w-full p-3 rounded mb-4"
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
          </select>

          <button
            onClick={calcular}
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Ver minha engenharia
          </button>
        </div>
      )}

      {/* RESULTADO */}
      {resultado?.e && (
        <div className="mt-6">

          <h2 className="text-xl font-semibold mb-4">
            {resultado.headline}
          </h2>

          {/* RESUMO */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[resultado.e, resultado.ex, resultado.ext].map((n, i) => {
              const en = energias[n];
              return (
                <div key={i} className="bg-gray-100 p-4 rounded-xl text-center">
                  <div className="text-sm text-gray-500">
                    {i === 0 ? "Essência" : i === 1 ? "Expressão" : "Externa"}
                  </div>
                  <div className="text-2xl">{en.trigrama}</div>
                  <div className="text-3xl font-bold">{n}</div>
                  <div>{en.nome}</div>
                  <div className="text-xs text-gray-400">{en.arquétipo}</div>
                </div>
              );
            })}
          </div>

          {/* LUZ SOMBRA MISSÃO */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
            {[resultado.e, resultado.ex, resultado.ext].map((n, i) => {
              const en = energias[n];
              return (
                <div key={i}>
                  <div><b>Luz:</b> {en.luz}</div>
                  <div><b>Sombra:</b> {en.sombra}</div>
                  <div><b>Missão:</b> {en.missao}</div>
                </div>
              );
            })}
          </div>

          {/* LEITURA */}
          <div className="bg-gray-100 p-5 rounded-xl whitespace-pre-line mb-6">
            {resultado.leitura}
          </div>

          {/* CTA */}
          <button className="w-full bg-black text-white py-4 rounded-xl">
            Quero entender meu padrão com clareza
          </button>

        </div>
      )}
    </div>
  );
}
