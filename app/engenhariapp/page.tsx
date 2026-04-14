"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

const energias: any = {
  1: { nome: "Água", arquetipo: "A Adaptadora", luz: "flui", sombra: "evita confronto", missao: "confiar no fluxo", comportamento: "se adapta demais" },
  2: { nome: "Terra", arquetipo: "A Sustentadora", luz: "cuida", sombra: "se sobrecarrega", missao: "nutrir sem se anular", comportamento: "assume demais" },
  3: { nome: "Trovão", arquetipo: "A Iniciadora", luz: "inicia", sombra: "se precipita", missao: "sustentar", comportamento: "age rápido" },
  4: { nome: "Vento", arquetipo: "A Influenciadora", luz: "comunica", sombra: "se dispersa", missao: "alinhar comunicação", comportamento: "ajusta antes de agir" },
  5: { nome: "Centro", arquetipo: "A Integradora", luz: "equilibra", sombra: "se perde", missao: "decidir", comportamento: "analisa demais" },
  6: { nome: "Céu", arquetipo: "A Estrategista", luz: "direciona", sombra: "trava execução", missao: "agir com consistência", comportamento: "sabe mas não executa" },
  7: { nome: "Lago", arquetipo: "A Comunicadora", luz: "expressa", sombra: "busca aprovação", missao: "verdade", comportamento: "agrada antes de se posicionar" },
  8: { nome: "Montanha", arquetipo: "A Guardiã", luz: "estrutura", sombra: "bloqueia", missao: "liberar", comportamento: "segura movimento" },
  9: { nome: "Fogo", arquetipo: "A Visionária", luz: "expande", sombra: "se dispersa", missao: "focar", comportamento: "empolga e não conclui" },
};

/* 🔥 HEADLINE INTELIGENTE (gera 729 combinações) */
function gerarHeadline(e: number, ex: number, ext: number) {
  const ess = energias[e];
  const exp = energias[ex];
  const amb = energias[ext];

  const blocosInicio = [
    "Você sabe o que fazer",
    "Você tem clareza",
    "Você começa com intenção",
  ];

  const blocosMeio = [
    "mas não sustenta",
    "mas se perde no meio",
    "mas muda no caminho",
  ];

  const blocosFim = [
    "porque o ambiente segura",
    "porque algo trava",
    "porque o ritmo não acompanha",
  ];

  const i = (e + ex) % blocosInicio.length;
  const m = (ex + ext) % blocosMeio.length;
  const f = (e + ext) % blocosFim.length;

  return `${blocosInicio[i]} — ${blocosMeio[m]} ${blocosFim[f]}.`;
}

/* 🔍 LEITURA */
function gerarLeitura(e: number, ex: number, ext: number) {
  const ess = energias[e];
  const exp = energias[ex];
  const amb = energias[ext];

  return `
Por dentro, você tende a ${ess.comportamento}.
Na prática, você tende a ${exp.comportamento}.
E o ambiente tende a ${amb.comportamento}.

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

    const map = calculateMap(data, sexo);

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

  /* TELA INICIAL */
  if (step === 0) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <h1>ENGENHARIA<br />DOS PADRÕES PESSOAIS</h1>

          <p style={{ opacity: 0.6 }}>
            O problema não é esforço.<br />
            É como sua energia está sendo aplicada.
          </p>

          <button onClick={() => setStep(1)} style={{
            marginTop: 30,
            width: "100%",
            padding: 16,
            background: "#000",
            color: "#fff",
            borderRadius: 14
          }}>
            Começar
          </button>
        </div>
      </div>
    );
  }

  /* INPUT */
  if (!res) {
    return (
      <div style={{ padding: 24 }}>
        <input type="date" onChange={(e) => setData(e.target.value)} />
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

  /* RESULTADO */
  return (
    <div style={{ padding: 24 }}>

      <h2>{res.headline}</h2>

      {/* RESUMO */}
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        {[res.e, res.ex, res.ext].map((n, i) => {
          const en = energias[n];
          const labels = ["Essência", "Expressão", "Externa"];

          return (
            <div key={i} style={{ flex: 1, background: "#f5f5f5", padding: 14, borderRadius: 12, textAlign: "center" }}>
              <div>{labels[i]}</div>
              <strong>{n}</strong>
              <div>{en.nome}</div>
              <small>{en.arquetipo}</small>
            </div>
          );
        })}
      </div>

      {/* LUZ SOMBRA MISSÃO */}
      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        {[res.e, res.ex, res.ext].map((n, i) => {
          const en = energias[n];
          const labels = ["Essência", "Expressão", "Externa"];

          return (
            <div key={i} style={{ flex: 1 }}>
              <strong>{labels[i]} — {en.nome}</strong><br />
              Luz: {en.luz}<br />
              Sombra: {en.sombra}<br />
              Missão: {en.missao}
            </div>
          );
        })}
      </div>

      {/* LEITURA */}
      <div style={{
        marginTop: 30,
        background: "#eee",
        padding: 20,
        borderRadius: 14,
        whiteSpace: "pre-line"
      }}>
        {res.texto}
      </div>

      {/* CTA */}
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
