

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, SearchX, BrainCircuit } from "lucide-react";

export function Problem() {
  const problems = [
    {
      icon: <SearchX className="w-8 h-8 text-primary" />,
      title: "Traditional SEO is Dying",
      description: "Developers don't click through 10 pages of search results anymore. They expect direct, synthesized answers from LLMs."
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-primary" />,
      title: "LLMs Hallucinate Your Features",
      description: "If an AI doesn't have high-quality, structured context about your tool, it will recommend competitors or invent features you don't have."
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-primary" />,
      title: "Unstructured Docs Fail",
      description: "Standard documentation sites are optimized for human eyes, not vector databases and RAG (Retrieval-Augmented Generation) pipelines."
    }
  ];

  return (
    <section className="py-32 md:py-48 bg-muted/20 relative" id="problem">

      
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Why DevTools are becoming invisible</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
            The way developers discover and evaluate tools has fundamentally changed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card/50 backdrop-blur-md border border-border p-10 rounded-3xl relative overflow-hidden group hover:bg-card/80 transition-all duration-500 shadow-xl shadow-black/5"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-10">
                {problem.icon}
              </div>
              <div className="mb-8 relative z-10">
                {problem.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight relative z-10">{problem.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed relative z-10 font-light tracking-wide">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
