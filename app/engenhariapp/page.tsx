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

    return {
      essencia: `${e.name} representa sua base. É de onde você parte.`,
      expressao: `${ex.name} mostra como você age e se movimenta.`,
      externa: `${ext.name} é o tipo de cenário que a vida está te colocando.`,
      conflito: `Você funciona de um jeito, se expressa de outro, mas a vida exige uma terceira direção.`,
      desgaste: `O desgaste não vem da quantidade de esforço. Vem da forma como sua energia está sendo aplicada.`
    };
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
              <p><strong>Existe um desalinhamento na forma como sua energia está operando.</strong></p>

              <p><strong>Essência:</strong> {resultado.leitura.essencia}</p>
              <p><strong>Expressão:</strong> {resultado.leitura.expressao}</p>
              <p><strong>Energia Externa:</strong> {resultado.leitura.externa}</p>

              <p>{resultado.leitura.conflito}</p>

              <p>{resultado.leitura.desgaste}</p>
            </div>

            <button
              style={cta}
              onClick={() =>
                window.open("https://wa.me/SEUNUMEROAQUI", "_blank")
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

/* 🎨 ESTILO */

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

const title = {
  fontSize: 22,
  marginBottom: 12
};

const subtitle = {
  marginBottom: 12
};

const subtitleCenter = {
  textAlign: "center" as const,
  marginBottom: 16
};

const text = {
  marginBottom: 8
};

const subtext = {
  color: "#666",
  marginBottom: 20
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
  textAlign: "center" as const,
  background: "#fafafa"
};

const label = {
  fontSize: 10,
  textTransform: "uppercase" as const,
  color: "#999",
  marginBottom: 6
};

const trigram = {
  fontSize: 24,
  marginBottom: 4
};

const numero = {
  fontWeight: "bold",
  fontSize: 16
};

const nome = {
  fontSize: 11,
  color: "#666"
};

const leituraBox = {
  background: "#f5f5f5",
  padding: 16,
  borderRadius: 12,
  fontSize: 14,
  lineHeight: 1.5,
  marginBottom: 16
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
