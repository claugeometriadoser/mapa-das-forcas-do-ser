"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

export default function Page() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  function gerarLeitura(res: any) {
    const e = res.essential;
    const ex = res.expression;
    const ext = res.personal;

    return `
Existe um desalinhamento na forma como sua energia está operando.

Por dentro, você funciona com ${e.name.toLowerCase()}.
Na forma como se expressa, você se move com ${ex.name.toLowerCase()}.

Mas o ambiente que te cerca é de ${ext.name.toLowerCase()}.

Isso cria um conflito entre o que você tenta fazer
e o que a vida está exigindo de você.

Você aplica energia em uma direção,
mas encontra resposta em outra.

E é isso que gera desgaste.

Não é falta de capacidade.
É desalinhamento na forma como sua energia está sendo aplicada.
`;
  }

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

        {/* TELA 1 */}
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

        {/* TELA 2 */}
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

        {/* RESULTADO */}
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
          </>
        )}

      </div>
    </main>
  );
}

/* 🎨 ESTILOS */

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
  padding: 32,
  borderRadius: 16,
  maxWidth: 420,
  width: "100%",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
};

const title = {
  fontSize: 22,
  marginBottom: 16
};

const subtitle = {
  marginBottom: 16
};

const subtitleCenter = {
  textAlign: "center" as const,
  marginBottom: 20
};

const text = {
  marginBottom: 10
};

const subtext = {
  color: "#666",
  marginBottom: 24
};

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
  marginBottom: 16,
  borderRadius: 8,
  border: "1px solid #ddd"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 12,
  marginBottom: 24
};

const card = {
  border: "1px solid #eee",
  borderRadius: 12,
  padding: 16,
  textAlign: "center" as const,
  background: "#fafafa"
};

const label = {
  fontSize: 11,
  textTransform: "uppercase" as const,
  color: "#999",
  marginBottom: 8
};

const trigram = {
  fontSize: 28,
  marginBottom: 6
};

const numero = {
  fontWeight: "bold",
  fontSize: 18
};

const nome = {
  fontSize: 12,
  color: "#666"
};

const leituraBox = {
  padding: 20,
  borderRadius: 12,
  background: "#f5f5f5"
};

const leituraText = {
  whiteSpace: "pre-line" as const,
  fontSize: 14,
  lineHeight: 1.6,
  color: "#333"
};
