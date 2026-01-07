
export enum GameStage {
  HOME = 'HOME',
  STREET = 'STREET'
}

export enum GameView {
  WELCOME = 'WELCOME',
  SETUP = 'SETUP',
  STAGE_SELECT = 'STAGE_SELECT',
  GAMEPLAY = 'GAMEPLAY',
  WIN = 'WIN'
}

export interface Character {
  id: string;
  name: string;
  image: string;
  color: string;
}

export interface Player {
  name: string;
  character: Character;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  imagePrompt: string;
  feedback: string;
}

export interface GameState {
  view: GameView;
  players: Player[];
  currentPlayerIndex: number;
  activeStage: GameStage | null;
  numPlayers: 1 | 2;
  winner: Player | null;
}
