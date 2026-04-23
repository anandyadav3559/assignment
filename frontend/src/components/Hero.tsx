

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileUp, ArrowRight, Activity, X, Copy, CheckCircle2 } from "lucide-react";

export function Hero() {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [markdown, setMarkdown] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleTransform = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsScanning(true);
    setShowModal(true);
    setError("");
    setMarkdown("");
    setCopied(false);

    try {
      const text = await file.text();
      const response = await fetch('http://localhost:5000/api/optimize_tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to optimize tool');
      }

      const data = await response.json();
      // Format the result as markdown to display in the same modal
      const formattedMarkdown = `## Optimized Description\n${data.optimized_description}\n\n## Tool Schema\n\`\`\`json\n${data.tool_schema}\n\`\`\`\n\n## Suggestions\n\`\`\`json\n${data.suggestions}\n\`\`\``;
      
      setMarkdown(formattedMarkdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during optimization');
    } finally {
      setIsScanning(false);
    }
  };

  const copyToClipboard = () => {
    if (!markdown) return;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden" id="scan">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-primary text-sm font-medium mb-8 border border-primary/20 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next-Gen AEO (AI Engine Optimization)
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              Make your docs <span className="text-primary">AI-Ready.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-light tracking-wide max-w-2xl mx-auto">
              Upload your Markdown or Text documentation. We'll strip the fluff and generate dense, high-signal markdown optimized for LLM context windows.
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleTransform}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto"
          >
            <div className="relative group">
              <div className="relative flex items-center bg-card/80 backdrop-blur-xl border border-border p-1.5 sm:p-2 rounded-full shadow-xl shadow-black/5">
                <div className="pl-4 sm:pl-6 pr-2 sm:pr-3">
                  <FileUp className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                </div>
                <input
                  type="file"
                  data-testid="file-upload"
                  accept=".md,.txt,text/markdown,text/plain"
                  onChange={handleFileChange}
                  className="flex-1 bg-transparent border-none focus:outline-none text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer min-w-0"
                  required
                />
                <button
                  type="submit"
                  disabled={!file}
                  className="bg-primary text-primary-foreground px-5 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg flex items-center gap-2 sm:gap-3 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline">Transform</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
            <p className="text-base text-muted-foreground mt-6 tracking-wide">
              Generate llms.txt compatible content instantly.
            </p>
          </motion.form>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={!isScanning ? closeModal : undefined}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl max-h-[80vh] flex flex-col bg-card border border-border rounded-3xl z-10 shadow-2xl shadow-black/10 overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                <h3 className="text-xl font-bold tracking-tight">Document Transformation</h3>
                {!isScanning && (
                  <button onClick={closeModal} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                {isScanning ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                      <Activity className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight">Extracting & Optimizing...</h3>
                    <p className="text-muted-foreground font-light tracking-wide">Converting your file into AI-ready dense markdown.</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500 font-medium mb-4">{error}</p>
                    <button 
                      onClick={closeModal}
                      className="bg-muted text-foreground px-6 py-3 rounded-xl font-bold hover:bg-muted/80 transition-all"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">Generated AI Context</p>
                      <button 
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied!" : "Copy Markdown"}
                      </button>
                    </div>
                    <div className="bg-muted/30 border border-border rounded-xl p-4 overflow-x-auto">
                      <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                        {markdown}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
