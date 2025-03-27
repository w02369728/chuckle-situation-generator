
import { useState, useCallback } from "react";

interface ExcuseInput {
  situation: string;
  reason: string;
}

export interface Excuse {
  id: string;
  text: string;
  situation: string;
  reason: string;
}

// Preset components for generating excuses
const INTROS = [
  "I would absolutely love to, but",
  "I'm terribly sorry, however",
  "I wish I could, unfortunately",
  "Under normal circumstances I would, except",
  "That sounds amazing, sadly",
  "Believe me, I tried, but",
  "I was fully planning on it, until",
  "My schedule was completely clear, then",
  "I had every intention of being there, however",
  "I'm devastated to miss it, because"
];

const MIDDLES = [
  "my pet goldfish",
  "a mysterious cosmic event",
  "my imaginary friend",
  "my collection of vintage spoons",
  "the ghost who lives in my basement",
  "my temporary superhero duties",
  "my secret identity",
  "my emotional support cactus",
  "my neighbor's conspiracy theories",
  "the alignment of the stars"
];

const ENDINGS = [
  "requires my immediate attention",
  "has developed separation anxiety",
  "is going through an existential crisis",
  "has scheduled an impromptu intervention",
  "needs emotional support during this difficult time",
  "has demanded my presence for moral support",
  "won't stop sending me urgent messages",
  "has taken my calendar hostage",
  "is questioning the meaning of life",
  "has mysteriously rearranged my priorities"
];

const CONNECTIONS = [
  "and unfortunately",
  "which means",
  "consequently,",
  "so naturally,",
  "leaving me no choice but to",
  "therefore I must",
  "and as a result, I need to",
  "so I'm obligated to",
  "which has forced me to",
  "and now I have to"
];

const OBLIGATIONS = [
  "contemplate the universe's mysteries",
  "alphabetize my spice cabinet",
  "practice my yodeling techniques",
  "attend an emergency sock drawer reorganization",
  "polish my collection of commemorative spoons",
  "meditate on the meaning of semicolons",
  "master the art of speaking backwards",
  "prepare for the potential zombie apocalypse",
  "participate in an underwater basket weaving competition",
  "monitor the migration patterns of my houseplants"
];

export function useExcuseGenerator() {
  const [savedExcuses, setSavedExcuses] = useState<Excuse[]>(() => {
    const saved = localStorage.getItem("savedExcuses");
    return saved ? JSON.parse(saved) : [];
  });

  const generateExcuse = useCallback(({ situation, reason }: ExcuseInput): Excuse => {
    // Select random elements from each array
    const intro = INTROS[Math.floor(Math.random() * INTROS.length)];
    const middle = MIDDLES[Math.floor(Math.random() * MIDDLES.length)];
    const ending = ENDINGS[Math.floor(Math.random() * ENDINGS.length)];
    const connection = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
    const obligation = OBLIGATIONS[Math.floor(Math.random() * OBLIGATIONS.length)];
    
    // Personalize with user input if provided
    let excuseText = `${intro} ${middle} ${ending}`;
    
    if (situation && reason) {
      excuseText += ` ${connection} ${obligation} instead of ${situation.toLowerCase()}, all because of ${reason.toLowerCase()}.`;
    } else {
      excuseText += ".";
    }
    
    return {
      id: Date.now().toString(),
      text: excuseText,
      situation: situation || "",
      reason: reason || ""
    };
  }, []);

  const saveExcuse = useCallback((excuse: Excuse) => {
    setSavedExcuses(prev => {
      const updated = [...prev, excuse];
      localStorage.setItem("savedExcuses", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeSavedExcuse = useCallback((id: string) => {
    setSavedExcuses(prev => {
      const updated = prev.filter(excuse => excuse.id !== id);
      localStorage.setItem("savedExcuses", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    generateExcuse,
    savedExcuses,
    saveExcuse,
    removeSavedExcuse
  };
}
