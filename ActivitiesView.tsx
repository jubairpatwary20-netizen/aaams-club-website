import React, { useState } from 'react';
import { ClubEvent } from '../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Search, 
  CheckCircle, 
  AlertCircle,
  QrCode,
  Download,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ActivitiesViewProps {
  events: ClubEvent[];
}

export default function ActivitiesView({ events }: ActivitiesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Registration Form State
  const [registrationEvent, setRegistrationEvent] = useState<ClubEvent | null>(null);
  const [formData, setFormData] = useState({ name: '', classRoll: '', section: '', email: '', agreeTerms: false });
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [assignedTicket, setAssignedTicket] = useState('');
  const [downloadSlipMessage, setDownloadSlipMessage] = useState<string | null>(null);

  const categories = ['All', 'Science Fair', 'Olympiad', 'Workshop', 'Competition', 'Seminar'];

  // Filter logic
  const filteredEvents = events.filter(evt => {
    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || evt.status === selectedStatus;
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.classRoll) {
      const ticketId = `AAAMSC-${registrationEvent?.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setAssignedTicket(ticketId);
      setRegisteredSuccess(true);
    }
  };

  const closeRegistration = () => {
    setRegistrationEvent(null);
    setRegisteredSuccess(false);
    setFormData({ name: '', classRoll: '', section: '', email: '', agreeTerms: false });
    setDownloadSlipMessage(null);
  };

  const handleSaveSlip = () => {
    setDownloadSlipMessage(`Ticket ${assignedTicket} saved successfully to your downloads.`);
    setTimeout(() => setDownloadSlipMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left animate-fade-in" id="activities-view">
      
      {/* Header section */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Active Hub</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">Activities & Events Calendar</h1>
          <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
            Participate in intensive olympiad training, present innovation displays, or learn in laboratory science seminars.
          </p>
        </div>
      </div>

      {/* Filters Board */}
      <div className="space-y-4">
        
        {/* Search and Status toggles */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search box */}
          <div className="relative md:col-span-7">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search active, past events, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans"
            />
          </div>
          {/* Status filters */}
          <div className="flex bg-slate-900 border border-slate-805 p-1.5 rounded-xl md:col-span-5 text-xs font-bold font-mono">
            {['All', 'Upcoming', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-slate-950 text-emerald-400 border border-emerald-500/20 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status} Events
              </button>
            ))}
          </div>
        </div>

        {/* Category horizontal scroller */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" id="category-scroller font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap border transition-all cursor-pointer font-mono uppercase ${
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

      {/* Events display grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="events-grid-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((evt) => (
            <div 
              key={evt.id} 
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-emerald-500/20 transition-all group"
            >
              {/* Image box */}
              <div className="relative h-56 w-full overflow-hidden">
                <img 
                  src={evt.imagePlaceholder} 
                  alt={evt.title} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-slate-950/85 backdrop-blur-sm text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded border border-emerald-500/20 uppercase tracking-wider font-mono">
                    {evt.category}
                  </span>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded border uppercase tracking-wider font-mono ${
                    evt.status === 'Upcoming' 
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400' 
                      : evt.status === 'Ongoing'
                        ? 'bg-teal-500 text-slate-950 border-teal-400 animate-pulse'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}>
                    {evt.status}
                  </span>
                </div>
              </div>

              {/* Content box */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-100 text-lg sm:text-xl group-hover:text-emerald-400 transition-colors font-display">
                    {evt.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                    {evt.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800/60">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-500 font-medium font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                      {evt.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-teal-500 shrink-0" />
                      {evt.time}
                    </span>
                    <span className="flex items-center gap-1.5 sm:col-span-2">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </span>
                  </div>

                  {evt.status === 'Upcoming' ? (
                    <button
                      onClick={() => setRegistrationEvent(evt)}
                      className="w-full text-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:scale-102 transition-all cursor-pointer font-mono"
                    >
                      Register / Request Admission Slip
                    </button>
                  ) : (
                    <div className="text-center bg-slate-950 border border-slate-850 py-3 rounded-xl text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 font-mono">
                      <CheckCircle className="w-4 h-4 text-slate-600" />
                      <span>Event Concluded</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 lg:col-span-2 text-center py-20 border border-dashed border-slate-800 rounded-2xl space-y-3 bg-slate-900/10">
            <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="font-bold text-slate-300 font-display">No Events Match Query</h3>
            <p className="text-xs text-slate-500 font-mono">Adjust your category selections, search query, or status filters to discover matches.</p>
          </div>
        )}
      </div>

      {/* Registration Modal Overlay */}
      <AnimatePresence>
        {registrationEvent && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="registration-overlay">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
              onClick={closeRegistration}
            ></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-8 text-left shadow-2xl relative z-10"
            >
              {/* Close Button */}
              <button
                onClick={closeRegistration}
                className="absolute right-4 top-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-full cursor-pointer transition-colors"
              >
                ✕
              </button>

              {!registeredSuccess ? (
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">{registrationEvent.category} Admission</span>
                    <h3 className="text-xl font-bold text-slate-100 font-display">Register as Candidate</h3>
                    <p className="text-xs text-slate-400">Apply for entry in: <strong className="text-slate-200">{registrationEvent.title}</strong></p>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Nafis Chowdhury"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-600"
                      />
                    </div>

                    {/* Class and Section */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 font-sans">Class Roll / ID</label>
                        <input
                          type="text"
                          required
                          value={formData.classRoll}
                          onChange={(e) => setFormData(prev => ({ ...prev, classRoll: e.target.value }))}
                          placeholder="e.g., Roll-25"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-600 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 font-sans">Section (optional)</label>
                        <input
                          type="text"
                          value={formData.section}
                          onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                          placeholder="e.g., A / Science"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-600"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400">Active Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="e.g., nafis@gmail.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-600 font-mono"
                      />
                    </div>

                    {/* Agreement */}
                    <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                        className="mt-0.5 border-slate-800"
                      />
                      <span>I verify that I am currently enrolled in Al Amin Academy and agree to follow all safety and contest guidelines.</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold py-3 rounded-lg text-sm shadow-md hover:scale-102 transition-all cursor-pointer font-mono uppercase"
                  >
                    Confirm Registration Entry
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-6 py-4 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-slate-100 font-display">Registration Complete!</h3>
                    <p className="text-xs text-slate-400">Your candidate profile is successfully indexed.</p>
                  </div>

                  {downloadSlipMessage && (
                    <div className="p-3 bg-emerald-950/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-mono flex items-center gap-1.5 justify-center">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>{downloadSlipMessage}</span>
                    </div>
                  )}

                  {/* PDF/Ticket Visual */}
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl flex flex-col items-center gap-4 text-center">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold font-mono">Official Slip</span>
                      <h4 className="text-sm font-bold text-slate-100 font-display">{registrationEvent.title}</h4>
                    </div>
                    
                    {/* Fake QR code */}
                    <QrCode className="w-24 h-24 text-slate-300" />

                    <div className="text-xs space-y-1 font-mono">
                      <p className="text-slate-400">Candidate: <strong className="text-slate-200">{formData.name}</strong></p>
                      <p className="text-slate-400">Admission Code: <span className="text-emerald-400 font-bold">{assignedTicket}</span></p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={closeRegistration}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold py-3 rounded-lg text-xs transition-colors cursor-pointer font-mono uppercase"
                    >
                      Close Portal
                    </button>
                    <button
                      onClick={handleSaveSlip}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold py-3 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer font-mono uppercase"
                    >
                      <Download className="w-4 h-4" />
                      <span>Save Admission Slip</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
