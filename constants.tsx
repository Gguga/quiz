import { Question } from './types';

export const QUESTIONS: Question[] = [

  // 1 SEXO
  {
    id: 1,
    text: "Você é:",
    options: [
      { label: "Homem", value: "sexo_homem", weight: 0 },
      { label: "Mulher", value: "sexo_mulher", weight: 0 }
    ]
  },

  // 2 IDADE
  {
    id: 2,
    text: "Qual sua faixa etária?",
    options: [
      { label: "18 a 29 anos", value: "idade_18_29", weight: 5 },
      { label: "30 a 39 anos", value: "idade_30_39", weight: 10 },
      { label: "40 a 49 anos", value: "idade_40_49", weight: 20 },
      { label: "50 anos ou mais", value: "idade_50_plus", weight: 30 }
    ]
  },

  // 3 HISTORICO
  {
    id: 3,
    text: "Ha quanto tempo voce tenta emagrecer?",
    options: [
      { label: "Menos de 1 ano", value: "tempo_curto", weight: 5 },
      { label: "1-3 anos", value: "tempo_medio", weight: 15 },
      { label: "5-10 anos", value: "tempo_longo", weight: 30 },
      { label: "Mais de 10 anos", value: "tempo_eterno", weight: 40 }
    ]
  },

  // 4 SITUACAO COM MEDICACAO
  {
    id: 4,
    text: "Qual sua situacao atual com a medicacao para emagrecimento?",
    options: [
      { label: "Estou usando e ainda estou emagrecendo", value: "uso_atual_perda", weight: 25 },
      { label: "Estou usando, mas o peso parou de cair", value: "uso_atual_plato", weight: 40 },
      { label: "Estou reduzindo a dose", value: "uso_desmame", weight: 55 },
      { label: "Ja parei e o peso comecou a voltar", value: "uso_parou_rebote", weight: 65 }
    ]
  },

  // 5 FORCA ENERGIA
  {
    id: 5,
    text: "Depois que comecou a usar a medicacao, sua forca ou energia:",
    options: [
      { label: "Cairam bastante", value: "forca_caiu_muito", weight: 45 },
      { label: "Cairam um pouco", value: "forca_caiu_pouco", weight: 25 },
      { label: "Nao percebi muita diferenca", value: "forca_estavel_medio", weight: 10 },
      { label: "Estao iguais ou melhores", value: "forca_estavel", weight: 0 }
    ]
  },

  // 6 TREINO DE FORCA
  {
    id: 6,
    text: "Como esta seu treino de forca atualmente?",
    options: [
      { label: "Treino estruturado com progressao", value: "forca_progressao", weight: 0 },
      { label: "Treino, mas sem muita estrategia", value: "forca_irregular", weight: 25 },
      { label: "Faco apenas caminhada ou cardio", value: "forca_cardio", weight: 45 },
      { label: "Nao faco musculacao", value: "forca_nao_treina", weight: 50 }
    ]
  },

  // 7 PROTEINA POR REFEICAO
  {
    id: 7,
    text: "Em quantas refeicoes do dia voce costuma incluir uma fonte de proteina?",
    options: [
      { label: "0 ou 1 refeicao", value: "proteina_0_1", weight: 55 },
      { label: "2 refeicoes", value: "proteina_2", weight: 35 },
      { label: "3 refeicoes", value: "proteina_3", weight: 10 },
      { label: "4 ou mais refeicoes", value: "proteina_4_plus", weight: 0 }
    ]
  },

  // 8 CONSCIENCIA PROTEICA
  {
    id: 8,
    text: "Voce costuma acompanhar ou calcular a quantidade de proteina da sua dieta?",
    options: [
      { label: "Sim, calculo por peso corporal", value: "proteina_calculada", weight: 0 },
      { label: "Tenho uma nocao aproximada", value: "proteina_feeling", weight: 40 },
      { label: "Nunca calculei", value: "proteina_nunca", weight: 55 }
    ]
  },

  // 9 ESTRUTURA DA DIETA
  {
    id: 9,
    text: "Como sua alimentacao esta estruturada hoje?",
    options: [
      { label: "Tenho uma estrategia alimentar bem definida", value: "dieta_protecao_sim", weight: 0 },
      { label: "Estou focando apenas em emagrecer", value: "dieta_emagrecer", weight: 25 },
      { label: "Apenas reduzi as quantidades", value: "dieta_reduzi", weight: 40 },
      { label: "Vou ajustando no feeling", value: "dieta_feeling", weight: 50 }
    ]
  },

  // 10 COLATERAIS
  {
    id: 10,
    text: "Durante o uso da medicacao, voce percebeu algum destes efeitos?",
    options: [
      { label: "Cansaco constante ou falta de energia", value: "colateral_cansaco", weight: 25 },
      { label: "Nausea ou constipacao frequente", value: "colateral_digestivo", weight: 20 },
      { label: "Um pouco de cada", value: "colateral_varios", weight: 35 },
      { label: "Nenhum desses", value: "colateral_nenhum", weight: 0 }
    ]
  },

  // 11 COMPROMISSO
  {
    id: 11,
    text: "Voce gostaria de entender como manter seu peso sem risco de rebote?",
    options: [
      { label: "Sim, quero manter meu resultado", value: "compromisso_sim", weight: 0 },
      { label: "Quero entender melhor como funciona", value: "compromisso_talvez", weight: 5 },
      { label: "Nao sei se faria tanta diferenca", value: "compromisso_duvida", weight: 10 }
    ]
  }

];
