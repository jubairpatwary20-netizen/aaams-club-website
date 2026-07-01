import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Sparkles
} from 'lucide-react';

interface ContactViewProps {
  contactInfo?: any;
}

export default function ContactView({ contactInfo }: ContactViewProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Query', message: '' });
  const [success, setSuccess] = useState(false);

  const locationText = contactInfo?.location || 'Al Amin Academy, Campus-2,\nCollege Road, Chandpur,\nBangladesh.';
  const phoneText = contactInfo?.phone || '+880 1712-345678';
  const emailText = contactInfo?.email || 'info.aaamsc@alaminacademy.edu.bd';
  const officeHoursText = contactInfo?.officeHours || 'Sunday - Thursday: 02:00 PM - 05:00 PM BDT';
  const mapTitleText = contactInfo?.mapTitle || 'Al Amin Academy Campus-2 Layout';
  const mapDescText = contactInfo?.mapDesc || 'Academic laboratory zones, auditorium & club office offices.';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSuccess(true);
      setFormData({ name: '', email: '', subject: 'General Query', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left animate-fade-in" id="contact-view">
      
      {/* Header section */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Connect with Us</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">Get in Touch with AAAM&S</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Do you have questions about our upcoming Science Carnival, student research paper submissions, or corporate sponsorships? Direct your query to the leadership board.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact info and vector map */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <h3 className="font-bold text-slate-100 text-lg border-l-4 border-emerald-500 pl-3 font-display">Official Coordinates</h3>
            
            <ul className="space-y-4 text-xs sm:text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-200">Academy Campus Location</h4>
                  <p className="text-slate-400 mt-1 leading-normal whitespace-pre-line">
                    {locationText}
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-200">Admin Telephone</h4>
                  <p className="text-slate-400 mt-1 leading-normal font-mono">{phoneText}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-200">Email Address</h4>
                  <p className="text-slate-400 mt-1 leading-normal font-mono">{emailText}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-200">In-Person Office Hours</h4>
                  <p className="text-slate-400 mt-1 leading-normal font-mono">{officeHoursText}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Visual Vector Map representation of the Academy campus */}
          <div className="bg-slate-900 border border-slate-805 rounded-2xl p-6 space-y-4 shadow-sm relative overflow-hidden" id="campus-vector-map">
            <div className="absolute top-2 right-2 text-[8px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded">
              Bespoke Vector Map
            </div>
            
            <div className="space-y-1 text-left">
              <h4 className="text-xs font-bold text-slate-200 uppercase font-display">{mapTitleText}</h4>
              <p className="text-[10px] text-slate-500 font-mono">{mapDescText}</p>
            </div>

            {/* Custom styled SVG/CSS grid representing our map visually */}
            <div className="w-full h-44 bg-slate-950 border border-slate-850 rounded-xl relative overflow-hidden text-white font-mono text-[9px] flex items-center justify-center select-none">
              {/* Grid Roads */}
              <div className="absolute w-full h-4 bg-slate-900 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-600 tracking-widest uppercase font-bold text-[7px]">
                COLLEGE ROAD AVENUE
              </div>
              <div className="absolute h-full w-4 bg-slate-900 left-1/3 flex items-center justify-center text-slate-600 uppercase font-bold text-[6px] rotate-90">
                GATE-1 ACCESS
              </div>

              {/* Building Blocks */}
              <div className="absolute top-3 left-4 bg-emerald-950/40 border border-emerald-500/20 p-2.5 rounded text-emerald-400 font-bold w-24 text-center">
                Main Building<br />(Labs 405)
              </div>
              <div className="absolute top-3 right-4 bg-emerald-950/40 border border-emerald-500/20 p-2.5 rounded text-emerald-400 font-bold w-24 text-center">
                Science Hall<br />& Auditorium
              </div>
              <div className="absolute bottom-3 left-4 bg-teal-950/40 border border-teal-500/20 p-2.5 rounded text-teal-400 font-bold w-24 text-center">
                Playground &<br />Exhibits Grid
              </div>
              <div className="absolute bottom-3 right-4 bg-amber-950/40 border border-amber-500/20 p-2.5 rounded text-amber-400 font-bold w-24 text-center">
                AAAM&S Club<br />Office Office
              </div>
            </div>
          </div>
        </div>

        {/* Message dispatch form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 sm:p-10 rounded-2xl" id="contact-inquiry-form">
          <div className="space-y-6">
            <h3 className="font-bold text-slate-100 text-lg font-display">Send Direct Academic Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Tanzir Al Hasan"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 font-sans">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., tanzir@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">Message Subject Division</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  {['General Query', 'Carnival Registration', 'Research Submission', 'Alumni Partnership', 'Corporate Sponsorship'].map((subj) => (
                    <option key={subj} value={subj} className="bg-slate-900 text-slate-100">{subj}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">Your Inquiry Content</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Draft your message detail here..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black py-3.5 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] transition-all font-mono uppercase"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Inquiry Letter</span>
              </button>

              {success && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2 animate-fade-in font-mono">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your message has been received! The Publications and IT division will respond within 48 academic hours.</span>
                </div>
              )}

            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
