
import React, { useState } from 'react';
import { CHARACTERS } from '../constants';
import { Player } from '../types';

interface SetupScreenProps {
  numPlayers: 1 | 2;
  onComplete: (players: Player[]) => void;
  onBack: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ numPlayers, onComplete, onBack }) => {
  const [step, setStep] = useState(0);
  const [players, setPlayers] = useState<Partial<Player>[]>(
    Array.from({ length: numPlayers }, () => ({ name: '', score: 0 }))
  );

  const handleNext = () => {
    if (step < numPlayers - 1) {
      setStep(step + 1);
    } else {
      onComplete(players as Player[]);
    }
  };

  const updatePlayer = (field: keyof Player, value: any) => {
    const newPlayers = [...players];
    newPlayers[step] = { ...newPlayers[step], [field]: value };
    setPlayers(newPlayers);
  };

  const currentPlayer = players[step];
  const isReady = (currentPlayer?.name?.trim()?.length || 0) >= 2 && currentPlayer?.character;

  return (
    <div className="h-full flex flex-col items-center bg-white p-6 font-['Changa']">
      <h2 className="text-4xl font-black text-blue-900 mb-8">
        {numPlayers > 1 ? `تجهيز البطل ${step + 1}` : 'تجهيز البطل'}
      </h2>
      <input 
        type="text" 
        placeholder="اكتب اسمك هنا..." 
        className="w-full max-w-md p-4 rounded-2xl border-4 border-blue-100 text-2xl text-center mb-8"
        value={currentPlayer?.name || ''}
        onChange={(e) => updatePlayer('name', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4 mb-8">
        {CHARACTERS.map(char => (
          <button 
            key={char.id} 
            onClick={() => updatePlayer('character', char)}
            className={`p-4 rounded-3xl border-4 ${currentPlayer?.character?.id === char.id ? 'border-yellow-400 bg-yellow-50' : 'border-gray-50'}`}
          >
            <img src={char.image} className="w-20 h-20 mx-auto" alt="" />
            <p className="font-bold mt-2">{char.name}</p>
          </button>
        ))}
      </div>
      <button disabled={!isReady} onClick={handleNext} className="bg-blue-600 text-white px-12 py-4 rounded-2xl text-2xl font-black disabled:opacity-50">
        {step < numPlayers - 1 ? 'التالي' : 'ابدأ اللعب'}
      </button>
    </div>
  );
};

export default SetupScreen;
