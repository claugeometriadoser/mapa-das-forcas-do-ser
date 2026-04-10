"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

type Resultado = {
  essencia: number;
  expressao: number;
  externa: number;
};

function nome(n: number) {
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
  return nomes[n];
}

function tipo(n: number) {
  if ([1, 3, 9].includes(n)) return "ativa";
  if ([2, 6, 8].includes(n)) return "estrutural";
  return "relacional";
}

function desc(n: number) {
  const d: any = {
    1: "fluxo e adaptação",
    2: "nutrir e sustentar",
    3: "início e impulso",
    4: "influência e penetração",
    5: "equilíbrio e eixo",
    6: "direção e comando",
    7: "troca e expressão",
    8: "limite e contenção",
    9: "expansão e visibilidade",
  };
  return d[n];
}

function gerarLeitura(e: number, ex: number, ext: number) {
  const tipoE = tipo(e);
  const tipoExt = tipo(ext);

  let conflito = "";

  if (tipoE === "ativa" && tipoExt === "estrutural") {
    conflito =
      "Você tenta avançar, mas a vida exige contenção.\nQuanto mais força movimento, mais encontra bloqueio.";
  } else if (tipoE === "estrutural" && tipoExt === "ativa") {
    conflito =
      "Você busca estabilidade, mas a vida exige movimento.\nIsso gera tensão e desgaste.";
  } else {
    conflito =
      "Existe um desalinhamento entre como você opera e o que o momento exige.";
  }

  if (e !== ex) {
    conflito +=
      "\n\nVocê não está agindo de forma coerente com o que sustenta por dentro.";
  }

  return `
Existe um desalinhamento na forma como sua energia está operando.

Por dentro, você funciona com ${desc(e)}.
Na prática, você se move com ${desc(ex)}.

Mas a vida está te colocando em um cenário de ${desc(ext)}.

${conflito}

O desgaste não vem da falta de capacidade.
Vem da forma como sua energia está sendo aplicada.
`;
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  function calcular() {
    if (!data || !sexo) return;

    const map = calculateMap(data, sexo);

    setResultado({
      essencia: map.essential.number,
      expressao: map.expression.number,
      externa: map.personal.number,
    });

    setStep(2);
  }

  const box: React.CSSProperties = {
    background: "white",
    padding: 32,
    borderRadius: 16,
    maxWidth: 520,
    width: "100%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  };

  const title: React.CSSProperties = {
    fontSize: 28,
    lineHeight: "34px",
    marginBottom: 16,
    textAlign: "center",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "#f7f7f7",
      }}
    >
      <div style={box}>
        {/* TELA 1 */}
        {step === 0 && (
          <>
            <h1 style={title}>
              ENGENHARIA <br />
              DOS PADRÕES PESSOAIS
            </h1>

            <p style={{ marginBottom: 8 }}>
              Três energias organizam como você decide, se relaciona e sustenta
              sua vida.
            </p>

            <p style={{ color: "#555", marginBottom: 24 }}>
              Esse mapa revela como elas estão distribuídas — e onde está o
              desalinhamento que está te desgastando.
            </p>

            <button
              onClick={() => setStep(1)}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 12,
                background: "black",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Começar
            </button>
          </>
        )}

        {/* TELA 2 */}
        {step === 1 && (
          <>
            <h2 style={{ marginBottom: 16 }}>Seus dados</h2>

            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                marginBottom: 16,
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            />

            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                marginBottom: 20,
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            >
              <option value="">Sexo</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
            </select>

            <button
              onClick={calcular}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 12,
                background: "black",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Ver meu padrão
            </button>
          </>
        )}

        {/* RESULTADO */}
        {step === 2 && resultado && (
          <>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Como sua energia está organizada
            </h2>

            <div style={{ marginBottom: 20 }}>
              <p>
                <strong>Essência:</strong> {resultado.essencia} —{" "}
                {nome(resultado.essencia)}
              </p>
              <p>
                <strong>Expressão:</strong> {resultado.expressao} —{" "}
                {nome(resultado.expressao)}
              </p>
              <p>
                <strong>Energia Externa:</strong> {resultado.externa} —{" "}
                {nome(resultado.externa)}
              </p>
            </div>

            <div
              style={{
                background: "#f1f1f1",
                padding: 20,
                borderRadius: 12,
                whiteSpace: "pre-line",
                lineHeight: 1.5,
              }}
            >
              {gerarLeitura(
                resultado.essencia,
                resultado.expressao,
                resultado.externa
              )}
            </div>

            <a
              href="https://wa.me/5511987545477"
              target="_blank"
              style={{
                display: "block",
                marginTop: 20,
                textAlign: "center",
                background: "black",
                color: "white",
                padding: 16,
                borderRadius: 12,
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Quero entender esse padrão na minha vida
            </a>
          </>
        )}
      </div>
    </main>
  );
}
