"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

/* 🔷 BASE COMPLETA */
const energias: any = {
  1: {
    nome: "Água",
    arquetipo: "A Adaptadora",
    luz: "se adapta com fluidez e lê o ambiente",
    sombra: "evita confronto e se perde na direção",
    missao: "sustentar direção mesmo em movimento",
    comportamento: "tende a sentir antes de agir e pode demorar a se posicionar"
  },
  2: {
    nome: "Terra",
    arquetipo: "A Sustentadora",
    luz: "nutre, sustenta e dá base",
    sombra: "se sobrecarrega e assume mais do que deveria",
    missao: "sustentar sem se anular",
    comportamento: "tende a assumir responsabilidades e carregar mais do que é seu"
  },
  3: {
    nome: "Trovão",
    arquetipo: "A Iniciadora",
    luz: "inicia, ativa e coloca energia em movimento",
    sombra: "impulsividade e ação sem direção",
    missao: "transformar impulso em consistência",
    comportamento: "tende a agir rápido e depois ajustar"
  },
  4: {
    nome: "Vento",
    arquetipo: "A Influenciadora",
    luz: "comunica, conecta e influencia",
    sombra: "dispersão e falta de sustentação",
    missao: "alinhar comunicação com intenção",
    comportamento: "tende a ajustar o discurso antes de se posicionar"
  },
  5: {
    nome: "Centro",
    arquetipo: "O Eixo",
    luz: "organiza, equilibra e centraliza",
    sombra: "controle excessivo e rigidez interna",
    missao: "confiar mais no fluxo do que no controle",
    comportamento: "tende a tentar organizar tudo ao redor"
  },
  6: {
    nome: "Céu",
    arquetipo: "A Estrategista",
    luz: "direciona, lidera e enxerga o todo",
    sombra: "rigidez, controle e excesso de comando",
    missao: "liderar com flexibilidade",
    comportamento: "tende a saber o que precisa ser feito, mas pode travar na execução"
  },
  7: {
    nome: "Lago",
    arquetipo: "A Expressiva",
    luz: "expressa, conecta e cria leveza",
    sombra: "superficialidade e fuga do desconforto",
    missao: "aprofundar vínculos e presença",
    comportamento: "tende a evitar tensão e priorizar o agradável"
  },
  8: {
    nome: "Montanha",
    arquetipo: "A Guardiã",
    luz: "sustenta, protege e cria limite",
    sombra: "bloqueio, rigidez e estagnação",
    missao: "discernir quando sustentar e quando liberar",
    comportamento: "tende a segurar, conter e evitar movimento"
  },
  9: {
    nome: "Fogo",
    arquetipo: "A Reveladora",
    luz: "expande, ilumina e dá visibilidade",
    sombra: "excesso, ansiedade e dramatização",
    missao: "expandir com direção",
    comportamento: "tende a intensificar tudo o que toca"
  }
};

/* 🔥 LEITURA GERAL */
function leituraFinal(e: number, ex: number, ext: number) {
  if (e === 6 && ex === 3 && ext === 8) {
    return `
Existe direção por dentro,
mas o movimento acontece rápido demais.

E o ambiente responde com limite.

Isso cria uma sensação de esforço sem avanço.

Você faz,
mas encontra resistência.

E quanto mais força,
mais trava.

O ponto não é capacidade.

É o ritmo em que você está operando.
`;
  }

  return `
Existe um descompasso na forma como sua energia está sendo aplicada.

O que você sustenta por dentro,
o que você faz,
e o que a vida pede,
não estão na mesma direção.

E isso gera desgaste.
`;
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [resultado, setResultado]: any = useState(null);

  function calcular() {
    if (!data || !sexo) return;

    const [ano, mes, dia] = data.split("-");
    const dataObj = new Date(Number(ano), Number(mes) - 1, Number(dia));

    const map = calculateMap(dataObj, sexo);

    setResultado({
      e: map.essential.number,
      ex: map.expression.number,
      ext: map.personal.number
    });

    setStep(2);
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#f5f5f5" }}>
      <div style={{ background: "white", padding: 32, borderRadius: 20, maxWidth: 520, width: "100%" }}>

        {step === 0 && (
          <>
            <h1 style={{ textAlign: "center", marginBottom: 20 }}>
              ENGENHARIA <br /> DOS PADRÕES PESSOAIS
            </h1>
            <button onClick={() => setStep(1)}>Começar</button>
          </>
        )}

        {step === 1 && (
          <>
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
            <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
              <option value="">Sexo</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
            </select>
            <button onClick={calcular}>Ver minha engenharia</button>
          </>
        )}

        {step === 2 && resultado && (
          <>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Como suas energias estão organizadas
            </h2>

            {/* 🔥 BLOCO COMPLETO DAS 3 ENERGIAS */}
            {[ 
              { label: "Essência", valor: resultado.e },
              { label: "Expressão", valor: resultado.ex },
              { label: "Energia Externa", valor: resultado.ext }
            ].map((item, i) => {
              const en = energias[item.valor];

              return (
                <div key={i} style={{
                  marginBottom: 20,
                  padding: 16,
                  borderRadius: 14,
                  background: "#f1f1f1"
                }}>
                  <strong>{item.label}: {en.nome}</strong>

                  <p><strong>Arquétipo:</strong> {en.arquetipo}</p>
                  <p><strong>Luz:</strong> {en.luz}</p>
                  <p><strong>Sombra:</strong> {en.sombra}</p>
                  <p><strong>Missão:</strong> {en.missao}</p>
                  <p><strong>Na prática:</strong> {en.comportamento}</p>
                </div>
              );
            })}

            {/* 🔥 INTERPRETAÇÃO */}
            <div style={{
              background: "#e9e9e9",
              padding: 16,
              borderRadius: 14,
              whiteSpace: "pre-line"
            }}>
              {leituraFinal(resultado.e, resultado.ex, resultado.ext)}
            </div>

            {/* 🔥 CTA */}
            <a href="https://wa.me/5511987545477" target="_blank">
              Quero aprofundar essa engenharia na minha vida
            </a>
          </>
        )}

      </div>
    </main>
  );
}
