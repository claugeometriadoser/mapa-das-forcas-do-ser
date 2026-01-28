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

  // 1. FORÇA ESSENCIAL (Ano Solar - vira 4/Fev)
  if (month < 2 || (month === 2 && day < 4)) year -= 1;
  const sumDigits = (n: number): number => {
    const s = n.toString().split("").reduce((acc, d) => acc + parseInt(d), 0);
    return s > 9 ? sumDigits(s) : s;
  };
  const yearDigit = sumDigits(year);
  let essential = sex === "masculino" ? 11 - yearDigit : yearDigit + 4;
  while (essential > 9) essential -= 9;
  while (essential < 1) essential += 9;

  // 2. FORÇA DE EXPRESSÃO (Mês Solar)
  // Datas de início do mês solar (aproximadas para o método)
  const solarStarts = [0, 6, 4, 6, 5, 6, 6, 7, 8, 8, 8, 7, 7]; 
  let solarMonth = month;
  if (day < solarStarts[month]) solarMonth -= 1;
  if (solarMonth < 1) solarMonth = 12;

  // Número base do mês depende do grupo da Essência
  let startNum = 0;
  if ([1, 4, 7].includes(essential)) startNum = 8;
  else if ([2, 5, 8].includes(essential)) startNum = 2;
  else if ([3, 6, 9].includes(essential)) startNum = 5;

  // Sequência decrescente: Fev(0), Mar(1)... Jan(11)
  const offset = solarMonth >= 2 ? solarMonth - 2 : 11;
  let expression = startNum - offset;
  while (expression < 1) expression += 9;

  // 3. ENERGIA PESSOAL (Qi) - A fórmula mestre
  let personal = 5 + (essential - expression);
  while (personal > 9) personal -= 9;
  while (personal < 1) personal += 9;

  return {
    essential: ENERGIES[essential],
    expression: ENERGIES[expression],
    personal: ENERGIES[personal]
  };
}
