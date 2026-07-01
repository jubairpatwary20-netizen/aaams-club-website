import { useState, useEffect } from 'react';
import { Announcement } from '../types';
import { 
  Search, 
  Pin, 
  AlertCircle, 
  Calendar, 
  User, 
  Image as ImageIcon, 
  FileText, 
  ExternalLink, 
  Video, 
  Sparkles, 
  Archive, 
  Clock, 
  X,
  BookOpen,
  ArrowRight,
  Flame,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnnouncementsViewProps {
  announcements: Announcement[];
}

export default function AnnouncementsView({ announcements }: AnnouncementsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showArchived, setShowArchived] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [simulatedDownloadMsg, setSimulatedDownloadMsg] = useState<string | null>(null);

  // Available categories based on the Announcement model definition
  const categories = ['All', 'General', 'Olympiad', 'Competition', 'Urgent', 'News', 'Meeting', 'Workshop'];

  // Current time for scheduling check
  const nowTime = new Date().getTime();

  // Filter and sort announcements
  const processedAnnouncements = announcements.filter(ann => {
    // Search query matching
    const matchesSearch = 
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ann.authorName && ann.authorName.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filter
    const matchesCategory = selectedCategory === 'All' || ann.category === selectedCategory;

    // Archive state filter
    const isArchived = !!ann.isArchived;
    const matchesArchive = showArchived ? isArchived : !isArchived;

    // Scheduled state check (only show if scheduled date is past or undefined)
    const isScheduledInFuture = ann.scheduleDate && new Date(ann.scheduleDate).getTime() > nowTime;

    return matchesSearch && matchesCategory && matchesArchive && !isScheduledInFuture;
  });

  // Sort: Pinned first, then by date descending
  const sortedAnnouncements = [...processedAnnouncements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Pick the featured announcement (highest priority: pinned + not archived, or latest)
  const featuredAnnouncement = sortedAnnouncements.find(ann => !ann.isArchived && ann.isPinned) || sortedAnnouncements[0];

  const handleDownload = (docName: string) => {
    setSimulatedDownloadMsg(`"${docName}" has been successfully downloaded.`);
    setTimeout(() => {
      setSimulatedDownloadMsg(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left" id="announcements-news-view">
      
      {/* 1. Header Banner */}
      <div className="border-b border-slate-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Official Dispatches</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1 font-display">AAAM&S Bulletin & News</h1>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
            Stay updated with official academic notices, grand competition schedules, national olympiad triumphs, and student researcher dispatches.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowArchived(!showArchived);
              setSelectedCategory('All');
            }}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold border font-mono transition-all duration-200 uppercase flex items-center gap-2 cursor-pointer ${
              showArchived
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-md'
                : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Archive className="w-4 h-4" />
            <span>{showArchived ? 'Viewing Archive' : 'View Archive'}</span>
          </button>
        </div>
      </div>

      {/* 2. Scrolling Ticker Bar */}
      <div className="bg-slate-900/60 border border-slate-850 rounded-xl p-3 flex items-center gap-4 overflow-hidden relative" id="announcement-news-ticker">
        <div className="flex items-center gap-2 shrink-0 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2.5 py-1 rounded text-xs font-black font-mono uppercase tracking-wider animate-pulse">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Latest Brief</span>
        </div>
        <div className="relative w-full h-5 overflow-hidden">
          <div className="absolute whitespace-nowrap animate-marquee flex gap-12 text-xs font-mono text-slate-300">
            {sortedAnnouncements.slice(0, 5).map((ann, idx) => (
              <span key={idx} className="flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition-colors" onClick={() => setSelectedAnnouncement(ann)}>
                <span className="text-emerald-500">•</span>
                <span className="font-extrabold text-slate-100">{ann.title}</span>
                <span className="text-slate-500">({ann.date})</span>
              </span>
            ))}
            {sortedAnnouncements.length === 0 && (
              <span className="text-slate-500">No active announcements at this time. Stay tuned for future notices.</span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Featured Announcement Segment */}
      {featuredAnnouncement && !searchQuery && selectedCategory === 'All' && !showArchived && (
        <section className="bg-gradient-to-b from-slate-900/50 to-slate-950/20 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl" id="featured-announcement-block">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column: Visual Content */}
            <div className="lg:col-span-7 h-64 lg:h-auto relative bg-slate-950 flex items-center justify-center overflow-hidden">
              {featuredAnnouncement.featuredImage ? (
                <img 
                  src={featuredAnnouncement.featuredImage} 
                  alt={featuredAnnouncement.title}
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-teal-950/30 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
                  <div className="w-16 h-16 bg-slate-900/80 rounded-full border border-slate-800 flex items-center justify-center text-emerald-400 mb-4">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">OFFICIAL AAAM&S GAZETTE</span>
                  <p className="text-[11px] text-slate-600 max-w-sm mt-1">Official dispatch published directly by the Al Amin Academy Executive Council.</p>
                </div>
              )}

              {/* Badges on Hero */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {featuredAnnouncement.isPinned && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded font-mono uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Pin className="w-3 h-3 fill-current" /> Pinned
                  </span>
                )}
                {featuredAnnouncement.isUrgent && (
                  <span className="bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded font-mono uppercase tracking-wider flex items-center gap-1 shadow-md animate-pulse">
                    <AlertCircle className="w-3 h-3" /> Urgent Notice
                  </span>
                )}
              </div>
            </div>

            {/* Right Column: Textual Content */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full font-mono uppercase tracking-wider">
                    {featuredAnnouncement.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featuredAnnouncement.date}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-100 font-display leading-tight tracking-tight hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => setSelectedAnnouncement(featuredAnnouncement)}>
                  {featuredAnnouncement.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
                  {featuredAnnouncement.content}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 font-mono text-xs font-bold uppercase">
                    {featuredAnnouncement.authorName ? featuredAnnouncement.authorName.charAt(0) : 'A'}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">{featuredAnnouncement.authorName || 'Academy Admin'}</span>
                    <span className="text-[10px] text-slate-500 block font-mono">Author Liaison</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedAnnouncement(featuredAnnouncement)}
                  className="text-emerald-400 text-xs font-black font-mono uppercase tracking-wider flex items-center gap-1 hover:text-emerald-300 transition-all group cursor-pointer"
                >
                  <span>Read Full notice</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 4. Search and Multi-Filtering Control Console */}
      <div className="bg-slate-900/20 border border-slate-850 p-6 rounded-2xl space-y-4 text-left" id="search-filter-controls">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search news titles, content descriptions, or author names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all duration-150 font-mono uppercase cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500/30 text-slate-950 shadow-md'
                  : 'bg-slate-900/80 border-slate-850 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Main Grid Collection of Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="announcements-grid-display">
        {sortedAnnouncements.map((ann) => (
          <div 
            key={ann.id}
            onClick={() => setSelectedAnnouncement(ann)}
            className="bg-slate-900/30 border border-slate-850 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 group flex flex-col justify-between cursor-pointer relative"
          >
            
            {/* Image banner area */}
            <div className="h-44 bg-slate-950 relative overflow-hidden flex items-center justify-center">
              {ann.featuredImage ? (
                <img 
                  src={ann.featuredImage} 
                  alt={ann.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-slate-500 p-4 text-center">
                  <div className="w-10 h-10 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center text-emerald-400 mb-2">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">OFFICIAL NOTICE</span>
                </div>
              )}

              {/* Status Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                {ann.isPinned && (
                  <span className="bg-amber-500 text-slate-950 text-[8px] font-black px-2 py-0.5 rounded font-mono uppercase tracking-wider flex items-center gap-0.5 shadow">
                    <Pin className="w-2.5 h-2.5 fill-current" /> Pinned
                  </span>
                )}
                {ann.isUrgent && (
                  <span className="bg-rose-600 text-white text-[8px] font-black px-2 py-0.5 rounded font-mono uppercase tracking-wider flex items-center gap-0.5 shadow animate-pulse">
                    <AlertCircle className="w-2.5 h-2.5" /> Urgent
                  </span>
                )}
              </div>

              {/* Category Pill */}
              <span className="absolute bottom-3 right-3 bg-slate-950/80 border border-slate-800/80 text-emerald-400 text-[8px] font-extrabold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                {ann.category}
              </span>
            </div>

            {/* Typography Description area */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                  <Calendar className="w-3 h-3" />
                  <span>{ann.date}</span>
                </div>
                <h4 className="text-base font-bold text-slate-200 font-display leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {ann.title}
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                  {ann.content}
                </p>
              </div>

              {/* Interactive attachments preview badges inside grid card */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-900/50">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 font-mono text-[10px] font-extrabold">
                    {ann.authorName ? ann.authorName.charAt(0) : 'A'}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 line-clamp-1">{ann.authorName || 'Academy Admin'}</span>
                </div>

                {/* Attachments icons to notify user of contents */}
                <div className="ml-auto flex items-center gap-1.5 text-slate-500">
                  {ann.documents && ann.documents.length > 0 && (
                    <FileText className="w-3.5 h-3.5 text-emerald-500" title={`${ann.documents.length} PDF attachments`} />
                  )}
                  {ann.externalLinks && ann.externalLinks.length > 0 && (
                    <ExternalLink className="w-3.5 h-3.5 text-teal-400" title={`${ann.externalLinks.length} external links`} />
                  )}
                  {ann.videoLinks && ann.videoLinks.length > 0 && (
                    <Video className="w-3.5 h-3.5 text-amber-500" title={`${ann.videoLinks.length} video attachments`} />
                  )}
                  {ann.additionalImages && ann.additionalImages.length > 0 && (
                    <ImageIcon className="w-3.5 h-3.5 text-sky-400" title={`${ann.additionalImages.length} additional images`} />
                  )}
                </div>
              </div>

            </div>

          </div>
        ))}

        {sortedAnnouncements.length === 0 && (
          <div className="col-span-full py-16 bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center p-8">
            <Volume2 className="w-12 h-12 text-slate-700 mb-3" />
            <span className="text-sm font-bold text-slate-400 block font-mono uppercase">No Bulletin Dispatches Found</span>
            <p className="text-xs text-slate-500 max-w-sm mt-1">There are no announcements matching your search query or selected criteria.</p>
          </div>
        )}
      </div>

      {/* 6. Dynamic Detail Viewer Modal (Pristine, rich content options) */}
      <AnimatePresence>
        {selectedAnnouncement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto" id="announcement-modal">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-left flex flex-col max-h-[90vh]"
            >
              
              {/* Modal Top Header with close button */}
              <div className="sticky top-0 bg-slate-900 border-b border-slate-850 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/20 text-xs font-black px-2.5 py-1 rounded font-mono uppercase tracking-wider">
                    {selectedAnnouncement.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">Notice ID: {selectedAnnouncement.id}</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedAnnouncement(null);
                    setActivePhotoIdx(0);
                  }}
                  className="p-1.5 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable container) */}
              <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                
                {/* Simulated download notification banner inside modal */}
                <AnimatePresence>
                  {simulatedDownloadMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3.5 bg-emerald-950/40 border border-emerald-500/25 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2 font-mono"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span>{simulatedDownloadMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Announcement Titles and Author details */}
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-display leading-tight">
                    {selectedAnnouncement.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-emerald-400" />
                      <span>Published by: <span className="font-bold text-slate-200">{selectedAnnouncement.authorName || 'Academy Admin'}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span>Date: {selectedAnnouncement.date}</span>
                    </div>
                  </div>
                </div>

                {/* Image Showcase (featured and multiple secondary screenshots with carousel controls) */}
                {(selectedAnnouncement.featuredImage || (selectedAnnouncement.additionalImages && selectedAnnouncement.additionalImages.length > 0)) && (
                  <div className="space-y-3">
                    <div className="h-64 sm:h-96 w-full bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800 flex items-center justify-center">
                      {/* Active photo */}
                      {(() => {
                        const allPhotos = [
                          ...(selectedAnnouncement.featuredImage ? [selectedAnnouncement.featuredImage] : []),
                          ...(selectedAnnouncement.additionalImages || [])
                        ];
                        const activePhoto = allPhotos[activePhotoIdx] || allPhotos[0];
                        return activePhoto ? (
                          <img 
                            src={activePhoto} 
                            alt={`Preview ${activePhotoIdx + 1}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : null;
                      })()}
                    </div>

                    {/* Photo Thumbnails Selector */}
                    {(() => {
                      const allPhotos = [
                        ...(selectedAnnouncement.featuredImage ? [selectedAnnouncement.featuredImage] : []),
                        ...(selectedAnnouncement.additionalImages || [])
                      ];
                      if (allPhotos.length > 1) {
                        return (
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {allPhotos.map((photo, pIdx) => (
                              <button
                                key={pIdx}
                                onClick={() => setActivePhotoIdx(pIdx)}
                                className={`w-16 h-12 rounded border-2 overflow-hidden shrink-0 transition-all ${
                                  activePhotoIdx === pIdx ? 'border-emerald-500 scale-95' : 'border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                <img src={photo} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </button>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}

                {/* Primary Content Notice Description */}
                <div className="p-5 bg-slate-950/40 rounded-xl border border-slate-850">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                    {selectedAnnouncement.content}
                  </p>
                </div>

                {/* Custom Attachments Section (Downloads, Videos, Links) */}
                {((selectedAnnouncement.documents && selectedAnnouncement.documents.length > 0) ||
                  (selectedAnnouncement.externalLinks && selectedAnnouncement.externalLinks.length > 0) ||
                  (selectedAnnouncement.videoLinks && selectedAnnouncement.videoLinks.length > 0)) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-850">
                    
                    {/* PDF/DOC Documents column */}
                    {selectedAnnouncement.documents && selectedAnnouncement.documents.length > 0 && (
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" /> Documents & Forms
                        </span>
                        <div className="space-y-1.5">
                          {selectedAnnouncement.documents.map((doc, dIdx) => (
                            <div 
                              key={dIdx} 
                              onClick={() => handleDownload(doc.name)}
                              className="p-3 bg-slate-950 border border-slate-850 rounded-lg flex items-center justify-between text-xs hover:border-emerald-500/30 cursor-pointer transition-all hover:bg-slate-950/80 group"
                            >
                              <span className="font-mono text-slate-300 font-bold group-hover:text-emerald-400 line-clamp-1">{doc.name}</span>
                              <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded font-mono group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors uppercase">
                                Get file
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* External & Video Links column */}
                    {((selectedAnnouncement.externalLinks && selectedAnnouncement.externalLinks.length > 0) ||
                      (selectedAnnouncement.videoLinks && selectedAnnouncement.videoLinks.length > 0)) && (
                      <div className="space-y-4 text-left">
                        
                        {/* External Links */}
                        {selectedAnnouncement.externalLinks && selectedAnnouncement.externalLinks.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest font-mono flex items-center gap-1">
                              <ExternalLink className="w-3.5 h-3.5" /> Action Links
                            </span>
                            <div className="space-y-1.5">
                              {selectedAnnouncement.externalLinks.map((link, lIdx) => (
                                <a 
                                  key={lIdx} 
                                  href={link.url}
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-3 bg-slate-950 border border-slate-850 rounded-lg flex items-center justify-between text-xs hover:border-teal-500/30 transition-all hover:bg-slate-950/80 group"
                                >
                                  <span className="font-mono text-slate-300 font-bold group-hover:text-teal-400 line-clamp-1">{link.name}</span>
                                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition-colors" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Video Links */}
                        {selectedAnnouncement.videoLinks && selectedAnnouncement.videoLinks.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest font-mono flex items-center gap-1">
                              <Video className="w-3.5 h-3.5" /> Video Broadcasts
                            </span>
                            <div className="space-y-1.5">
                              {selectedAnnouncement.videoLinks.map((vid, vIdx) => (
                                <a 
                                  key={vIdx} 
                                  href={vid.url}
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-3 bg-slate-950 border border-slate-850 rounded-lg flex items-center justify-between text-xs hover:border-amber-500/30 transition-all hover:bg-slate-950/80 group"
                                >
                                  <span className="font-mono text-slate-300 font-bold group-hover:text-amber-400 line-clamp-1">{vid.name}</span>
                                  <Video className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500 transition-colors" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                )}

              </div>

              {/* Modal Footer Controls */}
              <div className="sticky bottom-0 bg-slate-950/90 border-t border-slate-850 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Notice</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedAnnouncement(null);
                    setActivePhotoIdx(0);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-mono uppercase tracking-wider font-extrabold text-xs px-5 py-2 rounded-lg cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Close bulletin
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
