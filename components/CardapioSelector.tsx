import React, { useState } from 'react';

interface Props {
  onFinish: (calorias: number, fase: 'deficit' | 'manutencao') => void;
}

const CardapioSelector: React.FC<Props> = ({ onFinish }) => {
  const [sexo, setSexo] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [objetivo, setObjetivo] = useState<'perder' | 'manter' | ''>('');

  const calcular = () => {
    const alturaNum = Number(altura);
    const pesoNum = Number(peso);

    let calorias = 1500;

    if (sexo === 'feminino') {
      if (alturaNum < 160) calorias = 1250;
      else if (alturaNum < 170) calorias = 1500;
      else calorias = 1750;
    }

    if (sexo === 'masculino') {
      if (alturaNum < 170) calorias = 1500;
      else if (alturaNum < 180) calorias = 1750;
      else calorias = 2000;
    }

    if (objetivo === 'manter') {
      onFinish(calorias, 'manutencao');
    } else {
      onFinish(calorias, 'deficit');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold text-center">
        Seletor de Plano Alimentar
      </h2>

      <select
        className="w-full border p-2 rounded"
        value={sexo}
        onChange={e => setSexo(e.target.value)}
      >
        <option value="">Sexo</option>
        <option value="feminino">Feminino</option>
        <option value="masculino">Masculino</option>
      </select>

      <input
        type="number"
        placeholder="Altura (cm)"
        className="w-full border p-2 rounded"
        value={altura}
        onChange={e => setAltura(e.target.value)}
      />

      <input
        type="number"
        placeholder="Peso atual (kg)"
        className="w-full border p-2 rounded"
        value={peso}
        onChange={e => setPeso(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={objetivo}
        onChange={e => setObjetivo(e.target.value as any)}
      >
        <option value="">Objetivo atual</option>
        <option value="perder">Ainda quero emagrecer</option>
        <option value="manter">Já atingi meu peso e quero manter</option>
      </select>

      <button
        onClick={calcular}
        className="w-full bg-teal-600 text-white py-3 rounded font-bold"
      >
        Calcular meu plano
      </button>
    </div>
  );
};

export default CardapioSelector;
