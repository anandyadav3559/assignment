import React, { useState } from "react";
import { Sparkles, History } from "lucide-react";
import { HistoryModal } from "./HistoryModal";

export function Navbar() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/60 backdrop-blur-2xl saturate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">Synapse AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground tracking-wide">
            <a href="#problem" className="hover:text-foreground transition-colors">Problem</a>
            <a href="#solution" className="hover:text-foreground transition-colors">Solution</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </button>
            <a 
              href="#scan" 
              className="text-sm font-bold tracking-wide bg-primary text-primary-foreground px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>
      
      <HistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </>
  );
}
