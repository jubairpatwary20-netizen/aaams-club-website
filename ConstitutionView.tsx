import { useState } from 'react';
import { ConstitutionArticle } from '../types';
import { 
  Search, 
  Download, 
  BookOpen, 
  ChevronDown, 
  Printer, 
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConstitutionViewProps {
  articles: ConstitutionArticle[];
}

export default function ConstitutionView({ articles }: ConstitutionViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({
    'art-1': true, // Keep first open by default
  });
  const [printStatus, setPrintStatus] = useState<string | null>(null);

  const toggleArticle = (id: string) => {
    setExpandedArticles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrint = () => {
    setPrintStatus('Compiling official charter ledger...');
    setTimeout(() => {
      setPrintStatus('Formatting structural clauses...');
      setTimeout(() => {
        window.print();
        setPrintStatus(null);
      }, 1000);
    }, 1200);
  };

  // Filter articles based on search query
  const filteredArticles = articles.filter(art => {
    const query = searchQuery.toLowerCase();
    const matchesTitle = art.title.toLowerCase().includes(query) || art.number.toLowerCase().includes(query);
    const matchesClauses = art.clauses.some(clause => clause.toLowerCase().includes(query));
    return matchesTitle || matchesClauses;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left animate-fade-in" id="constitution-view">
      
      {/* Header section */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Regulatory Framework</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">AAAM&S Club Constitution</h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            The official governing charter, bylaws, and structural code established in 2018.
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handlePrint}
            disabled={printStatus !== null}
            className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold px-4 py-2.5 rounded-lg text-xs transition-colors cursor-pointer font-mono uppercase"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print Ledger</span>
          </button>
          <a
            href="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs transition-all cursor-pointer font-mono uppercase"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF</span>
          </a>
        </div>
      </div>

      {printStatus && (
        <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg animate-pulse flex items-center gap-2 font-mono">
          <BookOpen className="w-4 h-4 text-emerald-400 animate-spin" />
          <span>{printStatus}</span>
        </div>
      )}

      {/* Interactive Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="Search articles, keywords, clauses (e.g., 'Treasurer', 'Veto', 'Elections')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm placeholder-slate-500 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-sans"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-200 font-bold font-mono"
          >
            Clear
          </button>
        )}
      </div>

      {/* Accordion Board of Articles */}
      <div className="space-y-4" id="constitution-articles-list">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((art) => {
            const isExpanded = !!expandedArticles[art.id];
            return (
              <div 
                key={art.id} 
                className="bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleArticle(art.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-850/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded">
                      {art.number}
                    </span>
                    <h2 className="font-bold text-slate-100 text-base font-display">
                      {art.title}
                    </h2>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Accordion Body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-slate-800/60 bg-slate-950/20 divide-y divide-slate-850">
                        {art.clauses.map((clause, idx) => {
                          // Highlight matching text if search is active
                          const hasHighlight = searchQuery && clause.toLowerCase().includes(searchQuery.toLowerCase());
                          return (
                            <div key={idx} className={`py-4 flex gap-4 items-start ${hasHighlight ? 'bg-emerald-500/5 px-2 rounded-lg' : ''}`}>
                              <span className="text-xs font-bold font-mono text-emerald-400 shrink-0 mt-1">
                                Clause {idx + 1}:
                              </span>
                              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                                {clause}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl space-y-3 bg-slate-900/10">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="font-bold text-slate-300 font-display">No Articles Matched</h3>
            <p className="text-xs text-slate-500 font-mono">Try searching for alternative keywords such as 'Committee', 'Grant', or 'Amended'.</p>
          </div>
        )}
      </div>

      {/* Constitutional Safeguards Note */}
      <div className="bg-rose-950/10 border border-rose-950/30 p-6 rounded-2xl flex gap-4 text-left">
        <div className="w-10 h-10 bg-rose-950/20 text-rose-400 border border-rose-500/20 rounded-lg flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-rose-400 text-sm font-display">Veto and Ratification Vows</h4>
          <p className="text-xs text-rose-400/80 leading-relaxed font-sans">
            As outlined in Article V, this Constitution cannot be amended by students alone. All proposed clauses must acquire joint validation from the Moderator and Founders' Council, ratified finally by the Academy Principal.
          </p>
        </div>
      </div>

    </div>
  );
}
