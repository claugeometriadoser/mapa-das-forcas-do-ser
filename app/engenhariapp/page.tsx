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
    1: "Fluxo, adaptação, sensibilidade ao ambiente.",
    2: "Nutrir, sustentar, cuidar, absorver.",
    3: "Início, impulso, ação rápida.",
    4: "Influência, penetração, estratégia sutil.",
    5: "Centro, equilíbrio, organização interna.",
    6: "Direção, comando, clareza e liderança.",
    7: "Troca, expressão, leveza e comunicação.",
    8: "Limite, contenção, estabilidade.",
    9: "Expansão, visibilidade, intensidade.",
  }[n];
}

function desc(n: number) {
  return {
    1: "fluxo e adaptação",
    2: "nutrir e sustentar",
    3: "início e impulso",
    4: "influência e estratégia",
    5: "equilíbrio e eixo",
    6: "direção e comando",
    7: "troca e expressão",
    8: "limite e contenção",
    9: "expansão e visibilidade",
  }[n];
}

function tipo(n: number) {
  if ([1, 3, 9].includes(n)) return "ativa";
  if ([2, 6, 8].includes(n)) return "estrutural";
  return "relacional";
}

function gerarLeitura(e: number, ex: number, ext: number) {
  let texto = "";

  // BLOCO INTERPRETAÇÃO (SEM VENDER)
  texto += `Por dentro, você tende a operar com ${desc(e)}.\n`;
  texto += `Na forma como age, aparece ${desc(ex)}.\n`;
  texto += `E o momento da sua vida traz um cenário de ${desc(ext)}.\n\n`;

  // CONFLITO
  const tipoE = tipo(e);
  const tipoExt = tipo(ext);

  if (tipoE === "ativa" && tipoExt === "estrutural") {
    texto += `Você tenta avançar, mas o momento pede contenção.\n`;
    texto += `Quanto mais força movimento, mais encontra bloqueio.\n\n`;
  }

  if (tipoE === "estrutural" && tipoExt === "ativa") {
    texto += `Você busca estabilidade, mas o momento exige movimento.\n`;
    texto += `Isso gera tensão e desgaste.\n\n`;
  }

  if (e !== ex) {
    texto += `Existe uma diferença entre o que sustenta por dentro e a forma como você age.\n\n`;
  }

  // FECHAMENTO
  texto += `O desgaste não vem da quantidade de esforço.\n`;
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
      background: "#f7f7f7"
    }}>
      <div style={{
        background: "white",
        padding: 32,
        borderRadius: 16,
        maxWidth: 520,
        width: "100%"
      }}>

        {step === 0 && (
          <>
            <h1 style={{ textAlign: "center" }}>
              ENGENHARIA <br /> DOS PADRÕES PESSOAIS
            </h1>

            <p>
              Três energias organizam como você decide, se relaciona e sustenta sua vida.
            </p>

            <button onClick={() => setStep(1)}>Começar</button>
          </>
        )}

        {step === 1 && (
          <>
            <input type="date" onChange={(e) => setData(e.target.value)} />
            <select onChange={(e) => setSexo(e.target.value)}>
              <option value="">Sexo</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
            </select>
            <button onClick={calcular}>Ver meu padrão</button>
          </>
        )}

        {step === 2 && resultado && (
          <>
            <h2 style={{ textAlign: "center" }}>
              Como suas energias estão organizadas
            </h2>

            {/* CARACTERÍSTICAS */}
            <div>
              <p><strong>Essência — {nome(resultado.essencia)}</strong><br />
              {caracteristicas(resultado.essencia)}</p>

              <p><strong>Expressão — {nome(resultado.expressao)}</strong><br />
              {caracteristicas(resultado.expressao)}</p>

              <p><strong>Energia Externa — {nome(resultado.externa)}</strong><br />
              {caracteristicas(resultado.externa)}</p>
            </div>

            {/* LEITURA */}
            <div style={{
              marginTop: 20,
              padding: 16,
              background: "#f1f1f1",
              borderRadius: 10,
              whiteSpace: "pre-line"
            }}>
              {gerarLeitura(
                resultado.essencia,
                resultado.expressao,
                resultado.externa
              )}
            </div>

            <button style={{ marginTop: 20 }}>
              Quero entender esse padrão na minha vida
            </button>
          </>
        )}

      </div>
    </main>
  );
}
