import { useState } from 'react';
import { 
  History, 
  Download, 
  FileText,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LegacyViewProps {
  photos: any[];
  docs: any[];
}

export default function LegacyView({ photos, docs }: LegacyViewProps) {
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'documents'>('photos');
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  const archiveCommittees = [
    { session: '2024 - 2025', president: 'Zubayer Ahmed Chowdhury', gs: 'Ria Ferdous', theme: 'Applied Genetics & Quantum Logic' },
    { session: '2023 - 2024', president: 'Mahmudul Hasan Alvi', gs: 'Sanzida Akhter', theme: 'Robotics & Environmental Preservation' },
    { session: '2022 - 2023', president: 'Abrar Kabir Jaseem', gs: 'Farhana Hossain', theme: 'Fluid Dynamics & Competitive Combinatorics' },
    { session: '2020 - 2021', president: 'S. M. Raiyan', gs: 'Jannatul Naim', theme: 'Cybernetics & Logic Gird Training' },
    { session: '2018 - 2019', president: 'Engr. S. M. Rayhan Tasnim', gs: 'Dr. Tasnim Ara Hossain', theme: 'The Club Foundations & First Science Carnivals' }
  ];

  const galleryPhotos = photos || [
    { title: 'National Math Olympiad Preparation Grid (2025)', url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600', category: 'Training' },
    { title: '7th National Science Carnival Project Displays (2024)', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600', category: 'Exhibition' },
    { title: 'Biochemistry Electrophoresis Laboratory Trial (2025)', url: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600', category: 'Research' },
    { title: 'Robotics Autonomous Obstacle Detection Showcase (2024)', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600', category: 'Robotics' },
    { title: 'Award Ceremony Wall of Champion Shields (2025)', url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600', category: 'Ceremony' },
    { title: 'Weekly Math Circle Euler Algebra Sessions (2025)', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600&q=80&w=600', category: 'Math Circle' }
  ];

  const historicalDocs = docs || [
    { title: 'AAAM&S Founding Charter Booklet (2018)', size: '4.8 MB', code: 'DOC-FOUND-18' },
    { title: '6th National Carnival Souvenir Publication (2023)', size: '8.2 MB', code: 'DOC-SOUV-23' },
    { title: 'Theoretical Physics Euler Seminar Compendium (2022)', size: '3.1 MB', code: 'DOC-COMP-22' }
  ];

  const handleDownloadDoc = (title: string) => {
    setDownloadMessage(`Archival Booklet "${title}.pdf" has been downloaded successfully.`);
    setTimeout(() => setDownloadMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left animate-fade-in" id="legacy-view">
      
      {/* Header section */}
      <div className="border-b border-slate-800 pb-6 text-center md:text-left space-y-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Historical Repository</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">The Legacy Archive</h1>
          <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
            Browse historical photo logs, preceding committee sessions, founding files, and past carnival souvenirs.
          </p>
        </div>

        {/* Division Toggles */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-bold w-full max-w-sm font-mono">
          <button
            onClick={() => setActiveMediaTab('photos')}
            className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
              activeMediaTab === 'photos'
                ? 'bg-slate-950 text-emerald-400 border border-emerald-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Memories Photo Gallery
          </button>
          <button
            onClick={() => setActiveMediaTab('documents')}
            className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
              activeMediaTab === 'documents'
                ? 'bg-slate-950 text-emerald-400 border border-emerald-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Archival Books & Docs
          </button>
        </div>
      </div>

      <AnimatePresence>
        {downloadMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2 font-mono"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of contents based on active tab */}
      <div>
        {activeMediaTab === 'photos' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" id="legacy-media-gallery">
            {galleryPhotos.map((photo, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-emerald-500/20 transition-all group text-left"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-slate-950/80 border border-emerald-500/20 backdrop-blur-sm text-emerald-400 text-[9px] font-black px-2.5 py-1 rounded font-mono uppercase tracking-wider">
                    {photo.category}
                  </span>
                </div>
                <div className="p-4 bg-slate-950/20">
                  <h4 className="font-bold text-slate-200 text-sm font-display group-hover:text-emerald-400 transition-colors">{photo.title}</h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" id="legacy-documents">
            {historicalDocs.map((doc, idx) => (
              <div key={idx} className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between gap-6 hover:border-emerald-500/20 transition-all text-left group">
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono block">Size: {doc.size}</span>
                    <h4 className="font-bold text-slate-100 text-sm line-clamp-2 font-display group-hover:text-emerald-400 transition-colors">{doc.title}</h4>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold block">{doc.code}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadDoc(doc.title)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-emerald-950/20 text-slate-300 hover:text-emerald-400 border border-slate-800 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono uppercase"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Doc Booklet</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Historical EC Committee list */}
      <div className="space-y-8 animate-fade-in" id="committee-history">
        <div className="flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
          <History className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-slate-100 font-display">Chronicle of Governing Presidents & General Secretaries</h2>
        </div>

        <div className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[10px] font-mono">
                  <th className="px-6 py-4">Session Period</th>
                  <th className="px-6 py-4">Student President</th>
                  <th className="px-6 py-4">General Secretary</th>
                  <th className="px-6 py-4">Core Academic Focus Theme</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300 font-medium font-sans">
                {archiveCommittees.map((comm, idx) => (
                  <tr key={idx} className="hover:bg-slate-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold font-mono text-emerald-400">{comm.session}</td>
                    <td className="px-6 py-4 font-semibold text-slate-100 font-display">{comm.president}</td>
                    <td className="px-6 py-4 text-slate-300">{comm.gs}</td>
                    <td className="px-6 py-4 text-xs italic text-slate-500">{comm.theme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
