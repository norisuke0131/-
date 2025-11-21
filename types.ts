export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface UserAnswers {
  [key: number]: string;
}

export enum AppState {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
  IMAGE_EDITOR = 'IMAGE_EDITOR'
}

export interface GeminiError {
  message: string;
}
