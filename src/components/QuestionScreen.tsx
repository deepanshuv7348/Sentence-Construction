
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { SentenceQuestion } from "@/types/sentenceTypes";
import { parseSentence, getProgressPercentage, formatTime } from "@/utils/gameUtils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface QuestionScreenProps {
  question: SentenceQuestion;
  questionNumber: number;
  totalQuestions: number;
  onComplete: (answers: string[]) => void;
  timeLeft: number;
  onTimeUp: () => void;
}

const QuestionScreen = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onComplete, 
  timeLeft,
  onTimeUp
}: QuestionScreenProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(question.blanks).fill(""));
  const [selectedOptionIndexes, setSelectedOptionIndexes] = useState<number[]>([]);
  const timeBarRef = useRef<HTMLDivElement>(null);
  
  // Reset states when question changes
  useEffect(() => {
    setSelectedAnswers(Array(question.blanks).fill(""));
    setSelectedOptionIndexes([]);
  }, [question]);
  
  // Handle timer
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
    }
    
    // Update time bar width
    if (timeBarRef.current) {
      const percentage = (timeLeft / 30) * 100;
      timeBarRef.current.style.width = `${percentage}%`;
      
      // Change color based on time left
      if (percentage < 30) {
        timeBarRef.current.classList.add("bg-red-500");
        timeBarRef.current.classList.remove("bg-yellow-500", "bg-purple-500");
      } else if (percentage < 60) {
        timeBarRef.current.classList.add("bg-yellow-500");
        timeBarRef.current.classList.remove("bg-purple-500", "bg-red-500");
      } else {
        timeBarRef.current.classList.add("bg-purple-500");
        timeBarRef.current.classList.remove("bg-yellow-500", "bg-red-500");
      }
    }
  }, [timeLeft, onTimeUp]);
  
  const handleWordSelect = (word: string, index: number) => {
    const emptyIndex = selectedAnswers.findIndex(answer => answer === "");
    
    if (emptyIndex !== -1 && !selectedOptionIndexes.includes(index)) {
      const newAnswers = [...selectedAnswers];
      newAnswers[emptyIndex] = word;
      setSelectedAnswers(newAnswers);
      
      setSelectedOptionIndexes(prev => [...prev, index]);
    }
  };
  
  const handleBlankClick = (blankIndex: number) => {
    if (selectedAnswers[blankIndex]) {
      // Find the word in options to get its index
      const wordToRemove = selectedAnswers[blankIndex];
      const optionIndex = question.options.findIndex(opt => opt === wordToRemove);
      
      // Only remove if we have an option index (should always be the case)
      if (optionIndex !== -1) {
        // Update selected answers
        const newAnswers = [...selectedAnswers];
        newAnswers[blankIndex] = "";
        setSelectedAnswers(newAnswers);
        
        // Update selected option indexes
        setSelectedOptionIndexes(prev => 
          prev.filter(idx => idx !== optionIndex)
        );
      }
    }
  };
  
  const handleSubmit = () => {
    onComplete(selectedAnswers);
  };
  
  const progress = getProgressPercentage(questionNumber, totalQuestions);
  const allBlanksAreFilled = !selectedAnswers.includes("");
  
  return (
    <motion.div 
      className="flex flex-col w-full max-w-3xl mx-auto px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Progress bar and timer */}
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span className={`font-medium ${timeLeft < 10 ? 'text-red-500' : ''}`}>
            Time: {formatTime(timeLeft)}
          </span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-purple-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div 
            ref={timeBarRef}
            className="timer-bar rounded-full"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Question content */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Complete the sentence:</h2>
        <p className="text-lg mb-6 leading-relaxed">
          {parseSentence(question.sentence, selectedAnswers)}
        </p>
        
        {/* Word options */}
        <div className="flex flex-wrap gap-3 justify-center">
          {question.options.map((word, index) => {
            const isSelected = selectedOptionIndexes.includes(index);
            return (
              <motion.button
                key={`word-${index}`}
                onClick={() => handleWordSelect(word, index)}
                className={`word-option ${isSelected ? 'selected' : ''}`}
                disabled={isSelected}
                whileHover={!isSelected ? { scale: 1.05 } : {}}
                whileTap={!isSelected ? { scale: 0.95 } : {}}
              >
                {word}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
      
      {/* Instructions and submit button */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <p className="text-sm text-gray-600 mb-4 md:mb-0">
          {allBlanksAreFilled ? 
            "All blanks filled. Ready to continue!" : 
            "Click on a word to place it in a blank. Click on a filled blank to remove the word."}
        </p>
        
        <Button 
          onClick={handleSubmit}
          disabled={!allBlanksAreFilled}
          className={`${
            allBlanksAreFilled 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'bg-gray-400 cursor-not-allowed'
          } text-white px-6 py-2 rounded-lg flex items-center`}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default QuestionScreen;
