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

// -----------------------------
// 1) Número Anual (igual ao que já tínhamos: usa ano solar, com virada em 4/fev)
// -----------------------------
function sumDigitsToOne(n: number): number {
  const s = n.toString().split("").reduce((acc, d) => acc + parseInt(d, 10), 0);
  return s > 9 ? sumDigitsToOne(s) : s;
}

export function calculateAnnualNumber(date: Date, sex: string): number {
  let year = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  // Ano novo solar: 4 de fevereiro
  if (m < 2 || (m === 2 && d < 4)) year -= 1;

  const yearDigit = sumDigitsToOne(year);

  // Fórmula padrão 9-star
  let n = sex === "masculino" ? 11 - yearDigit : yearDigit + 4;

  while (n > 9) n -= 9;
  while (n < 1) n += 9;

  return n;
}

// -----------------------------
// 2) Coluna do mês (pela sua tabela: faixas por mês solar)
// Observação: sua imagem usa faixas de dias (ex.: "7 a 9 Agost").
// Para não errar, aqui vamos mapear SÓ pelo mês.
// Se você quiser, depois refinamos por dia (corte 7/8/9) com base na sua regra.
// -----------------------------
type MonthCol =
  | "FEV"
  | "MAR"
  | "ABR"
  | "MAI"
  | "JUN"
  | "JUL"
  | "AGO"
  | "SET"
  | "OUT"
  | "NOV"
  | "DEZ"
  | "JAN";

function getMonthCol(date: Date): MonthCol {
  const month = date.getMonth() + 1;
  // Mapeamento direto pelo mês do calendário (por enquanto)
  // 1=JAN, 2=FEV, ..., 12=DEZ
  if (month === 2) return "FEV";
  if (month === 3) return "MAR";
  if (month === 4) return "ABR";
  if (month === 5) return "MAI";
  if (month === 6) return "JUN";
  if (month === 7) return "JUL";
  if (month === 8) return "AGO";
  if (month === 9) return "SET";
  if (month === 10) return "OUT";
  if (month === 11) return "NOV";
  if (month === 12) return "DEZ";
  return "JAN";
}

