
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

// More elaborate and whimsical word collections
const SOPHISTICATED_INTROS = [
  "I'm absolutely devastated to inform you that",
  "Fate has conspired in the most peculiar manner, rendering me utterly incapable of",
  "The universe has whispered a rather elaborate narrative explaining why",
  "In the grand tapestry of cosmic coincidences,",
  "Allow me to paint you a picture of why",
  "Prepare yourself for a tale of such magnificent improbability that",
  "Through a series of events so absurd they defy rational explanation,",
  "You might find this hard to believe, but",
  "Picture, if you will, a scenario where",
  "In the most delightful twist of serendipity,"
];

const ECCENTRIC_MIDDLES = [
  "my time-traveling goldfish",
  "an impromptu interdimensional conference",
  "a rogue collection of sentient houseplants",
  "my grandmother's prophetic sock puppet",
  "an emergency meeting with my existential committee",
  "a diplomatic incident involving quantum mechanics",
  "a spontaneous interpretive dance revolution",
  "my spirit animal's midlife crisis",
  "an urgent cryptozoological investigation",
  "a philosophical debate with my lunch"
];

const DRAMATIC_ENDINGS = [
  "has demanded my undivided attention with theatrical urgency",
  "requires immediate metaphysical intervention",
  "has launched a full-scale existential rebellion",
  "is conducting a surprise performance review of my life choices",
  "needs emergency metaphorical resuscitation",
  "has initiated a complex negotiation process",
  "is experiencing an unprecedented moment of cosmic significance",
  "has declared a state of absolute administrative chaos",
  "demands a level of commitment that defies ordinary scheduling",
  "has orchestrated a scenario of sublime improbability"
];

const WITTY_CONNECTIONS = [
  "which has precipitated a cascade of logistical complexity",
  "creating a labyrinth of scheduling gymnastics",
  "transforming my calendar into a abstract art installation",
  "rendering my previous commitments temporarily irrelevant",
  "causing a temporary suspension of my usual spatial-temporal coordinates",
  "introducing an element of delightful unpredictability",
  "crafting a narrative so bizarre it borders on performance art",
  "generating a quantum entanglement of prior arrangements",
  "invoking Murphy's Law with unprecedented creativity",
  "composing a symphony of logistical improvisation"
];

export function useExcuseGenerator() {
  const [savedExcuses, setSavedExcuses] = useState<Excuse[]>(() => {
    const saved = localStorage.getItem("savedExcuses");
    return saved ? JSON.parse(saved) : [];
  });

  const generateExcuse = useCallback(({ situation, reason }: ExcuseInput): Excuse => {
    const intro = SOPHISTICATED_INTROS[Math.floor(Math.random() * SOPHISTICATED_INTROS.length)];
    const middle = ECCENTRIC_MIDDLES[Math.floor(Math.random() * ECCENTRIC_MIDDLES.length)];
    const ending = DRAMATIC_ENDINGS[Math.floor(Math.random() * DRAMATIC_ENDINGS.length)];
    const connection = WITTY_CONNECTIONS[Math.floor(Math.random() * WITTY_CONNECTIONS.length)];
    
    let excuseText = `${intro} ${middle} ${ending}.`;
    
    if (situation) {
      excuseText += ` ${connection} that makes ${situation.toLowerCase()} temporarily impossible.`;
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
