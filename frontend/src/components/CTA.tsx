

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-32 md:py-48 relative overflow-hidden bg-background">


      
      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
            Ready to be the default choice?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Join 500+ devtools using Synapse to inject their context directly into the AI workflows of millions of developers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Start Free Trial
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="w-full sm:w-auto bg-card/50 backdrop-blur-md border border-border text-foreground px-10 py-5 rounded-full font-bold text-lg hover:bg-muted transition-colors">
              Book a Demo
            </button>
          </div>
          <p className="text-base text-muted-foreground mt-8 font-light tracking-wide">
            No credit card required. 14-day free trial.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
