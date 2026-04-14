"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

function nome(n: number) {
  return {
    1: "Água",
    2: "Terra",
    3: "Trovão",
    4: "Vento",
    5: "Centro",
    6: "Céu",
    7: "Lago",
    8: "Montanha",
    9: "Fogo",
  }[n] || "";
}

function tipo(n: number) {
  if ([1, 3, 9].includes(n)) return "ativa";
  if ([2, 6, 8].includes(n)) return "estrutural";
  return "relacional";
}

/* 🔥 LEITURA POR COMBINAÇÃO (NÍVEL REAL) */
function gerarLeitura(e: number, ex: number, ext: number) {

  // 💣 CASOS ESPECÍFICOS (aqui começa o jogo de verdade)
  if (e === 6 && ex === 3 && ext === 8) {
    return `
Você não é perdida.
Mas a forma como você está se movendo te faz parecer.

Por dentro, você tem direção.
Você sabe o que quer.

Mas na prática,
você entra em ação rápido demais.

E a vida, agora,
não está pedindo velocidade.

Está pedindo contenção.

Você tenta avançar,
mas encontra limite.

E quanto mais força,
mais trava.

Isso não é falta de capacidade.

É desalinhamento de timing.

Você está tentando crescer
no momento em que deveria sustentar.
`;
  }

  // 🔧 BASE INTELIGENTE (fallback)
  let texto = "";

  texto += `Existe um padrão claro na forma como suas energias estão organizadas.\n\n`;

  if (tipo(e) === "ativa" && tipo(ext) === "estrutural") {
    texto += `Você tenta avançar, mas o momento pede contenção.\n\n`;
  }

  if (tipo(e) === "estrutural" && tipo(ext) === "ativa") {
    texto += `Você busca estabilidade, mas a vida exige movimento.\n\n`;
  }

  if (e !== ex) {
    texto += `Existe um desalinhamento entre o que você sustenta e como você age.\n\n`;
  }

  texto += `Você faz mais esforço do que deveria.\n`;
  texto += `E isso está te desgastando.\n\n`;

  texto += `Não é falta de capacidade.\n`;
  texto += `É energia aplicada na direção errada.`;

  return texto;
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

        {step === 0 && (
          <>
            <h1 style={{
              fontSize: 32,
              textAlign: "center",
              marginBottom: 20
            }}>
              ENGENHARIA <br />
              DOS PADRÕES PESSOAIS
            </h1>

            <p style={{ textAlign: "center", marginBottom: 12 }}>
              Três energias organizam como você decide, se relaciona e sustenta sua vida.
            </p>

            <p style={{ textAlign: "center", color: "#666", marginBottom: 28 }}>
              Esse mapa revela onde sua energia está sendo mal direcionada.
            </p>

            <button
              onClick={() => setStep(1)}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 14,
                background: "black",
                color: "white",
                fontWeight: 600
              }}
            >
              Começar
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h2 style={{ marginBottom: 16 }}>Seus dados</h2>

            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                marginBottom: 16,
                borderRadius: 10,
                border: "1px solid #ddd"
              }}
            />

            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                marginBottom: 20,
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
                fontWeight: 600
              }}
            >
              Ver minha engenharia
            </button>
          </>
        )}

        {step === 2 && resultado && (
          <>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Como suas energias estão organizadas
            </h2>

            <div style={{
              marginBottom: 20,
              fontWeight: 500
            }}>
              Essência: {resultado.essencia} — {nome(resultado.essencia)} <br />
              Expressão: {resultado.expressao} — {nome(resultado.expressao)} <br />
              Energia Externa: {resultado.externa} — {nome(resultado.externa)}
            </div>

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
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              Quero aprofundar essa engenharia na minha vida
            </a>
          </>
        )}

      </div>
    </main>
  );
}
