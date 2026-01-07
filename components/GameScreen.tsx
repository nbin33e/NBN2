
import React, { useState, useEffect, useRef } from 'react';
import { GameState, GameStage, Player } from '../types';
import { QUESTIONS } from '../constants';
import { speakText, playSFX, getAudioContext } from '../services/geminiService';
import { generateSafetyImage } from '../services/imageService';

interface GameScreenProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onWin: (winner: Player) => void;
  onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, setGameState, onWin, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [displayImageUrl, setDisplayImageUrl] = useState<string | null>(null);
  
  const stage = gameState.activeStage || GameStage.HOME;
  
  // صور احتياطية كرتونية في حال فشل التوليد
  const cartoonFallbacks: Record<string, string> = {
    'HOME': 'https://img.freepik.com/free-vector/modern-living-room-interior-design_23-2148154699.jpg',
    'STREET': 'https://img.freepik.com/free-vector/road-concept-illustration_114360-11111.jpg'
  };
  
  const stageQuestions = QUESTIONS[stage];
  const question = stageQuestions[currentQuestionIndex];
  const hasSpokenRef = useRef<number | null>(null);

  useEffect(() => {
    const loadQuestionContent = async () => {
      // 1. مسح الصورة السابقة لمنع ظهور صورة غير متعلقة بالسؤال الجديد
      setDisplayImageUrl(null);
      setIsGeneratingImage(true);
      
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') ctx.resume().catch(console.error);
      
      try {
        // 2. طلب الصورة الجديدة بناءً على المحفز المحسن
        const imageUrl = await generateSafetyImage(question.imagePrompt, stage);
        if (imageUrl) {
          setDisplayImageUrl(imageUrl);
        } else {
          setDisplayImageUrl(cartoonFallbacks[stage]);
        }
      } catch (err) {
        console.error("Failed to update image", err);
        setDisplayImageUrl(cartoonFallbacks[stage]);
      } finally {
        setIsGeneratingImage(false);
      }
      
      // 3. نطق السؤال
      if (hasSpokenRef.current !== currentQuestionIndex) {
        hasSpokenRef.current = currentQuestionIndex;
        setIsSpeaking(true);
        await speakText(question.text);
        setIsSpeaking(false);
      }
    };
    
    loadQuestionContent();
  }, [currentQuestionIndex, stage]);

  const handleAnswer = async (index: number) => {
    if (feedback || isSpeaking) return;

    const correct = index === question.correctIndex;
    setIsCorrect(correct);
    playSFX(correct ? 'success' : 'error');
    
    const msg = correct 
      ? `رائع! ${question.feedback}` 
      : `للأسف يا بطل! الإجابة الصحيحة هي: ${question.options[question.correctIndex]}`;
    
    setFeedback(msg);
    
    setIsSpeaking(true);
    await speakText(msg);
    setIsSpeaking(false);

    setTimeout(() => {
      if (correct) {
        const updatedPlayers = [...gameState.players];
        updatedPlayers[gameState.currentPlayerIndex].score += 1;
        
        const winner = updatedPlayers.find(p => p.score >= 10);
        if (winner) {
          onWin(winner);
          return;
        }

        setGameState(prev => ({
          ...prev,
          players: updatedPlayers,
          currentPlayerIndex: prev.numPlayers === 2 ? (prev.currentPlayerIndex + 1) % 2 : 0
        }));
      } else {
        if (gameState.numPlayers === 2) {
          setGameState(prev => ({
            ...prev,
            currentPlayerIndex: (prev.currentPlayerIndex + 1) % 2
          }));
        }
      }
      
      nextQuestion();
    }, 3500); 
  };

  const nextQuestion = () => {
    setFeedback(null);
    setIsCorrect(null);
    setCurrentQuestionIndex((prev) => (prev + 1) % stageQuestions.length);
  };

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  return (
    <div className="h-full flex flex-col bg-[#f0f9ff] overflow-hidden font-['Changa'] select-none">
      {/* Top Bar */}
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b-[6px] border-[#e0f2fe] shrink-0 shadow-lg z-30">
        <button 
          onClick={() => { playSFX('click'); onBack(); }} 
          className="bg-red-100 text-red-600 px-5 py-2 rounded-2xl border-2 border-red-200 font-black hover:bg-red-500 hover:text-white transition-all shadow-sm text-xl active:scale-95"
        >
          🏠 خروج
        </button>
        
        <div className="flex gap-3">
          {gameState.players.map((p, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 px-5 py-2 rounded-2xl border-4 transition-all ${
                gameState.currentPlayerIndex === i 
                ? 'bg-blue-600 border-blue-300 scale-105 shadow-xl text-white' 
                : 'bg-white border-gray-100 opacity-60 text-gray-400'
              }`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-white/50">
                <img src={p.character.image} className="w-full h-full" alt="" />
              </div>
              <div className="text-right">
                <p className="text-xs font-bold leading-none mb-1 opacity-80">{p.name}</p>
                <p className="text-xl font-black leading-none">⭐ {p.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Game Content Area */}
      <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden gap-6">
        <div className="bg-white rounded-[40px] border-[6px] border-[#e0f2fe] shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 min-h-0 flex-1 relative">
          
          {/* Image Area */}
          <div className="w-full md:w-1/2 aspect-video bg-[#f8fafc] rounded-[30px] overflow-hidden border-4 border-white relative shadow-inner flex items-center justify-center group bg-sky-50">
            {isGeneratingImage && (
              <div className="absolute inset-0 z-10 bg-white/95 flex flex-col items-center justify-center text-center p-6">
                <div className="text-6xl animate-bounce mb-4">🎨</div>
                <div className="bg-blue-600 px-8 py-3 rounded-full font-black text-white shadow-xl animate-pulse text-xl">
                  يرسم بطل السلامة المشهد...
                </div>
                <p className="text-blue-400 mt-4 font-bold">انتظر قليلاً لتظهر لك المغامرة التعليمية</p>
              </div>
            )}
            
            {displayImageUrl ? (
              <img 
                src={displayImageUrl} 
                alt="Safety Scenario" 
                className={`w-full h-full object-cover transition-opacity duration-700 ${isGeneratingImage ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsGeneratingImage(false)}
              />
            ) : !isGeneratingImage && (
              <div className="text-8xl opacity-10">🔍</div>
            )}
          </div>

          {/* Question Text Area */}
          <div className="w-full md:w-1/2 text-center md:text-right flex flex-col items-center md:items-start">
             <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-bold mb-4 shadow-md animate-bounce">
               سؤال رقم {currentQuestionIndex + 1}
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-[#1e3a8a] leading-[1.4] mb-4 drop-shadow-sm">
               {question.text}
             </h2>
             {isSpeaking && (
               <div className="flex items-center gap-2 text-blue-500 font-bold animate-pulse">
                  <span className="text-2xl">🔊</span>
                  <span className="text-xl">استمع للبطل...</span>
               </div>
             )}
          </div>
        </div>

        {/* Action Area (Answers or Feedback) */}
        <div className="h-48 md:h-56 shrink-0">
          {feedback ? (
            <div className={`h-full w-full flex flex-col items-center justify-center rounded-[35px] text-center p-6 border-[6px] shadow-2xl animate-in zoom-in duration-300 ${
              isCorrect 
              ? 'bg-green-500 border-green-300 text-white' 
              : 'bg-[#f97316] border-orange-300 text-white'
            }`}>
              <div className="text-5xl mb-2">{isCorrect ? '🌟 ممتاز!' : '💪 بطل شجاع'}</div>
              <p className="text-2xl md:text-3xl font-black max-w-4xl leading-tight">{feedback}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-full">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  disabled={isSpeaking || isGeneratingImage}
                  onClick={() => handleAnswer(i)}
                  className="bg-white hover:bg-[#ffcc00] hover:text-[#1e3a8a] text-[#1e3a8a] text-xl md:text-2xl font-black p-4 rounded-[25px] cartoon-button transition-all disabled:opacity-50 border-[4px] border-[#e0f2fe] shadow-lg flex items-center justify-center text-center leading-tight active:scale-95 group"
                >
                  <span className="group-hover:scale-105 transition-transform">{option}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Player Turn Info */}
      <div className="py-4 px-8 bg-[#1e3a8a] text-white flex justify-center items-center gap-4 shrink-0 shadow-2xl">
        <span className="text-xl font-bold opacity-80">دور البطل الآن:</span>
        <div className="bg-[#ffcc00] px-8 py-2 rounded-full border-4 border-white text-[#1e3a8a] font-black text-2xl shadow-xl transform -rotate-1">
          {currentPlayer.name} 🦸‍♂️
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
