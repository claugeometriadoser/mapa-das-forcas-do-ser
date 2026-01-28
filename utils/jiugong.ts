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

export function calculatePersonalEnergy(date: Date, sex: string): EnergyInfo {
  let year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 1. Ajuste do Ano Novo Solar (4 de fevereiro)
  if (month < 2 || (month === 2 && day < 4)) {
    year -= 1;
  }

  // 2. Soma dos dígitos do ano até chegar em um único dígito
  const sumDigits = (n: number): number => {
    const s = n.toString().split("").reduce((acc, d) => acc + parseInt(d), 0);
    return s > 9 ? sumDigits(s) : s;
  };

  const yearDigit = sumDigits(year);
  
  // 3. Cálculo da Energia Pessoal (Qi) - Fórmula específica da Geometria do SER
  let qiNumber: number;
  
  if (sex === "masculino") {
    // Fórmula para masculino
    qiNumber = 11 - yearDigit;
  } else {
    // Fórmula para feminino (e outros)
    qiNumber = yearDigit + 4;
  }

  // 4. Ajuste para o ciclo de 9
  while (qiNumber > 9) qiNumber -= 9;
  while (qiNumber < 1) qiNumber += 9;

  return ENERGIES[qiNumber];
}
