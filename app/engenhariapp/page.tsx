"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

/* 🔷 BASE COMPLETA */
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

  if (te === "estrutural" && tex === "ativa")
    return "Você sabe o que precisa fazer — mas não sustenta o tempo necessário para isso acontecer.";

  if (te === "ativa" && text === "estrutural")
    return "Você tenta avançar — mas o momento exige contenção.";

  return "Existe um padrão aqui que explica por que você faz muito e ainda assim sente que não sai do lugar.";
}

/* 🔥 LEITURA UNIVERSAL */
function gerarLeitura(e: number, ex: number, ext: number) {
  const ess = energias[e];
  const exp = energias[ex];
  const externa = energias[ext];

  const te = tipo(e);
  const tex = tipo(ex);
  const text = tipo(ext);

  let t = "";

  /* comportamento */
  t += `Por dentro, você ${ess.comportamento}.\n`;
  t += `Na prática, você ${exp.comportamento}.\n`;
  t += `E o ambiente tende a ${externa.comportamento}.\n\n`;

  /* conflito interno */
  if (e !== ex) {
    t += `Existe um desencontro entre o que você sustenta e a forma como você age.\n\n`;
  }

  /* pressão externa */
  if (te !== text) {
    t += `O momento não favorece o seu modo natural de funcionamento.\n\n`;
  }

  /* compensação */
  if (text === "estrutural" && tex === "ativa") {
    t += `Você tende a acelerar para tentar fazer as coisas acontecerem.\n`;
    t += `Mas encontra resistência.\n\n`;
  }

  /* fechamento */
  t += `O desgaste não vem da falta de capacidade.\n`;
  t += `Vem da forma como sua energia está sendo aplicada.`;

  return t;
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

        {/* CAPA */}
        {step === 0 && (
          <div style={{ textAlign: "center" }}>
            <h1 style={{ marginBottom: 20 }}>
              ENGENHARIA <br /> DOS PADRÕES PESSOAIS
            </h1>

            <button onClick={() => setStep(1)}>
              Começar
            </button>
          </div>
        )}

        {/* FORM */}
        {step === 1 && (
          <>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{ width: "100%", marginBottom: 12 }}
            />

            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              style={{ width: "100%", marginBottom: 12 }}
            >
              <option value="">Sexo</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
            </select>

            <button onClick={calcular}>
              Ver minha engenharia
            </button>
          </>
        )}

        {/* RESULTADO */}
        {step === 2 && res && (
          <>
            {/* impacto */}
            <div style={{ fontWeight: 700, marginBottom: 20 }}>
              {impacto(res.e, res.ex, res.ext)}
            </div>

            {/* mapa */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              textAlign: "center",
              marginBottom: 20
            }}>
              {[{l:"Essência",v:res.e},{l:"Expressão",v:res.ex},{l:"Externa",v:res.ext}]
              .map((i,k)=>(
                <div key={k}>
                  <div>{i.l}</div>
                  <div style={{fontSize:28}}>{i.v}</div>
                  <div>{energias[i.v].nome}</div>
                  <div style={{fontSize:12}}>
                    ({energias[i.v].arquetipo})
                  </div>
                </div>
              ))}
            </div>

            {/* comportamento */}
            <div style={{ marginBottom: 20 }}>
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
              {gerarLeitura(res.e, res.ex, res.ext)}
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/5511987545477"
              target="_blank"
              style={{ display: "block", marginTop: 20 }}
            >
              Quero aprofundar essa engenharia na minha vida
            </a>
          </>
        )}

      </div>
    </main>
  );
}
