
import { SentenceQuestion } from "../types/sentenceTypes";

// In a real scenario, this would be an environment variable
const API_URL = "http://localhost:3000/questions";

export const fetchQuestions = async (): Promise<SentenceQuestion[]> => {
  try {
    // For development, using a fallback if the JSON server is not running
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("API server not responding");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching from API, using fallback data:", error);
      return getFallbackQuestions();
    }
  } catch (error) {
    console.error("Error in fetchQuestions:", error);
    throw error;
  }
};

// Fallback questions in case the JSON server is not running
const getFallbackQuestions = (): SentenceQuestion[] => {
  return [
    {
      id: 1,
      sentence: "The quick brown fox _____ over the lazy dog.",
      options: ["jumps", "running", "flew", "walks"],
      blanks: 1,
      correctAnswers: ["jumps"]
    },
    {
      id: 2,
      sentence: "I _____ to the store _____ buy some groceries.",
      options: ["went", "to", "go", "for"],
      blanks: 2,
      correctAnswers: ["went", "to"]
    },
    {
      id: 3,
      sentence: "She _____ playing the piano _____ she was five years old.",
      options: ["began", "since", "has", "started"],
      blanks: 2,
      correctAnswers: ["began", "since"]
    },
    {
      id: 4,
      sentence: "They _____ the project on time, _____ the client was happy.",
      options: ["finished", "so", "completed", "but"],
      blanks: 2,
      correctAnswers: ["finished", "so"]
    },
    {
      id: 5,
      sentence: "He _____ not _____ what to do next.",
      options: ["did", "know", "does", "knew"],
      blanks: 2,
      correctAnswers: ["did", "know"]
    },
    {
      id: 6,
      sentence: "We _____ going to the beach if it _____ raining.",
      options: ["are", "stops", "were", "will"],
      blanks: 2,
      correctAnswers: ["are", "stops"]
    },
    {
      id: 7,
      sentence: "The movie _____ at 8 PM and _____ at 10 PM.",
      options: ["starts", "ends", "began", "finishes"],
      blanks: 2,
      correctAnswers: ["starts", "ends"]
    },
    {
      id: 8,
      sentence: "_____ do you want to _____ for dinner tonight?",
      options: ["What", "have", "Where", "eat"],
      blanks: 2,
      correctAnswers: ["What", "have"]
    },
    {
      id: 9,
      sentence: "If you _____ hard, you will _____ your goals.",
      options: ["work", "achieve", "try", "reach"],
      blanks: 2,
      correctAnswers: ["work", "achieve"]
    },
    {
      id: 10,
      sentence: "She _____ her keys and couldn't _____ her apartment.",
      options: ["lost", "enter", "found", "leave"],
      blanks: 2,
      correctAnswers: ["lost", "enter"]
    }
  ];
};
