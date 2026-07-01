import { Page } from '../types';
import { 
  History, 
  Eye, 
  Target, 
  Sparkles, 
  Award, 
  BookOpen, 
  ShieldAlert,
  Milestone
} from 'lucide-react';

interface AboutViewProps {
  setActivePage: (page: Page) => void;
  aboutContent: any;
}

export default function AboutView({ setActivePage, aboutContent }: AboutViewProps) {
  
  const timelineMilestones = aboutContent?.milestones || [
    {
      year: '2018',
      title: 'The Genesis',
      desc: 'Founded by a group of five enthusiastic pre-engineering and medical stream students. Standardized the first constitution and recruited 40 inaugural members.'
    },
    {
      year: '2020',
      title: 'Inaugural National Carnival',
      desc: 'Hosted the 1st National Math & Science Carnival with 300+ external participants. Established collaborations with national math olympiad networks.'
    },
    {
      year: '2022',
      title: 'Science Horizon Launch',
      desc: 'Released the first peer-reviewed Student Research Journal, enabling school-level researchers to write and publish abstracts.'
    },
    {
      year: '2024',
      title: 'Olympiad Glory & Research Grants',
      desc: 'Won 4 Gold medals at the Bangladesh National Math Olympiad. CHRF and Bangladesh Academy of Sciences authorized student research grants.'
    },
    {
      year: '2026',
      title: 'The Digital Renaissance',
      desc: 'Launched the digital science portal and online training academies, expanding accessibility to rural schools across Chandpur.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left animate-fade-in" id="about-view">
      
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">{aboutContent?.subtitle || 'Al Amin Academy'}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">{aboutContent?.title || 'About the AAAM&S Club'}</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          {aboutContent?.description || 'A premium scientific forum dedicated to logic, reasoning, and building engineering prototypes from high school foundations.'}
        </p>
      </div>

      {/* Vision and Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Mission card */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
          <div className="w-12 h-12 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-100 mb-3 font-display">Our Mission</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {aboutContent?.mission || "To provide students with state-of-the-art platforms, mentorship circles, and empirical guidelines to transform curiosity into verified mathematical research and engineering prototypes. We prepare students to represent Chandpur and Bangladesh in international science forums."}
          </p>
        </div>

        {/* Vision card */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
          <div className="w-12 h-12 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-100 mb-3 font-display">Our Vision</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {aboutContent?.vision || "To establish AAAM&S Club as the leading high school scientific forum in South Asia, where cross-discipline peer learning (combining analytical math, chemistry, biology, and computer science) forms the bedrock of tomorrow's scientific breakthroughs."}
          </p>
        </div>

      </div>

      {/* Club History & Timeline */}
      <div className="space-y-8" id="club-history-timeline">
        <div className="text-left">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Chronicles</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1 font-display">Our Journey Since 2018</h2>
        </div>

        <div className="relative border-l border-slate-800 ml-4 md:ml-6 space-y-12 py-4">
          {timelineMilestones.map((milestone: any, idx: number) => (
            <div key={idx} className="relative pl-8 sm:pl-10">
              {/* Year Bubble */}
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 text-slate-950 rounded-full flex items-center justify-center text-xs font-black shadow-md border-4 border-slate-950 font-mono">
                {milestone.year[2] + milestone.year[3]}
              </div>
              <div className="space-y-2 bg-slate-900/30 border border-slate-800/60 p-6 rounded-2xl hover:border-emerald-500/10 transition-colors">
                <span className="text-emerald-400 text-xs font-bold font-mono tracking-widest block uppercase">{milestone.year}</span>
                <h3 className="font-bold text-slate-100 text-lg font-display">{milestone.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-sans">
                  {milestone.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Affiliations and Collaborations */}
      <div className="bg-slate-900/20 border border-slate-800/60 rounded-3xl p-8 sm:p-12 space-y-8" id="partnerships">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-100 font-display">National Academic Collaborations</h3>
          <p className="text-xs text-slate-500 font-mono">
            We work jointly with prominent research and training organizations to maintain our curriculum standards.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {(aboutContent?.collaborations || [
            { name: 'Bangladesh Math Olympiad Committee', role: 'Regional Partner' },
            { name: 'CHRF Research Council', role: 'Genetics Mentor' },
            { name: 'BUET Robotics Lab', role: 'Hardware Advisory' },
            { name: 'Dhaka University Science Lab', role: 'Auditor Support' }
          ]).map((partner: any, idx: number) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800/85 p-6 rounded-xl shadow-sm hover:border-emerald-500/20 transition-all">
              <div className="w-10 h-10 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                ✓
              </div>
              <h4 className="font-bold text-slate-100 text-xs sm:text-sm line-clamp-1 font-display">{partner.name}</h4>
              <p className="text-[11px] text-slate-500 font-mono font-medium mt-1 uppercase tracking-wider">{partner.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
