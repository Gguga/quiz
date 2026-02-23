import { Question } from './types';

export const QUESTIONS: Question[] = [

  // 1️⃣ SEXO
  {
    id: 1,
    text: "Você é homem ou mulher?",
    options: [
      { label: "Homem", value: "sexo_homem", weight: 0 },
      { label: "Mulher", value: "sexo_mulher", weight: 0 }
    ]
  },

  // 2️⃣ IDADE
  {
    id: 2,
    text: "Qual sua idade?",
    options: [
      { label: "18–29 anos", value: "idade_18_29", weight: 5 },
      { label: "30–39 anos", value: "idade_30_39", weight: 10 },
      { label: "40–49 anos", value: "idade_40_49", weight: 15 },
      { label: "50+ anos", value: "idade_50_plus", weight: 20 }
    ]
  },

  // 3️⃣ SITUAÇÃO COM CANETA
  {
    id: 3,
    text: "Qual sua situação atual com as canetas emagrecedoras?",
    options: [
      { label: "Uso atualmente e estou perdendo peso", value: "uso_atual_perda", weight: 25 },
      { label: "Uso atualmente, mas o peso travou (platô)", value: "uso_atual_plato", weight: 40 },
      { label: "Estou na fase de redução ou desmame", value: "uso_desmame", weight: 50 },
      { label: "Já interrompi e o peso está voltando", value: "uso_parou_rebote", weight: 60 }
    ]
  },

  // 4️⃣ TEMPO LUTANDO CONTRA O PESO
  {
    id: 4,
    text: "Há quanto tempo você luta contra o peso?",
    options: [
      { label: "Menos de 1 ano", value: "tempo_curto", weight: 5 },
      { label: "1 a 3 anos", value: "tempo_medio", weight: 15 },
      { label: "5 a 10 anos", value: "tempo_longo", weight: 30 },
      { label: "Mais de 10 anos", value: "tempo_eterno", weight: 45 }
    ]
  },

  // 5️⃣ HISTÓRICO DE EFEITO SANFONA
  {
    id: 5,
    text: "Você já emagreceu e recuperou peso anteriormente?",
    options: [
      { label: "Nunca", value: "sanfona_nunca", weight: 0 },
      { label: "Uma vez", value: "sanfona_1", weight: 20 },
      { label: "2–3 vezes", value: "sanfona_2_3", weight: 35 },
      { label: "Muitas vezes", value: "sanfona_muitas", weight: 50 }
    ]
  },

  // 🔴 NEWS entra após essa pergunta (controlado no App)

  // 6️⃣ OBJETIVO
  {
    id: 6,
    text: "Qual seu foco principal neste momento?",
    options: [
      { label: "Consolidar o peso e evitar rebote", value: "objetivo_consolidar", weight: 0 },
      { label: "Continuar emagrecendo o máximo possível", value: "objetivo_agressivo", weight: 30 }
    ]
  },

  // 7️⃣ FORÇA
  {
    id: 7,
    text: "Como está sua força nos treinos de musculação?",
    options: [
      { label: "Caiu muito", value: "forca_caiu_muito", weight: 45 },
      { label: "Caiu um pouco", value: "forca_caiu_pouco", weight: 25 },
      { label: "Está preservada", value: "forca_estavel", weight: 0 },
      { label: "Não treino força", value: "forca_nao_treina", weight: 30 }
    ]
  },

  // 8️⃣ FLACIDEZ
  {
    id: 8,
    text: "Você notou aumento de flacidez recentemente?",
    options: [
      { label: "Sim, diariamente", value: "flacidez_alta", weight: 35 },
      { label: "Às vezes", value: "flacidez_media", weight: 20 },
      { label: "Não percebo", value: "flacidez_baixa", weight: 0 }
    ]
  },

  // 9️⃣ ENERGIA
  {
    id: 9,
    text: "Como está sua energia ao longo do dia?",
    options: [
      { label: "Muito baixa", value: "energia_baixa", weight: 40 },
      { label: "Instável", value: "energia_media", weight: 20 },
      { label: "Boa e estável", value: "energia_alta", weight: 0 }
    ]
  },

  // 10️⃣ QUEDA DE CABELO / SINAIS DE SUBNUTRIÇÃO
  {
    id: 10,
    text: "Notou queda de cabelo ou unhas enfraquecidas recentemente?",
    options: [
      { label: "Sim, de forma intensa", value: "queda_intensa", weight: 45 },
      { label: "Leve", value: "queda_leve", weight: 25 },
      { label: "Não", value: "queda_nenhuma", weight: 0 }
    ]
  },

  // 11️⃣ PROTEÍNA POR REFEIÇÃO
  {
    id: 11,
    text: "Em quantas refeições do dia há proteína adequada?",
    options: [
      { label: "0–1", value: "proteina_0_1", weight: 50 },
      { label: "2", value: "proteina_2", weight: 35 },
      { label: "3", value: "proteina_3", weight: 15 },
      { label: "4 ou mais", value: "proteina_4_plus", weight: 0 }
    ]
  },

  // 12️⃣ PROTEÍNA CALCULADA
  {
    id: 12,
    text: "Você calcula sua ingestão proteica por kg de peso corporal?",
    options: [
      { label: "Sim, corretamente", value: "proteina_calculada", weight: 0 },
      { label: "Tenho uma noção aproximada", value: "proteina_aproximada", weight: 25 },
      { label: "Nunca calculei", value: "proteina_nunca", weight: 50 }
    ]
  },

  // 13️⃣ HIDRATAÇÃO
  {
    id: 13,
    text: "Como está sua ingestão diária de água?",
    options: [
      { label: "Baixa", value: "agua_baixa", weight: 20 },
      { label: "Irregular", value: "agua_media", weight: 10 },
      { label: "Adequada (2L ou mais)", value: "agua_ideal", weight: 0 }
    ]
  }

];
