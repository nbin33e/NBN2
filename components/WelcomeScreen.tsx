
import React from 'react';
import { speakText, playSFX, getAudioContext } from '../services/geminiService';

interface WelcomeScreenProps {
  onStart: (num: 1 | 2) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const handleStart = async (num: 1 | 2) => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') await ctx.resume();
    
    playSFX('click');
    await speakText("مرحباً بك يا بطل! أنا بطل السلامة، هل أنت مستعد للمغامرة؟");
    onStart(num);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#4facfe] to-[#00f2fe] text-white p-6 relative overflow-hidden font-['Changa']">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 opacity-10 text-9xl select-none">🏠</div>
      <div className="absolute bottom-10 left-10 opacity-10 text-9xl select-none">🚦</div>
      <div className="absolute top-1/4 left-10 opacity-10 text-4xl animate-pulse">✨</div>

      {/* Main Logo (Shield) */}
      <div className="relative mb-10">
        <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center border-[10px] border-yellow-400 shadow-[0_0_50px_rgba(253,224,71,0.5)] animate-float">
          <div className="w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-inner overflow-hidden border-4 border-white">
             <span className="text-8xl drop-shadow-lg">🛡️</span>
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-green-500 p-3 rounded-full border-4 border-white shadow-lg animate-pulse">
          <span className="text-2xl">✨</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center z-10 mb-12">
        <h1 className="text-8xl md:text-9xl font-black mb-4 drop-shadow-[0_8px_0_#1e40af] tracking-tight">
          أبطال السلامة
        </h1>
        <p className="text-2xl md:text-3xl font-bold opacity-100 text-white drop-shadow-md">
          استعد لمغامرة الذكاء والحرص في البيت والشارع!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-8 w-full max-w-3xl z-10">
        <button 
          onClick={() => handleStart(1)} 
          className="flex-1 bg-[#ffcc00] text-[#1e3a8a] font-black py-6 rounded-[35px] text-4xl cartoon-button flex items-center justify-between px-10 border-[6px] border-white shadow-[0_10px_0_#d97706] hover:scale-105 transition-transform"
        >
          <span>لاعب واحد</span>
          <span className="text-5xl">👦</span>
        </button>
        <button 
          onClick={() => handleStart(2)} 
          className="flex-1 bg-[#4ade80] text-[#1e3a8a] font-black py-6 rounded-[35px] text-4xl cartoon-button flex items-center justify-between px-10 border-[6px] border-white shadow-[0_10px_0_#15803d] hover:scale-105 transition-transform"
        >
          <div className="flex flex-col items-start">
             <span className="leading-tight">تحدي</span>
             <span className="leading-tight">الأصدقاء</span>
          </div>
          <div className="flex -space-x-4">
            <span className="text-5xl relative z-10">👦</span>
            <span className="text-5xl">👧</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
