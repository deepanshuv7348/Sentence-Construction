
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-4 text-purple-700"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        Sentence Construction Challenge
      </motion.h1>
      
      <motion.p 
        className="text-lg mb-6 max-w-lg text-gray-700"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        Complete each sentence by selecting the correct words to fill in the blanks. 
        You'll have 30 seconds for each question!
      </motion.p>
      
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-3 text-purple-600">How to Play:</h2>
        <ul className="text-left text-gray-700 space-y-2">
          <li>• Click on a word to place it in a blank space</li>
          <li>• Click on a filled blank to remove the word</li>
          <li>• Complete all blanks to enable the Next button</li>
          <li>• The timer will automatically move to the next question when it runs out</li>
        </ul>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Button 
          onClick={onStart}
          className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6"
        >
          Start Challenge
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
