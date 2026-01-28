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

// Mapeamento de anos para a linha da tabela (0 a 8)
const YEAR_TO_ROW: Record<number, number> = {};
const rows = [
  [1910, 1919, 1928, 1937, 1946, 1955, 1964, 1973, 1982, 1991, 2000, 2009, 2018, 2027, 2036],
  [1911, 1920, 1929, 1938, 1947, 1956, 1965, 1974, 1983, 1992, 2001, 2010, 2019, 2028, 2037],
  [1912, 1921, 1930, 1939, 1948, 1957, 1966, 1975, 1984, 1993, 2002, 2011, 2020, 2029, 2038],
  [1913, 1922, 1931, 1940, 1949, 1958, 1967, 1976, 1985, 1994, 2003, 2012, 2021, 2030, 2039],
  [1914, 1923, 1932, 1941, 1950, 1959, 1968, 1977, 1986, 1995, 2004, 2013, 2022, 2031, 2040],
  [1915, 1924, 1933, 1942, 1951, 1960, 1969, 1978, 1987, 1996, 2005, 2014, 2023, 2032, 2041],
  [1916, 1925, 1934, 1943, 1952, 1961, 1970, 1979, 1988, 1997, 2006, 2015, 2024, 2033, 2042],
  [1917, 1926, 1935, 1944, 1953, 1962, 1971, 1980, 1989, 1998, 2007, 2016, 2025, 2034, 2043],
  [1918, 1927, 1936, 1945, 1954, 1963, 1972, 1981, 1990, 1999, 2008, 2017, 2026, 2035, 2044],
];
rows.forEach((row, idx) => row.forEach(year => YEAR_TO_ROW[year] = idx));

const MASC_NUMS = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const FEM_NUMS = [6, 7, 8, 9, 1, 2, 3, 4, 5];

// Matrix Energética Completa (Linha = N° Anual 1-9, Coluna = Mês Solar 1-12)
const MATRIX: Record<number, string[]> = {
  1: ["1.8.7", "1.7.8", "1.6.9", "1.5.1", "1.4.2", "1.3.3", "1.2.4", "1.1.5", "1.9.6", "1.8.7", "1.7.8", "1.6.9"],
  2: ["2.2.5", "2.1.6", "2.9.7", "2.8.8", "2.7.9", "2.6.1", "2.5.2", "2.4.3", "2.3.4", "2.2.5", "2.1.6", "2.9.7"],
  3: ["3.5.3", "3.4.4", "3.3.5", "3.2.6", "3.1.7", "3.9.8", "3.8.9", "3.7.1", "3.6.2", "3.5.3", "3.4.4", "3.3.5"],
  4: ["4.8.1", "4.7.2", "4.6.3", "4.5.4", "4.4.5", "4.3.6", "4.2.7", "4.1.8", "4.9.9", "4.8.1", "4.7.2", "4.6.3"],
  5: ["5.2.8", "5.1.9", "5.9.1", "5.8.2", "5.7.3", "5.6.4", "5.5.5", "5.4.6", "5.3.7", "5.2.8", "5.1.9", "5.9.1"],
  6: ["6.5.6", "6.4.7", "6.3.8", "6.2.9", "6.1.1", "6.9.2", "6.8.3", "6.7.4", "6.6.5", "6.5.6", "6.4.7", "6.3.8"],
  7: ["7.8.4", "7.7.5", "7.6.6", "7.5.7", "7.4.8", "7.3.9", "7.2.1", "7.1.2", "7.9.3", "7.8.4", "7.7.5", "7.6.6"],
  8: ["8.2.2", "8.1.3", "8.9.4", "8.8.5", "8.7.6", "8.6.7", "8.5.8", "8.4.9", "8.3.1", "8.2.2", "8.1.3", "8.9.4"],
  9: ["9.5.9", "9.4.1", "9.3.2", "9.2.3", "9.1.4", "9.9.5", "9.8.6", "9.7.7", "9.6.8", "9.5.9", "9.4.1", "9.3.2"],
};

export function calculateMap(date: Date, sex: string) {
  let year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 1. Número Anual (Solar)
  if (month < 2 || (month === 2 && day < 4)) year -= 1;
  const rowIndex = YEAR_TO_ROW[year];
  const annualNum = sex === "masculino" ? MASC_NUMS[rowIndex] : FEM_NUMS[rowIndex];

  // 2. Mês Solar (Corte no dia 7 conforme sua regra)
  const solarStarts = [0, 5, 4, 5, 4, 5, 5, 7, 7, 7, 8, 7, 7]; // Dias de início (Jan a Dez)
  let solarMonthIdx = month - 2; // Fevereiro é o primeiro mês da Matrix (índice 0)
  if (day < solarStarts[month]) solarMonthIdx -= 1;
  if (solarMonthIdx < 0) solarMonthIdx += 12;

  // 3. Consulta na Matrix
  const triplet = MATRIX[annualNum][solarMonthIdx].split(".");
  
  return {
    essential: ENERGIES[parseInt(triplet[0])],
    expression: ENERGIES[parseInt(triplet[1])],
    personal: ENERGIES[parseInt(triplet[2])]
  };
}
