
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionScreen from "@/components/QuestionScreen";
import ResultsScreen from "@/components/ResultsScreen";
import { useGameState } from "@/hooks/useGameState";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Index = () => {
  const { 
    status, 
    questions, 
    currentQuestionIndex, 
    results, 
    timeLeft,
    startGame, 
    submitAnswer, 
    resetGame,
    handleTimeUp
  } = useGameState();
  
  // Log for status checking
  useEffect(() => {
    console.log("Game status:", status);
  }, [status]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <header className="py-6 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-purple-700">Sentence Construction</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {status === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl"
            >
              <WelcomeScreen onStart={startGame} />
            </motion.div>
          )}
          
          {status === 'playing' && questions.length > 0 && (
            <motion.div 
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl"
            >
              <QuestionScreen 
                question={questions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                onComplete={submitAnswer}
                timeLeft={timeLeft}
                onTimeUp={handleTimeUp}
              />
            </motion.div>
          )}
          
          {status === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl"
            >
              <ResultsScreen 
                results={results}
                onRestart={resetGame}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="py-4 bg-purple-700 text-white text-center">
        <p className="text-sm">Sentence Construction Challenge © 2025</p>
      </footer>
    </div>
  );
};

export default Index;
