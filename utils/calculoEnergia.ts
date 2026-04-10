export type Energia = {
  numero: number;
  nome: string;
  elemento: string;
  tipo: "ativa" | "estrutural" | "relacional";
  desc: string;
};

export const energias: Record<number, Energia> = {
  1: { numero: 1, nome: "Água", elemento: "Água", tipo: "ativa", desc: "fluxo, adaptação, movimento contínuo" },
  2: { numero: 2, nome: "Terra", elemento: "Terra", tipo: "estrutural", desc: "nutrir, sustentar, suportar" },
  3: { numero: 3, nome: "Trovão", elemento: "Madeira", tipo: "ativa", desc: "início, impulso, ação" },
  4: { numero: 4, nome: "Vento", elemento: "Madeira", tipo: "relacional", desc: "influência, penetração, ajuste" },
  5: { numero: 5, nome: "Centro", elemento: "Terra", tipo: "relacional", desc: "equilíbrio, eixo, organização" },
  6: { numero: 6, nome: "Céu", elemento: "Metal", tipo: "estrutural", desc: "direção, comando, visão" },
  7: { numero: 7, nome: "Lago", elemento: "Metal", tipo: "relacional", desc: "troca, expressão, prazer" },
  8: { numero: 8, nome: "Montanha", elemento: "Terra", tipo: "estrutural", desc: "limite, contenção, pausa" },
  9: { numero: 9, nome: "Fogo", elemento: "Fogo", tipo: "ativa", desc: "expansão, visibilidade, intensidade" },
};

function reduzir(n: number) {
  while (n > 9) {
    n = n.toString().split("").reduce((a, b) => a + Number(b), 0);
  }
  return n === 0 ? 9 : n;
}

export function calcularEnergia(data: string, sexo: string) {
  const numeros = data.replaceAll("-", "").split("").map(Number);
  let soma = numeros.reduce((a, b) => a + b, 0);

  // ⚠️ AJUSTE DE SEXO (você pode calibrar depois)
  if (sexo === "feminino") soma += 2;
  if (sexo === "masculino") soma += 5;

  const externa = reduzir(soma);
  const essencia = reduzir(soma + 2);
  const expressao = reduzir(soma + 5);

  return {
    essencia: energias[essencia],
    expressao: energias[expressao],
    externa: energias[externa],
  };
}
