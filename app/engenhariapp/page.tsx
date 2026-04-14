"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

const energias: any = {
  1: { nome: "Água", tipo: "ativa", verbo: "sentir antes de agir", sombra: "se perde no fluxo", missao: "confiar no timing" },
  2: { nome: "Terra", tipo: "estrutural", verbo: "sustentar e absorver", sombra: "assume peso demais", missao: "colocar limites" },
  3: { nome: "Trovão", tipo: "ativa", verbo: "agir rápido e ajustar depois", sombra: "se precipita", missao: "transformar impulso em direção" },
  4: { nome: "Vento", tipo: "relacional", verbo: "ajustar antes de se posicionar", sombra: "se dispersa", missao: "se posicionar com clareza" },
  5: { nome: "Centro", tipo: "relacional", verbo: "buscar equilíbrio", sombra: "fica neutra demais", missao: "escolher direção" },
  6: { nome: "Céu", tipo: "estrutural", verbo: "saber o que precisa ser feito", sombra: "trava na execução", missao: "agir com consistência" },
  7: { nome: "Lago", tipo: "relacional", verbo: "buscar leveza", sombra: "evita profundidade", missao: "sustentar o desconforto" },
  8: { nome: "Montanha", tipo: "estrutural", verbo: "conter e segurar movimento", sombra: "bloqueia avanço", missao: "liberar no tempo certo" },
  9: { nome: "Fogo", tipo: "ativa", verbo: "expandir e se expor", sombra: "exagera intensidade", missao: "direcionar energia" }
};

function leituraPremium(e: number, ex: number, ext: number) {
  const E = energias[e];
  const X = energias[ex];
  const OUT = energias[ext];

  let texto = "";

  // 🔥 FRASE DE RECONHECIMENTO (INTELIGENTE)
  if (X.tipo === "ativa" && OUT.tipo === "estrutural") {
    texto += "Você faz.\nMas parece que nada anda.\n\n";
  } else if (X.tipo === "estrutural" && OUT.tipo === "ativa") {
    texto += "Você tenta organizar.\nMas a vida não espera.\n\n";
  } else if (E.tipo !== X.tipo) {
    texto += "Você sabe.\nMas não age na mesma direção.\n\n";
  } else {
    texto += "Você está fazendo.\nMas não está avançando.\n\n";
  }

  // 🔥 COMPORTAMENTO REAL
  texto += `Por dentro, você tende a ${E.verbo}.\n`;
  texto += `Na prática, você tende a ${X.verbo}.\n`;
  texto += `O ambiente tende a conter e limitar movimento.\n\n`;

  // 🔥 TENSÃO
  if (X.tipo === "ativa" && OUT.tipo === "estrutural") {
    texto += "Você acelera.\nMas encontra resistência.\n\n";
  }

  if (E.tipo !== X.tipo) {
    texto += "Existe um descompasso entre o que você sustenta e o que você executa.\n\n";
  }

  // 🔥 INTERPRETAÇÃO EMOCIONAL REAL
  texto += "Isso cria um padrão silencioso:\n\n";
  texto += "Você começa com clareza.\n";
  texto += "Mas não sustenta o tempo necessário.\n\n";
  texto += "Então tenta ajustar no caminho.\n";
  texto += "Depois força.\n\n";
  texto += "E quanto mais força,\nmenos flui.\n\n";

  // 🔥 FECHAMENTO
  texto += "O desgaste não está no quanto você faz.\n";
  texto += "Está em como você está tentando fazer.";

  return texto;
}

export default function Page() {
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  function gerar() {
    if (!data || !sexo) return;

    const map = calculateMap(new Date(data), sexo);

    const e = map.essential.number;
    const ex = map.expression.number;
    const ext = map.personal.number;

    setResultado({
      e,
      ex,
      ext,
      texto: leituraPremium(e, ex, ext)
    });
  }

  return (
    <div style={{ padding: 24, maxWidth: 520, margin: "0 auto" }}>
      
      {/* CAPA */}
      {!resultado && (
        <div style={{ textAlign: "center", marginTop: 60 }}>
          <h1 style={{ fontSize: 28, fontWeight: 600 }}>
            ENGENHARIA
            <br />
            DOS PADRÕES PESSOAIS
          </h1>

          <p style={{ marginTop: 12, opacity: 0.6 }}>
            O problema não é esforço.
            <br />
            É como sua energia está sendo aplicada.
          </p>

          <button
            onClick={() => setResultado({})}
            style={{
              marginTop: 24,
              padding: "14px 24px",
              borderRadius: 12,
              background: "#000",
              color: "#fff",
              fontWeight: 600
            }}
          >
            Começar
          </button>
        </div>
      )}

      {/* FORM */}
      {resultado && !resultado.texto && (
        <div style={{ marginTop: 40 }}>
          <input
            type="date"
            onChange={(e) => setData(e.target.value)}
            style={{ width: "100%", padding: 12, marginBottom: 12 }}
          />

          <select
            onChange={(e) => setSexo(e.target.value)}
            style={{ width: "100%", padding: 12, marginBottom: 12 }}
          >
            <option>Sexo</option>
            <option value="female">Feminino</option>
            <option value="male">Masculino</option>
          </select>

          <button
            onClick={gerar}
            style={{
              width: "100%",
              padding: 16,
              background: "#000",
              color: "#fff",
              borderRadius: 12
            }}
          >
            Ver minha engenharia
          </button>
        </div>
      )}

      {/* RESULTADO */}
      {resultado?.texto && (
        <div style={{ marginTop: 40 }}>
          <h3>Essência {resultado.e}</h3>
          <h3>Expressão {resultado.ex}</h3>
          <h3>Externa {resultado.ext}</h3>

          <div
            style={{
              marginTop: 20,
              padding: 20,
              borderRadius: 12,
              background: "#eee",
              whiteSpace: "pre-line"
            }}
          >
            {resultado.texto}
          </div>

          <button
            style={{
              marginTop: 20,
              width: "100%",
              padding: 16,
              background: "#000",
              color: "#fff",
              borderRadius: 12
            }}
          >
            Quero aprofundar essa engenharia na minha vida
          </button>
        </div>
      )}
    </div>
  );
}
