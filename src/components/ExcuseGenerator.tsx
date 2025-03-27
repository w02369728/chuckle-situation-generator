
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, RefreshCw } from "lucide-react";
import { useExcuseGenerator, Excuse } from "@/hooks/useExcuseGenerator";
import ExcuseCard from "./ExcuseCard";
import SavedExcuses from "./SavedExcuses";
import { toast } from "sonner";

const ExcuseGenerator: React.FC = () => {
  const [situation, setSituation] = useState("");
  const [reason, setReason] = useState("");
  const [currentExcuse, setCurrentExcuse] = useState<Excuse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  
  const { generateExcuse, savedExcuses, saveExcuse, removeSavedExcuse } = useExcuseGenerator();

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Add a small delay to create a sense of "generating" something complex
    setTimeout(() => {
      const newExcuse = generateExcuse({ situation, reason });
      setCurrentExcuse(newExcuse);
      setIsGenerating(false);
    }, 600);
  };

  const handleSave = (excuse: Excuse) => {
    saveExcuse(excuse);
    toast.success("Excuse saved for later use");
  };

  const handleRemove = (id: string) => {
    removeSavedExcuse(id);
    toast.success("Excuse removed from saved list");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12 space-y-3">
        <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm inline-block font-medium animate-pulse-subtle">
          Never be at a loss for words
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight">
          <span className="gradient-text">Excuse</span> Generator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create clever, original excuses for any situation. Be politely evasive with a touch of humor.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="glass-card rounded-xl p-6 animate-fade-in">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="situation">What's the situation?</Label>
              <Input
                id="situation"
                placeholder="e.g., Going to a dinner party"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="bg-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">What's your actual reason?</Label>
              <Input
                id="reason"
                placeholder="e.g., I don't want to socialize"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-white/50"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              className="w-full group"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4 group-hover:animate-bounce-subtle" />
              )}
              {isGenerating ? "Crafting your excuse..." : "Generate Excuse"}
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {currentExcuse ? (
            <ExcuseCard 
              excuse={currentExcuse} 
              onSave={handleSave}
              isSaved={savedExcuses.some(e => e.id === currentExcuse.id)}
            />
          ) : (
            <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-8 text-center animate-fade-in">
              <Sparkles className="mx-auto h-12 w-12 text-muted-foreground mb-3 animate-float" />
              <h3 className="text-xl font-display mb-2">No excuse yet</h3>
              <p className="text-muted-foreground">
                Fill in the form and generate your first creative excuse.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 mb-4">
        <Button
          variant="ghost"
          className="text-accent-foreground hover:text-accent transition-colors"
          onClick={() => setShowSaved(!showSaved)}
        >
          {showSaved ? "Hide saved excuses" : `Show saved excuses (${savedExcuses.length})`}
        </Button>
      </div>

      {showSaved && (
        <div className="animate-fade-in">
          <SavedExcuses excuses={savedExcuses} onRemove={handleRemove} />
        </div>
      )}
    </div>
  );
};

export default ExcuseGenerator;
