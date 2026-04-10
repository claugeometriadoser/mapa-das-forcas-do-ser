"use client";

import { useState } from "react";

export default function Page() {
  const [data, setData] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  function calcular() {
    if (!data) return;

    // cálculo simples (placeholder inteligente)
    const numeros = data.replaceAll("-", "").split("").map(Number);

    const soma = numeros.reduce((a, b) => a + b, 0);

    const essencia = (soma % 9) || 9;
    const expressao = ((soma + 3) % 9) || 9;
    const externa = ((soma + 6) % 9) || 9;

    setResultado({ essencia, expressao, externa });
  }

  return (
    <main style={{ padding: 40, maxWidth: 600, margin: "0 auto" }}>

      {!resultado && (
        <>
          <h1>
            Três energias organizam como você decide, se relaciona e sustenta sua vida.
          </h1>

          <p>
            Esse mapa revela como elas estão distribuídas —
            e onde está o desalinhamento que está te desgastando.
          </p>

          <div style={{ marginTop: 20 }}>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{ padding: 10, width: "100%" }}
            />
          </div>

          <button onClick={calcular} style={{ marginTop: 20 }}>
            Ver meu padrão
          </button>
        </>
      )}

      {resultado && (
        <>
          <h2>Seu padrão</h2>

          <p><strong>Essência:</strong> {resultado.essencia}</p>
          <p><strong>Expressão:</strong> {resultado.expressao}</p>
          <p><strong>Energia Externa:</strong> {resultado.externa}</p>

          <div style={{ marginTop: 20 }}>
            <p>
              Sua energia não está distribuída de forma neutra.
              Existe um padrão claro de uso — e ele tem custo.
            </p>

            <p>
              O desgaste não vem do quanto você faz,
              mas de como você sustenta o que faz.
            </p>

            <p>
              Ajustar isso muda tudo.
            </p>
          </div>
        </>
      )}

    </main>
  );
}
