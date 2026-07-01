import { useState } from 'react';
import { Project } from '../types';
import { 
  Search, 
  Cpu, 
  Award, 
  HelpCircle,
  Wrench,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsViewProps {
  projects: Project[];
}

export default function ProjectsView({ projects }: ProjectsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlueprintProj, setActiveBlueprintProj] = useState<Project | null>(null);

  const categories = ['All', 'Mathematics', 'Applied Science', 'Robotics & AI', 'Environmental Tech', 'Biomedical'];

  // Filter logic
  const filteredProjects = projects.filter(proj => {
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.innovators.some(inn => inn.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          proj.mentor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left animate-fade-in" id="projects-view">
      
      {/* Header section */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Applied Sciences</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">Projects & Innovation Lab</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Discover original hardware, software, and biological inventions designed and prototyped entirely by Al Amin Academy student researchers.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search innovative prototypes, inventors, or tech stacks (e.g. 'Hydroponic', 'OpenCV')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans"
          />
        </div>

        {/* Category horizontal scroller */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold border whitespace-nowrap transition-all cursor-pointer font-mono uppercase ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500/30 text-slate-950 shadow-md font-black'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-archive">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((proj) => (
            <div 
              key={proj.id} 
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group text-left hover:border-emerald-500/20 transition-all"
            >
              {/* Media Container */}
              <div className="relative h-52 w-full overflow-hidden">
                <img 
                  src={proj.imagePlaceholder} 
                  alt={proj.title} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Category & Status Overlays */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 font-mono">
                  <span className="bg-slate-950/85 border border-emerald-500/20 backdrop-blur-sm text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider block">
                    {proj.category}
                  </span>
                  <span className="bg-emerald-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider block w-fit">
                    {proj.status}
                  </span>
                </div>

                {proj.awardStatus && (
                  <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-950 text-[10px] font-black p-2 rounded-lg flex items-center gap-1.5 shadow-md font-mono">
                    <Award className="w-3.5 h-3.5 shrink-0 text-slate-950" />
                    <span className="truncate">{proj.awardStatus}</span>
                  </div>
                )}
              </div>

              {/* Description Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] text-emerald-400 font-mono block">Academic Year: {proj.year}</span>
                  <h3 className="font-bold text-slate-100 text-lg leading-tight group-hover:text-emerald-400 transition-colors font-display">
                    {proj.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 space-y-4">
                  {/* Contributors */}
                  <div className="text-xs space-y-1">
                    <div className="text-slate-500 font-mono">Innovators:</div>
                    <div className="font-bold text-slate-300 truncate font-display">
                      {proj.innovators.join(', ')}
                    </div>
                  </div>

                  {/* Mentorship */}
                  <div className="text-[11px] text-slate-500 font-mono">
                    Advisor: <span className="text-slate-400 font-bold">{proj.mentor}</span>
                  </div>

                  {/* Blueprint button */}
                  <button
                    onClick={() => setActiveBlueprintProj(proj)}
                    className="w-full text-center bg-slate-900 hover:bg-emerald-950/20 text-slate-300 hover:text-emerald-400 border border-slate-800 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono uppercase"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>View Engineering Blueprints</span>
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 border border-dashed border-slate-805 rounded-2xl space-y-3 bg-slate-900/10">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="font-bold text-slate-300 font-display">No Projects Found</h3>
            <p className="text-xs text-slate-500 font-mono">Modify your category settings or search parameters to discover other laboratory prototypes.</p>
          </div>
        )}
      </div>

      {/* Blueprint Drawer Modal Overlay */}
      <AnimatePresence>
        {activeBlueprintProj && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="blueprint-drawer">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
              onClick={() => setActiveBlueprintProj(null)}
            ></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-8 text-left shadow-2xl relative z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveBlueprintProj(null)}
                className="absolute right-4 top-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-full cursor-pointer transition-colors"
              >
                ✕
              </button>

              <div className="space-y-6">
                
                <div className="space-y-1 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 font-mono">
                      {activeBlueprintProj.category} Schematics
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 font-display">
                    {activeBlueprintProj.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">Engineering blueprint released for student audit.</p>
                </div>

                {/* Technical description block */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-black tracking-widest text-emerald-400 font-mono">Architectural Description</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify bg-slate-950 p-5 rounded-xl border border-slate-850 italic">
                    {activeBlueprintProj.blueprintDetails || 'Technical schematic detail is restricted to registered members.'}
                  </p>
                </div>

                {/* Simulated Blueprint specifications */}
                <div className="space-y-3 bg-slate-950/60 border border-slate-850 p-5 rounded-xl font-mono">
                  <h4 className="text-xs uppercase font-black tracking-widest text-teal-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Components & Tech Stack Specifications</span>
                  </h4>
                  <ul className="text-xs text-slate-400 space-y-2 pl-4 list-disc">
                    <li><strong>Controller:</strong> STM32 ARM Cortex-M4 microcontroller or ESP32 Dual Core SoC.</li>
                    <li><strong>Bionics/Sensing:</strong> Custom solid-state bio-electrical sensors or optical detection rigs.</li>
                    <li><strong>Incubation Mentor:</strong> {activeBlueprintProj.mentor}.</li>
                    <li><strong>Patent Status:</strong> Registered copyright inside Al Amin Academy IP Repository under ID <span className="text-emerald-400 font-bold">IP-AAAMSC-{activeBlueprintProj.id.toUpperCase()}</span>.</li>
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                  <span>Year: {activeBlueprintProj.year}</span>
                  <button
                    onClick={() => setActiveBlueprintProj(null)}
                    className="bg-slate-950 border border-slate-850 hover:bg-slate-800 text-slate-300 font-bold px-5 py-2.5 rounded-lg text-xs cursor-pointer transition-colors uppercase"
                  >
                    Close Blueprint
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
