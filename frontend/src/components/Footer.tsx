import React from "react";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">Synapse AI</span>
            </div>
            <p className="text-muted-foreground text-lg font-light tracking-wide max-w-sm leading-relaxed">
              Making developer tools discoverable for the next generation of AI search and LLM agents.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6 tracking-wide">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide">Integrations</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            © {new Date().getFullYear()} Synapse AI. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
