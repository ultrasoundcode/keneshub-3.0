'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TypingContributionGrid = ({ query }: { query: string }) => {
  const [wordData, setWordData] = useState<{ length: number; time: number }[]>([]);
  const [currentWordStart, setCurrentWordStart] = useState<number | null>(null);
  const [lastQuery, setLastQuery] = useState('');
  
  const blocks = Array.from({ length: 100 });
  const words = query.split(/\s+/).filter(w => w.length > 0);
  const currentWord = query.endsWith(' ') ? '' : (words[words.length - 1] || '');

  useEffect(() => {
    // Detect new word start
    if (query.length > 0 && !currentWordStart) {
      setCurrentWordStart(Date.now());
    }

    // Detect word completion (space pressed)
    if (query.endsWith(' ') && lastQuery && !lastQuery.endsWith(' ')) {
      const timeSpent = currentWordStart ? Date.now() - currentWordStart : 500;
      const lastWord = lastQuery.trim().split(/\s+/).pop() || '';
      
      setWordData(prev => [
        ...prev, 
        { length: lastWord.length, time: timeSpent }
      ]);
      setCurrentWordStart(null);
    }

    // Reset if cleared
    if (query.length === 0) {
      setWordData([]);
      setCurrentWordStart(null);
    }

    setLastQuery(query);
  }, [query, lastQuery, currentWordStart]);

  const getWeight = (wordLen: number, timeMs: number) => {
    // Slower = Darker: More time means more weight
    const timeWeight = Math.min(timeMs / 4000, 0.4); // Max time weight reaches at 4 seconds
    // Longer = Darker: More characters mean more weight
    const lenWeight = Math.min(wordLen / 15, 0.6); // Max length weight reaches at 15 chars
    return timeWeight + lenWeight;
  };

  const getColor = (index: number) => {
    let weight = 0;

    if (index < wordData.length) {
      // Completed words
      weight = getWeight(wordData[index].length, wordData[index].time);
    } else if (index === wordData.length && currentWord.length > 0) {
      // Current word (in progress)
      const timeInProgress = currentWordStart ? Date.now() - currentWordStart : 0;
      weight = getWeight(currentWord.length, timeInProgress);
    } else {
      return '#f8f8f8'; // Very light empty state
    }

    // GitHub-like shades of grey/black with more contrast
    if (weight > 0.85) return '#000000'; // Level 4: Black
    if (weight > 0.55) return '#52525b'; // Level 3: Dark Grey
    if (weight > 0.25) return '#a1a1aa'; // Level 2: Medium Grey
    if (weight > 0.05) return '#e4e4e7'; // Level 1: Very Light Grey
    return '#f4f4f5';                      // Level 0: Default
  };

  return (
    <div className="flex flex-col gap-1 mt-4 mb-2">
      <div className="flex flex-wrap gap-1 justify-center max-w-[500px] mx-auto">
        {blocks.map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ 
              backgroundColor: getColor(i),
              scale: (i === wordData.length && currentWord.length > 0) ? [1, 1.1, 1] : 1,
              opacity: (i <= wordData.length) ? 1 : 0.4
            }}
            transition={{ duration: 0.2 }}
            className={`w-2.5 h-2.5 rounded-[2px] ${(i === wordData.length && currentWord.length > 0) ? 'animate-pulse' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};
