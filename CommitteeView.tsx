import { useState, useEffect } from 'react';
import { CommitteeMember, Founder, AdvisoryBoardMember } from '../types';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Users, 
  BookOpen, 
  MessageSquare, 
  ShieldCheck
} from 'lucide-react';

interface CommitteeViewProps {
  committee: CommitteeMember[];
  advisors: AdvisoryBoardMember[];
  founders: Founder[];
  initialTab?: 'ec' | 'advisors' | 'founders';
}

export default function CommitteeView({ committee, advisors, founders, initialTab = 'ec' }: CommitteeViewProps) {
  const [activeTab, setActiveTab] = useState<'ec' | 'advisors' | 'founders'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left animate-fade-in" id="committee-view">
      
      {/* Header section */}
      <div className="border-b border-slate-800 pb-6 text-center md:text-left space-y-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Administration & Leadership</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">Club Leadership & Governance</h1>
          <p className="text-slate-400 text-sm max-w-3xl leading-relaxed mt-2">
            Meet the elected officers, distinguished academic advisors, and permanent founders driving the legacy of AAAM&S Club.
          </p>
        </div>

        {/* Division Toggles */}
        <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-xl text-xs font-bold w-full max-w-2xl mx-auto md:mx-0 font-mono">
          <button
            onClick={() => setActiveTab('ec')}
            className={`flex-1 py-3 text-center rounded-lg transition-all cursor-pointer ${
              activeTab === 'ec'
                ? 'bg-slate-950 text-emerald-400 border border-emerald-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Executive Committee
          </button>
          <button
            onClick={() => setActiveTab('advisors')}
            className={`flex-1 py-3 text-center rounded-lg transition-all cursor-pointer ${
              activeTab === 'advisors'
                ? 'bg-slate-950 text-emerald-400 border border-emerald-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Advisory Board
          </button>
          <button
            onClick={() => setActiveTab('founders')}
            className={`flex-1 py-3 text-center rounded-lg transition-all cursor-pointer ${
              activeTab === 'founders'
                ? 'bg-slate-950 text-emerald-400 border border-emerald-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Founders' Council
          </button>
        </div>
      </div>

      {/* Conditional Rendering of Sections */}
      <div>
        
        {/* 1. Executive Committee Layout */}
        {activeTab === 'ec' && (
          <div className="space-y-8 animate-fade-in" id="executive-committee-board">
            <div className="flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-slate-100 font-display">Active Governing Officers (2025 - 2026)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {committee.map((member) => (
                <div 
                  key={member.id} 
                  className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden shadow-sm hover:border-emerald-500/20 transition-all flex flex-col justify-between text-left group"
                >
                  <div className="relative h-64 w-full bg-slate-950">
                    <img 
                      src={member.photoUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-slate-950/80 border border-emerald-500/20 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-mono">
                      {member.department}
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-slate-100 text-base leading-tight group-hover:text-emerald-400 transition-colors font-display">
                        {member.name}
                      </h3>
                      <p className="text-xs text-emerald-400 font-bold uppercase tracking-wide font-mono">
                        {member.role}
                      </p>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 pt-2 border-t border-slate-800/60">
                        {member.bio}
                      </p>
                    </div>

                    <div className="flex gap-2.5 pt-3 text-slate-500 border-t border-slate-800/60 font-mono">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="p-1.5 hover:text-emerald-400 hover:scale-105 transition-all" title={member.email}>
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} className="p-1.5 hover:text-emerald-400 hover:scale-105 transition-all" title="LinkedIn">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} className="p-1.5 hover:text-emerald-400 hover:scale-105 transition-all" title="GitHub">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Advisory Board Layout */}
        {activeTab === 'advisors' && (
          <div className="space-y-8 animate-fade-in" id="advisory-board">
            <div className="flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-slate-100 font-display">Esteemed Academic Advisors</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advisors.map((advisor) => (
                <div 
                  key={advisor.id} 
                  className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl shadow-sm text-center flex flex-col justify-between items-center space-y-4 hover:border-emerald-500/20 transition-all"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-800 bg-slate-950">
                    <img 
                      src={advisor.photoUrl} 
                      alt={advisor.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-100 text-base leading-tight font-display">
                      {advisor.name}
                    </h3>
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-wide font-mono">
                      {advisor.designation}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      {advisor.institution}
                    </p>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl w-full text-xs text-slate-400 font-mono">
                    Specialty: <strong className="text-emerald-400 font-bold">{advisor.specialty}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Founders' Council Layout */}
        {activeTab === 'founders' && (
          <div className="space-y-12 animate-fade-in" id="founders-council">
            <div className="flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
              <Users className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-slate-100 font-display">Founding Board & Veto Guardians</h2>
            </div>

            {/* Message from founders panel */}
            <div className="space-y-8">
              {founders.map((founder) => (
                <div 
                  key={founder.id} 
                  className="bg-slate-900/30 border border-slate-800/80 p-6 sm:p-10 rounded-2xl flex flex-col lg:flex-row gap-8 items-center text-left hover:border-emerald-500/10 transition-colors"
                >
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border-4 border-slate-800 shadow-md">
                    <img 
                      src={founder.photoUrl} 
                      alt={founder.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-4 flex-grow">
                    <div className="space-y-1">
                      <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest">Founding Tenure: {founder.tenure}</span>
                      <h3 className="text-lg font-bold text-slate-100 font-display">{founder.name}</h3>
                      <p className="text-xs text-slate-400 font-medium">{founder.designation}</p>
                    </div>

                    <div className="relative text-slate-300 text-sm leading-relaxed italic bg-slate-950 p-5 rounded-xl border border-slate-850">
                      <MessageSquare className="w-8 h-8 text-emerald-500/10 absolute top-1 left-1" />
                      <p className="relative z-10 pl-4 font-serif">"{founder.message}"</p>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      <strong>Historical contributions:</strong> <span className="text-slate-300">{founder.contribution}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
