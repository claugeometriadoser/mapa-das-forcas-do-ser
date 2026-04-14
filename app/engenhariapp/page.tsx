"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

/* 🔷 BASE */
const energias: any = {
  1: { nome: "Água", arquetipo: "A Adaptadora", comportamento: "tende a sentir antes de agir" },
  2: { nome: "Terra", arquetipo: "A Sustentadora", comportamento: "tende a sustentar mais do que deveria" },
  3: { nome: "Trovão", arquetipo: "A Iniciadora", comportamento: "tende a agir rápido e depois ajustar" },
  4: { nome: "Vento", arquetipo: "A Influenciadora", comportamento: "tende a ajustar antes de se posicionar" },
  5: { nome: "Centro", arquetipo: "O Eixo", comportamento: "tende a tentar organizar tudo" },
  6: { nome: "Céu", arquetipo: "A Estrategista", comportamento: "tende a saber o que precisa, mas pode travar na execução" },
  7: { nome: "Lago", arquetipo: "A Expressiva", comportamento: "tende a evitar conflito e priorizar o leve" },
  8: { nome: "Montanha", arquetipo: "A Guardiã", comportamento: "tende a conter e evitar movimento" },
  9: { nome: "Fogo", arquetipo: "A Reveladora", comportamento: "tende a intensificar tudo" }
};

/* 🔷 CLASSIFICAÇÃO */
function tipo(n: number) {
  if ([1, 3, 9].includes(n)) return "ativa";
  if ([2, 6, 8].includes(n)) return "estrutural";
  return "relacional";
}

/* 🔥 FRASE DE IMPACTO */
function impacto(e: number, ex: number, ext: number) {
  const te = tipo(e);
  const tex = tipo(ex);
  const text = tipo(ext);

  if (te === "estrutural" && tex === "ativa") {
    return "Você sabe o que precisa fazer — mas não sustenta o tempo necessário para isso acontecer.";
  }

  if (te === "ativa" && text === "estrutural") {
    return "Você tenta avançar — mas o momento não abre espaço.";
  }

  return "Existe um padrão aqui que explica por que você faz muito e ainda assim sente que não sai do lugar.";
}

/* 🔥 LEITURA (SEM REPETIÇÃO) */
function gerarLeitura() {
  return `Você funciona com uma lógica interna clara.

Mas se move de forma diferente na prática.

E o ambiente responde em outro ritmo.

Isso cria um padrão:

Você tenta fazer acontecer.
Mas encontra resistência.

Então força.

E quanto mais força,
menos flui.

O desgaste não está no quanto você faz.

Mas em como está tentando fazer.`;
}

export default function Page() {

  const [step, setStep] = useState(0);
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [res, setRes]: any = useState(null);

  function calcular() {
    if (!data || !sexo) return;

    const [y, m, d] = data.split("-");
    const date = new Date(Number(y), Number(m) - 1, Number(d));

    const map = calculateMap(date, sexo);

    setRes({
      e: map.essential.number,
      ex: map.expression.number,
      ext: map.personal.number
    });

    setStep(2);
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f5f5",
      padding: 20
    }}>
      <div style={{
        background: "white",
        padding: 32,
        borderRadius: 20,
        maxWidth: 520,
        width: "100%"
      }}>

        {/* 🔥 CAPA */}
        {step === 0 && (
          <div style={{ textAlign: "center" }}>

            <h1 style={{
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 16
            }}>
              ENGENHARIA <br />
              <span style={{ fontWeight: 400 }}>
                DOS PADRÕES PESSOAIS
              </span>
            </h1>

            <p style={{
              fontSize: 15,
              color: "#666",
              marginBottom: 28,
              lineHeight: 1.5
            }}>
              O problema não é esforço.
              <br />
              É como sua energia está distribuída.
            </p>

            <button
              onClick={() => setStep(1)}
              style={{
                width: "100%",
                padding: 18,
                borderRadius: 14,
                background: "black",
                color: "white",
                fontWeight: 600,
                fontSize: 16,
                border: "none",
                cursor: "pointer"
              }}
            >
              Começar
            </button>

          </div>
        )}

        {/* 🔥 FORM */}
        {step === 1 && (
          <>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{
                width: "100%",
                marginBottom: 12,
                padding: 14,
                borderRadius: 10,
                border: "1px solid #ddd"
              }}
            />

            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              style={{
                width: "100%",
                marginBottom: 12,
                padding: 14,
                borderRadius: 10,
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
                padding: 16,
                borderRadius: 14,
                background: "black",
                color: "white",
                border: "none",
                fontWeight: 600
              }}
            >
              Ver minha engenharia
            </button>
          </>
        )}

        {/* 🔥 RESULTADO */}
        {step === 2 && res && (
          <>
            {/* impacto */}
            <div style={{
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 20
            }}>
              {impacto(res.e, res.ex, res.ext)}
            </div>

            {/* resumo */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              textAlign: "center",
              marginBottom: 20
            }}>
              {[{l:"Essência",v:res.e},{l:"Expressão",v:res.ex},{l:"Externa",v:res.ext}]
              .map((i,k)=>(
                <div key={k}>
                  <div style={{ fontSize: 13 }}>{i.l}</div>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>{i.v}</div>
                  <div>{energias[i.v].nome}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    ({energias[i.v].arquetipo})
                  </div>
                </div>
              ))}
            </div>

            {/* comportamento */}
            <div style={{
              marginBottom: 20,
              lineHeight: 1.6
            }}>
              <p>Por dentro, você {energias[res.e].comportamento}.</p>
              <p>Na prática, você {energias[res.ex].comportamento}.</p>
              <p>O ambiente tende a {energias[res.ext].comportamento}.</p>
            </div>

            {/* leitura */}
            <div style={{
              background: "#eee",
              padding: 16,
              borderRadius: 12,
              whiteSpace: "pre-line"
            }}>
              {gerarLeitura()}
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/5511987545477"
              target="_blank"
              style={{
                display: "block",
                marginTop: 24,
                background: "black",
                color: "white",
                padding: 18,
                borderRadius: 14,
                textAlign: "center",
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              Quero entender meu padrão com clareza
            </a>

          </>
        )}

      </div>
    </main>
  );
}
