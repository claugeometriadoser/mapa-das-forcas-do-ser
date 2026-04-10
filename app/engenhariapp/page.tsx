"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

export default function Page() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  function calcular() {
    if (!data || !sexo) return;

    const date = new Date(data + "T00:00:00");
    const result = calculateMap(date, sexo);

    setResultado(result);
    setStep(2);
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background: "#f7f7f7"
    }}>
      
      <div style={{
        background: "white",
        padding: 32,
        borderRadius: 16,
        maxWidth: 420,
        width: "100%",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}>

        {/* TELA 1 */}
        {step === 0 && (
          <>
            <h1 style={{ fontSize: 22, marginBottom: 12 }}>
              ENGENHARIA DOS PADRÕES PESSOAIS
            </h1>

            <p style={{ marginBottom: 12 }}>
              Três energias organizam como você decide, se relaciona e sustenta sua vida.
            </p>

            <p style={{ color: "#555", marginBottom: 24 }}>
              Esse mapa revela como elas estão distribuídas —
              e onde está o desalinhamento que está te desgastando.
            </p>

            <button
              onClick={() => setStep(1)}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 10,
                border: "none",
                background: "black",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
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
                border: "1px solid #ddd"
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
                border: "1px solid #ddd"
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
                padding: 14,
                borderRadius: 10,
                border: "none",
                background: "black",
                color: "white",
                fontWeight: "bold"
              }}
            >
              Ver meu mapa
            </button>
          </>
        )}

        {/* RESULTADO */}
        {step === 2 && resultado && (
          <>
            <h2 style={{ marginBottom: 16 }}>
              Como sua energia está organizada
            </h2>

            <p>
              <strong>Essência:</strong> {resultado.essential.number} — {resultado.essential.name}
            </p>

            <p>
              <strong>Expressão:</strong> {resultado.expression.number} — {resultado.expression.name}
            </p>

            <p>
              <strong>Energia Externa:</strong> {resultado.personal.number} — {resultado.personal.name}
            </p>

            <div style={{ marginTop: 20, color: "#444" }}>
              <p>
                O que desgasta não é a quantidade de esforço.
                É onde sua energia está sendo mal direcionada.
              </p>

              <p>
                Quando essas três forças não trabalham juntas,
                você entra em compensação — e isso cansa.
              </p>

              <p>
                Esse resultado mostra onde está o desvio.
              </p>
            </div>
          </>
        )}

      </div>
    </main>
  );
}
