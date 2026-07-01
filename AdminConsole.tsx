import React, { useState, useEffect } from 'react';
import { Page, Administrator, TransferHistory } from '../types';
import { 
  Lock, 
  Unlock, 
  Settings, 
  FileText, 
  Users, 
  Plus, 
  Edit2, 
  Trash2, 
  UserCheck, 
  History, 
  Check, 
  AlertCircle, 
  LogOut, 
  Sparkles,
  Info,
  Calendar,
  Globe,
  Home,
  Shield,
  HelpCircle,
  Award
} from 'lucide-react';

interface AdminConsoleProps {
  // Callback functions to sync data back to App.tsx
  state: any;
  updateState: (key: string, data: any) => void;
  setActivePage: (page: Page) => void;
}

export default function AdminConsole({ state, updateState, setActivePage }: AdminConsoleProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<Administrator | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'settings' | 'homepage' | 'collections' | 'ownership'>('settings');
  
  // Collections Sub-tab State
  const [selectedCollection, setSelectedCollection] = useState<string>('announcements');

  // Generic Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // null means adding
  const [modalFormData, setModalFormData] = useState<any>({});

  // Ownership Transfer State
  const [selectedNewSuperAdminId, setSelectedNewSuperAdminId] = useState('');
  const [showTransferConfirm, setShowTransferConfirm] = useState(false);
  const [transferMessage, setTransferMessage] = useState('');

  // Auto-fill credentials helper
  const handleDemoLogin = () => {
    setLoginEmail('jubairjbrjbr@gmail.com');
    setLoginPassword('admin123');
    setLoginError('');
  };

  // Login action
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = state.admins.find(
      (a: any) => a.email.toLowerCase() === loginEmail.toLowerCase() && a.password === loginPassword
    );
    if (found) {
      setIsLoggedIn(true);
      setCurrentUser(found);
      localStorage.setItem('aaamsc_current_admin', JSON.stringify(found));
      setLoginError('');
    } else {
      setLoginError('Invalid email coordinates or password.');
    }
  };

  // Restore session
  useEffect(() => {
    const cached = localStorage.getItem('aaamsc_current_admin');
    if (cached) {
      const parsed = JSON.parse(cached);
      // Re-verify against live admins list
      const verified = state.admins.find((a: any) => a.email === parsed.email);
      if (verified) {
        setIsLoggedIn(true);
        setCurrentUser(verified);
      }
    }
  }, [state.admins]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('aaamsc_current_admin');
    setActivePage(Page.Home);
  };

  // Generic text settings change handler
  const handleSettingChange = (section: string, key: string, value: any) => {
    const updated = { ...state[section], [key]: value };
    updateState(section, updated);
  };

  // Array elements manager (Announcements, Events, etc.)
  const handleSaveCollectionItem = (e: React.FormEvent) => {
    e.preventDefault();
    const currentList = [...(state[selectedCollection] || [])];
    
    if (editingIndex !== null) {
      // Edit mode
      currentList[editingIndex] = { ...currentList[editingIndex], ...modalFormData };
    } else {
      // Add mode
      const newId = `${selectedCollection.substring(0, 3)}-${Date.now()}`;
      currentList.push({ id: newId, ...modalFormData });
    }

    updateState(selectedCollection, currentList);
    setIsModalOpen(false);
    setEditingIndex(null);
    setModalFormData({});
  };

  const handleDeleteCollectionItem = (index: number) => {
    if (confirm('Are you absolutely sure you want to delete this content item?')) {
      const currentList = [...(state[selectedCollection] || [])];
      currentList.splice(index, 1);
      updateState(selectedCollection, currentList);
    }
  };

  const handleOpenAddModal = () => {
    setEditingIndex(null);
    // Initialize blank structure based on selected collection
    const defaultFields: any = {};
    if (selectedCollection === 'announcements') {
      defaultFields.title = '';
      defaultFields.date = new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
      defaultFields.content = '';
      defaultFields.category = 'General';
      defaultFields.authorName = currentUser?.name || 'Academy Admin';
      defaultFields.featuredImage = '';
      defaultFields.additionalImages = '';
      defaultFields.documents = '';
      defaultFields.externalLinks = '';
      defaultFields.videoLinks = '';
      defaultFields.isFlash = false;
      defaultFields.isPinned = false;
      defaultFields.isUrgent = false;
      defaultFields.isArchived = false;
      defaultFields.scheduleDate = '';
    } else if (selectedCollection === 'events') {
      defaultFields.title = '';
      defaultFields.category = 'Workshop';
      defaultFields.description = '';
      defaultFields.date = '';
      defaultFields.time = '';
      defaultFields.venue = '';
      defaultFields.status = 'Upcoming';
      defaultFields.imagePlaceholder = 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600';
    } else if (selectedCollection === 'projects') {
      defaultFields.title = '';
      defaultFields.category = 'Applied Science';
      defaultFields.description = '';
      defaultFields.innovators = '';
      defaultFields.mentor = '';
      defaultFields.year = '2026';
      defaultFields.status = 'Prototype';
      defaultFields.imagePlaceholder = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600';
    } else if (selectedCollection === 'publications') {
      defaultFields.title = '';
      defaultFields.authors = '';
      defaultFields.category = 'Research Paper';
      defaultFields.publishDate = '';
      defaultFields.abstract = '';
      defaultFields.tags = '';
    } else if (selectedCollection === 'constitution') {
      defaultFields.number = 'Article VI';
      defaultFields.title = '';
      defaultFields.clauses = '';
    } else if (selectedCollection === 'ec') {
      defaultFields.name = '';
      defaultFields.role = '';
      defaultFields.department = 'Administration';
      defaultFields.bio = '';
      defaultFields.photoUrl = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400';
      defaultFields.email = '';
    } else if (selectedCollection === 'advisors') {
      defaultFields.name = '';
      defaultFields.designation = '';
      defaultFields.institution = '';
      defaultFields.photoUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400';
      defaultFields.specialty = '';
    } else if (selectedCollection === 'founders') {
      defaultFields.name = '';
      defaultFields.designation = '';
      defaultFields.photoUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
      defaultFields.message = '';
      defaultFields.tenure = '2018 - 2019';
      defaultFields.contribution = '';
    } else if (selectedCollection === 'achievements') {
      defaultFields.title = '';
      defaultFields.event = '';
      defaultFields.year = '2026';
      defaultFields.recipient = '';
      defaultFields.rank = '';
      defaultFields.description = '';
    } else if (selectedCollection === 'photos') {
      defaultFields.title = '';
      defaultFields.url = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600';
      defaultFields.category = 'Exhibition';
    } else if (selectedCollection === 'docs') {
      defaultFields.title = '';
      defaultFields.size = '1.5 MB';
      defaultFields.code = 'DOC-ARCH-26';
    } else if (selectedCollection === 'admins') {
      defaultFields.name = '';
      defaultFields.email = '';
      defaultFields.password = '';
      defaultFields.role = 'Admin';
    }

    setModalFormData(defaultFields);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (index: number, item: any) => {
    setEditingIndex(index);
    
    // Format complex arrays back to strings for simplified input boxes
    const formatted = { ...item };
    if (selectedCollection === 'announcements') {
      if (Array.isArray(item.additionalImages)) formatted.additionalImages = item.additionalImages.join(', ');
      if (Array.isArray(item.documents)) formatted.documents = item.documents.map((d: any) => `${d.name}: ${d.url}`).join('\n');
      if (Array.isArray(item.externalLinks)) formatted.externalLinks = item.externalLinks.map((l: any) => `${l.name}: ${l.url}`).join('\n');
      if (Array.isArray(item.videoLinks)) formatted.videoLinks = item.videoLinks.map((v: any) => `${v.name}: ${v.url}`).join('\n');
    } else {
      if (Array.isArray(item.authors)) formatted.authors = item.authors.join(', ');
      if (Array.isArray(item.innovators)) formatted.innovators = item.innovators.join(', ');
      if (Array.isArray(item.tags)) formatted.tags = item.tags.join(', ');
      if (Array.isArray(item.clauses)) formatted.clauses = item.clauses.join('\n');
    }

    setModalFormData(formatted);
    setIsModalOpen(true);
  };

  // Convert inputs back to arrays before final save
  const cleanAndSaveData = (e: React.FormEvent) => {
    const cleaned = { ...modalFormData };
    
    if (selectedCollection === 'announcements') {
      if (typeof cleaned.additionalImages === 'string') {
        cleaned.additionalImages = cleaned.additionalImages.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      if (typeof cleaned.documents === 'string') {
        cleaned.documents = cleaned.documents.split('\n')
          .map((line: string) => {
            const idx = line.indexOf(':');
            if (idx === -1) return line.trim() ? { name: line.trim(), url: '#' } : null;
            const name = line.substring(0, idx).trim();
            const url = line.substring(idx + 1).trim();
            return name ? { name, url: url || '#' } : null;
          })
          .filter(Boolean);
      }
      if (typeof cleaned.externalLinks === 'string') {
        cleaned.externalLinks = cleaned.externalLinks.split('\n')
          .map((line: string) => {
            const idx = line.indexOf(':');
            if (idx === -1) return line.trim() ? { name: line.trim(), url: '#' } : null;
            const name = line.substring(0, idx).trim();
            const url = line.substring(idx + 1).trim();
            return name ? { name, url: url || '#' } : null;
          })
          .filter(Boolean);
      }
      if (typeof cleaned.videoLinks === 'string') {
        cleaned.videoLinks = cleaned.videoLinks.split('\n')
          .map((line: string) => {
            const idx = line.indexOf(':');
            if (idx === -1) return line.trim() ? { name: line.trim(), url: '#' } : null;
            const name = line.substring(0, idx).trim();
            const url = line.substring(idx + 1).trim();
            return name ? { name, url: url || '#' } : null;
          })
          .filter(Boolean);
      }
    } else {
      if (typeof cleaned.authors === 'string') {
        cleaned.authors = cleaned.authors.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      if (typeof cleaned.innovators === 'string') {
        cleaned.innovators = cleaned.innovators.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      if (typeof cleaned.tags === 'string') {
        cleaned.tags = cleaned.tags.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      if (typeof cleaned.clauses === 'string') {
        cleaned.clauses = cleaned.clauses.split('\n').map((s: string) => s.trim()).filter(Boolean);
      }
    }

    const currentList = [...(state[selectedCollection] || [])];
    if (editingIndex !== null) {
      currentList[editingIndex] = { ...currentList[editingIndex], ...cleaned };
    } else {
      const newId = `${selectedCollection.substring(0, 3)}-${Date.now()}`;
      currentList.push({ id: newId, ...cleaned });
    }

    updateState(selectedCollection, currentList);
    setIsModalOpen(false);
    setEditingIndex(null);
    setModalFormData({});
  };

  // Ownership Transfer Handler
  const handleTransferOwnership = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || currentUser.role !== 'Super Admin') {
      alert('Only the reigning Super Admin is authorized to transfer complete ownership.');
      return;
    }

    const targetAdmin = state.admins.find((a: any) => a.id === selectedNewSuperAdminId);
    if (!targetAdmin) {
      alert('Please select a valid administrator candidate from the list.');
      return;
    }

    const updatedAdmins = state.admins.map((a: any) => {
      if (a.id === currentUser.id) {
        return { ...a, role: 'Admin' }; // Demote previous Super Admin to normal Admin
      }
      if (a.id === targetAdmin.id) {
        return { ...a, role: 'Super Admin' }; // Promote new candidate
      }
      return a;
    });

    const newTransferLog: TransferHistory = {
      id: `trx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      fromName: currentUser.name,
      fromEmail: currentUser.email,
      toName: targetAdmin.name,
      toEmail: targetAdmin.email
    };

    const updatedHistory = [newTransferLog, ...(state.transferHistory || [])];

    // Bulk update states
    updateState('admins', updatedAdmins);
    updateState('transferHistory', updatedHistory);

    // Update local login session
    const newlyPromoted = { ...targetAdmin, role: 'Super Admin' };
    const newlyDemoted = { ...currentUser, role: 'Admin' };
    
    setCurrentUser(newlyDemoted);
    localStorage.setItem('aaamsc_current_admin', JSON.stringify(newlyDemoted));

    setTransferMessage(`Success! Complete website ownership has been transferred to ${targetAdmin.name}. Your role is now updated to general Admin.`);
    setShowTransferConfirm(false);
    setSelectedNewSuperAdminId('');
    
    setTimeout(() => {
      setTransferMessage('');
    }, 6000);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-left animate-fade-in" id="admin-login-screen">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl"></div>
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-100 font-display">AAAM&S Secure Admin Panel</h1>
            <p className="text-xs text-slate-500">Only authorized administrators can configure and modify website layouts.</p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-950/40 border border-rose-500/20 text-rose-400 text-xs rounded-lg flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold uppercase tracking-wider">Email Coordinates</label>
              <input
                type="email"
                required
                placeholder="e.g., administrator@aaamsc.org"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold uppercase tracking-wider">Password Key</label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black py-3 rounded-lg text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01] transition-all"
            >
              <Unlock className="w-4 h-4" />
              <span>Sign In to Admin Panel</span>
            </button>
          </form>

          {/* Quick Sandbox Login Assist */}
          <div className="pt-4 border-t border-slate-850 text-center space-y-3">
            <div className="text-[10px] text-slate-500 leading-normal">
              <strong className="text-slate-400 block mb-1">PROMPT SPECIFIED SUPER-ADMIN KEY:</strong>
              Email: <span className="text-emerald-400 font-bold font-mono">jubairjbrjbr@gmail.com</span><br />
              Password: <span className="text-emerald-400 font-bold font-mono">admin123</span>
            </div>
            <button
              onClick={handleDemoLogin}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-emerald-400 border border-slate-850 hover:border-emerald-500/20 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all"
            >
              Auto-fill Demo Credentials
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left animate-fade-in" id="admin-active-console">
      
      {/* Header section with credentials info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono tracking-widest">
              Live Console
            </span>
            <span className="text-xs text-slate-500 font-mono">ESTD. 2018 Academic Admin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display">AAAM&S Content Hub & Administration</h1>
          <p className="text-sm text-slate-400 font-sans max-w-2xl">
            Edit, insert, remove, or restructure copy and items on the homepage, constitution, journals, list councils, advisory boards, and achievements instantly.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-between gap-6 min-w-[240px]">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Active Sign In</p>
            <p className="font-bold text-slate-200 text-xs font-display">{currentUser?.name}</p>
            <span className="bg-emerald-950 text-emerald-400 text-[9px] font-mono px-1.5 py-0.5 rounded border border-emerald-500/10 uppercase tracking-widest block w-max">
              {currentUser?.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 bg-slate-900 hover:bg-rose-950 hover:text-rose-400 border border-slate-850 text-slate-400 rounded-lg hover:scale-105 transition-all"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {transferMessage && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-sm font-bold rounded-xl flex items-center gap-2 font-mono animate-fade-in shadow-md">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{transferMessage}</span>
        </div>
      )}

      {/* Main Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar Panel */}
        <div className="lg:col-span-3 space-y-2">
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider pl-3 font-mono">Console Sections</h3>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer font-mono uppercase tracking-wide border ${
              activeTab === 'settings'
                ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400 shadow'
                : 'bg-slate-900/40 border-slate-850/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Website Settings & Footer</span>
          </button>

          <button
            onClick={() => setActiveTab('homepage')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer font-mono uppercase tracking-wide border ${
              activeTab === 'homepage'
                ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400 shadow'
                : 'bg-slate-900/40 border-slate-850/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Homepage Hero & About text</span>
          </button>

          <button
            onClick={() => setActiveTab('collections')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer font-mono uppercase tracking-wide border ${
              activeTab === 'collections'
                ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400 shadow'
                : 'bg-slate-900/40 border-slate-850/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Manage Collections List</span>
          </button>

          <button
            onClick={() => setActiveTab('ownership')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer font-mono uppercase tracking-wide border ${
              activeTab === 'ownership'
                ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400 shadow'
                : 'bg-slate-900/40 border-slate-850/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            <span>Ownership & Admins</span>
          </button>

          <div className="pt-6 border-t border-slate-850/60">
            <button
              onClick={() => setActivePage(Page.Home)}
              className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-300 hover:text-emerald-400 font-bold py-2.5 rounded-xl text-xs text-center transition-all cursor-pointer font-mono uppercase"
            >
              Exit to Live Public Site
            </button>
          </div>
        </div>

        {/* Content Configuration Panel */}
        <div className="lg:col-span-9 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          
          {/* Tab 1: General Settings & Footer Config */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in" id="settings-config-panel">
              <h2 className="text-lg font-bold text-slate-100 border-l-4 border-emerald-500 pl-3 font-display">Website Brand & Footer Configurations</h2>
              <p className="text-xs text-slate-500 font-mono">Modifying these fields changes the metadata, logo symbols, brand title and legal footer notes immediately.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 font-sans">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Institutional Website Title</label>
                  <input
                    type="text"
                    value={state.settings.siteName}
                    onChange={(e) => handleSettingChange('settings', 'siteName', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Logo Primary Icon (Sigma symbol etc.)</label>
                  <input
                    type="text"
                    value={state.settings.siteLogoText}
                    onChange={(e) => handleSettingChange('settings', 'siteLogoText', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 text-slate-100 font-mono text-center"
                  />
                </div>
                
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400">Footer Short Mission Pitch</label>
                  <textarea
                    rows={2}
                    value={state.settings.footerDescription}
                    onChange={(e) => handleSettingChange('settings', 'footerDescription', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-100 resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Footer Contact Office Email</label>
                  <input
                    type="email"
                    value={state.contact.email}
                    onChange={(e) => handleSettingChange('contact', 'email', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 text-slate-100 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Footer Office Telephone</label>
                  <input
                    type="text"
                    value={state.contact.phone}
                    onChange={(e) => handleSettingChange('contact', 'phone', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 text-slate-100 font-mono"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400">Campus Postal Address Layout</label>
                  <textarea
                    rows={2}
                    value={state.contact.location}
                    onChange={(e) => handleSettingChange('contact', 'location', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-100 resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Copyright Note</label>
                  <input
                    type="text"
                    value={state.settings.footerCopyright}
                    onChange={(e) => handleSettingChange('settings', 'footerCopyright', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">In-Person Campus Office Hours</label>
                  <input
                    type="text"
                    value={state.contact.officeHours}
                    onChange={(e) => handleSettingChange('contact', 'officeHours', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 text-slate-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Homepage Hero & Motto Text Config */}
          {activeTab === 'homepage' && (
            <div className="space-y-6 animate-fade-in" id="homepage-config-panel">
              <h2 className="text-lg font-bold text-slate-100 border-l-4 border-emerald-500 pl-3 font-display">Homepage Hero Layout & Copywriting</h2>
              <p className="text-xs text-slate-500 font-mono">Restructure headings, slogans, about statements, countdown milestones, and academic partner banners easily.</p>

              <div className="space-y-4 pt-2 font-sans text-xs">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Primary Hero Title Block</label>
                  <input
                    type="text"
                    value={state.settings.heroTitle}
                    onChange={(e) => handleSettingChange('settings', 'heroTitle', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-100 font-display font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Hero Subtitle Paragraph Description</label>
                  <textarea
                    rows={3}
                    value={state.settings.heroSubtitle}
                    onChange={(e) => handleSettingChange('settings', 'heroSubtitle', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 leading-relaxed focus:outline-none focus:border-emerald-500 text-slate-100 resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Academic Motto (Centered block quotation)</label>
                  <input
                    type="text"
                    value={state.settings.siteMotto}
                    onChange={(e) => handleSettingChange('settings', 'siteMotto', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 italic text-slate-200 font-bold focus:outline-none focus:border-emerald-500 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400">Countdown Banner Target Event Title</label>
                    <input
                      type="text"
                      value={state.settings.countdownTitle}
                      onChange={(e) => handleSettingChange('settings', 'countdownTitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 text-slate-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400">Countdown Target Date ISO representation</label>
                    <input
                      type="text"
                      placeholder="e.g., 2026-08-14T08:00:00"
                      value={state.settings.countdownTarget}
                      onChange={(e) => handleSettingChange('settings', 'countdownTarget', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 text-slate-100 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-850 space-y-3">
                  <h3 className="text-slate-300 font-bold font-display">About Page: Mission & Vision Content</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400">Our Core Mission statement</label>
                      <textarea
                        rows={5}
                        value={state.about.mission}
                        onChange={(e) => handleSettingChange('about', 'mission', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 leading-relaxed focus:outline-none focus:border-emerald-500 text-slate-100 resize-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400">Our Core Vision statement</label>
                      <textarea
                        rows={5}
                        value={state.about.vision}
                        onChange={(e) => handleSettingChange('about', 'vision', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 leading-relaxed focus:outline-none focus:border-emerald-500 text-slate-100 resize-none text-[11px]"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 3: Generic Collections Editor */}
          {activeTab === 'collections' && (
            <div className="space-y-6 animate-fade-in" id="collections-config-panel">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-slate-100 border-l-4 border-emerald-500 pl-3 font-display">Core Dynamic Lists & Datasets</h2>
                  <p className="text-xs text-slate-500 font-mono">Select a listing collection below to insert, edit, or delete items securely without editing source code.</p>
                </div>
                <button
                  onClick={handleOpenAddModal}
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer w-max self-end"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert Row</span>
                </button>
              </div>

              {/* Collections Selector Dropdown */}
              <div className="flex bg-slate-950 border border-slate-850 p-2 rounded-xl text-xs font-bold items-center gap-2 font-mono">
                <span className="text-slate-500 uppercase tracking-wider pl-2 text-[10px]">Dataset Table:</span>
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none text-emerald-400 text-xs font-bold cursor-pointer"
                >
                  <option value="announcements">Announcements Board</option>
                  <option value="events">Activities & Events Calendar</option>
                  <option value="projects">Innovative Prototypes</option>
                  <option value="publications">Academic Publications</option>
                  <option value="constitution">Constitution Articles</option>
                  <option value="ec">Executive Committee</option>
                  <option value="advisors">Advisory Board</option>
                  <option value="founders">Founders Message Council</option>
                  <option value="achievements">Awards & Accolades</option>
                  <option value="photos">Legacy Memories Photo Grid</option>
                  <option value="docs">Archival Booklets & Docs</option>
                </select>
              </div>

              {/* Data Table */}
              <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden shadow-inner font-mono text-[11px]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Record Details</th>
                        <th className="px-4 py-3">Category/Sub-tag</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-slate-300">
                      {state[selectedCollection] && state[selectedCollection].length > 0 ? (
                        state[selectedCollection].map((item: any, idx: number) => (
                          <tr key={item.id || idx} className="hover:bg-slate-900/40 transition-colors">
                            <td className="px-4 py-3 text-slate-600 font-black">{idx + 1}</td>
                            <td className="px-4 py-3 font-semibold text-slate-200">
                              <div className="space-y-0.5">
                                <p className="text-xs font-semibold font-sans">{item.title || item.name}</p>
                                <p className="text-[10px] text-slate-500 font-mono">
                                  {item.number || item.role || item.designation || item.authors?.join(', ') || item.date || item.recipient}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="bg-slate-900 border border-slate-800 text-[10px] px-2 py-0.5 rounded text-slate-400 uppercase">
                                {item.category || item.status || item.tenure || item.event || item.size || 'Record'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right space-x-2 shrink-0">
                              <button
                                onClick={() => handleOpenEditModal(idx, item)}
                                className="p-1.5 bg-slate-900 hover:bg-emerald-950 hover:text-emerald-400 border border-slate-800 rounded hover:scale-105 transition-all cursor-pointer inline-flex"
                                title="Edit Row"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteCollectionItem(idx)}
                                className="p-1.5 bg-slate-900 hover:bg-rose-950 hover:text-rose-400 border border-slate-800 rounded hover:scale-105 transition-all cursor-pointer inline-flex"
                                title="Delete Row"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-4 py-12 text-center text-slate-500 font-bold uppercase tracking-widest bg-slate-950/20">
                            No dataset records present in this collection. Click "Insert Row" to add one.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Tab 4: Security, Admins & Super Admin Ownership Transfer */}
          {activeTab === 'ownership' && (
            <div className="space-y-8 animate-fade-in" id="ownership-config-panel">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-slate-100 border-l-4 border-emerald-500 pl-3 font-display">System Administration & Ownership Security</h2>
                <p className="text-xs text-slate-500 font-mono">Add secondary administrators, trace the transfer audits, or yield Super Admin control completely.</p>
              </div>

              {/* Super Admin Veto Transfer Box */}
              <div className="bg-gradient-to-r from-emerald-950/10 to-teal-950/10 border border-emerald-500/10 p-6 rounded-2xl space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-emerald-400 font-bold text-sm font-mono uppercase tracking-wider">Super Admin Ownership Transfer Portal</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Transferring absolute portal ownership is an irreversible system action. The nominated individual will obtain Super-Admin master privileges, and your profile will simultaneously step down to general Admin status.
                    </p>
                  </div>
                </div>

                {currentUser?.role !== 'Super Admin' ? (
                  <div className="p-3 bg-amber-950/20 border border-amber-500/20 text-amber-400 text-xs rounded-xl flex items-center gap-2 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Locked: Only the supreme reigning Super Admin holds structural veto to transfer complete ownership.</span>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setShowTransferConfirm(true); }} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">Select Nominated Successor</label>
                        <select
                          required
                          value={selectedNewSuperAdminId}
                          onChange={(e) => setSelectedNewSuperAdminId(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-slate-300 text-xs font-bold cursor-pointer focus:outline-none focus:border-emerald-500"
                        >
                          <option value="">-- Choose Eligible Successor --</option>
                          {state.admins
                            .filter((a: any) => a.id !== currentUser.id)
                            .map((a: any) => (
                              <option key={a.id} value={a.id}>
                                {a.name} ({a.email}) - {a.role}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="flex items-end">
                        <button
                          type="submit"
                          disabled={!selectedNewSuperAdminId}
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-slate-950 font-black py-3 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all hover:scale-[1.01]"
                        >
                          <UserCheck className="w-4 h-4" />
                          <span>Initiate Transfer process</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Transfer confirmation dialog block */}
                {showTransferConfirm && (
                  <div className="p-5 bg-rose-950/20 border border-rose-500/20 rounded-xl space-y-4 font-mono text-xs animate-fade-in">
                    <div className="flex items-center gap-2 text-rose-400 font-bold">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span className="uppercase tracking-wider">Double Confirmation Security Check</span>
                    </div>
                    <p className="text-slate-400 font-sans leading-relaxed text-[11px]">
                      By signing this confirmation, you authorize the system to revoke your Super Admin veto token immediately. All page content will remain fully preserved, and your login will change to normal Admin.
                    </p>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleTransferOwnership}
                        className="bg-rose-600 hover:bg-rose-500 text-slate-950 font-black px-5 py-2 rounded-lg text-[10px] uppercase tracking-wider cursor-pointer"
                      >
                        Yes, Confirm Veto Revocation & Transfer
                      </button>
                      <button
                        onClick={() => { setShowTransferConfirm(false); setSelectedNewSuperAdminId(''); }}
                        className="bg-slate-950 hover:bg-slate-850 text-slate-400 border border-slate-850 px-5 py-2 rounded-lg text-[10px] uppercase tracking-wider cursor-pointer"
                      >
                        Abort Transfer
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Ownership Transfer History Logs */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
                  <History className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-slate-100 font-display">Archival Ownership Transfer Log</h3>
                </div>

                <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden font-mono text-[10px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-slate-500 font-bold uppercase text-[8px] tracking-wider">
                        <th className="px-4 py-2">Transfer Date</th>
                        <th className="px-4 py-2">Previous Super Admin</th>
                        <th className="px-4 py-2">Newly Promoted Super Admin</th>
                        <th className="px-4 py-2">Security Hash</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-slate-400">
                      {state.transferHistory && state.transferHistory.length > 0 ? (
                        state.transferHistory.map((log: any, idx: number) => (
                          <tr key={log.id || idx} className="hover:bg-slate-900/20 transition-colors">
                            <td className="px-4 py-2.5 font-bold text-emerald-500">{log.date}</td>
                            <td className="px-4 py-2.5">{log.fromName} ({log.fromEmail})</td>
                            <td className="px-4 py-2.5 text-slate-200">{log.toName} ({log.toEmail})</td>
                            <td className="px-4 py-2.5 text-slate-600 font-mono text-[9px]">SIG-AUTH-{idx + 100}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-4 py-6 text-center text-slate-600 uppercase tracking-widest">No transfer logs recorded.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Unified generic modal popup for collections list items additions & updates */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 text-left overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 font-mono">
                  {editingIndex !== null ? 'Configure Record' : 'Create Record'}
                </span>
                <h3 className="text-base font-bold text-slate-100 font-display uppercase tracking-tight">
                  {selectedCollection.toUpperCase()} DATASET ENTRY
                </h3>
              </div>
              <button
                onClick={() => { setIsModalOpen(false); setEditingIndex(null); }}
                className="text-slate-500 hover:text-slate-300 font-mono font-bold text-xs bg-slate-950 border border-slate-850 p-1.5 rounded-lg"
              >
                ESC
              </button>
            </div>

            <form onSubmit={cleanAndSaveData} className="space-y-4 font-sans text-xs">
              
              {/* Dynamic inputs loop based on collection keys */}
              <div className="space-y-4">
                {Object.keys(modalFormData).map((key) => {
                  if (key === 'id') return null;
                  
                  // Text fields helper
                  const label = key.charAt(0).toUpperCase() + key.slice(1);
                  
                  if (key === 'content' || key === 'description' || key === 'abstract' || key === 'message' || key === 'bio') {
                    return (
                      <div key={key} className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">{label}</label>
                        <textarea
                          required
                          rows={3}
                          value={modalFormData[key] || ''}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 text-slate-100 resize-none"
                        />
                      </div>
                    );
                  }

                  if (key === 'clauses') {
                    return (
                      <div key={key} className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">Clauses (Write each on a new line)</label>
                        <textarea
                          required
                          rows={4}
                          value={modalFormData[key] || ''}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 text-slate-100 font-mono resize-none"
                        />
                      </div>
                    );
                  }

                  if (key === 'isFlash') {
                    return (
                      <label key={key} className="flex items-center gap-2 cursor-pointer select-none text-slate-400 font-bold font-mono">
                        <input
                          type="checkbox"
                          checked={!!modalFormData[key]}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.checked }))}
                          className="border-slate-800 animate-pulse"
                        />
                        <span>Is Flash Alert Header Announcement?</span>
                      </label>
                    );
                  }

                  if (key === 'isPinned') {
                    return (
                      <label key={key} className="flex items-center gap-2 cursor-pointer select-none text-slate-400 font-bold font-mono">
                        <input
                          type="checkbox"
                          checked={!!modalFormData[key]}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.checked }))}
                          className="border-slate-800"
                        />
                        <span>Pin Announcement on bulletin board?</span>
                      </label>
                    );
                  }

                  if (key === 'isUrgent') {
                    return (
                      <label key={key} className="flex items-center gap-2 cursor-pointer select-none text-slate-400 font-bold font-mono">
                        <input
                          type="checkbox"
                          checked={!!modalFormData[key]}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.checked }))}
                          className="border-slate-800 text-rose-500"
                        />
                        <span>Mark Announcement as Urgent Notice?</span>
                      </label>
                    );
                  }

                  if (key === 'isArchived') {
                    return (
                      <label key={key} className="flex items-center gap-2 cursor-pointer select-none text-slate-400 font-bold font-mono">
                        <input
                          type="checkbox"
                          checked={!!modalFormData[key]}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.checked }))}
                          className="border-slate-800"
                        />
                        <span>Archive Announcement? (Hides from active feeds)</span>
                      </label>
                    );
                  }

                  if (key === 'documents' || key === 'externalLinks' || key === 'videoLinks') {
                    const placeholderText = key === 'documents'
                      ? 'Rulebook: https://example.com/rules.pdf\nSyllabus: https://example.com/syllabus.pdf'
                      : key === 'externalLinks'
                        ? 'Register Here: https://forms.gle/abc\nMore Info: https://example.com/info'
                        : 'Exhibition Highlights: https://youtube.com/watch?v=123';
                    const customLabel = key === 'documents' 
                      ? 'Document Attachments (Format: Name: URL per line)'
                      : key === 'externalLinks'
                        ? 'External Reference Links (Format: Label: URL per line)'
                        : 'YouTube / Video Broadcast Links (Format: Label: URL per line)';

                    return (
                      <div key={key} className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">{customLabel}</label>
                        <textarea
                          rows={2}
                          placeholder={placeholderText}
                          value={modalFormData[key] || ''}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 text-slate-100 font-mono resize-none"
                        />
                      </div>
                    );
                  }

                  // Dropdown selectors for enum types
                  if (key === 'category' && selectedCollection === 'announcements') {
                    return (
                      <div key={key} className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">{label}</label>
                        <select
                          value={modalFormData[key]}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 text-slate-100"
                        >
                          {['General', 'Olympiad', 'Competition', 'Urgent', 'News', 'Meeting', 'Workshop'].map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  if (key === 'category' && selectedCollection === 'events') {
                    return (
                      <div key={key} className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">{label}</label>
                        <select
                          value={modalFormData[key]}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 text-slate-100"
                        >
                          {['Science Fair', 'Olympiad', 'Workshop', 'Research Program', 'Competition', 'Seminar'].map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  if (key === 'category' && selectedCollection === 'projects') {
                    return (
                      <div key={key} className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">{label}</label>
                        <select
                          value={modalFormData[key]}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 text-slate-100"
                        >
                          {['Mathematics', 'Applied Science', 'Robotics & AI', 'Environmental Tech', 'Biomedical'].map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  if (key === 'status' && selectedCollection === 'events') {
                    return (
                      <div key={key} className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">{label}</label>
                        <select
                          value={modalFormData[key]}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 text-slate-100"
                        >
                          {['Upcoming', 'Ongoing', 'Completed'].map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  if (key === 'status' && selectedCollection === 'projects') {
                    return (
                      <div key={key} className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">{label}</label>
                        <select
                          value={modalFormData[key]}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 text-slate-100"
                        >
                          {['Prototype', 'Tested', 'Field Deployed'].map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  if (key === 'role' && selectedCollection === 'admins') {
                    return (
                      <div key={key} className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">System Role</label>
                        <select
                          value={modalFormData[key]}
                          onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 text-slate-100"
                        >
                          <option value="Admin">Admin (General)</option>
                          <option value="Super Admin">Super Admin (Veto privilege)</option>
                        </select>
                      </div>
                    );
                  }

                  // Default inputs for regular text values
                  return (
                    <div key={key} className="space-y-1">
                      <label className="text-xs font-bold text-slate-400">
                        {key === 'rollNo' ? 'Roll / ID' : key === 'authors' ? 'Authors (separated by comma)' : key === 'innovators' ? 'Innovators (separated by comma)' : key === 'tags' ? 'Tags (separated by comma)' : key === 'scheduleDate' ? 'Schedule Date/Time (e.g. 2026-10-15T14:30:00)' : label}
                      </label>
                      <input
                        type="text"
                        required={
                          key !== 'regUrl' && 
                          key !== 'awardStatus' && 
                          key !== 'linkedin' && 
                          key !== 'github' && 
                          key !== 'scheduleDate' && 
                          key !== 'featuredImage' && 
                          key !== 'additionalImages' && 
                          key !== 'authorName'
                        }
                        value={modalFormData[key] || ''}
                        onChange={(e) => setModalFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 text-slate-100"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Modal controls */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 font-mono">
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); setEditingIndex(null); }}
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-400 font-bold px-5 py-2.5 rounded-lg text-xs transition-colors uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black px-6 py-2.5 rounded-lg text-xs transition-all uppercase cursor-pointer"
                >
                  Save Record Details
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
