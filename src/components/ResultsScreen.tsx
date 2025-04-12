
import { Button } from "@/components/ui/button";
import { QuestionResult } from "@/types/sentenceTypes";
import { calculateScore, parseSentence } from "@/utils/gameUtils";
import { motion } from "framer-motion";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";

interface ResultsScreenProps {
  results: QuestionResult[];
  onRestart: () => void;
}

const ResultsScreen = ({ results, onRestart }: ResultsScreenProps) => {
  const totalCorrect = results.filter(r => r.isCorrect).length;
  const score = calculateScore(totalCorrect, results.length);
  
  // Animations for the score display
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  return (
    <motion.div 
      className="flex flex-col w-full max-w-3xl mx-auto px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-8 text-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Your Results</h1>
        
        <div className="flex justify-center items-center my-6">
          <div className="relative">
            <svg className="w-32 h-32">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
              />
              <motion.circle
                className="text-purple-500"
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
                initial={{ strokeDasharray: 365, strokeDashoffset: 365 }}
                animate={{ 
                  strokeDashoffset: 365 - (365 * (score / 10)) 
                }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
            <motion.div 
              className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-purple-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {score}/10
            </motion.div>
          </div>
        </div>
        
        <p className="text-lg mb-4">
          You got <span className="font-bold text-purple-600">{totalCorrect}</span> out of <span className="font-bold">{results.length}</span> questions correct.
        </p>
        
        <motion.p 
          className={`text-xl font-semibold mb-6 ${
            score >= 7 ? 'text-green-600' : score >= 5 ? 'text-yellow-600' : 'text-red-600'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {score >= 7 
            ? "Great job! You're a sentence master!"
            : score >= 5 
              ? "Good effort! Keep practicing!" 
              : "Keep trying! You'll improve with practice!"}
        </motion.p>
        
        <Button 
          onClick={onRestart}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center mx-auto"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </motion.div>
      
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Question Review:</h2>
      
      <motion.div 
        className="space-y-6 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {results.map((result, index) => (
          <motion.div 
            key={result.questionId}
            className={`bg-white p-5 rounded-lg shadow-md border-l-4 ${
              result.isCorrect ? 'border-green-500' : 'border-red-500'
            }`}
            variants={item}
          >
            <div className="flex items-start">
              <div className={`mr-3 mt-1 ${
                result.isCorrect ? 'text-green-500' : 'text-red-500'
              }`}>
                {result.isCorrect ? 
                  <CheckCircle className="h-5 w-5" /> : 
                  <XCircle className="h-5 w-5" />
                }
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-700 mb-2">Question {index + 1}:</p>
                
                {result.isCorrect ? (
                  <p className="text-gray-800 mb-3">
                    {parseSentence(result.sentence, result.userAnswers)}
                  </p>
                ) : (
                  <>
                    <p className="text-gray-800 mb-1">
                      Your answer:
                    </p>
                    <p className="text-gray-800 mb-3 pb-3 border-b border-dashed border-gray-200">
                      {parseSentence(result.sentence, result.userAnswers)}
                    </p>
                    <p className="text-gray-800 mt-3 mb-1">
                      Correct answer:
                    </p>
                    <p className="text-green-700">
                      {parseSentence(result.sentence, result.correctAnswers)}
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ResultsScreen;
