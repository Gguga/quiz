import { Question } from './types';

export const QUESTIONS: Question[] = [

  // 1️⃣ SEXO
  {
    id: 1,
    text: "Você é:",
    options: [
      { label: "Homem", value: "sexo_homem", weight: 0 },
      { label: "Mulher", value: "sexo_mulher", weight: 0 }
    ]
  },

  // 2️⃣ IDADE
  {
    id: 2,
    text: "Qual sua faixa etária?",
    options: [
      { label: "18 a 29", value: "idade_18_29", weight: 5 },
      { label: "30 a 39", value: "idade_30_39", weight: 10 },
      { label: "40 a 49", value: "idade_40_49", weight: 20 },
      { label: "50+", value: "idade_50_plus", weight: 30 }
    ]
  },

  // 3️⃣ HISTÓRICO
  {
    id: 3,
    text: "Há quanto tempo você tenta emagrecer?",
    options: [
      { label: "Menos de 1 ano", value: "tempo_curto", weight: 5 },
      { label: "1–3 anos", value: "tempo_medio", weight: 15 },
      { label: "5–10 anos", value: "tempo_longo", weight: 30 },
      { label: "Mais de 10 anos", value: "tempo_eterno", weight: 40 }
    ]
  },

  // 4️⃣ SITUAÇÃO COM A CANETA
  {
    id: 4,
    text: "Qual sua situação hoje com a caneta?",
    options: [
      { label: "💉 Estou usando e ainda estou emagrecendo", value: "uso_atual_perda", weight: 25 },
      { label: "📉 Estou usando, mas o peso travou", value: "uso_atual_plato", weight: 40 },
      { label: "🔄 Estou reduzindo a dose", value: "uso_desmame", weight: 55 },
      { label: "⚠️ Já parei e o peso começou a voltar", value: "uso_parou_rebote", weight: 65 }
    ]
  },

  // 5️⃣ FORÇA / ENERGIA
  {
    id: 5,
    text: "Depois que começou a usar a medicação, sua força ou energia:",
    options: [
      { label: "Caíram bastante", value: "forca_caiu_muito", weight: 45 },
      { label: "Caíram um pouco", value: "forca_caiu_pouco", weight: 25 },
      { label: "Não reparei tanta diferença", value: "forca_estavel_medio", weight: 10 },
      { label: "Estão iguais ou melhoraram", value: "forca_estavel", weight: 0 }
    ]
  },

  // 6️⃣ TREINO DE FORÇA
  {
    id: 6,
    text: "Atualmente você treina musculação ou outro treino de força?",
    options: [
      { label: "Sim, treino estruturado", value: "forca_progressao", weight: 0 },
      { label: "Treino sem muita estratégia", value: "forca_irregular", weight: 25 },
      { label: "Só faço caminhada ou cardio", value: "forca_cardio", weight: 45 },
      { label: "Não faço musculação", value: "forca_nao_treina", weight: 50 }
    ]
  },

  // 7️⃣ PROTEÍNA POR REFEIÇÃO
  {
    id: 7,
    text: "Em quantas refeições do dia você consome boas quantidades de proteína?",
    options: [
      { label: "0–1", value: "proteina_0_1", weight: 55 },
      { label: "2", value: "proteina_2", weight: 35 },
      { label: "3", value: "proteina_3", weight: 10 },
      { label: "4 ou mais", value: "proteina_4_plus", weight: 0 }
    ]
  },

  // 8️⃣ PROTEÍNA CALCULADA
  {
    id: 8,
    text: "Você sabe quanto de proteína precisa comer por dia?",
    options: [
      { label: "Sim, calculo por peso corporal", value: "proteina_calculada", weight: 0 },
      { label: "Tenho noção aproximada", value: "proteina_feeling", weight: 40 },
      { label: "Nunca calculei", value: "proteina_nunca", weight: 55 }
    ]
  },

  // 9️⃣ DIETA
  {
    id: 9,
    text: "Sua dieta atual foi pensada para emagrecer com qualidade e conseguir manter depois?",
    options: [
      { label: "Sim, já foi pensada para essa fase", value: "dieta_protecao_sim", weight: 0 },
      { label: "Está focada apenas em emagrecer", value: "dieta_emagrecer", weight: 25 },
      { label: "Apenas reduzi as quantidades", value: "dieta_reduzi", weight: 40 },
      { label: "Ajusto tudo no feeling", value: "dieta_feeling", weight: 50 }
    ]
  },

  // 🔟 COLATERAIS
  {
    id: 10,
    text: "Durante o uso, você percebeu algum destes efeitos?",
    options: [
      { label: "Cansaço constante / falta de energia", value: "colateral_cansaco", weight: 25 },
      { label: "Náusea ou constipação frequente", value: "colateral_digestivo", weight: 20 },
      { label: "Um pouco de cada", value: "colateral_varios", weight: 35 },
      { label: "Nenhum desses", value: "colateral_nenhum", weight: 0 }
    ]
  },

  // 1️⃣1️⃣ COMPROMISSO
  {
    id: 11,
    text: "Você estaria disposto(a) a ajustar sua alimentação e rotina para aproveitar melhor a medicação e reduzir o risco de recuperar peso depois?",
    options: [
      { label: "Sim", value: "compromisso_sim", weight: 0 },
      { label: "Talvez", value: "compromisso_talvez", weight: 5 },
      { label: "Não tenho certeza", value: "compromisso_duvida", weight: 10 }
    ]
  }

];
