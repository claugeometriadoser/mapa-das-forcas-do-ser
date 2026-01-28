export type EnergyInfo = {
  number: number;
  name: string;
  element: string;
  essence: string;
  shadow: string;
};

export const ENERGIES: Record<number, EnergyInfo> = {
  1: { number: 1, name: "Água (KAN)", element: "Água", essence: "Profundidade, intuição e sobrevivência.", shadow: "Medo excessivo e insegurança crônica." },
  2: { number: 2, name: "Terra Yin (KUN)", element: "Terra", essence: "Cuidado, nutrição e suporte.", shadow: "Autoaniquilação e cansaço por servir demais." },
  3: { number: 3, name: "Trovão (ZHEN)", element: "Madeira", essence: "Início, movimento e impulso.", shadow: "Impulsividade e agressividade." },
  4: { number: 4, name: "Vento (XUN)", element: "Madeira", essence: "Estratégia, comunicação e adaptação.", shadow: "Indecisão e dispersão." },
  5: { number: 5, name: "Centro (TERRA)", element: "Terra", essence: "Estabilidade e força central.", shadow: "Caos, instabilidade e colapsos repetidos." },
  6: { number: 6, name: "Céu (QIAN)", element: "Metal", essence: "Liderança, visão e autoridade.", shadow: "Rigidez e dificuldade em relaxar." },
  7: { number: 7, name: "Lago (DUI)", element: "Metal", essence: "Prazer, expressão e leveza.", shadow: "Superficialidade e fuga pelo prazer." },
  8: { number: 8, name: "Montanha (GEN)", element: "Terra", essence: "Sustentação, limite e silêncio.", shadow: "Isolamento e rigidez." },
  9: { number: 9, name: "Fogo (LI)", element: "Fogo", essence: "Clareza, consciência e propósito.", shadow: "Esgotamento mental e busca por aprovação." },
};

export function calculateMap(date: Date, sex: string) {
  let year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Ajuste do Ano Novo Solar (4 de Fev)
  if (month < 2 || (month === 2 && day < 4)) {
    year -= 1;
  }

  const sumDigits = (n: number): number => {
    const s = n.toString().split("").reduce((acc, d) => acc + parseInt(d), 0);
    return s > 9 ? sumDigits(s) : s;
  };

  const yearDigit = sumDigits(year);
  
  // 1. FORÇA ESSENCIAL (Número Anual)
  let essentialNum = sex === "masculino" ? 11 - yearDigit : yearDigit + 4;
  if (essentialNum > 9) essentialNum -= 9;
  if (essentialNum < 1) essentialNum += 9;

  // 2. FORÇA DE EXPRESSÃO (Número Mensal)
  // O mês solar começa por volta do dia 7 ou 8
  let solarMonth = month;
  if (day < 7) solarMonth -= 1;
  if (solarMonth < 1) solarMonth = 12;

  // O número base do ano para o cálculo mensal é sempre o do Masculino
  const baseYearNum = 11 - yearDigit;
  let startMonthNum = 0;
  if ([3, 6, 9].includes(baseYearNum > 9 ? baseYearNum - 9 : baseYearNum)) startMonthNum = 5;
  else if ([1, 4, 7].includes(baseYearNum > 9 ? baseYearNum - 9 : baseYearNum)) startMonthNum = 8;
  else startMonthNum = 2;

  // Ciclo mensal (Fev=1, Mar=2...)
  const monthOffset = solarMonth >= 2 ? solarMonth - 2 : 10;
  let expressionNum = startMonthNum - monthOffset;
  while (expressionNum < 1) expressionNum += 9;

  // 3. ENERGIA PESSOAL / DESAFIO (Qi)
  // Fórmula da Geometria do SER: Posição da Essência no Quadrado do Mês
  let qiNum = 5 + (essentialNum - expressionNum);
  while (qiNum > 9) qiNum -= 9;
  while (qiNum < 1) qiNum += 9;

  return {
    essential: ENERGIES[essentialNum],
    expression: ENERGIES[expressionNum],
    personal: ENERGIES[qiNum]
  };
}
