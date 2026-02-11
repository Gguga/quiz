
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 3, 
    text: "Qual sua situação atual com as canetas emagrecedoras?",
    options: [
      { label: "💉 Uso atualmente e estou perdendo peso", subLabel: "Quero garantir que esse resultado seja definitivo.", value: "uso_atual_perda", weight: 30 },
      { label: "🛑 Uso atualmente, mas o peso travou (Platô)", subLabel: "Sinto que o efeito diminuiu.", value: "uso_atual_plato", weight: 45 },
      { label: "📉 Estou na fase de desmame ou redução", subLabel: "Momento crítico: receio de recuperar o peso agora.", value: "uso_desmame", weight: 50 },
      { label: "⚠️ Já parei de usar e o peso está voltando", subLabel: "Estou com medo do rebote", value: "uso_parou_rebote", weight: 60 }
    ]
  },
  {
    id: 12,
    text: "Há quanto tempo você carrega o peso de lutar contra a balança, entre perdas e ganhos temporários?",
    options: [
      { label: "🌱 Menos de 1 ano", subLabel: "Engordei faz pouco tempo", value: "tempo_curto", weight: 10 },
      { label: "⏳ Entre 1 a 3 anos", subLabel: "O cansaço de tentar e não manter já começou a aparecer.", value: "tempo_medio", weight: 25 },
      { label: "🔄 Entre 5 a 10 anos", subLabel: "O efeito sanfona virou uma rotina exaustiva na minha vida.", value: "tempo_longo", weight: 40 },
      { label: "⛓️ Mais de 10 anos ou a vida toda", subLabel: "A caneta foi minha última esperança", value: "tempo_eterno", weight: 60 }
    ]
  },
  {
    id: 2, 
    text: "Qual o seu principal objetivo com este diagnóstico hoje?",
    options: [
      { label: "🛡️ Me proteger do rebote e efeito sanfona", subLabel: "Quero manter o peso para sempre.", value: "objetivo_saude", weight: 0 },
      { label: "⚡ Perder peso rápido a qualquer custo", subLabel: "Mesmo sabendo que o risco é alto.", value: "objetivo_rapido", weight: 40 }
    ]
  },
  {
    id: 6, 
    text: "Com qual frequência você sente desconfortos gástricos?",
    options: [
      { label: "🤢 Náuseas e enjoos frequentes", value: "colateral_nausea", weight: 35 },
      { label: "🧱 Intestino muito 'preso'", value: "colateral_constipacao", weight: 35 },
      { label: "🎈 Empachamento e gases", value: "colateral_digestao", weight: 25 },
      { label: "😵‍💫 Um pouco de todos acima", value: "colateral_todos", weight: 50 },
      { label: "✨ Meu organismo está reagindo bem", value: "colateral_nenhum", weight: 0 }
    ]
  },
  {
    id: 1, 
    text: "Como está sua ingestão de água hoje?",
    options: [
      { label: "🌵 Bebo pouquíssima água", value: "agua_baixa", weight: 40 },
      { label: "💧 Esqueço de beber", value: "agua_media", weight: 25 },
       { label: "✨ Entre 1 e 1,5L ", value: "agua_media", weight: 10 }
      { label: "🌊 Mantenho o ritmo de 2L a 3L", value: "agua_ideal", weight: 0 }
    ]
  },
  {
    id: 9, 
    text: "Em quantas refeições do seu dia tem uma proteína de verdade?",
    options: [
      { label: "🥩 0–1 refeições", value: "proteina_0_1", weight: 50 },
      { label: "🍗 2 refeições", value: "proteina_2", weight: 35 },
      { label: "🥚 3 refeições", value: "proteina_3", weight: 15 },
      { label: "💪 4+ refeições", value: "proteina_4_plus", weight: 0 }
    ]
  },
  {
    id: 10,
    text: "Sua proteína está calculada por kg de peso ou você vai no “feeling”?",
    options: [
      { label: "⚖️ Está calculada por kg", value: "proteina_calculada", weight: 0 },
      { label: "🤔 Vou no feeling", value: "proteina_feeling", weight: 40 },
      { label: "❓ Nunca calculei", value: "proteina_nunca", weight: 50 },
      { label: "🤢 Já foi calculada, mas não consigo comer o que preciso", value: "proteina_calculada_dificuldade", weight: 45 }
    ]
  },
  {
    id: 8, 
    text: "Como você avalia sua força e carga nos treinos ultimamente?",
    options: [
      { label: "📉 Minha força caiu drasticamente", value: "forca_caiu_muito", weight: 45 },
      { label: "😕 Sinto mais cansaço", value: "forca_caiu_pouco", weight: 25 },
      { label: "💪 Minha força está preservada", value: "forca_estavel", weight: 0 },
      { label: "🧘 Não tenho treinado força", value: "forca_nao_treina", weight: 30 }
    ]
  },
  {
    id: 4, 
    text: "Com qual frequência você sente incômodo com a flacidez?",
    options: [
      { label: "😭 Todos os dias!", value: "incomodo_sempre", weight: 40 },
      { label: "😟 Ao me olhar no espelho", value: "incomodo_frequente", weight: 25 },
      { label: "🥰 Não sinto incômodo", value: "incomodo_nenhum", weight: 0 }
    ]
  },
  {
    id: 7, 
    text: "Você sente que seu corpo está 'mole' mesmo perdendo peso?",
    options: [
      { label: "😩 Sim, perdi firmeza", value: "roupa_mole", weight: 35 },
      { label: "🤳 Flacidez em braços/pernas", value: "roupa_musculo", weight: 35 },
      { label: "😊 Não, me sinto firme", value: "roupa_tonificada", weight: 0 }
    ]
  },
  {
    id: 5, 
    text: "Como está sua energia vital durante o dia?",
    options: [
      { label: "😭 Me sinto exaurido(a)", value: "energy_baixa", weight: 45 },
      { label: "😟 Tenho picos de energia", value: "energy_media", weight: 25 },
      { label: "😁 Muita disposição", value: "energy_alta", weight: 0 }
    ]
  },
  {
    id: 11,
    text: "Notou queda de cabelo ou unhas fracas no emagrecimento?",
    options: [
      { label: "💇‍♀️ Sim, queda intensa", value: "queda_intensa", weight: 50 },
      { label: "💅 Queda leve/unhas fracas", value: "queda_leve", weight: 30 },
      { label: "✅ Não notei alteração", value: "queda_nenhuma", weight: 0 }
    ]
  }
];
