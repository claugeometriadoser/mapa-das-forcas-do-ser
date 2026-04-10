"use client";

import { useState } from "react";

export default function Page() {
  const [resultado, setResultado] = useState(false);

  function calcular() {
    setResultado(true);
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

          <button onClick={calcular} style={{ marginTop: 20 }}>
            Ver meu padrão
          </button>
        </>
      )}

      {resultado && (
        <>
          <h2>Seu padrão</h2>

          <p><strong>Essência:</strong> 6</p>
          <p><strong>Expressão:</strong> 3</p>
          <p><strong>Energia Externa:</strong> 8</p>

          <div style={{ marginTop: 20 }}>
            <p>
              Você tem uma base de responsabilidade forte, mas se movimenta com impulso e rapidez.
              Ao mesmo tempo, o ambiente te exige intensidade e presença.
            </p>

            <p>
              O desalinhamento aparece quando você começa antes de estruturar ou se recolhe
              quando deveria sustentar. Isso gera esforço constante e sensação de “quase lá”.
            </p>

            <p>
              O ajuste não é fazer mais. É sustentar o ciclo completo: iniciar, organizar e manter.
            </p>
          </div>
        </>
      )}

    </main>
  );
}
