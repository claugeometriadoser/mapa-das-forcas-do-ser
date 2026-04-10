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
    const map = calculateMap(date, sexo);

    setResultado(map);
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

        {step === 0 && (
          <>
            <h1>ENGENHARIA DOS PADRÕES PESSOAIS</h1>

            <p>
              Três energias organizam como você decide, se relaciona e sustenta sua vida.
            </p>

            <p style={{ marginBottom: 20 }}>
              Esse mapa revela como elas estão distribuídas —
              e onde está o desalinhamento que está te desgastando.
            </p>

            <button onClick={() => setStep(1)}>Começar</button>
          </>
        )}

        {step === 1 && (
          <>
            <h2>Seus dados</h2>

            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />

            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
            >
              <option value="">Sexo</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
            </select>

            <button onClick={calcular}>
              Ver meu padrão
            </button>
          </>
        )}

        {step === 2 && resultado && (
          <>
            <h2>Como sua energia está organizada</h2>

            <p>
              <strong>Essência:</strong> {resultado.essential.number} — {resultado.essential.name}
            </p>

            <p>
              <strong>Expressão:</strong> {resultado.expression.number} — {resultado.expression.name}
            </p>

            <p>
              <strong>Energia Externa:</strong> {resultado.personal.number} — {resultado.personal.name}
            </p>
          </>
        )}

      </div>
    </main>
  );
}
