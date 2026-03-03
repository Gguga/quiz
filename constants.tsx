import { Question } from './types';

export const QUESTIONS: Question[] = [

  // 1 SEXO
  {
    id: 1,
    text: "Seu sexo:",
    options: [
      { label: "Homem", value: "sexo_homem", weight: 0 },
      { label: "Mulher", value: "sexo_mulher", weight: 0 }
    ]
  },

  // 2 IDADE
  {
    id: 2,
    text: "Qual sua idade?",
    options: [
      { label: "18 a 29 anos", value: "idade_18_29", weight: 5 },
      { label: "30 a 39 anos", value: "idade_30_39", weight: 10 },
      { label: "40 a 49 anos", value: "idade_40_49", weight: 20 },
      { label: "50 anos ou mais", value: "idade_50_plus", weight: 30 }
    ]
  },

  // 3 HISTÓRICO
  {
    id: 3,
    text: "Há quanto tempo você tenta emagrecer?",
    options: [
      { label: "Menos de 1 ano", value: "tempo_curto", weight: 5 },
      { label: "Entre 1 e 3 anos", value: "tempo_medio", weight: 15 },
      { label: "Entre 3 e 5 anos", value: "tempo_longo", weight: 30 },
      { label: "Mais de 5 anos", value: "tempo_eterno", weight: 40 }
    ]
  },

  // 4 SITUAÇÃO MEDICAÇÃO
  {
    id: 4,
    text: "Qual seu momento atual com a medicação?",
    options: [
      { label: "Estou usando e ainda estou emagrecendo", value: "uso_atual_perda", weight: 25 },
      { label: "Estou usando, mas o peso parou de cair", value: "uso_atual_plato", weight: 40 },
      { label: "Estou reduzindo a dose", value: "uso_desmame", weight: 55 },
      { label: "Já parei e tenho medo de recuperar o peso", value: "uso_parou_rebote", weight: 65 }
    ]
  },

  // 5 FORÇA / ENERGIA
  {
    id: 5,
    text: "Sua força ou energia:",
    options: [
      { label: "Estão iguais ou melhores", value: "forca_estavel", weight: 0 },
      { label: "Não percebi muita diferença", value: "forca_estavel_medio", weight: 10 },
      { label: "Caíram um pouco", value: "forca_caiu_pouco", weight: 25 },
      { label: "Caíram bastante", value: "forca_caiu_muito", weight: 45 }
    ]
  },

  // 6 TREINO
  {
    id: 6,
    text: "Como está seu treino de força?",
    options: [
      { label: "Treino estruturado com progressão", value: "forca_progressao", weight: 0 },
      { label: "Treino, mas sem muita estratégia", value: "forca_irregular", weight: 25 },
      { label: "Faço apenas caminhada ou cardio", value: "forca_cardio", weight: 45 },
      { label: "Não faço musculação", value: "forca_nao_treina", weight: 50 }
    ]
  },

  // 7 PROTEÍNA
  {
    id: 7,
    text: "Em quantas refeições do seu dia tem proteína?",
    options: [
      { label: "4 ou mais refeições", value: "proteina_4_plus", weight: 0 },
      { label: "3 refeições", value: "proteina_3", weight: 10 },
      { label: "2 refeições", value: "proteina_2", weight: 35 },
      { label: "1 refeição ou menos", value: "proteina_0_1", weight: 55 }
    ]
  },

  // 8 CONSCIÊNCIA PROTEICA
  {
    id: 8,
    text: "Você acompanha ou já calculou sua proteína?",
    options: [
      { label: "Sim, calculo por peso corporal", value: "proteina_calculada", weight: 0 },
      { label: "Tenho uma noção aproximada", value: "proteina_feeling", weight: 40 },
      { label: "Já, mas não tenho conseguido comer tudo", value: "proteina_feeling", weight: 40 },
      { label: "Nunca calculei com exatidão", value: "proteina_nunca", weight: 55 }
    ]
  },

  // 9 ESTRUTURA DIETA
  {
    id: 9,
    text: "Como sua alimentação está organizada hoje?",
    options: [
      { label: "Tenho uma estratégia alimentar bem definida", value: "dieta_protecao_sim", weight: 0 },
      { label: "Estou focando apenas em emagrecer", value: "dieta_emagrecer", weight: 25 },
      { label: "Apenas reduzi as quantidades", value: "dieta_reduzi", weight: 40 },
      { label: "Vou ajustando no feeling", value: "dieta_feeling", weight: 50 }
    ]
  },

  // 10 COLATERAIS
  {
    id: 10,
    text: "Recentemente, percebeu algum desses efeitos?",
    options: [
      { label: "Cansaço constante ou falta de energia", value: "colateral_cansaco", weight: 25 },
      { label: "Náusea ou prisão de ventre frequente", value: "colateral_digestivo", weight: 20 },
      { label: "Um pouco de cada", value: "colateral_varios", weight: 35 },
      { label: "Nenhum desses", value: "colateral_nenhum", weight: 0 },
    ]
  },

  // 11 COMPROMISSO
  {
    id: 11,
    text: "Você gostaria de saber exatamente como manter o peso sem efeito rebote?",
    options: [
      { label: "Sim, quero manter meu resultado", value: "compromisso_sim", weight: 0 },
      { label: "Quero entender melhor como funciona", value: "compromisso_talvez", weight: 5 },
      { label: "Não sei se faria tanta diferença", value: "compromisso_duvida", weight: 10 }
    ]
  }

];
