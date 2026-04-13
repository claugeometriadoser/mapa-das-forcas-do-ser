"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

type Resultado = {
  essencia: number;
  expressao: number;
  externa: number;
};

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
  }[n];
}

function caracteristicas(n: number) {
  return {
    1: "Fluxo, adaptação e sensibilidade ao ambiente.",
    2: "Nutrir, sustentar, cuidar.",
    3: "Impulso, início e ação.",
    4: "Influência e estratégia.",
    5: "Equilíbrio e eixo.",
    6: "Direção e comando.",
    7: "Troca e expressão.",
    8: "Limite e contenção.",
    9: "Expansão e visibilidade.",
  }[n];
}

function desc(n: number) {
  return {
    1: "fluxo",
    2: "sustentação",
    3: "movimento",
    4: "influência",
    5: "equilíbrio",
    6: "direção",
    7: "expressão",
    8: "contenção",
    9: "expansão",
  }[n];
}

function tipo(n: number) {
  if ([1, 3, 9].includes(n)) return "ativa";
  if ([2, 6, 8].includes(n)) return "estrutural";
  return "relacional";
}

function gerarLeitura(e: number, ex: number, ext: number) {
  let texto = "";

  texto += `Por dentro, você funciona com ${desc(e)}.\n`;
  texto += `Na prática, você se move com ${desc(ex)}.\n`;
  texto += `E o momento traz um cenário de ${desc(ext)}.\n\n`;

  const tipoE = tipo(e);
  const tipoExt = tipo(ext);

  if (tipoE === "ativa" && tipoExt === "estrutural") {
    texto += `Você tenta avançar, mas o momento pede contenção.\n`;
    texto += `Quanto mais força movimento, mais encontra bloqueio.\n\n`;
  }

  if (tipoE === "estrutural" && tipoExt === "ativa") {
    texto += `Você busca estabilidade, mas a vida exige movimento.\n\n`;
  }

  if (e !== ex) {
    texto += `Existe uma diferença entre o que sustenta e como você age.\n\n`;
  }

  texto += `O desgaste não vem do quanto você faz.\n`;
  texto += `Vem de como sua energia está sendo aplicada.`;

  return texto;
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

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
            <h1 style={{
              fontSize: 32,
              fontWeight: 600,
              textAlign: "center",
              lineHeight: "36px",
              marginBottom: 20
            }}>
              ENGENHARIA <br />
              DOS PADRÕES PESSOAIS
            </h1>

            <p style={{
              textAlign: "center",
              fontSize: 16,
              marginBottom: 12
            }}>
              Três energias organizam como você decide, se relaciona e sustenta sua vida.
            </p>

            <p style={{
              textAlign: "center",
              fontSize: 14,
              color: "#666",
              marginBottom: 28
            }}>
              Esse mapa revela como elas estão distribuídas — e onde sua energia está sendo mal direcionada.
            </p>

            <button
              onClick={() => setStep(1)}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 14,
                background: "black",
                color: "white",
                fontWeight: 600,
                fontSize: 16
              }}
            >
              Começar
            </button>
          </>
        )}

        {/* FORM */}
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

        {/* RESULTADO */}
        {step === 2 && resultado && (
          <>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Como suas energias estão organizadas
            </h2>

            <div style={{ marginBottom: 20 }}>
              <p><strong>Essência — {nome(resultado.essencia)}</strong><br />
              {caracteristicas(resultado.essencia)}</p>

              <p><strong>Expressão — {nome(resultado.expressao)}</strong><br />
              {caracteristicas(resultado.expressao)}</p>

              <p><strong>Energia Externa — {nome(resultado.externa)}</strong><br />
              {caracteristicas(resultado.externa)}</p>
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
              Quero entender esse padrão na minha vida
            </a>
          </>
        )}

      </div>
    </main>
  );
}
