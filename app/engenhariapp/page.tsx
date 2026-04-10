"use client";

import { useState } from "react";

export default function Page() {
  const [resultado, setResultado] = useState("");

  function calcular() {
    setResultado("ok");
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Engenharia dos Padrões</h1>

      <button onClick={calcular}>
        Ver meu padrão
      </button>

      {resultado && <p>{resultado}</p>}
    </main>
  );
}
