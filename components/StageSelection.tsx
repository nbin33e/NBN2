
import React from 'react';
import { GameStage } from '../types';
import { playSFX } from '../services/geminiService';

interface StageSelectionProps {
  onSelect: (stage: GameStage) => void;
  onBack: () => void;
}

const StageSelection: React.FC<StageSelectionProps> = ({ onSelect, onBack }) => {
  const handleSelect = (stage: GameStage) => {
    playSFX('click');
    onSelect(stage);
  };

  return (
    <div className="h-full flex flex-col items-center justify-start p-10 bg-white font-['Changa'] relative overflow-hidden border-[12px] border-[#e0f2fe] rounded-[50px]">
      {/* Home Button */}
      <div className="w-full flex justify-end mb-4">
        <button onClick={onBack} className="bg-white p-3 rounded-2xl shadow-lg border-2 border-gray-100 text-3xl hover:rotate-12 transition-all">
          🏠
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-8xl font-black text-[#1e3a8a] mb-6 relative inline-block">
          اختر مغامرتك!
          <div className="absolute -bottom-2 left-0 w-full h-4 bg-[#ffcc00] rounded-full -z-10"></div>
        </h2>
        <p className="text-3xl font-bold text-[#60a5fa] mt-4">أين تريد أن تبدأ اليوم يا بطل؟</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl items-stretch px-4">
        {/* Home Safety Card */}
        <div className="bg-white p-12 rounded-[60px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col items-center text-center border-4 border-blue-50 hover:border-orange-200 transition-all group">
          <div className="mb-10 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
            <span className="text-[180px] leading-none drop-shadow-2xl">🏠</span>
          </div>
          <h3 className="text-6xl font-black text-[#f97316] mb-4">أمان المنزل</h3>
          <p className="text-2xl text-gray-400 font-bold mb-12 max-w-xs leading-relaxed">كن ذكياً في بيتك وتعلم قواعد السلامة!</p>
          <button 
            onClick={() => handleSelect(GameStage.HOME)}
            className="w-full bg-[#f97316] text-white py-6 rounded-3xl text-3xl font-black cartoon-button shadow-[0_12px_0_#c2410c] hover:scale-105"
          >
            انطلق الآن! 🚀
          </button>
        </div>

        {/* Street Safety Card */}
        <div className="bg-white p-12 rounded-[60px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col items-center text-center border-4 border-blue-50 hover:border-green-200 transition-all group">
          <div className="mb-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
            <span className="text-[180px] leading-none drop-shadow-2xl">🚦</span>
          </div>
          <h3 className="text-6xl font-black text-[#22c55e] mb-4">أمان الشارع</h3>
          <p className="text-2xl text-gray-400 font-bold mb-12 max-w-xs leading-relaxed">تعرف على قوانين الطريق لتكون بطلاً حذراً!</p>
          <button 
            onClick={() => handleSelect(GameStage.STREET)}
            className="w-full bg-[#22c55e] text-white py-6 rounded-3xl text-3xl font-black cartoon-button shadow-[0_12px_0_#15803d] hover:scale-105"
          >
            ابدأ التحدي! 🚦
          </button>
        </div>
      </div>
      
      {/* Decorative corner background */}
      <div className="absolute -bottom-20 -right-20 opacity-5 text-[300px] grayscale select-none pointer-events-none rotate-12">🚦</div>
      <div className="absolute -bottom-20 -left-20 opacity-5 text-[300px] grayscale select-none pointer-events-none -rotate-12">🏠</div>
    </div>
  );
};

export default StageSelection;
