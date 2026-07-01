import { useState } from 'react';
import { Publication } from '../types';
import { 
  Search, 
  Download, 
  Tag, 
  HelpCircle,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PublicationsViewProps {
  publications: Publication[];
}

export default function PublicationsView({ publications }: PublicationsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAbstractPub, setActiveAbstractPub] = useState<Publication | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const categories = ['All', 'Research Paper', 'Article', 'Journal', 'Newsletter'];

  // Filter logic
  const filteredPubs = publications.filter(pub => {
    const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory;
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pub.authors.some(auth => auth.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          pub.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccessMessage(`"${title}.pdf" has been downloaded and authenticated by the AAAM&S Publication board.`);
      setTimeout(() => setDownloadSuccessMessage(null), 5000);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left animate-fade-in" id="publications-view">
      
      {/* Header section */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Scientific Journals</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">AAAM&S Scholarly Publications</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Review our student research journals, mathematical digests, and seasonal newsletters reflecting the empirical studies made by young scholars.
        </p>
      </div>

      {/* Download Success Banner */}
      <AnimatePresence>
        {downloadSuccessMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2 font-mono"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadSuccessMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search scholarly papers, authors, journals, or topics (e.g. 'Fluid dynamics', 'Algebra')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer font-mono uppercase ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500/30 text-slate-950 shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {cat}s
            </button>
          ))}
        </div>
      </div>

      {/* Publications Listing Grid */}
      <div className="space-y-6" id="publications-archive">
        {filteredPubs.length > 0 ? (
          filteredPubs.map((pub) => (
            <div 
              key={pub.id} 
              className="bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl relative overflow-hidden group text-left hover:border-emerald-500/10 transition-colors"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-500 to-teal-500"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[10px] font-black uppercase font-mono tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                      {pub.category}
                    </span>
                    {pub.volume && (
                      <span className="text-[10px] font-bold text-slate-500 font-mono">
                        {pub.volume}
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-slate-500 font-mono">
                      • {pub.publishDate}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors font-display">
                    {pub.title}
                  </h3>
                  
                  <div className="text-xs text-slate-400">
                    Authors: <span className="font-semibold text-slate-300">{pub.authors.join(', ')}</span>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0 sm:self-center">
                  <button
                    onClick={() => setActiveAbstractPub(pub)}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold px-4 py-2.5 rounded-lg text-xs transition-colors cursor-pointer font-mono uppercase"
                  >
                    View Abstract
                  </button>
                  <button
                    onClick={() => handleDownload(pub.id, pub.title)}
                    disabled={downloadingId !== null}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer font-mono uppercase"
                  >
                    {downloadingId === pub.id ? (
                      <span className="animate-spin text-xs">⏳</span>
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Brief abstract intro */}
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-4 line-clamp-2">
                {pub.abstract}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/60 mt-4">
                {pub.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-950/40 border border-slate-900 px-2 py-1 rounded font-mono">
                    <Tag className="w-2.5 h-2.5 text-emerald-500" />
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl space-y-3 bg-slate-900/10">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="font-bold text-slate-300 font-display">No Publications Matched</h3>
            <p className="text-xs text-slate-500 font-mono">Modify your search query or categories to discover academic archives.</p>
          </div>
        )}
      </div>

      {/* Abstract Reader Modal Overlay */}
      <AnimatePresence>
        {activeAbstractPub && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="abstract-reader-overlay">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
              onClick={() => setActiveAbstractPub(null)}
            ></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-8 text-left shadow-2xl relative z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveAbstractPub(null)}
                className="absolute right-4 top-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-full cursor-pointer transition-colors"
              >
                ✕
              </button>

              <div className="space-y-6">
                <div className="space-y-1.5 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 font-mono">
                      {activeAbstractPub.category} Abstract
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      • {activeAbstractPub.publishDate}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-100 leading-tight font-display">
                    {activeAbstractPub.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2">
                    Authors: <strong className="text-slate-300 font-semibold">{activeAbstractPub.authors.join(', ')}</strong>
                  </p>
                </div>

                {/* Abstract Body */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-black tracking-widest text-emerald-400 font-mono">Original Abstract</h4>
                  <p className="text-slate-300 text-sm leading-relaxed text-justify bg-slate-950 border border-slate-850 p-6 rounded-xl font-serif italic">
                    "{activeAbstractPub.abstract}"
                  </p>
                </div>

                {/* Research References simulation */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-black tracking-widest text-teal-400 font-mono">Institutional Indexing & References</h4>
                  <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 font-mono">
                    <li>Indexed inside the Al Amin Academy Library Archival, Volume Index 7.A.</li>
                    <li>References available for review in BUET Collaborative Physics libraries.</li>
                    <li>Document Digital Identifier (DDI): <span className="text-emerald-400">DDI-10.2018/aaamsc.{activeAbstractPub.id}</span></li>
                  </ul>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setActiveAbstractPub(null)}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold px-5 py-2.5 rounded-lg text-xs transition-colors cursor-pointer font-mono uppercase"
                  >
                    Close Abstract
                  </button>
                  <button
                    onClick={() => {
                      setActiveAbstractPub(null);
                      handleDownload(activeAbstractPub.id, activeAbstractPub.title);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer font-mono uppercase"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Paper</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
