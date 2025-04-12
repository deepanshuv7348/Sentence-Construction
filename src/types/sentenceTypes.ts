
export interface SentenceQuestion {
  id: number;
  sentence: string;
  options: string[];
  blanks: number;
  correctAnswers: string[];
}

export interface QuestionResult {
  questionId: number;
  sentence: string;
  userAnswers: string[];
  correctAnswers: string[];
  isCorrect: boolean;
}

export interface GameState {
  status: 'welcome' | 'playing' | 'results';
  currentQuestionIndex: number;
  questions: SentenceQuestion[];
  results: QuestionResult[];
  timeLeft: number;
}
