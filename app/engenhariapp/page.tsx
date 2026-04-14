"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

const energias: any = {
  1: { nome: "Água", arquetipo: "A Adaptadora", luz: "flui e se ajusta", sombra: "evita confronto", missao: "confiar no fluxo com direção", comportamento: "tende a se adaptar demais e evitar confronto" },
  2: { nome: "Terra", arquetipo: "A Sustentadora", luz: "cuida e suporta", sombra: "se sobrecarrega", missao: "nutrir sem se anular", comportamento: "tende a assumir responsabilidades demais" },
  3: { nome: "Trovão", arquetipo: "A Iniciadora", luz: "age e inicia", sombra: "se precipita", missao: "sustentar o que começa", comportamento: "tende a agir rápido e ajustar depois" },
  4: { nome: "Vento", arquetipo: "A Influenciadora", luz: "comunica e influencia", sombra: "se dispersa", missao: "alinhar comunicação com intenção", comportamento: "tende a ajustar antes de se posicionar" },
  5: { nome: "Centro", arquetipo: "A Integradora", luz: "equilibra", sombra: "se perde na dúvida", missao: "agir com clareza interna", comportamento: "tende a analisar demais antes de agir" },
  6: { nome: "Céu", arquetipo: "A Estrategista", luz: "direciona e lidera", sombra: "trava na execução", missao: "agir com consistência", comportamento: "tende a saber o que precisa, mas não sustenta execução" },
  7: { nome: "Lago", arquetipo: "A Comunicadora", luz: "expressa e conecta", sombra: "busca aprovação", missao: "se expressar com verdade", comportamento: "tende a agradar antes de se posicionar" },
  8: { nome: "Montanha", arquetipo: "A Guardiã", luz: "estrutura e protege", sombra: "bloqueia avanço", missao: "liberar no tempo certo", comportamento: "tende a conter e evitar movimento" },
  9: { nome: "Fogo", arquetipo: "A Visionária", luz: "expande e ilumina", sombra: "se dispersa", missao: "focar para realizar", comportamento: "tende a se empolgar e não concluir" },
};

function tipo(n: number) {
  if ([1,3,9].includes(n)) return "ativa";
  if ([2,6,8].includes(n)) return "estrutural";
  return "relacional";
}

/* 🔥 HEADLINE DINÂMICA */
function gerarHeadline(e: number, ex: number, ext: number) {
  const tE = tipo(e);
  const tExt = tipo(ext);

  if (tE === "ativa" && tExt === "estrutural") {
    return "Você tenta avançar — mas algo sempre trava."
  }

  if (tE === "estrutural" && tExt === "ativa") {
    return "Você tenta manter controle — mas a vida pede movimento."
  }

  if (e === ex) {
    return "Você faz — mas repete o mesmo padrão."
  }

  if (ex === ext) {
    return "Você se move — mas não sente que está no controle."
  }

  return "Existe um padrão silencioso na forma como você está vivendo."
}

/* 🔍 LEITURA */
function gerarLeitura(e: number, ex: number, ext: number) {
  const ess = energias[e];
  const exp = energias[ex];
  const amb = energias[ext];

  return `
Por dentro, você ${ess.comportamento}.
Na prática, você ${exp.comportamento}.
E o ambiente ${amb.comportamento}.

Isso cria um padrão:

Você começa com intenção.
Mas ajusta no caminho.

E quanto mais tenta resolver,
mais força precisa fazer.

O desgaste não está no quanto você faz.

Está em como está tentando fazer.
`;
}

export default function Page() {
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [step, setStep] = useState(0);
  const [res, setRes]: any = useState(null);

  function calcular() {
    if (!data || !sexo) return;

    const map = calculateMap(new Date(data), sexo);

    const e = map.essential.number;
    const ex = map.expression.number;
    const ext = map.personal.number;

    setRes({
      e,
      ex,
      ext,
      texto: gerarLeitura(e, ex, ext),
      headline: gerarHeadline(e, ex, ext)
    });
  }

  /* 🔥 TELA INICIAL */
  if (step === 0) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}>
        <div>
          <h1 style={{ fontSize: 32 }}>
            ENGENHARIA<br />DOS PADRÕES PESSOAIS
          </h1>

          <p style={{ marginTop: 16, opacity: 0.6 }}>
            O problema não é esforço.<br />
            É como sua energia está sendo aplicada.
          </p>

          <button
            onClick={() => setStep(1)}
            style={{
              marginTop: 30,
              padding: "16px 40px",
              background: "#000",
              color: "#fff",
              borderRadius: 14
            }}
          >
            Começar
          </button>
        </div>
      </div>
    );
  }

  /* 📥 INPUT */
  if (!res) {
    return (
      <div style={{ padding: 24 }}>
        <input
          type="date"
          onChange={(e) => setData(e.target.value)}
        />

        <select onChange={(e) => setSexo(e.target.value)}>
          <option>Sexo</option>
          <option value="female">Feminino</option>
          <option value="male">Masculino</option>
        </select>

        <button onClick={calcular}>
          Ver minha engenharia
        </button>
      </div>
    );
  }

  /* 📊 RESULTADO */
  return (
    <div style={{ padding: 24 }}>

      {/* 🔥 HEADLINE */}
      <h2 style={{ marginBottom: 24 }}>
        {res.headline}
      </h2>

      {/* 🔢 RESUMO */}
      <div style={{ display: "flex", gap: 10 }}>
        {[res.e, res.ex, res.ext].map((n, i) => {
          const en = energias[n];
          const labels = ["Essência", "Expressão", "Externa"];

          return (
            <div key={i} style={{
              flex: 1,
              background: "#f5f5f5",
              padding: 14,
              borderRadius: 12,
              textAlign: "center"
            }}>
              <div>{labels[i]}</div>
              <strong>{n}</strong>
              <div>{en.nome}</div>
              <small>{en.arquetipo}</small>
            </div>
          );
        })}
      </div>

      {/* 🌗 LUZ SOMBRA MISSÃO */}
      <div style={{ marginTop: 30 }}>
        {[res.e, res.ex, res.ext].map((n, i) => {
          const en = energias[n];
          const labels = ["Essência", "Expressão", "Externa"];

          return (
            <div key={i} style={{ marginBottom: 18 }}>
              <strong>{labels[i]} — {en.nome}</strong><br />
              Luz: {en.luz}<br />
              Sombra: {en.sombra}<br />
              Missão: {en.missao}
            </div>
          );
        })}
      </div>

      {/* 🧠 COMPORTAMENTO + LEITURA */}
      <div style={{
        marginTop: 20,
        padding: 20,
        background: "#eee",
        borderRadius: 14,
        whiteSpace: "pre-line"
      }}>
        {res.texto}
      </div>

      {/* 🎯 CTA */}
      <button style={{
        marginTop: 30,
        width: "100%",
        padding: 16,
        background: "#000",
        color: "#fff",
        borderRadius: 14
      }}>
        Quero entender meu padrão com clareza
      </button>

    </div>
  );
}
