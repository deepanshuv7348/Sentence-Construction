
import { useState, useEffect, useCallback } from "react";
import { SentenceQuestion, QuestionResult, GameState } from "../types/sentenceTypes";
import { fetchQuestions } from "../services/api";

const TIMER_DURATION = 30; // seconds

export const useGameState = () => {
  const [state, setState] = useState<GameState>({
    status: 'welcome',
    currentQuestionIndex: 0,
    questions: [],
    results: [],
    timeLeft: TIMER_DURATION,
  });
  
  const [timerActive, setTimerActive] = useState(false);
  
  // Load questions when the component mounts
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await fetchQuestions();
        setState(prevState => ({
          ...prevState,
          questions,
        }));
      } catch (error) {
        console.error("Failed to load questions:", error);
      }
    };
    
    loadQuestions();
  }, []);
  
  // Timer logic
  useEffect(() => {
    let timer: number | undefined;
    
    if (timerActive && state.status === 'playing' && state.timeLeft > 0) {
      timer = window.setInterval(() => {
        setState(prevState => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1,
        }));
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive, state.status, state.timeLeft]);
  
  // Start the game
  const startGame = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      status: 'playing',
      currentQuestionIndex: 0,
      results: [],
      timeLeft: TIMER_DURATION,
    }));
    setTimerActive(true);
  }, []);
  
  // Handle time up
  const handleTimeUp = useCallback(() => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    
    // Add a result with empty answers if time is up
    const result: QuestionResult = {
      questionId: currentQuestion.id,
      sentence: currentQuestion.sentence,
      userAnswers: Array(currentQuestion.blanks).fill(""),
      correctAnswers: currentQuestion.correctAnswers,
      isCorrect: false,
    };
    
    // Move to the next question or end the game
    if (state.currentQuestionIndex < state.questions.length - 1) {
      setState(prevState => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        results: [...prevState.results, result],
        timeLeft: TIMER_DURATION,
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        status: 'results',
        results: [...prevState.results, result],
      }));
      setTimerActive(false);
    }
  }, [state.currentQuestionIndex, state.questions]);
  
  // Submit an answer
  const submitAnswer = useCallback((answers: string[]) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    
    // Create a result object
    const isCorrect = answers.every(
      (answer, index) => answer === currentQuestion.correctAnswers[index]
    );
    
    const result: QuestionResult = {
      questionId: currentQuestion.id,
      sentence: currentQuestion.sentence,
      userAnswers: answers,
      correctAnswers: currentQuestion.correctAnswers,
      isCorrect,
    };
    
    // Move to the next question or end the game
    if (state.currentQuestionIndex < state.questions.length - 1) {
      setState(prevState => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        results: [...prevState.results, result],
        timeLeft: TIMER_DURATION,
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        status: 'results',
        results: [...prevState.results, result],
      }));
      setTimerActive(false);
    }
  }, [state.currentQuestionIndex, state.questions]);
  
  // Reset the game
  const resetGame = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      status: 'welcome',
      currentQuestionIndex: 0,
      results: [],
      timeLeft: TIMER_DURATION,
    }));
    setTimerActive(false);
  }, []);
  
  return {
    ...state,
    startGame,
    submitAnswer,
    resetGame,
    handleTimeUp,
  };
};
