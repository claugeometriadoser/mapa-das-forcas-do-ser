"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

function getTipo(n: number) {
  if ([1, 3, 9].includes(n)) return "ativa";
  if ([2, 6, 8].includes(n)) return "estrutural";
  return "relacional";
}

function desc(n: number) {
  const d: any = {
    1: "fluxo e adaptação",
    2: "nutrir e sustentar",
    3: "impulso e início",
    4: "influência e penetração",
    5: "equilíbrio e eixo",
    6: "direção e comando",
    7: "troca e expressão",
    8: "limite e contenção",
    9: "expansão e visibilidade",
  };
  return d[n];
}

function gerarLeitura(map: any) {
  const e = map.essential.number;
  const ex = map.expression.number;
  const ext = map.personal.number;

  const tipoE = getTipo(e);
  const tipoEx = getTipo(ex);
  const tipoExt = getTipo(ext);

  let conflito = "";
  let coerencia = "";
  let compensacao = "";

  // conflito externo
  if (tipoE === "ativa" && tipoExt === "estrutural") {
    conflito = "Você tenta avançar, mas a vida exige contenção.";
  }

  if (tipoE === "estrutural" && tipoExt === "ativa") {
    conflito = "Você busca estabilidade, mas a vida exige movimento.";
  }

  // coerência interna
  if (e !== ex) {
    coerencia =
      "Você não está agindo de forma coerente com o que sustenta por dentro.";
  }

  // compensação
  if (tipoExt === "estrutural" && tipoEx === "ativa") {
    compensacao =
      "Você tenta compensar o bloqueio com mais ação — e isso te desgasta.";
  }

  return `
Existe um desalinhamento na forma como sua energia está operando.

Por dentro, você funciona com ${desc(e)}.
Na prática, você se move com ${desc(ex)}.

Mas a vida está te colocando em um cenário de ${desc(ext)}.

${conflito}

${coerencia}

${compensacao}

O desgaste não vem da falta de capacidade.
Vem da forma como sua energia está sendo aplicada.
`;
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  function calcular() {
    if (!data || !sexo) return;

    const date = new Date(data + "T00:00:00");
    const map = calculateMap(date, sexo);

    setResultado({
      ...map,
      leitura: gerarLeitura(map),
    });

    setStep(2);
  }

  return (
    <main style={main}>
      <div style={container}>

        {step === 0 && (
          <>
            <h1 style={title}>
              ENGENHARIA DOS PADRÕES PESSOAIS
            </h1>

            <p style={text}>
              Três energias organizam como você decide, se relaciona e sustenta sua vida.
            </p>

            <p style={subtext}>
              Esse mapa revela como elas estão distribuídas —
              e onde está o desalinhamento que está te desgastando.
            </p>

            <button style={btn} onClick={() => setStep(1)}>
              Começar
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h2 style={subtitle}>Seus dados</h2>

            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={input}
            />

            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              style={input}
            >
              <option value="">Sexo</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
            </select>

            <button style={btn} onClick={calcular}>
              Ver meu mapa
            </button>
          </>
        )}

        {step === 2 && resultado && (
          <>
            <h2 style={subtitleCenter}>
              Como sua energia está organizada
            </h2>

            <div style={grid}>
              {[
                { label: "Essência", data: resultado.essential },
                { label: "Expressão", data: resultado.expression },
                { label: "Energia Externa", data: resultado.personal }
              ].map((item, i) => (
                <div key={i} style={card}>
                  <div style={label}>{item.label}</div>
                  <div style={trigram}>{item.data.trigram}</div>
                  <div style={numero}>{item.data.number}</div>
                  <div style={nome}>{item.data.name}</div>
                </div>
              ))}
            </div>

            <div style={leituraBox}>
              <pre style={leituraText}>
                {resultado.leitura}
              </pre>
            </div>

            <button
              style={cta}
              onClick={() =>
                window.open(
                  "https://wa.me/5511987545477?text=Quero%20entender%20meu%20padr%C3%A3o%20energ%C3%A9tico",
                  "_blank"
                )
              }
            >
              Quero entender esse padrão na minha vida
            </button>
          </>
        )}

      </div>
    </main>
  );
}

/* estilos */

const main = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  background: "#f4f4f4",
  fontFamily: "system-ui"
};

const container = {
  background: "white",
  padding: 28,
  borderRadius: 16,
  maxWidth: 420,
  width: "100%",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
};

const title = { fontSize: 22, marginBottom: 12 };
const subtitle = { marginBottom: 12 };
const subtitleCenter = { textAlign: "center", marginBottom: 16 };
const text = { marginBottom: 8 };
const subtext = { color: "#666", marginBottom: 20 };

const btn = {
  width: "100%",
  padding: 14,
  borderRadius: 10,
  border: "none",
  background: "#111",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 14,
  borderRadius: 8,
  border: "1px solid #ddd"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 10,
  marginBottom: 18
};

const card = {
  border: "1px solid #eee",
  borderRadius: 12,
  padding: 14,
  textAlign: "center",
  background: "#fafafa"
};

const label = {
  fontSize: 10,
  textTransform: "uppercase",
  color: "#999",
  marginBottom: 6
};

const trigram = { fontSize: 24, marginBottom: 4 };
const numero = { fontWeight: "bold", fontSize: 16 };
const nome = { fontSize: 11, color: "#666" };

const leituraBox = {
  background: "#f5f5f5",
  padding: 16,
  borderRadius: 12,
  marginBottom: 16
};

const leituraText = {
  whiteSpace: "pre-line",
  fontSize: 14,
  lineHeight: 1.5,
  color: "#333"
};

const cta = {
  width: "100%",
  padding: 14,
  borderRadius: 10,
  border: "none",
  background: "black",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};
