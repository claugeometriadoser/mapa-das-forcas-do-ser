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

// ✅ REDUÇÃO
function reduzir(n: number): number {
  while (n > 9) {
    n = n.toString().split("").reduce((a, b) => a + Number(b), 0);
  }
  return n;
}

// ✅ PARSE DATE (SEM TIMEZONE BUG)
function parseDate(input: string): Date {
  const [year, month, day] = input.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// ✅ BASE CORRETA (ÚLTIMOS 2 DÍGITOS DO ANO)
function calcularBaseAno(data: Date): number {
  const ano = data.getFullYear();
  const ultimos = ano % 100;
  return reduzir(ultimos);
}

// ✅ ESSÊNCIA (VERSÃO CORRETA FINAL)
function calcularEssencia(data: Date, genero: string): number {
  const base = calcularBaseAno(data);

  let numero =
    genero === "masculino"
      ? 10 - base
      : base + 5;

  numero = reduzir(numero);

  if (numero === 5) {
    numero = genero === "masculino" ? 2 : 8;
  }

  return numero;
}

// ✅ DISTRIBUIÇÃO ORIGINAL (A SUA)
function calcularMapa(data: Date, genero: string) {
  const e = calcularEssencia(data, genero);
  const ex = reduzir(e + 2);
  const ext = reduzir(e + 4);

  return { e, ex, ext };
}

// ✅ LEITURA (SEM ERRO DE PORTUGUÊS)
function gerarLeitura(e: number, ex: number, ext: number) {
  return `
Por dentro, você ${energias[e].comportamento}.
Na prática, você ${energias[ex].comportamento}.
O ambiente ${energias[ext].comportamento}.

Isso cria um padrão:

Você começa com clareza,
mas precisa ajustar no caminho.

E quanto mais tenta resolver,
mais esforço precisa fazer.

O desgaste não está no quanto você faz.

Mas em como você está tentando fazer.
`;
}

export default function Page() {
  const [data, setData] = useState("");
  const [genero, setGenero] = useState("feminino");
  const [started, setStarted] = useState(false);
  const [resultado, setResultado] = useState<any>(null);

  function calcular() {
    if (!data) return;

    const date = parseDate(data);
    const mapa = calcularMapa(date, genero);

    setResultado({
      ...mapa,
      leitura: gerarLeitura(mapa.e, mapa.ex, mapa.ext),
    });
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* CAPA */}
      {!started && (
        <div className="bg-gray-100 p-10 rounded-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">
            ENGENHARIA DOS PADRÕES PESSOAIS
          </h1>
          <p className="text-gray-500 mb-6">
            O problema não é esforço.<br />
            É como sua energia está sendo aplicada.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            Começar
          </button>
        </div>
      )}

      {/* FORM */}
      {started && !resultado && (
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
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            Ver minha engenharia
          </button>
        </div>
      )}

      {/* RESULTADO */}
      {resultado && (
        <div className="mt-6">

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[resultado.e, resultado.ex, resultado.ext].map((n, i) => {
              const en = energias[n];
              return (
                <div key={i} className="bg-gray-100 p-4 rounded-xl text-center">
                  <div className="text-sm text-gray-500">
                    {i === 0 ? "Essência" : i === 1 ? "Expressão" : "Externa"}
                  </div>
                  <div className="text-xl">{en.trigrama}</div>
                  <div className="text-3xl font-bold">{n}</div>
                  <div>{en.nome}</div>
                  <div className="text-xs text-gray-400">{en.arquétipo}</div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-100 p-5 rounded-xl whitespace-pre-line mb-6">
            {resultado.leitura}
          </div>

        </div>
      )}
    </div>
  );
}
