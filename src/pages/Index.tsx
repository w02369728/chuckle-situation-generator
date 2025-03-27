
import ExcuseGenerator from "@/components/ExcuseGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 pb-20">
      <ExcuseGenerator />
      
      <footer className="mt-20 text-center text-sm text-muted-foreground">
        <p>The art of the polite excuse &middot; <span className="accent-underline">Made with creativity</span></p>
      </footer>
    </div>
  );
};

export default Index;
