"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

const energias: any = {
  1: { nome: "Água", tipo: "ativa", arquetipo: "A Sensitiva", luz: "percepção e adaptação", sombra: "se perde no fluxo", missao: "confiar no timing", pratica: "sentir antes de agir" },
  2: { nome: "Terra", tipo: "estrutural", arquetipo: "A Sustentadora", luz: "suporte e cuidado", sombra: "assume peso demais", missao: "colocar limites", pratica: "absorver e sustentar" },
  3: { nome: "Trovão", tipo: "ativa", arquetipo: "A Iniciadora", luz: "ação e impulso", sombra: "se precipita", missao: "sustentar o que começa", pratica: "agir rápido e ajustar depois" },
  4: { nome: "Vento", tipo: "relacional", arquetipo: "A Influenciadora", luz: "comunicação e influência", sombra: "se dispersa", missao: "se posicionar com clareza", pratica: "ajustar antes de se posicionar" },
  5: { nome: "Centro", tipo: "relacional", arquetipo: "A Equilibradora", luz: "visão sistêmica", sombra: "fica neutra demais", missao: "escolher direção", pratica: "buscar equilíbrio constante" },
  6: { nome: "Céu", tipo: "estrutural", arquetipo: "A Estrategista", luz: "direção e visão", sombra: "trava na execução", missao: "agir com consistência", pratica: "saber o que precisa ser feito" },
  7: { nome: "Lago", tipo: "relacional", arquetipo: "A Comunicadora", luz: "leveza e troca", sombra: "evita profundidade", missao: "sustentar o desconforto", pratica: "buscar leveza e evitar conflito" },
  8: { nome: "Montanha", tipo: "estrutural", arquetipo: "A Guardiã", luz: "limite e estrutura", sombra: "bloqueia avanço", missao: "liberar no tempo certo", pratica: "conter e segurar movimento" },
  9: { nome: "Fogo", tipo: "ativa", arquetipo: "A Visionária", luz: "expansão e visibilidade", sombra: "exagera intensidade", missao: "direcionar energia", pratica: "se expor e expandir" }
};

function leitura(e: number, ex: number, ext: number) {
  const E = energias[e];
  const X = energias[ex];
  const OUT = energias[ext];

  let t = "";

  // 🔥 comportamento (base)
  t += `Por dentro, você tende a ${E.pratica}.\n`;
  t += `Na prática, você tende a ${X.pratica}.\n`;
  t += `O ambiente tende a ${OUT.pratica}.\n\n`;

  // 🔥 tensão dinâmica
  if (X.tipo === "ativa" && OUT.tipo === "estrutural") {
    t += "Você acelera.\nMas encontra contenção.\n\n";
  }

  if (X.tipo === "estrutural" && OUT.tipo === "ativa") {
    t += "Você tenta manter controle.\nMas a vida pede movimento.\n\n";
  }

  if (E.tipo !== X.tipo) {
    t += "Existe um descompasso entre o que você sustenta e o que você executa.\n\n";
  }

  // 🔥 interpretação
  t += "Isso cria um padrão:\n\n";
  t += "Você começa dentro de uma lógica.\n";
  t += "Mas precisa ajustar no meio do caminho.\n\n";
  t += "Então força.\n";
  t += "E quanto mais força,\nmenos flui.\n\n";

  t += "O desgaste não está no quanto você faz.\n";
  t += "Mas em como você está tentando fazer.";

  return t;
}

export default function Page() {
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [res, setRes] = useState<any>(null);

  function gerar() {
    if (!data || !sexo) return;

    const map = calculateMap(new Date(data), sexo);

    const e = map.essential.number;
    const ex = map.expression.number;
    const ext = map.personal.number;

    setRes({
      e,
      ex,
      ext,
      texto: leitura(e, ex, ext)
    });
  }

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 24 }}>

      {!res && (
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <h1 style={{ fontSize: 26, lineHeight: 1.2 }}>
            ENGENHARIA
            <br />
            DOS PADRÕES PESSOAIS
          </h1>

          <p style={{ marginTop: 12, opacity: 0.6 }}>
            O problema não é esforço.
            <br />
            É como sua energia está sendo distribuída.
          </p>

          <button
            onClick={() => setRes({})}
            style={{ marginTop: 24, padding: "12px 20px", background: "#000", color: "#fff", borderRadius: 10 }}
          >
            Começar
          </button>
        </div>
      )}

      {res && !res.texto && (
        <div style={{ marginTop: 40 }}>
          <input type="date" onChange={(e) => setData(e.target.value)} style={{ width: "100%", marginBottom: 12, padding: 12 }} />

          <select onChange={(e) => setSexo(e.target.value)} style={{ width: "100%", padding: 12 }}>
            <option>Sexo</option>
            <option value="female">Feminino</option>
            <option value="male">Masculino</option>
          </select>

          <button onClick={gerar} style={{ width: "100%", marginTop: 16, padding: 14, background: "#000", color: "#fff", borderRadius: 10 }}>
            Ver minha engenharia
          </button>
        </div>
      )}

      {res?.texto && (
        <div style={{ marginTop: 40 }}>

          {/* 🔝 RESUMO */}
          {[res.e, res.ex, res.ext].map((n, i) => {
            const labels = ["Essência", "Expressão", "Externa"];
            const en = energias[n];

            return (
              <div key={i} style={{ marginBottom: 12 }}>
                <strong>{labels[i]}: {n} — {en.nome}</strong>
                <div style={{ fontSize: 13, opacity: 0.6 }}>{en.arquetipo}</div>
              </div>
            );
          })}

          {/* 🧠 LUZ / SOMBRA / MISSÃO */}
          <div style={{ marginTop: 20 }}>
            {[res.e, res.ex, res.ext].map((n, i) => {
              const en = energias[n];
              const labels = ["Essência", "Expressão", "Externa"];

              return (
                <div key={i} style={{ marginBottom: 14 }}>
                  <strong>{labels[i]} — {en.nome}</strong>
                  <div style={{ fontSize: 14 }}>
                    Luz: {en.luz} <br />
                    Sombra: {en.sombra} <br />
                    Missão: {en.missao}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 👁️ COMPORTAMENTO + LEITURA */}
          <div style={{ marginTop: 20, padding: 18, background: "#eee", borderRadius: 12, whiteSpace: "pre-line" }}>
            {res.texto}
          </div>

          {/* 🎯 CTA */}
          <button style={{ marginTop: 20, width: "100%", padding: 16, background: "#000", color: "#fff", borderRadius: 12 }}>
            Quero entender onde estou me forçando sem perceber
          </button>

        </div>
      )}
    </div>
  );
}
