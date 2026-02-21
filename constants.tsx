import { Question } from './types';

export const QUESTIONS: Question[] = [

  // 1️⃣ SEXO
  {
    id: 1,
    text: "Você é homem ou mulher?",
    options: [
      { label: "👨 Homem", value: "sexo_homem", weight: 0 },
      { label: "👩 Mulher", value: "sexo_mulher", weight: 0 }
    ]
  },

  // 2️⃣ IDADE
  {
    id: 2,
    text: "Qual sua idade?",
    options: [
      { label: "18–29 anos", value: "idade_18_29", weight: 10 },
      { label: "30–39 anos", value: "idade_30_39", weight: 20 },
      { label: "40–49 anos", value: "idade_40_49", weight: 35 },
      { label: "50+ anos", value: "idade_50_plus", weight: 50 }
    ]
  },

  // 3️⃣ SITUAÇÃO COM CANETA
  {
    id: 3,
    text: "Qual sua situação atual com as canetas emagrecedoras?",
    options: [
      { label: "💉 Uso atualmente e estou perdendo peso", subLabel: "Quero garantir que esse resultado seja definitivo.", value: "uso_atual_perda", weight: 30 },
      { label: "🛑 Uso atualmente, mas o peso travou (Platô)", subLabel: "Sinto que o efeito diminuiu e meu metabolismo estagnou.", value: "uso_atual_plato", weight: 45 },
      { label: "📉 Estou na fase de desmame ou redução", subLabel: "Momento crítico: receio de recuperar o peso agora.", value: "uso_desmame", weight: 50 },
      { label: "⚠️ Já parei de usar e o peso está voltando", subLabel: "Preciso de um socorro metabólico para frear o rebote.", value: "uso_parou_rebote", weight: 60 }
    ]
  },

  // 4️⃣ TEMPO LUTANDO CONTRA A BALANÇA
  {
    id: 4,
    text: "Há quanto tempo você luta contra a balança?",
    options: [
      { label: "🌱 Menos de 1 ano", value: "tempo_curto", weight: 10 },
      { label: "⏳ De 1 a 3 anos", value: "tempo_medio", weight: 25 },
      { label: "🔄 De 5 a 10 anos", value: "tempo_longo", weight: 40 },
      { label: "⛓️ Mais de 10 anos", value: "tempo_eterno", weight: 60 }
    ]
  },

  // 5️⃣ OBJETIVO
  {
    id: 5,
    text: "Qual seu principal objetivo com este diagnóstico hoje?",
    options: [
      { label: "🛡️ Me proteger do rebote", value: "objetivo_saude", weight: 0 },
      { label: "⚡ Perder peso rápido a qualquer custo", value: "objetivo_rapido", weight: 40 }
    ]
  },

  // 6️⃣ ÁGUA
  {
    id: 6,
    text: "Como está sua ingestão de água?",
    options: [
      { label: "🌵 Muito baixa", value: "agua_baixa", weight: 40 },
      { label: "💧 Irregular", value: "agua_media", weight: 25 },
      { label: "🌊 2L a 3L por dia", value: "agua_ideal", weight: 0 }
    ]
  },

  // 7️⃣ PROTEÍNA REFEIÇÕES
  {
    id: 7,
    text: "Em quantas refeições há proteína de verdade?",
    options: [
      { label: "🥩 0–1", value: "proteina_0_1", weight: 50 },
      { label: "🍗 2", value: "proteina_2", weight: 35 },
      { label: "🥚 3", value: "proteina_3", weight: 15 },
      { label: "💪 4+", value: "proteina_4_plus", weight: 0 }
    ]
  },

  // 8️⃣ PROTEÍNA CALCULADA
  {
    id: 8,
    text: "Sua proteína está calculada por kg?",
    options: [
      { label: "⚖️ Sim", value: "proteina_calculada", weight: 0 },
      { label: "🤔 No feeling", value: "proteina_feeling", weight: 40 },
      { label: "❓ Nunca calculei", value: "proteina_nunca", weight: 50 }
    ]
  },

  // 9️⃣ FORÇA
  {
    id: 9,
    text: "Como está sua força nos treinos?",
    options: [
      { label: "📉 Caiu muito", value: "forca_caiu_muito", weight: 45 },
      { label: "😕 Caiu um pouco", value: "forca_caiu_pouco", weight: 25 },
      { label: "💪 Preservada", value: "forca_estavel", weight: 0 },
      { label: "🧘 Não treino força", value: "forca_nao_treina", weight: 30 }
    ]
  },

  // 10️⃣ FLACIDEZ
  {
    id: 10,
    text: "Com que frequência sente incômodo com flacidez?",
    options: [
      { label: "😭 Todos os dias", value: "incomodo_sempre", weight: 40 },
      { label: "😟 Às vezes", value: "incomodo_frequente", weight: 25 },
      { label: "🥰 Não sinto", value: "incomodo_nenhum", weight: 0 }
    ]
  },

  // 11️⃣ ENERGIA
  {
    id: 11,
    text: "Como está sua energia diária?",
    options: [
      { label: "😭 Muito baixa", value: "energy_baixa", weight: 45 },
      { label: "😟 Instável", value: "energy_media", weight: 25 },
      { label: "😁 Alta", value: "energy_alta", weight: 0 }
    ]
  },

  // 12️⃣ QUEDA DE CABELO
  {
    id: 12,
    text: "Notou queda de cabelo ou unhas fracas?",
    options: [
      { label: "💇‍♀️ Sim, intensa", value: "queda_intensa", weight: 50 },
      { label: "💅 Leve", value: "queda_leve", weight: 30 },
      { label: "✅ Não", value: "queda_nenhuma", weight: 0 }
    ]
  }

];
