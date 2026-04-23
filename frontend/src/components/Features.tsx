import React from "react";
import { motion } from "framer-motion";
import { FileCode2, LineChart } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Automated Context Generation",
      description: "We automatically parse your public GitHub repositories, NPM packages, and docs to generate an AI-optimized semantic knowledge graph. No manual tagging required.",
      icon: <FileCode2 className="w-8 h-8 text-primary" />,
      image: (
        <div className="w-full h-full bg-muted/50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
          <div className="relative z-10 flex flex-col gap-2 w-3/4">
            <div className="h-2 w-full bg-primary/20 rounded" />
            <div className="h-2 w-4/5 bg-primary/20 rounded" />
            <div className="h-2 w-full bg-primary/20 rounded" />
            <div className="h-2 w-2/3 bg-primary/20 rounded" />
          </div>
        </div>
      )
    },
    {
      title: "Real-time AI Indexing & Monitoring",
      description: "Track exactly how Claude, ChatGPT, and Gemini interpret your tool. Get alerts when LLMs hallucinate features about your product or recommend competitors.",
      icon: <LineChart className="w-8 h-8 text-primary" />,
      image: (
        <div className="w-full h-full bg-muted/50 flex items-end justify-center px-8 pt-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
          <div className="w-full flex items-end gap-2 h-full">
            {[40, 70, 45, 90, 65, 100].map((height, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="flex-1 bg-primary/80 rounded-t-sm"
              />
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-32 md:py-48 bg-muted/40 relative" id="features">

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">Built for DevTool Scale</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Everything you need to capture intent-driven AI traffic.
          </p>
        </div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <motion.div 
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1"
              >
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                  {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8 text-primary" })}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{feature.title}</h3>
                <p className="text-xl text-muted-foreground leading-relaxed font-light tracking-wide">
                  {feature.description}
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 32 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 w-full"
              >
                <div className="aspect-[4/3] rounded-[2rem] border border-border bg-card/40 backdrop-blur-3xl overflow-hidden group hover:shadow-primary/10 transition-shadow duration-700 p-2 shadow-xl shadow-black/5">
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-card/80 border border-border relative">
                    {feature.image}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
