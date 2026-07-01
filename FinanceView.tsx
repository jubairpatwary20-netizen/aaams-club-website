import { useState } from 'react';
import { FinancialRecord } from '../types';
import { 
  Coins, 
  Download, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  PieChart,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FinanceViewProps {
  fundingSources: FinancialRecord[];
  fundDistribution: FinancialRecord[];
}

export default function FinanceView({ fundingSources, fundDistribution }: FinanceViewProps) {
  const [downloadingAudit, setDownloadingAudit] = useState<string | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const audits = [
    { title: 'AAAM&S Annual Financial Audit Report - FY 2025', size: '2.4 MB', date: 'March 15, 2026', code: 'AUD-2025-01' },
    { title: 'Intra-Academy Carnival Expenditure Audit', size: '1.8 MB', date: 'September 10, 2025', code: 'AUD-CARN-08' },
    { title: 'Alumin Endowment Reserve Ledger Audit', size: '1.2 MB', date: 'January 05, 2025', code: 'AUD-ALUM-02' }
  ];

  const handleDownloadAudit = (code: string, title: string) => {
    setDownloadingAudit(code);
    setTimeout(() => {
      setDownloadingAudit(null);
      setDownloadSuccessMessage(`"${title}.pdf" has been downloaded. This ledger is digitally signed by the Moderator and Treasurer.`);
      setTimeout(() => setDownloadSuccessMessage(null), 5000);
    }, 1200);
  };

  // Calculate total budget
  const totalFunding = fundingSources.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = fundDistribution.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left animate-fade-in" id="finance-view">
      
      {/* Header section */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Transparency Division</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">Finance, Grants & Transparency</h1>
          <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
            We operate with absolute transparency. Review our capital receipts, program budgets, and downloadable annual financial audits.
          </p>
        </div>
      </div>

      {/* Download Success Banner */}
      <AnimatePresence>
        {downloadSuccessMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2 font-mono"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadSuccessMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-950/10 border border-emerald-900/40 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">Total Received Funding (FY 2025-26)</span>
            <p className="text-2xl sm:text-3xl font-black text-slate-100 mt-1 font-mono">{totalFunding.toLocaleString()} BDT</p>
          </div>
        </div>

        <div className="bg-teal-950/10 border border-teal-900/40 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-950/40 text-teal-400 border border-teal-500/20 rounded-xl flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">Total Budget Allocations</span>
            <p className="text-2xl sm:text-3xl font-black text-slate-100 mt-1 font-mono">{totalExpenses.toLocaleString()} BDT</p>
          </div>
        </div>

        <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-950 border border-slate-850 text-slate-300 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">Audit Compliance Rating</span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 font-mono">100% Grade A</p>
          </div>
        </div>
      </div>

      {/* SVG Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Source Funding Donut */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl space-y-6 text-center">
          <h3 className="font-bold text-slate-100 text-base text-left border-l-4 border-emerald-500 pl-3 font-display">Funding Sources Breakdown</h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* Custom SVG Pie Chart representation */}
            <div className="relative w-44 h-44 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1e293b" strokeWidth="4" />
                
                {/* Segment 1: 45% (Blue/Emerald variant) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4.2" strokeDasharray="45 100" strokeDashoffset="0" />
                
                {/* Segment 2: 30% (Teal) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#14b8a6" strokeWidth="4.2" strokeDasharray="30 100" strokeDashoffset="-45" />
                
                {/* Segment 3: 15% (Cyan/Blue) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#0ea5e9" strokeWidth="4.2" strokeDasharray="15 100" strokeDashoffset="-75" />
                
                {/* Segment 4: 10% (Amber) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4.2" strokeDasharray="10 100" strokeDashoffset="-90" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <PieChart className="w-6 h-6 text-slate-500" />
                <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 font-mono">AAAM&S</span>
              </div>
            </div>

            {/* Legends */}
            <div className="space-y-3 w-full text-left">
              {fundingSources.map((record, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-mono">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: record.color }}></div>
                  <div className="flex-grow text-slate-400 truncate max-w-[150px]" title={record.category}>{record.category}</div>
                  <div className="font-bold text-slate-300 shrink-0">{record.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expenses horizontal bars */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl space-y-6">
          <h3 className="font-bold text-slate-100 text-base border-l-4 border-emerald-500 pl-3 font-display">Fund Distribution & Disbursements</h3>

          <div className="space-y-5 pt-2">
            {fundDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400 font-semibold">{item.category}</span>
                  <span className="font-black text-slate-200">{item.amount.toLocaleString()} BDT ({item.percentage}%)</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-850">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Downloadable Ledgers list */}
      <div className="space-y-6" id="audit-repository">
        <div>
          <h3 className="font-bold text-slate-100 text-lg font-display">Financial Audit Downloads</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">Review the verified audit logs detailing every single BDT expenditure of the Academy Club.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audits.map((a) => (
            <div key={a.code} className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between gap-6 hover:border-emerald-500/20 transition-all group">
              <div className="space-y-4 text-left">
                <div className="w-10 h-10 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono font-bold block">{a.date} • {a.size}</span>
                  <h4 className="font-bold text-slate-100 text-sm line-clamp-2 font-display group-hover:text-emerald-400 transition-colors">{a.title}</h4>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold block">{a.code}</span>
                </div>
              </div>

              <button
                onClick={() => handleDownloadAudit(a.code, a.title)}
                disabled={downloadingAudit !== null}
                className="w-full py-2.5 bg-slate-900 hover:bg-emerald-950/20 text-slate-300 hover:text-emerald-400 border border-slate-800 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono uppercase"
              >
                {downloadingAudit === a.code ? (
                  <span className="animate-pulse">Loading Ledger...</span>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Audit PDF</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
