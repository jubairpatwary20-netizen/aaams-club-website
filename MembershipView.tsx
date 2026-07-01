import React, { useState } from 'react';
import { 
  CheckCircle, 
  BookOpen, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Cpu,
  QrCode
} from 'lucide-react';

export default function MembershipView() {
  const [step, setStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    academicClass: 'Class IX',
    rollNo: '',
    interest: 'Both', // Math, Science, Both
    statement: '',
    consent: false
  });

  const handleNext = () => {
    if (step === 1 && formData.name && formData.email && formData.phone) {
      setStep(2);
    } else if (step === 2 && formData.rollNo) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.consent && formData.statement) {
      const generatedTicket = `AAAMSC-MEM-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketNumber(generatedTicket);
      setFormSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      academicClass: 'Class IX',
      rollNo: '',
      interest: 'Both',
      statement: '',
      consent: false
    });
  };

  const tiers = [
    {
      name: 'General Member',
      scope: 'Active Academy Students',
      fee: '150 BDT / Semester',
      perks: [
        'Full eligibility to submit research abstracts to Science Horizon',
        'Reserved access to laboratory microscopes & chemical kits',
        'Inclusion in the weekly Math Circle competitive prep classes',
        'Eligible for delegate selection to National Olympiads'
      ],
      color: 'border-emerald-500/20',
      tagBg: 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400'
    },
    {
      name: 'Associate Alumni',
      scope: 'Passed Scholars & Engineers',
      fee: 'Free / Endowment-driven',
      perks: [
        'Permanent invitation to judge Intra-Academy Exhibitions',
        'Publishing rights in peer columns of the flag journal',
        'Direct mentoring opportunities with younger club candidates',
        'Access to global network of researchers and industry experts'
      ],
      color: 'border-teal-500/20',
      tagBg: 'bg-teal-950/40 border border-teal-500/20 text-teal-400'
    },
    {
      name: 'Honorary Fellow',
      scope: 'Invited Teachers & Professionals',
      fee: 'By Invitation Only',
      perks: [
        'Sits on the structural Constitution amendment board',
        'Reviews annual transparent ledgers & financial allocations',
        'Directs research program milestones & university connections',
        'Chairs key panels at the annual National Carnival'
      ],
      color: 'border-amber-500/20',
      tagBg: 'bg-amber-950/40 border border-amber-500/20 text-amber-400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left animate-fade-in" id="membership-view">
      
      {/* Header section */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Enrollment Portal</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">AAAM&S Membership & Admissions</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Apply online to join our core research and training divisions. Explore our membership tiers, benefit guidelines, and application steps.
        </p>
      </div>

      {/* Grid of Tiers */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-100 border-l-4 border-emerald-500 pl-3 font-display">Membership Tiers & Perks</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((t, idx) => (
            <div key={idx} className={`bg-slate-900/40 border ${t.color} p-8 rounded-2xl flex flex-col justify-between space-y-6 hover:scale-[1.01] transition-transform`}>
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-bold text-slate-100 text-lg font-display">{t.name}</h3>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded font-mono border ${t.tagBg}`}>
                    {t.fee}
                  </span>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-mono font-bold">{t.scope}</p>
                
                <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
                  {t.perks.map((p, pIdx) => (
                    <li key={pIdx} className="flex gap-2 items-start leading-relaxed">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form and Benefits Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
        
        {/* Core Perks Section */}
        <div className="lg:col-span-4 space-y-6 bg-slate-900/30 border border-slate-800 p-8 rounded-2xl">
          <h3 className="font-bold text-slate-100 font-display">Why Join the Alliance?</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
            Membership isn’t just an accolade. It is a commitment to academic rigor. Verified general members acquire:
          </p>

          <ul className="space-y-4 text-xs font-sans">
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <p className="text-slate-400 leading-relaxed">
                <strong>Olympiad References:</strong> Instant access to past questions of national/global math and physics contests.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-950/20 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <p className="text-slate-400 leading-relaxed">
                <strong>Project Incubation:</strong> Up to 50,000 BDT yearly research seed grant for outstanding student hardware models.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950/20 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <p className="text-slate-400 leading-relaxed">
                <strong>Leadership Experience:</strong> Opportunity to run for the Executive Committee or lead regional workshop seminars.
              </p>
            </li>
          </ul>
        </div>

        {/* Dynamic Form Panel */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10" id="membership-application-form">
          {!formSubmitted ? (
            <div className="space-y-8">
              {/* Form Navigation Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-100 text-lg font-display">Online Admission Form</h3>
                  <p className="text-xs text-slate-500 font-mono">Complete all three stages to register your profile.</p>
                </div>
                {/* Visual Step indicators */}
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <div 
                      key={s} 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        step === s
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 font-mono font-black shadow'
                          : step > s
                            ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-mono'
                            : 'bg-slate-950 border border-slate-850 text-slate-600 font-mono'
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-step form container */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step 1: Personal Coordinates */}
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider font-mono">Stage 1: Bio-Data Coordinates</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">Your Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Mahbubul Alam"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">Your Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g., mahbub@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-600 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400">Active Mobile / Guardian Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g., +880 1700-000000"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-600 font-mono"
                      />
                    </div>

                    <div className="flex justify-end pt-4 font-mono">
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!formData.name || !formData.email || !formData.phone}
                        className="bg-slate-950 hover:bg-slate-850 text-slate-200 hover:text-emerald-400 font-bold px-6 py-2.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 border border-slate-800 transition-colors uppercase"
                      >
                        <span>Next: Academic Division</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Academic Division */}
                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider font-mono">Stage 2: Academic Positioning</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">Enrolled Academy Class</label>
                        <select
                          value={formData.academicClass}
                          onChange={(e) => setFormData(prev => ({ ...prev, academicClass: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100"
                        >
                          {['Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'].map((cl) => (
                            <option key={cl} value={cl} className="bg-slate-900 text-slate-100">{cl}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">Academy Roll / ID Number</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., ID-2025-09"
                          value={formData.rollNo}
                          onChange={(e) => setFormData(prev => ({ ...prev, rollNo: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-600 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400">Scientific Focus Interest</label>
                      <div className="grid grid-cols-3 gap-3 font-mono text-center">
                        {['Mathematics', 'Science', 'Both'].map((opt) => (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => setFormData(prev => ({ ...prev, interest: opt }))}
                            className={`py-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                              formData.interest === opt
                                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400 shadow-sm'
                                : 'bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-400 hover:border-slate-800'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 font-mono">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-300 font-bold px-6 py-2.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors uppercase"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!formData.rollNo}
                        className="bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-200 hover:text-emerald-400 font-bold px-6 py-2.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors uppercase"
                      >
                        <span>Next: Statement</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Motivation Statement */}
                {step === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider font-mono">Stage 3: Scientific Intention Statement</h4>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 font-sans">Why do you wish to join AAAM&S Club? (brief statement)</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail your scientific hobbies, projects, or Olympiad target goals."
                        value={formData.statement}
                        onChange={(e) => setFormData(prev => ({ ...prev, statement: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-600 resize-none"
                      />
                    </div>

                    <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        required
                        checked={formData.consent}
                        onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                        className="mt-0.5 border-slate-800"
                      />
                      <span>I authorize the AAAM&S Moderator to evaluate my academic records and grade averages to verify general club compatibility.</span>
                    </label>

                    <div className="flex justify-between pt-4 font-mono">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-300 font-bold px-6 py-2.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors uppercase"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        disabled={!formData.consent || !formData.statement}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black px-8 py-2.5 rounded-lg text-xs shadow-md hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50 uppercase"
                      >
                        <span>Submit Registration Application</span>
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          ) : (
            <div className="text-center space-y-6 py-6 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-slate-100 font-display">Application Received Successfully!</h3>
                <p className="text-xs text-slate-400">The publication board is evaluating your biological and mathematical interests.</p>
              </div>

              {/* Digital Admission Slip layout */}
              <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-6 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl"></div>
                
                <div className="flex justify-between items-start border-b border-dashed border-slate-800 pb-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-100 uppercase font-display">Al Amin Academy Club Portal</h4>
                    <span className="text-[10px] text-emerald-400 font-bold tracking-wider font-mono">MEMBERSHIP ADMISSION CARD</span>
                  </div>
                  <QrCode className="w-12 h-12 text-slate-300 animate-pulse" />
                </div>

                <div className="py-4 space-y-3 text-xs font-mono">
                  <div className="grid grid-cols-2 gap-2 text-slate-400">
                    <div>Applicant Name:</div>
                    <div className="font-bold text-slate-200 text-right">{formData.name}</div>
                    
                    <div>Class roll position:</div>
                    <div className="font-bold text-slate-200 text-right">{formData.rollNo} ({formData.academicClass})</div>
                    
                    <div>Focus Division:</div>
                    <div className="font-bold text-slate-200 text-right uppercase">{formData.interest}</div>
                    
                    <div>Temporary Code:</div>
                    <div className="text-emerald-400 font-bold text-right">{ticketNumber}</div>
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-800 pt-4 text-[10px] text-slate-500 leading-normal text-center font-sans">
                  Verification pending within 14 working days. Print this slip and submit to the General Moderator Room 405.
                </div>
              </div>

              <button
                onClick={handleReset}
                className="bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-200 hover:text-emerald-400 font-bold px-6 py-2.5 rounded-lg text-xs transition-colors cursor-pointer font-mono uppercase"
              >
                Apply Another Candidate
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