// -----------------------------
// 3) Matrix Energética Completa (anual.mensal.qi)
// Esta matriz foi transcrita a partir da sua imagem.
// Cada item é [mensal, qi] para um Nº anual (linha) e coluna (mês).
// -----------------------------
const MATRIX: Record<number, Record<MonthCol, { mensal: number; qi: number }>> = {
  1: {
    FEV: { mensal: 8, qi: 7 }, MAR: { mensal: 7, qi: 8 }, ABR: { mensal: 6, qi: 9 }, MAI: { mensal: 5, qi: 1 },
    JUN: { mensal: 4, qi: 2 }, JUL: { mensal: 3, qi: 3 }, AGO: { mensal: 2, qi: 4 }, SET: { mensal: 1, qi: 5 },
    OUT: { mensal: 9, qi: 6 }, NOV: { mensal: 8, qi: 7 }, DEZ: { mensal: 7, qi: 8 }, JAN: { mensal: 6, qi: 9 },
  },
  2: {
    FEV: { mensal: 2, qi: 5 }, MAR: { mensal: 1, qi: 6 }, ABR: { mensal: 9, qi: 7 }, MAI: { mensal: 8, qi: 8 },
    JUN: { mensal: 7, qi: 9 }, JUL: { mensal: 6, qi: 1 }, AGO: { mensal: 5, qi: 2 }, SET: { mensal: 4, qi: 3 },
    OUT: { mensal: 3, qi: 4 }, NOV: { mensal: 2, qi: 5 }, DEZ: { mensal: 1, qi: 6 }, JAN: { mensal: 9, qi: 7 },
  },
  3: {
    FEV: { mensal: 5, qi: 3 }, MAR: { mensal: 4, qi: 4 }, ABR: { mensal: 3, qi: 5 }, MAI: { mensal: 2, qi: 6 },
    JUN: { mensal: 1, qi: 7 }, JUL: { mensal: 9, qi: 8 }, AGO: { mensal: 8, qi: 9 }, SET: { mensal: 7, qi: 1 },
    OUT: { mensal: 6, qi: 2 }, NOV: { mensal: 5, qi: 3 }, DEZ: { mensal: 4, qi: 4 }, JAN: { mensal: 3, qi: 5 },
  },
  4: {
    FEV: { mensal: 6, qi: 2 }, MAR: { mensal: 5, qi: 3 }, ABR: { mensal: 4, qi: 4 }, MAI: { mensal: 3, qi: 5 },
    JUN: { mensal: 2, qi: 6 }, JUL: { mensal: 1, qi: 7 }, AGO: { mensal: 9, qi: 8 }, SET: { mensal: 8, qi: 9 },
    OUT: { mensal: 7, qi: 1 }, NOV: { mensal: 6, qi: 2 }, DEZ: { mensal: 5, qi: 3 }, JAN: { mensal: 4, qi: 4 },
  },
  5: {
    FEV: { mensal: 7, qi: 1 }, MAR: { mensal: 6, qi: 2 }, ABR: { mensal: 5, qi: 3 }, MAI: { mensal: 4, qi: 4 },
    JUN: { mensal: 3, qi: 5 }, JUL: { mensal: 2, qi: 6 }, AGO: { mensal: 1, qi: 7 }, SET: { mensal: 9, qi: 8 },
    OUT: { mensal: 8, qi: 9 }, NOV: { mensal: 7, qi: 1 }, DEZ: { mensal: 6, qi: 2 }, JAN: { mensal: 5, qi: 3 },
  },
  6: {
    FEV: { mensal: 3, qi: 9 }, MAR: { mensal: 2, qi: 1 }, ABR: { mensal: 1, qi: 2 }, MAI: { mensal: 9, qi: 3 },
    JUN: { mensal: 8, qi: 4 }, JUL: { mensal: 7, qi: 5 }, AGO: { mensal: 6, qi: 6 }, SET: { mensal: 5, qi: 7 },
    OUT: { mensal: 4, qi: 8 }, NOV: { mensal: 3, qi: 9 }, DEZ: { mensal: 2, qi: 1 }, JAN: { mensal: 1, qi: 2 },
  },
  7: {
    FEV: { mensal: 4, qi: 8 }, MAR: { mensal: 3, qi: 9 }, ABR: { mensal: 2, qi: 1 }, MAI: { mensal: 1, qi: 2 },
    JUN: { mensal: 9, qi: 3 }, JUL: { mensal: 8, qi: 4 }, AGO: { mensal: 7, qi: 5 }, SET: { mensal: 6, qi: 6 },
    OUT: { mensal: 5, qi: 7 }, NOV: { mensal: 4, qi: 8 }, DEZ: { mensal: 3, qi: 9 }, JAN: { mensal: 2, qi: 1 },
  },
  8: {
    FEV: { mensal: 9, qi: 4 }, MAR: { mensal: 8, qi: 5 }, ABR: { mensal: 7, qi: 6 }, MAI: { mensal: 6, qi: 7 },
    JUN: { mensal: 5, qi: 8 }, JUL: { mensal: 4, qi: 9 }, AGO: { mensal: 3, qi: 1 }, SET: { mensal: 2, qi: 2 },
    OUT: { mensal: 1, qi: 3 }, NOV: { mensal: 9, qi: 4 }, DEZ: { mensal: 8, qi: 5 }, JAN: { mensal: 7, qi: 6 },
  },
  9: {
    FEV: { mensal: 1, qi: 7 }, MAR: { mensal: 9, qi: 8 }, ABR: { mensal: 8, qi: 9 }, MAI: { mensal: 7, qi: 1 },
    JUN: { mensal: 6, qi: 2 }, JUL: { mensal: 5, qi: 3 }, AGO: { mensal: 4, qi: 4 }, SET: { mensal: 3, qi: 5 },
    OUT: { mensal: 2, qi: 6 }, NOV: { mensal: 1, qi: 7 }, DEZ: { mensal: 9, qi: 8 }, JAN: { mensal: 8, qi: 9 },
  },
};

export function calculateQiFromMatrix(date: Date, sex: string): { anual: number; mensal: number; qi: number } {
  const anual = calculateAnnualNumber(date, sex);
  const col = getMonthCol(date);
  const cell = MATRIX[anual]?.[col];
  if (!cell) throw new Error("Matriz: combinação de Nº Anual e mês não encontrada.");
  return { anual, mensal: cell.mensal, qi: cell.qi };
}

export function calculatePersonalEnergy(date: Date, sex: string): EnergyInfo {
  const { qi } = calculateQiFromMatrix(date, sex);
  return ENERGIES[qi];
}
