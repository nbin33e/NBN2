
import React, { useState, useCallback } from 'react';
import { GameView, GameState, GameStage, Player } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import SetupScreen from './components/SetupScreen';
import StageSelection from './components/StageSelection';
import GameScreen from './components/GameScreen';
import WinScreen from './components/WinScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    view: GameView.WELCOME,
    players: [],
    currentPlayerIndex: 0,
    activeStage: null,
    numPlayers: 1,
    winner: null
  });

  const startGame = useCallback((numPlayers: 1 | 2) => {
    setGameState(prev => ({
      ...prev,
      numPlayers,
      view: GameView.SETUP
    }));
  }, []);

  const completeSetup = useCallback((players: Player[]) => {
    setGameState(prev => ({
      ...prev,
      players,
      view: GameView.STAGE_SELECT
    }));
  }, []);

  const selectStage = useCallback((stage: GameStage) => {
    setGameState(prev => ({
      ...prev,
      activeStage: stage,
      view: GameView.GAMEPLAY
    }));
  }, []);

  const finishGame = useCallback((winner: Player) => {
    setGameState(prev => ({
      ...prev,
      winner,
      view: GameView.WIN
    }));
  }, []);

  const resetToHome = useCallback(() => {
    setGameState({
      view: GameView.WELCOME,
      players: [],
      currentPlayerIndex: 0,
      activeStage: null,
      numPlayers: 1,
      winner: null
    });
  }, []);

  const renderView = () => {
    switch (gameState.view) {
      case GameView.WELCOME:
        return <WelcomeScreen onStart={startGame} />;
      case GameView.SETUP:
        return <SetupScreen numPlayers={gameState.numPlayers} onComplete={completeSetup} onBack={resetToHome} />;
      case GameView.STAGE_SELECT:
        return <StageSelection onSelect={selectStage} onBack={resetToHome} />;
      case GameView.GAMEPLAY:
        return (
          <GameScreen 
            gameState={gameState} 
            setGameState={setGameState} 
            onWin={finishGame} 
            onBack={resetToHome}
          />
        );
      case GameView.WIN:
        return <WinScreen winner={gameState.winner} onRestart={resetToHome} />;
      default:
        return <WelcomeScreen onStart={startGame} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-sky-100 flex items-center justify-center p-0 md:p-4 overflow-hidden">
      <div className="w-full h-full md:max-w-7xl md:max-h-[900px] bg-white md:rounded-[50px] shadow-2xl overflow-hidden border-0 md:border-[12px] border-white ring-[10px] ring-blue-400/10 flex flex-col relative z-20">
        {renderView()}
      </div>
    </div>
  );
};

export default App;
