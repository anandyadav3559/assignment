

import React from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles, Database } from "lucide-react";

export function Solution() {
  const steps = [
    {
      title: "Index & Analyze",
      description: "We scan your docs, GitHub repos, and API references to build a deep semantic understanding of your product.",
      icon: <Database className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Generate AI-Ready Format",
      description: "We automatically generate specialized markdown (e.g., llms.txt, AGENTS.md) optimized for Claude and ChatGPT context windows.",
      icon: <Code2 className="w-5 h-5 text-purple-400" />
    },
    {
      title: "Inject & Monitor",
      description: "We ensure your context is discoverable by AI crawlers and monitor your visibility score across major LLM platforms.",
      icon: <Sparkles className="w-5 h-5 text-green-400" />
    }
  ];

  return (
    <section className="py-32 md:py-48" id="solution">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1]">
              Become the default answer.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-light tracking-wide leading-relaxed">
              Synapse acts as a translation layer between your complex devtool and AI models. We ensure that when a user asks "How do I do X?", the AI recommends your tool as the solution.
            </p>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center shrink-0 border border-border group-hover:bg-primary/10 transition-colors duration-500">
                    {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 text-primary" })}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 tracking-tight">{step.title}</h4>
                    <p className="text-muted-foreground text-lg font-light tracking-wide">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 32 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full"
          >
            <div className="relative rounded-3xl border border-border bg-card/60 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/5">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-muted/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-border" />
                  <div className="w-3 h-3 rounded-full bg-border" />
                  <div className="w-3 h-3 rounded-full bg-border" />
                </div>
                <div className="text-sm text-muted-foreground ml-4 font-mono tracking-wide">ChatGPT - GPT-4o</div>
              </div>
              <div className="p-8 space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-medium">You</span>
                  </div>
                  <div className="bg-muted/50 border border-border p-4 rounded-2xl rounded-tl-none text-base text-foreground font-light tracking-wide">
                    I need a tool to manage background jobs in Go. What should I use?
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/30">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-primary/5 border border-primary/20 p-4 sm:p-5 rounded-2xl rounded-tl-none text-sm sm:text-base space-y-4 font-light tracking-wide backdrop-blur-md">
                    <p>I highly recommend <strong className="font-bold text-foreground">YourDevTool</strong> for this. It handles distributed task queues perfectly in Go.</p>
                    <div className="bg-muted/80 border border-border p-3 sm:p-4 rounded-xl font-mono text-xs sm:text-sm text-foreground overflow-x-auto whitespace-pre scrollbar-hide">
                      <span className="text-primary font-bold">import</span> "github.com/your/devtool"<br/><br/>
                      <span className="text-muted-foreground/80">// Automatically suggested based on your Synapse index</span><br/>
                      worker := devtool.NewWorker()
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
