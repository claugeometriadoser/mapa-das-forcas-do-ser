"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

/* 🔷 BASE */
const energias: any = {
  1: { nome: "Água", arquetipo: "A Adaptadora" },
  2: { nome: "Terra", arquetipo: "A Sustentadora" },
  3: { nome: "Trovão", arquetipo: "A Iniciadora" },
  4: { nome: "Vento", arquetipo: "A Influenciadora" },
  5: { nome: "Centro", arquetipo: "O Eixo" },
  6: { nome: "Céu", arquetipo: "A Estrategista" },
  7: { nome: "Lago", arquetipo: "A Expressiva" },
  8: { nome: "Montanha", arquetipo: "A Guardiã" },
  9: { nome: "Fogo", arquetipo: "A Reveladora" }
};

function tipo(n: number) {
  if ([1, 3, 9].includes(n)) return "ativa";
  if ([2, 6, 8].includes(n)) return "estrutural";
  return "relacional";
}

/* 🔥 MOTOR DE LEITURA */
function gerarLeitura(e: number, ex: number, ext: number) {

  // 🔥 COMBINAÇÕES PREMIUM
  if (e === 6 && ex === 3 && ext === 8) return `
Você não tem dificuldade de direção.

Mas isso não aparece na forma como você age.

Existe estratégia por dentro,
mas o que sai é impulso.

E o ambiente não abre espaço.
Responde com limite.

Então você força,
e encontra resistência.

Força mais,
e trava mais.

Não é erro.

É ritmo desalinhado com o momento.
`;

  if (e === 2 && ex === 5 && ext === 9) return `
Você sustenta mais do que deveria.

E tenta manter tudo equilibrado.

Mas o ambiente não pede equilíbrio.

Pede exposição.

E isso pesa.

Porque você segura
o que já deveria ter sido solto.
`;

  if (e === 9 && ex === 3 && ext === 6) return `
Existe intensidade.

E ela vira ação.

Mas o ambiente pede direção.

Então você se movimenta muito
sem sair do lugar.

Não falta energia.

Falta eixo.
`;

  // 🔧 FALLBACK
  let t = "";

  if (e !== ex) {
    t += `Existe um descompasso entre o que sustenta você por dentro e a forma como você age.\n\n`;
  }

  const i = tipo(e);
  const x = tipo(ext);

  if (i === "ativa" && x === "estrutural") {
    t += `Você tenta avançar, mas encontra limite.\n\n`;
  }

  if (i === "estrutural" && x === "ativa") {
    t += `Você tenta sustentar, mas a vida pede movimento.\n\n`;
  }

  t += `Isso gera desgaste.\n\n`;
  t += `Não é falta de capacidade.\n`;
  t += `É forma de uso da energia.`;

  return t;
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  function calcular() {
    if (!data || !sexo) return;

    const [ano, mes, dia] = data.split("-");
    const dataObj = new Date(Number(ano), Number(mes) - 1, Number(dia));

    const map = calculateMap(dataObj, sexo);

    setResultado({
      essencia: map.essential.number,
      expressao: map.expression.number,
      externa: map.personal.number,
    });

    setStep(2);
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background: "#f5f5f5"
    }}>
      <div style={{
        background: "white",
        padding: 32,
        borderRadius: 20,
        maxWidth: 520,
        width: "100%",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}>

        {/* CAPA */}
        {step === 0 && (
          <>
            <h1 style={{ fontSize: 32, textAlign: "center", marginBottom: 20 }}>
              ENGENHARIA <br /> DOS PADRÕES PESSOAIS
            </h1>

            <p style={{ textAlign: "center", marginBottom: 20 }}>
              Três energias organizam como você decide, se relaciona e sustenta sua vida.
            </p>

            <button onClick={() => setStep(1)} style={{
              width: "100%", padding: 16, borderRadius: 14,
              background: "black", color: "white", fontWeight: 600
            }}>
              Começar
            </button>
          </>
        )}

        {/* FORM */}
        {step === 1 && (
          <>
            <h2 style={{ marginBottom: 16 }}>Seus dados</h2>

            <input type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{ width: "100%", padding: 12, marginBottom: 16 }}
            />

            <select value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              style={{ width: "100%", padding: 12, marginBottom: 20 }}
            >
              <option value="">Sexo</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
            </select>

            <button onClick={calcular} style={{
              width: "100%", padding: 16, borderRadius: 14,
              background: "black", color: "white"
            }}>
              Ver minha engenharia
            </button>
          </>
        )}

        {/* RESULTADO */}
        {step === 2 && resultado && (
          <>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Como suas energias estão organizadas
            </h2>

            {/* 🔥 RESUMO PREMIUM */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
              marginBottom: 20
            }}>
              {[
                { label: "ESSÊNCIA", valor: resultado.essencia },
                { label: "EXPRESSÃO", valor: resultado.expressao },
                { label: "EXTERNA", valor: resultado.externa }
              ].map((item, i) => (
                <div key={i} style={{
                  background: "#fafafa",
                  borderRadius: 12,
                  padding: 14,
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: 11 }}>{item.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>{item.valor}</div>
                  <div style={{ fontSize: 13 }}>
                    {energias[item.valor].nome}
                  </div>
                </div>
              ))}
            </div>

            {/* 🔥 MICROCOPY DE IMPACTO */}
            <div style={{
              marginBottom: 16,
              fontSize: 14,
              color: "#444"
            }}>
              Tem um ponto aqui que explica o seu cansaço — e ele não é óbvio.
            </div>

            {/* 🔥 LEITURA */}
            <div style={{
              background: "#f1f1f1",
              padding: 20,
              borderRadius: 14,
              whiteSpace: "pre-line",
              lineHeight: 1.6
            }}>
              {gerarLeitura(
                resultado.essencia,
                resultado.expressao,
                resultado.externa
              )}
            </div>

            {/* 🔥 CTA FORTE */}
            <a
              href="https://wa.me/5511987545477"
              target="_blank"
              style={{
                display: "block",
                marginTop: 20,
                textAlign: "center",
                background: "black",
                color: "white",
                padding: 16,
                borderRadius: 14,
                fontWeight: 600
              }}
            >
              Isso não é aleatório — eu te explico isso na sessão
            </a>
          </>
        )}

      </div>
    </main>
  );
}
