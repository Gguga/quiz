
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 3, 
    text: "Qual a sua situação atual com o uso das canetas emagrecedoras (Ozempic, Mounjaro, Wegovy, etc)?",
    options: [
      { label: "Uso atualmente e estou perdendo peso", subLabel: "Quero garantir que esse resultado seja definitivo.", value: "uso_atual_perda", weight: 30, icon: "💉" },
      { label: "Uso atualmente, mas o peso travou (Platô)", subLabel: "Sinto que o efeito diminuiu e meu metabolismo estagnou.", value: "uso_atual_plato", weight: 45, icon: "🛑" },
      { label: "Estou na fase de desmame ou redução", subLabel: "Momento crítico: receio de recuperar o peso agora.", value: "uso_desmame", weight: 50, icon: "📉" },
      { label: "Já parei de usar e o peso está voltando", subLabel: "Preciso de um socorro metabólico para frear o rebote.", value: "uso_parou_rebote", weight: 60, icon: "⚠️" }
    ]
  },
  {
    id: 2, 
    text: "Qual o seu principal objetivo com este diagnóstico hoje?",
    options: [
      { 
        label: "Me proteger do rebote e efeito sanfona", 
        subLabel: "Quero emagrecer sem perder músculo e ser capaz de manter o peso para sempre", 
        value: "objetivo_saude", 
        weight: 0 
      },
      { 
        label: "Perder peso rápido a qualquer custo", 
        subLabel: "Mesmo sabendo que o risco de rebote é alto.", 
        value: "objetivo_rapido", 
        weight: 40 
      }
    ]
  },
  {
    id: 6, 
    text: "Com qual frequência você sente desconfortos gástricos?",
    options: [
      { label: "Náuseas e enjoos frequentes", subLabel: "Sinal de que a digestão está severamente lentificada.", value: "colateral_nausea", weight: 35, icon: "🤢" },
      { label: "Intestino muito 'preso'", subLabel: "Dificuldade de evacuação que gera inchaço abdominal.", value: "colateral_constipacao", weight: 35, icon: "🧱" },
      { label: "Empachamento e gases", subLabel: "Sinto que a comida 'parou' no estômago.", value: "colateral_digestao", weight: 25, icon: "🎈" },
      { 
        label: "Um pouco de todos acima", 
        subLabel: "Mal-estar generalizado e constante no sistema digestivo.", 
        value: "colateral_todos", 
        weight: 50, 
        icon: "😵‍💫" 
      },
      { label: "Meu organismo está reagindo bem", subLabel: "Não sinto colaterais significativos no momento.", value: "colateral_nenhum", weight: 0, icon: "✨" }
    ]
  },
  {
    id: 1, 
    text: "Como está sua ingestão de água hoje?",
    options: [
      { 
        label: "Bebo pouquíssima água", 
        subLabel: "Risco alto de 'travamento' metabólico e gástrico.", 
        value: "agua_baixa", 
        weight: 40, 
        icon: "🌵" 
      },
      { 
        label: "Esqueço de beber e sinto a boca seca", 
        subLabel: "A desidratação bloqueia a quebra de gordura eficiente.", 
        value: "agua_media", 
        weight: 25, 
        icon: "💧" 
      },
      { 
        label: "Bebo, mas sinto que não é suficiente", 
        subLabel: "Sinto o corpo inchado mesmo ingerindo líquidos.", 
        value: "agua_boa", 
        weight: 20, 
        icon: "💦" 
      },
      { 
        label: "Mantenho o ritmo de 2L a 3L por dia", 
        subLabel: "Essencial para o transporte de nutrientes e limpeza celular.", 
        value: "agua_ideal", 
        weight: 0, 
        icon: "🌊" 
      }
    ]
  },
  {
    id: 9, 
    text: "Em quantas refeições do seu dia tem uma proteína de verdade?",
    options: [
      { label: "0–1 refeições", subLabel: "Carne, frango, peixe, ovos, whey, iogurte proteico, queijo, tofu.", value: "proteina_0_1", weight: 50, icon: "🥩" },
      { label: "2 refeições", subLabel: "Carne, frango, peixe, ovos, whey, iogurte proteico, queijo, tofu.", value: "proteina_2", weight: 35, icon: "🍗" },
      { label: "3 refeições", subLabel: "Carne, frango, peixe, ovos, whey, iogurte proteico, queijo, tofu.", value: "proteina_3", weight: 15, icon: "🥚" },
      { label: "4+ refeições", subLabel: "Carne, frango, peixe, ovos, whey, iogurte proteico, queijo, tofu.", value: "proteina_4_plus", weight: 0, icon: "💪" }
    ]
  },
  {
    id: 10,
    text: "Sua proteína está calculada por kg de peso ou você vai no “feeling”?",
    options: [
      { label: "Está calculada por kg", subLabel: "Sigo uma meta grama a grama para manter meus músculos.", value: "proteina_calculada", weight: 0, icon: "⚖️" },
      { label: "Já calculei, mas não sigo", subLabel: "Sei que é importante, mas acabo relaxando no dia a dia.", value: "proteina_cal_nao_segue", weight: 20, icon: "📝" },
      { label: "Vou no feeling", subLabel: "No feeling, quase sempre fica abaixo do necessário.", value: "proteina_feeling", weight: 40, icon: "🤔" },
      { label: "Nunca calculei", subLabel: "Não sei quanto deveria comer para proteger meu metabolismo.", value: "proteina_nunca", weight: 50, icon: "❓" }
    ]
  },
  {
    id: 8, 
    text: "Como você avalia sua força e carga nos treinos ultimamente?",
    options: [
      { label: "Minha força caiu drasticamente", subLabel: "Sinal de que seu corpo está queimando músculos como energia.", value: "forca_caiu_muito", weight: 45, icon: "📉" },
      { label: "Sinto mais cansaço e menos rendimento", subLabel: "O metabolismo está entrando em modo de economia.", value: "forca_caiu_pouco", weight: 25, icon: "😕" },
      { label: "Minha força está preservada", subLabel: "Indica que o tecido magro está sendo protegido.", value: "forca_estavel", weight: 0, icon: "💪" },
      { label: "Não tenho treinado força ultimamente", subLabel: "Ponto crítico: a flacidez tende a ser muito maior.", value: "forca_nao_treina", weight: 30, icon: "🧘" }
    ]
  },
  {
    id: 4, 
    text: "Com qual frequência você sente incômodo com a flacidez?",
    options: [
      { label: "Todos os dias!", subLabel: "Sinto que estou 'murchando' e a pele ficando mole.", value: "incomodo_sempre", weight: 40, icon: "😭" },
      { label: "Sinto principalmente ao me olhar no espelho", value: "incomodo_frequente", weight: 25, icon: "😟" },
      { label: "Não sinto incômodo no momento", value: "incomodo_nenhum", weight: 0, icon: "🥰" }
    ]
  },
  {
    id: 7, 
    text: "Você sente que seu corpo está 'mole' mesmo perdendo peso na balança?",
    options: [
      { label: "Sim, perdi peso mas não me sinto firme", subLabel: "É o temido 'efeito murcho' da perda muscular.", value: "roupa_mole", weight: 35, icon: "😩" },
      { label: "Sinto braços e pernas com muita flacidez", value: "roupa_musculo", weight: 35, icon: "🤳" },
      { label: "Não, sinto meu corpo tonificado", value: "roupa_tonificada", weight: 0, icon: "😊" }
    ]
  },
  {
    id: 5, 
    text: "Como está sua energia vital durante o dia?",
    options: [
      { label: "Me sinto exaurido(a) e sem ânimo", subLabel: "Cérebro e músculos operando em baixa voltagem.", value: "energy_baixa", weight: 45, icon: "😭" },
      { label: "Tenho picos de energia, mas caio logo depois", value: "energy_media", weight: 25, icon: "😟" },
      { label: "Me sinto com muita disposição", value: "energy_alta", weight: 0, icon: "😁" }
    ]
  }
];
