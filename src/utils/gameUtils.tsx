
import React from 'react';

export function parseSentence(sentence: string, answers: string[] = []): JSX.Element[] {
  // Split the sentence by the blank placeholder (_____)
  const parts = sentence.split('_____');
  
  // Create JSX elements for the sentence parts and blanks
  const elements: JSX.Element[] = [];
  
  parts.forEach((part, index) => {
    // Add the text part
    if (part) elements.push(<span key={`part-${index}`}>{part}</span>);
    
    // Add a blank if this isn't the last part
    if (index < parts.length - 1) {
      const answer = answers[index] || '';
      const blankClass = answer ? 'blank-space filled' : 'blank-space';
      
      elements.push(
        <span 
          key={`blank-${index}`} 
          className={blankClass}
          data-blank-index={index}
        >
          {answer || '_______'}
        </span>
      );
    }
  });
  
  return elements;
}

export function calculateScore(totalCorrect: number, totalQuestions: number): number {
  return Math.round((totalCorrect / totalQuestions) * 10);
}

export function getProgressPercentage(currentIndex: number, total: number): number {
  return (currentIndex / total) * 100;
}

export function formatTime(seconds: number): string {
  return `${seconds}s`;
}
