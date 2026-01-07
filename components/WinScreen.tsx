
import React, { useEffect } from 'react';
import { Player } from '../types';
import { speakText } from '../services/geminiService';

interface WinScreenProps {
  winner: Player | null;
  onRestart: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ winner, onRestart }) => {
  useEffect(() => {
    if (winner) speakText(`ألف مبروك يا ${winner.name}! أنت بطل السلامة!`);
  }, [winner]);

  if (!winner) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center bg-yellow-400 p-8 text-center font-['Changa']">
      <div className="text-9xl mb-8 animate-bounce">🏆</div>
      <h1 className="text-6xl font-black text-blue-900 mb-4">مبارك الفوز!</h1>
      <div className="bg-white p-8 rounded-3xl shadow-xl mb-10">
        <img src={winner.character.image} className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-blue-500" alt="" />
        <h2 className="text-4xl font-black text-blue-900">{winner.name}</h2>
        <p className="text-2xl font-bold text-blue-500">النقاط: {winner.score} ⭐</p>
      </div>
      <button onClick={onRestart} className="bg-blue-600 text-white px-12 py-4 rounded-2xl text-2xl font-black">العب مرة أخرى 🔄</button>
    </div>
  );
};

export default WinScreen;
