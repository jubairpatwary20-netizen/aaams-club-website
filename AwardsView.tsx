import { useState } from 'react';
import { Achievement } from '../types';
import { 
  Search, 
  User, 
  Medal,
  Star,
  HelpCircle
} from 'lucide-react';

interface AwardsViewProps {
  achievements: Achievement[];
}

export default function AwardsView({ achievements }: AwardsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');

  const years = ['All', '2026', '2025', '2024'];

  // Filter achievements
  const filteredAchievements = achievements.filter(ach => {
    const matchesYear = selectedYear === 'All' || ach.year === selectedYear;
    const matchesSearch = ach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ach.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ach.recipient.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left animate-fade-in" id="awards-view">
      
      {/* Header section */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Hall of Fame</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">Awards, Accolades & Accreditations</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Review our historical credentials. Our club members continuously score high marks and bring home shields from prestigious national and international olympiads.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        {/* Search */}
        <div className="relative w-full sm:max-w-md font-sans">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search laureates, competitions, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans"
          />
        </div>

        {/* Year Filter */}
        <div className="flex gap-1.5 bg-slate-900 border border-slate-805 p-1 rounded-xl text-xs font-bold w-full sm:w-auto overflow-x-auto font-mono">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`px-4 py-2 text-center rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedYear === y
                  ? 'bg-slate-950 text-emerald-400 border border-emerald-500/20 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {y === 'All' ? 'All Years' : `Year ${y}`}
            </button>
          ))}
        </div>
      </div>

      {/* Wall of fame list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="awards-wall">
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map((ach) => (
            <div 
              key={ach.id} 
              className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col justify-between gap-6 hover:border-emerald-500/20 transition-all relative overflow-hidden text-left group"
            >
              {/* Golden spark overlay */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-xl"></div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-amber-950/20 border border-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center">
                    <Medal className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest bg-amber-950/20 border border-amber-500/20 px-2.5 py-1 rounded font-mono">
                    {ach.rank}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-500 font-mono font-bold block">{ach.event} • Year {ach.year}</span>
                  <h3 className="font-bold text-slate-100 text-base sm:text-lg leading-snug font-display group-hover:text-emerald-400 transition-colors">
                    {ach.title}
                  </h3>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                  {ach.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Laureate: <strong className="text-emerald-400 font-bold">{ach.recipient}</strong></span>
                </div>
                <Star className="w-4 h-4 text-amber-400 fill-current shrink-0" />
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 border border-dashed border-slate-805 rounded-2xl space-y-3 bg-slate-900/10">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="font-bold text-slate-300 font-display">No Credentials Found</h3>
            <p className="text-xs text-slate-500 font-mono">Try modifying your search or changing year settings to locate indices.</p>
          </div>
        )}
      </div>

    </div>
  );
}
