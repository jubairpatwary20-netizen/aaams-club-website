import React, { useState } from 'react';
import { Page } from '../types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Linkedin, 
  Github, 
  ChevronRight, 
  Send,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  setActivePage: (page: Page) => void;
  settings?: any;
}

export default function Footer({ setActivePage, settings }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handlePageClick = (page: Page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerDesc = settings?.footerDescription || 'Empowering minds through rigorous scientific logic, inquiry, and innovative math models. Inspiring tomorrow’s researchers, innovators, and leaders.';
  const fbLink = settings?.socialFacebook || 'https://facebook.com';
  const liLink = settings?.socialLinkedin || 'https://linkedin.com';
  const ghLink = settings?.socialGithub || 'https://github.com';
  const campusLocation = settings?.contact?.location || 'Al Amin Academy, Campus-2,\nCollege Road, Chandpur,\nBangladesh.';
  const campusPhone = settings?.contact?.phone || '+880 1712-345678';
  const campusEmail = settings?.contact?.email || 'info.aaamsc@alaminacademy.edu.bd';
  const copyrightText = settings?.footerCopyright || `© ${new Date().getFullYear()} Al Amin Academy Math & Science Club. All academic rights reserved.`;

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80" id="app-footer">
      {/* Upper Footer Segment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Presentation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 border border-emerald-500/30 rounded-lg flex items-center justify-center font-bold text-emerald-400 text-lg font-display">
                Σ
              </div>
              <div>
                <h3 className="text-white font-bold tracking-tight text-xs sm:text-sm leading-none font-display uppercase">{settings?.siteLogoText || 'AL AMIN ACADEMY'}</h3>
                <p className="text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider font-mono mt-0.5">{settings?.siteName || 'MATH & SCIENCE CLUB'}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {footerDesc}
            </p>
            <div className="flex items-center gap-3 pt-2" id="footer-social-icons">
              <a href={fbLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 border border-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-slate-950 rounded-lg hover:-translate-y-0.5 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={liLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 border border-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-slate-950 rounded-lg hover:-translate-y-0.5 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={ghLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg hover:-translate-y-0.5 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Academic Navigation */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-800 font-display">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => handlePageClick(Page.About)} className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors text-left font-display">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>About AAAM&S Club</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick(Page.Constitution)} className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors text-left font-display">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Club Constitution</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick(Page.Activities)} className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors text-left font-display">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Activities & Fairs</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick(Page.Publications)} className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors text-left font-display">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Journals & Newsletters</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick(Page.Projects)} className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors text-left font-display">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Innovation Projects</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Core Contacts */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-800 font-display">
              Academy Campus
            </h3>
            <ul className="space-y-4 text-sm font-sans">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">
                  {campusLocation}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{campusPhone}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="break-all">{campusEmail}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-800 font-display">
              Scientific Dispatch
            </h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Subscribe to receive weekly math brain teasers, scientific articles, and carnival dates directly.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 px-3 rounded-md flex items-center justify-center transition-all cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
              {subscribed && (
                <div className="text-emerald-400 text-xs flex items-center gap-1 mt-1 animate-fade-in">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Subscribed! Check inbox for teasers.</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>

      {/* Copyright Disclaimer Segment */}
      <div className="border-t border-slate-900/80 bg-slate-950/60 py-8 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>{copyrightText}</p>
          <div className="flex gap-6 text-slate-500">
            <button onClick={() => handlePageClick(Page.Constitution)} className="hover:text-emerald-400">Constitution</button>
            <button onClick={() => handlePageClick(Page.Finance)} className="hover:text-emerald-400">Financial Audit</button>
            <button onClick={() => handlePageClick(Page.Membership)} className="hover:text-emerald-400">Apply Enrollment</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
