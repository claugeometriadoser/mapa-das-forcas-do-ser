"use client";

import { useState } from "react";
import { calculateMap } from "@/utils/jiugong";

/* 🔷 BASE DE ARQUÉTIPOS */
const energias: any = {
  1: {
    nome: "Água",
    arquetipo: "A Adaptadora",
    luz: "se adapta com facilidade ao ambiente",
    sombra: "se perde evitando confronto",
    missao: "sustentar direção mesmo em movimento",
  },
  2: {
    nome: "Terra",
    arquetipo: "A Sustentadora",
    luz: "nutre e sustenta estruturas",
    sombra: "assume mais do que deveria",
    missao: "sustentar sem se anular",
  },
  3: {
    nome: "Trovão",
    arquetipo: "A Iniciadora",
    luz: "ativa e coloca energia em movimento",
    sombra: "impulsividade sem direção",
    missao: "transformar impulso em consistência",
  },
  4: {
    nome: "Vento",
    arquetipo: "A Influenciadora",
    luz: "comunica e influencia",
    sombra: "se dispersa e não sustenta posição",
    missao: "alinhar comunicação com intenção",
  },
  5: {
    nome: "Centro",
    arquetipo: "O Eixo",
    luz: "organiza e equilibra",
    sombra: "controla e paralisa",
    missao: "agir sem precisar controlar tudo",
  },
  6: {
    nome: "Céu",
    arquetipo: "A Estrategista",
    luz: "direciona e lidera",
    sombra: "rigidez e controle excessivo",
    missao: "liderar com flexibilidade",
  },
  7: {
    nome: "Lago",
    arquetipo: "A Expressiva",
    luz: "conecta e se expressa",
    sombra: "busca validação externa",
    missao: "se expressar com verdade",
  },
  8: {
    nome: "Montanha",
    arquetipo: "A Guardiã",
    luz: "sustenta e cria limites",
    sombra: "bloqueia e resiste",
    missao: "discernir quando parar e quando avançar",
  },
  9: {
    nome: "Fogo",
    arquetipo: "A Reveladora",
    luz: "expande e ilumina",
    sombra: "exagera e dispersa",
    missao: "expandir com direção",
  },
};

function tipo(n: number) {
  if ([1, 3, 9].includes(n)) return "ativa";
  if ([2, 6, 8].includes(n)) return "estrutural";
  return "relacional";
}

/* 🔥 MOTOR DE LEITURA */
function gerarLeitura(e: number, ex: number, ext: number) {
  const ess = energias[e];
  const exp = energias[ex];
  const externa = energias[ext];

  let texto = "";

  // 🔷 IDENTIDADE
  texto += `${ess.arquetipo} por dentro.\n`;
  texto += `${exp.arquetipo} na forma como você se move.\n\n`;

  // 🔷 LUZ / SOMBRA / MISSÃO
  texto += `Essência (${ess.nome})\n`;
  texto += `Luz: ${ess.luz}.\n`;
  texto += `Sombra: ${ess.sombra}.\n`;
  texto += `Missão: ${ess.missao}.\n\n`;

  texto += `Expressão (${exp.nome})\n`;
  texto += `Luz: ${exp.luz}.\n`;
  texto += `Sombra: ${exp.sombra}.\n`;
  texto += `Missão: ${exp.missao}.\n\n`;

  texto += `Energia Externa (${externa.nome})\n`;
  texto += `Luz: ${externa.luz}.\n`;
  texto += `Sombra: ${externa.sombra}.\n`;
  texto += `Missão: ${externa.missao}.\n\n`;

  // 🔥 TENSÃO
  if (e !== ex) {
    texto += `Existe um descompasso entre o que sustenta você por dentro e a forma como você age.\n\n`;
  }

  const interno = tipo(e);
  const externo = tipo(ext);

  if (interno === "ativa" && externo === "estrutural") {
    texto += `O impulso é avançar.\n`;
    texto += `A resposta do cenário é contenção.\n\n`;
  }

  if (interno === "estrutural" && externo === "ativa") {
    texto += `A tendência é sustentar.\n`;
    texto += `O contexto exige movimento.\n\n`;
  }

  if (interno === "relacional") {
    texto += `Você tende a ajustar antes de se posicionar.\n\n`;
  }

  // 🔷 FECHAMENTO (SEM FRASE DE COACH)
  texto += `O ponto não está na quantidade de energia.\n`;
  texto += `Mas na forma como ela está sendo distribuída.`;

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

        {/* CAPA */}
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
              Esse mapa revela como sua energia está sendo aplicada.
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
