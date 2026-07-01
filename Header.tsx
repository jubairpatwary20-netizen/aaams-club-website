import { useState, useEffect } from 'react';
import { Page, Announcement } from '../types';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sun, 
  Moon, 
  BookOpen, 
  Users, 
  Compass, 
  Flame, 
  FileText, 
  Activity, 
  Coins, 
  Award,
  Globe,
  Milestone,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  flashAnnouncement: Announcement | undefined;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  settings: any;
}

export default function Header({ 
  activePage, 
  setActivePage, 
  flashAnnouncement, 
  darkMode, 
  setDarkMode,
  settings
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close menus on page changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [activePage]);

  // Dropdown configurations
  const navGroups = [
    {
      id: 'about-group',
      label: 'About',
      icon: Compass,
      items: [
        { label: 'About Club', page: Page.About, desc: 'Our history, mission & vision' },
        { label: 'Club Constitution', page: Page.Constitution, desc: 'Articles & structural charter' },
        { label: 'Advisory Board', page: Page.Advisory, desc: 'Esteemed academic mentors' },
        { label: 'Founders\' Council', page: Page.Founders, desc: 'Founding members & legacy messages' },
      ]
    },
    {
      id: 'academic-group',
      label: 'Academic',
      icon: BookOpen,
      items: [
        { label: 'Announcements & News', page: Page.Announcements, desc: 'Official updates & bulletin notices' },
        { label: 'Activities & Events', page: Page.Activities, desc: 'Olympiads, workshops & seminars' },
        { label: 'Publications', page: Page.Publications, desc: 'Journals, newsletters & papers' },
        { label: 'Projects & Innovation', page: Page.Projects, desc: 'Student-led prototype showcases' },
        { label: 'Legacy Archive', page: Page.Legacy, desc: 'Historical collections & past boards' },
      ]
    },
    {
      id: 'admin-group',
      label: 'Administration',
      icon: Users,
      items: [
        { label: 'Executive Committee', page: Page.Executive, desc: 'Active governing body members' },
        { label: 'Membership Portal', page: Page.Membership, desc: 'Online application & membership tiers' },
        { label: 'Finance & Transparency', page: Page.Finance, desc: 'Funding sources & ledgers' },
        { label: 'Awards & Accolades', page: Page.Awards, desc: 'Our national & global records' },
      ]
    }
  ];

  const handlePageClick = (page: Page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-lg" id="app-header">
      {/* 1. Announcement Bar */}
      {flashAnnouncement && (
        <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 flex items-center justify-between border-b border-emerald-500/30 font-mono" id="announcement-bar">
          <div className="flex items-center gap-2 overflow-hidden w-full">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-2 py-0.5 rounded-sm animate-pulse text-[10px] uppercase flex items-center gap-0.5 shrink-0">
              <Flame className="w-3 h-3 fill-current" /> Alert
            </span>
            <div className="overflow-hidden relative w-full h-4">
              <div className="absolute whitespace-nowrap animate-marquee flex gap-4">
                <span className="font-semibold text-slate-100">{flashAnnouncement.title}</span>
                <span className="text-emerald-500">|</span>
                <span>Date: {flashAnnouncement.date}</span>
                <span className="text-emerald-500">|</span>
                <span className="text-slate-300">{flashAnnouncement.content}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => handlePageClick(Page.Activities)}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline shrink-0 ml-4 hover:scale-105 transition-all"
            id="announcement-link"
          >
            Register Now
          </button>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <nav className="bg-slate-950/90 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo and Brand Name */}
            <div 
              onClick={() => handlePageClick(Page.Home)}
              className="flex items-center gap-3 cursor-pointer group"
              id="brand-logo-area"
            >
              <div className="relative w-12 h-12 flex items-center justify-center bg-slate-900 border border-emerald-500/30 rounded-xl shadow-md group-hover:scale-105 transition-all duration-300">
                {/* Visual Math-Science Logo representation using HTML */}
                <div className="text-emerald-400 font-black text-xl tracking-tighter font-display">Σ</div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[10px] text-slate-950 font-bold">
                  λ
                </div>
              </div>
              <div>
                <h1 className="text-slate-100 font-bold tracking-tight text-xs sm:text-sm leading-none font-display uppercase">
                  {settings?.siteLogoText || 'AL AMIN ACADEMY'}
                </h1>
                <p className="text-emerald-400 text-[9px] sm:text-[10px] font-extrabold tracking-wide mt-0.5 font-mono uppercase">
                  {settings?.siteName || 'MATH & SCIENCE CLUB'}
                </p>
                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mt-0.5">
                  ESTD. 2018 • AAAM&S
                </span>
              </div>
            </div>

            {/* Desktop Navigation Link Groups */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => handlePageClick(Page.Home)}
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-all ${
                  activePage === Page.Home
                    ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/20'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-900/30'
                }`}
                id="nav-home"
              >
                Home
              </button>

              {/* Dynamic Dropdowns */}
              {navGroups.map((group) => {
                const isGroupActive = group.items.some(item => item.page === activePage);
                const isDropdownOpen = activeDropdown === group.id;

                return (
                  <div 
                    key={group.id} 
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(group.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`px-3 py-2 text-sm font-semibold rounded-md flex items-center gap-1 transition-all ${
                        isGroupActive
                          ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/20'
                          : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-900/30'
                      }`}
                      id={`nav-${group.id}`}
                    >
                      <span>{group.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-1 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden py-2 z-50"
                        >
                          <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-950/50 flex items-center gap-2">
                            <group.icon className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                              {group.label} Division
                            </span>
                          </div>
                          {group.items.map((item) => (
                            <button
                              key={item.page}
                              onClick={() => handlePageClick(item.page)}
                              className={`w-full text-left px-4 py-2.5 hover:bg-slate-800/50 flex flex-col gap-0.5 transition-colors ${
                                activePage === item.page 
                                  ? 'bg-emerald-950/30 text-emerald-400 border-l-2 border-emerald-500' 
                                  : 'text-slate-300'
                              }`}
                            >
                              <span className="text-sm font-semibold font-display">{item.label}</span>
                              <span className="text-[11px] text-slate-500 line-clamp-1">{item.desc}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <button
                onClick={() => handlePageClick(Page.Contact)}
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-all ${
                  activePage === Page.Contact
                    ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/20'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-900/30'
                }`}
                id="nav-contact"
              >
                Contact
              </button>
            </div>

            {/* Utility buttons (Dark mode, Admin Gate, & Join CTA) */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                id="theme-toggle"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
              </button>

              <button
                onClick={() => handlePageClick(Page.Admin)}
                className={`p-2.5 border rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                  activePage === Page.Admin
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20'
                }`}
                title="Admin Console"
                id="admin-console-toggle"
              >
                <Lock className="w-4 h-4" />
              </button>

              <button
                onClick={() => handlePageClick(Page.Membership)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 px-5 py-2.5 rounded-lg text-sm font-extrabold shadow-md hover:shadow-emerald-500/10 hover:scale-105 transition-all cursor-pointer font-mono uppercase"
                id="cta-join-us"
              >
                Apply Membership
              </button>
            </div>

            {/* Mobile Nav Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-full"
                id="theme-toggle-mobile"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-emerald-400"
                id="mobile-menu-trigger"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* 3. Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-slate-800 bg-slate-950 shadow-inner overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <button
                  onClick={() => handlePageClick(Page.Home)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold flex items-center justify-between ${
                    activePage === Page.Home
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-900/30'
                  }`}
                >
                  Home
                </button>

                {navGroups.map((group) => (
                  <div key={group.id} className="space-y-1">
                    <div className="px-3 py-1 flex items-center gap-2 border-l-2 border-emerald-500">
                      <group.icon className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                        {group.label}
                      </span>
                    </div>
                    <div className="pl-3 space-y-0.5">
                      {group.items.map((item) => (
                        <button
                          key={item.page}
                          onClick={() => handlePageClick(item.page)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-display ${
                            activePage === item.page
                              ? 'text-emerald-400 font-bold bg-emerald-950/20'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => handlePageClick(Page.Contact)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold flex items-center justify-between ${
                    activePage === Page.Contact
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-900/30'
                  }`}
                >
                  Contact
                </button>

                <button
                  onClick={() => handlePageClick(Page.Admin)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold flex items-center justify-between ${
                    activePage === Page.Admin
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-900/30'
                  }`}
                >
                  <span>Admin Console</span>
                  <Lock className="w-4 h-4 text-emerald-500" />
                </button>

                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handlePageClick(Page.Membership)}
                    className="w-full text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 py-3 rounded-lg text-sm font-extrabold uppercase font-mono"
                  >
                    Apply Membership
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
