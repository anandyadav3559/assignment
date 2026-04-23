import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, FileText, FileCode2, Copy, Check, Sparkles } from 'lucide-react';

interface AnalysisHistory {
  id: string;
  input_text: string;
  optimized_description: string;
  tool_schema: string;
  suggestions: string;
  created_at: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/history');
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Analysis History</h3>
                  <p className="text-sm text-muted-foreground font-light">Past tool optimizations and schemas.</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              ) : history.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No history found. Try analyzing a tool first!
                </div>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="bg-muted/20 border border-border rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>{new Date(item.created_at).toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.tool_schema, item.id)}
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors"
                      >
                        {copiedId === item.id ? (
                          <><Check className="w-4 h-4" /> Copied</>
                        ) : (
                          <><Copy className="w-4 h-4" /> Copy Schema</>
                        )}
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Original Input</h4>
                        <div className="text-sm bg-background border border-border p-3 rounded-xl max-h-32 overflow-y-auto font-mono">
                          {item.input_text}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Optimized Description</h4>
                        <p className="text-sm text-muted-foreground">{item.optimized_description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <FileCode2 className="w-4 h-4 text-primary" /> Schema
                          </h4>
                          <pre className="text-xs bg-background border border-border p-3 rounded-xl overflow-x-auto">
                            <code>{item.tool_schema}</code>
                          </pre>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" /> Suggestions
                          </h4>
                          <pre className="text-xs bg-background border border-border p-3 rounded-xl overflow-x-auto">
                            <code>{item.suggestions}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
