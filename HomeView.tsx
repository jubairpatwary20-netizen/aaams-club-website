import { useState, useEffect } from 'react';
import { Page, Announcement, ClubEvent, Project, Achievement } from '../types';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Cpu, 
  Award, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight,
  Sigma,
  FlaskConical,
  Flame
} from 'lucide-react';

interface HomeViewProps {
  announcements: Announcement[];
  events: ClubEvent[];
  projects: Project[];
  achievements: Achievement[];
  settings: any;
  setActivePage: (page: Page) => void;
}

export default function HomeView({ 
  announcements, 
  events, 
  projects, 
  achievements, 
  settings,
  setActivePage 
}: HomeViewProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate live countdown to Carnival
  useEffect(() => {
    const targetDate = new Date(settings.countdownTarget || '2026-08-14T08:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.countdownTarget]);

  const handlePageClick = (page: Page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-24" id="home-view">
      
      {/* 1. Hero Banner Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900" id="hero-banner">
        {/* Math Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98106_1px,transparent_1px),linear-gradient(to_bottom,#10b98106_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Academic Club Portal</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-display text-slate-100 whitespace-pre-line">
              {settings.heroTitle || 'Unlocking Logic. Decoding Discovery.'}
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              {settings.heroSubtitle || 'Welcome to the Al Amin Academy Math & Science Club (AAAM&S Club). We nurture analytical thinkers, support breakthrough student research, and compete across global olympiad arenas.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => handlePageClick(Page.Membership)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer font-mono uppercase text-sm"
              >
                <span>Apply for Membership</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handlePageClick(Page.Activities)}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-200 font-bold px-8 py-4 rounded-xl hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm font-display"
              >
                <span>Explore Events</span>
              </button>
            </div>
          </div>

          {/* Graphical Right Panel: Live Countdown & Crest Details */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-8 rounded-2xl shadow-2xl relative overflow-hidden text-center space-y-6">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-500 to-teal-500"></div>
              
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-black">Next Grand Showcase</span>
                <h3 className="text-xl font-bold text-slate-100 font-display">{settings.countdownTitle || '8th National AAAM&S Carnival'}</h3>
              </div>

              {/* Grid Countdown Clock */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hrs' },
                  { value: timeLeft.minutes, label: 'Mins' },
                  { value: timeLeft.seconds, label: 'Secs' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-950/80 border border-slate-850 p-3 rounded-xl flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{String(item.value).padStart(2, '0')}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-850/50 rounded-xl text-xs text-slate-400 flex items-center gap-2 justify-center font-mono">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                <span>Starts on: {settings.countdownTarget ? new Date(settings.countdownTarget).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'August 14, 2026'}</span>
              </div>

              <button 
                onClick={() => handlePageClick(Page.Activities)}
                className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:scale-102 transition-all cursor-pointer font-mono"
              >
                Register as Candidate
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Emblem, Motto & Foundations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="club-motto-area">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-900/20 border border-slate-800/80 p-8 sm:p-12 rounded-3xl">
          
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4 border-r-0 lg:border-r border-slate-850 lg:pr-8">
            {/* Elegant Crest representation */}
            <div className="w-28 h-28 bg-gradient-to-br from-emerald-800 via-slate-900 to-teal-900 rounded-3xl flex items-center justify-center text-emerald-400 text-5xl font-black relative shadow-xl border border-emerald-500/20 font-display">
              Σ
              <div className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-mono font-black px-2 py-0.5 rounded-full border-2 border-slate-950">
                2018
              </div>
            </div>
            <div>
              <h2 className="text-slate-200 font-bold text-base tracking-tight uppercase font-display">AAAM&S Emblem</h2>
              <p className="text-xs text-slate-500 mt-1">Interlinked equations of mathematics & molecules of science.</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-400">Our Sacred Motto</span>
            <blockquote className="text-2xl sm:text-3xl font-extrabold text-slate-100 leading-tight italic tracking-tight font-display">
              {settings.siteMotto || '"Empowering Minds through Rigorous Logic, Inquiry, and Innovative Discovery."'}
            </blockquote>
            <p className="text-slate-400 text-sm leading-relaxed">
              Instituted to bridge classroom theories with active empirical inquiries. We believe mathematical beauty and biological structures are the twin pillars of human understanding.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Sigma className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold font-mono uppercase tracking-wider">Logic First</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FlaskConical className="w-5 h-5 text-teal-400" />
                <span className="text-xs font-bold font-mono uppercase tracking-wider">Inquiry</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Cpu className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold font-mono uppercase tracking-wider">Innovation</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Club Core Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="club-statistics">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {(settings.stats || [
            { value: '450+', label: 'Active General Members' },
            { value: '45+', label: 'Innovative Prototypes' },
            { value: '120+', label: 'National Olympiad Medals' },
            { value: '8 Yrs', label: 'Legacy of Academic Excellence' }
          ]).map((stat: any, idx: number) => {
            const icons = [Users, Cpu, Award, TrendingUp];
            const colors = ['text-emerald-400', 'text-teal-400', 'text-amber-400', 'text-emerald-400'];
            const IconComponent = icons[idx % icons.length];
            const colorClass = colors[idx % colors.length];
            return (
              <div key={idx} className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300 group">
                <div className="flex justify-between items-start">
                  <span className="text-3xl sm:text-4xl font-black text-slate-100 font-mono group-hover:text-emerald-400 transition-colors">{stat.value}</span>
                  <IconComponent className={`w-6 h-6 ${colorClass}`} />
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-4 tracking-tight leading-snug font-display">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Events & Announcements Split Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Upcoming Events Column */}
          <div className="lg:col-span-7 space-y-8 text-left" id="upcoming-events-grid">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest">Active Calendar</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1 font-display">Upcoming Events</h2>
              </div>
              <button 
                onClick={() => handlePageClick(Page.Activities)}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-mono uppercase"
              >
                <span>Full Schedule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {events.slice(0, 2).map((event) => (
                <div key={event.id} className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row hover:border-emerald-500/20 transition-all group">
                  <div className="sm:w-1/3 relative h-48 sm:h-auto overflow-hidden">
                    <img 
                      src={event.imagePlaceholder} 
                      alt={event.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-slate-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider font-mono">
                      {event.category}
                    </span>
                  </div>
                  <div className="p-6 sm:w-2/3 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-bold text-slate-100 hover:text-emerald-400 text-base sm:text-lg font-display transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-800/80 pt-4 flex flex-wrap gap-4 text-xs text-slate-500 font-medium font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-500" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5 w-full">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements Column */}
          <div className="lg:col-span-5 space-y-8 text-left" id="latest-announcements">
            <div>
              <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest">Digital Dispatch</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1 font-display">Latest Announcements</h2>
            </div>

            <div className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl space-y-4 divide-y divide-slate-850">
              {announcements.slice(0, 3).map((ann, idx) => (
                <div key={ann.id} className={`space-y-2 text-left ${idx > 0 ? 'pt-4' : ''}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 font-mono uppercase">{ann.date}</span>
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                      ann.category === 'Urgent' 
                        ? 'bg-rose-950/20 text-rose-400 border-rose-500/20'
                        : ann.category === 'Competition'
                          ? 'bg-amber-950/20 text-amber-400 border-amber-500/20'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}>
                      {ann.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm hover:text-emerald-400 transition-colors cursor-pointer font-display">
                    {ann.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Featured Projects Section */}
      <section className="border-y border-slate-900 bg-slate-950/40 py-16 text-left" id="featured-projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest">Academy Innovation</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1 font-display">Featured Prototypes</h2>
            </div>
            <button 
              onClick={() => handlePageClick(Page.Projects)}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-mono uppercase"
            >
              <span>View All Projects</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((proj) => (
              <div key={proj.id} className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-emerald-500/20 transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={proj.imagePlaceholder} 
                    alt={proj.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider font-mono">
                    {proj.category}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-100 text-base leading-snug line-clamp-1 font-display">{proj.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{proj.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800/60 flex justify-between items-center text-[11px] text-slate-500 font-mono">
                    <span className="font-semibold truncate max-w-[150px] text-slate-400">By: {proj.innovators.join(', ')}</span>
                    <span className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">{proj.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Achievement Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="achievement-showcase">
        <div className="space-y-12">
          
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest">Wall of Fame</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1 font-display">Recent Achievements</h2>
            </div>
            <button 
              onClick={() => handlePageClick(Page.Awards)}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-mono uppercase"
            >
              <span>Awards Gallery</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.slice(0, 3).map((ach) => (
              <div key={ach.id} className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between gap-6 hover:border-emerald-500/20 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-emerald-400 font-bold font-mono uppercase tracking-wider">{ach.rank} ({ach.year})</span>
                    <h3 className="font-bold text-slate-100 text-base leading-snug font-display">{ach.title}</h3>
                    <span className="text-xs text-slate-400 font-medium block">{ach.event}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {ach.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/60 text-[11px] text-slate-500 font-mono">
                  <span>Honoree: <strong className="text-slate-300 font-semibold">{ach.recipient}</strong></span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Call-to-Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 border border-slate-850 rounded-3xl p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98104_1px,transparent_1px),linear-gradient(to_bottom,#10b98104_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              Join the Alliance of Thinkers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none font-display text-slate-100">
              Ready to Shape the Future of Science?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              Unlock priority access to laboratory research tools, mentor study groups, training webinars, and represent Al Amin Academy at National Olympiads. Applications are open for the current session.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => handlePageClick(Page.Membership)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all text-sm shadow-md cursor-pointer font-mono uppercase"
              >
                Start Membership Application
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
