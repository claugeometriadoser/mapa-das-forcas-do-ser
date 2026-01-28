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
  4: { number: 4, name: "Vento (XUN)", element: "Madeira", essence: "Estratégia, comunicação e adaptação.", shadow:
