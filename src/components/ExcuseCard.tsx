
import React from "react";
import { Copy, Share2, BookmarkPlus, BookmarkCheck, Trash2 } from "lucide-react";
import { Excuse } from "@/hooks/useExcuseGenerator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ExcuseCardProps {
  excuse: Excuse;
  isSaved?: boolean;
  onSave?: (excuse: Excuse) => void;
  onRemove?: (id: string) => void;
}

const ExcuseCard: React.FC<ExcuseCardProps> = ({
  excuse,
  isSaved = false,
  onSave,
  onRemove,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(excuse.text);
    toast.success("Excuse copied to clipboard");
  };

  const shareExcuse = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out my creative excuse!",
        text: excuse.text,
        url: window.location.href,
      }).catch(() => {
        toast.error("Could not share the excuse");
      });
    } else {
      copyToClipboard();
      toast.success("Excuse copied to share");
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-6 animate-fade-in">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <p className="text-lg font-medium text-primary leading-relaxed">
            "{excuse.text}"
          </p>
          <div className="absolute -left-4 -top-4 text-4xl text-accent opacity-20">"</div>
          <div className="absolute -right-4 -bottom-4 text-4xl text-accent opacity-20">"</div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2 justify-end">
          <Button 
            variant="outline"
            size="sm"
            className="group transition-all duration-300"
            onClick={copyToClipboard}
          >
            <Copy className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Copy
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="group transition-all duration-300"
            onClick={shareExcuse}
          >
            <Share2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Share
          </Button>
          
          {!isSaved && onSave && (
            <Button
              variant="default"
              size="sm"
              className="group transition-all duration-300"
              onClick={() => onSave(excuse)}
            >
              <BookmarkPlus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Save
            </Button>
          )}
          
          {isSaved && onRemove && (
            <Button
              variant="destructive"
              size="sm"
              className="group transition-all duration-300"
              onClick={() => onRemove(excuse.id)}
            >
              <Trash2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcuseCard;
