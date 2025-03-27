
import React from "react";
import { Excuse } from "@/hooks/useExcuseGenerator";
import ExcuseCard from "./ExcuseCard";
import { Bookmark } from "lucide-react";

interface SavedExcusesProps {
  excuses: Excuse[];
  onRemove: (id: string) => void;
}

const SavedExcuses: React.FC<SavedExcusesProps> = ({ excuses, onRemove }) => {
  if (!excuses.length) {
    return (
      <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-8 text-center">
        <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-3 animate-bounce-subtle" />
        <h3 className="text-xl font-display mb-2">No saved excuses yet</h3>
        <p className="text-muted-foreground">
          When you find an excuse you love, save it here for later use.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-display mb-4 gradient-text inline-block">Your Saved Excuses</h2>
      <div className="grid gap-4 grid-cols-1">
        {excuses.map((excuse) => (
          <ExcuseCard
            key={excuse.id}
            excuse={excuse}
            isSaved={true}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedExcuses;
