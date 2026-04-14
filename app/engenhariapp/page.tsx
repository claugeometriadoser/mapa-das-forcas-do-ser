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

function tipo(n: number) {
  if ([1, 3, 9].includes(n)) return "ativa";
  if ([2, 6, 8].includes(n)) return "estrutural";
  return "relacional";
}

function leituraEnergia(n: number) {
  return {
    1: {
      luz: "capacidade de se adaptar e fluir com o que a vida traz",
      sombra: "evitar confronto e se perder no ambiente",
      missao: "se posicionar sem perder a sensibilidade",
    },
    2: {
      luz: "nutrir e sustentar",
      sombra: "se sobrecarregar cuidando de tudo",
      missao: "sustentar sem se anular",
    },
    3: {
      luz: "agir e iniciar",
      sombra: "agir por impulso",
      missao: "direcionar a ação",
    },
    4: {
      luz: "influenciar e construir",
      sombra: "controlar ou manipular",
      missao: "usar influência com clareza",
    },
    5: {
      luz: "organizar e equilibrar",
      sombra: "paralisar tentando controlar tudo",
      missao: "agir mesmo sem garantia",
    },
    6: {
      luz: "direção e comando",
      sombra: "rigidez e controle excessivo",
      missao: "liderar com flexibilidade",
    },
    7: {
      luz: "expressar e conectar",
      sombra: "buscar validação",
      missao: "se expressar com verdade",
    },
    8: {
      luz: "limite e estabilidade",
      sombra: "isolamento e bloqueio",
      missao: "sustentar sem travar",
    },
    9: {
      luz: "expansão e visibilidade",
      sombra: "excesso e dispersão",
      missao: "expandir com direção",
    },
  }[n];
}

function gerarLeitura(e: number, ex: number, ext: number) {
  const le = leituraEnergia(e);
  const lx = leituraEnergia(ex);
  const lxt = leituraEnergia(ext);

  let texto = "";

  texto += `ESSÊNCIA — ${nome(e)}\n`;
  texto += `Luz: ${le.luz}.\n`;
  texto += `Sombra: ${le.sombra}.\n`;
  texto += `Missão: ${le.missao}.\n\n`;

  texto += `EXPRESSÃO — ${nome(ex)}\n`;
  texto += `Luz: ${lx.luz}.\n`;
  texto += `Sombra: ${lx.sombra}.\n`;
  texto += `Missão: ${lx.missao}.\n\n`;

  texto += `ENERGIA EXTERNA — ${nome(ext)}\n`;
  texto += `Luz: ${lxt.luz}.\n`;
  texto += `Sombra: ${lxt.sombra}.\n`;
  texto += `Missão: ${lxt.missao}.\n\n`;

  texto += `INTEGRAÇÃO\n`;

  if (tipo(e) === "ativa" && tipo(ext) === "estrutural") {
    texto += `Você tenta avançar, mas o momento pede contenção.\n`;
  }

  if (tipo(e) === "estrutural" && tipo(ext) === "ativa") {
    texto += `Você busca estabilidade, mas a vida exige movimento.\n`;
  }

  if (e !== ex) {
    texto += `Existe um desalinhamento entre o que você sustenta e como você age.\n`;
  }

  texto += `\nO desgaste não vem da falta de capacidade.\n`;
  texto += `Vem da forma como sua energia está sendo aplicada.`;

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

        {step === 0 && (
          <>
            <h1 style={{
              fontSize: 32,
              fontWeight: 600,
              textAlign: "center" as const,
              lineHeight: "36px",
              marginBottom: 20
            }}>
              ENGENHARIA <br />
              DOS PADRÕES PESSOAIS
            </h1>

            <p style={{ textAlign: "center" as const, marginBottom: 12 }}>
              Três energias organizam como você decide, se relaciona e sustenta sua vida.
            </p>

            <p style={{
              textAlign: "center" as const,
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
            <h2 style={{ textAlign: "center" as const, marginBottom: 20 }}>
              Como suas energias estão organizadas
            </h2>

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
                textAlign: "center" as const,
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
