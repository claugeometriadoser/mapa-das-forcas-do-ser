import { Energia } from "./calculoEnergia";

export function gerarLeitura(e: Energia, ex: Energia, ext: Energia) {
  let conflito = "";

  // 🔥 REGRA 1 — conflito externo
  if (e.tipo === "ativa" && ext.tipo === "estrutural") {
    conflito = "Você tenta avançar, mas a vida exige contenção.";
  }

  if (e.tipo === "estrutural" && ext.tipo === "ativa") {
    conflito = "Você busca estabilidade, mas a vida exige movimento.";
  }

  // 🔥 REGRA 2 — desalinhamento interno
  if (e.numero !== ex.numero) {
    conflito += " Existe um desalinhamento entre o que você é e como você age.";
  }

  // 🔥 REGRA 3 — compensação
  if (ext.tipo === "estrutural" && ex.tipo === "ativa") {
    conflito += " Você tenta compensar o bloqueio com mais ação — e isso te desgasta.";
  }

  return `
Existe um desalinhamento na forma como sua energia está operando.

Por dentro, você funciona com ${e.desc}.
Na prática, você se move com ${ex.desc}.

Mas a vida está te colocando em um cenário de ${ext.desc}.

${conflito}

O desgaste não vem da falta de capacidade.
Vem da forma como sua energia está sendo aplicada.
`;
}
