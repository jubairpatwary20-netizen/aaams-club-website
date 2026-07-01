import { useState, useEffect } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';

// Views
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ConstitutionView from './components/ConstitutionView';
import ActivitiesView from './components/ActivitiesView';
import PublicationsView from './components/PublicationsView';
import ProjectsView from './components/ProjectsView';
import CommitteeView from './components/CommitteeView';
import MembershipView from './components/MembershipView';
import FinanceView from './components/FinanceView';
import LegacyView from './components/LegacyView';
import AwardsView from './components/AwardsView';
import ContactView from './components/ContactView';
import AdminConsole from './components/AdminConsole';
import AnnouncementsView from './components/AnnouncementsView';

// Data defaults
import { 
  announcements as defaultAnnouncements, 
  clubEvents as defaultClubEvents, 
  projects as defaultProjects, 
  publications as defaultPublications,
  achievements as defaultAchievements, 
  constitutionArticles as defaultConstitutionArticles, 
  executiveCommittee as defaultExecutiveCommittee, 
  advisors as defaultAdvisors, 
  founders as defaultFounders, 
  financialRecords, 
  fundDistribution 
} from './data/clubData';

// Animation imports from motion/react
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or default to true (Dark Theme)
    const stored = localStorage.getItem('aaamsc-theme');
    return stored !== 'light';
  });

  // Keep dark mode class in sync on HTML root
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('aaamsc-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('aaamsc-theme', 'light');
    }
  }, [darkMode]);

  // Consolidate all editable content and configurations in global state
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('aaamsc_settings');
    if (saved) return JSON.parse(saved);
    return {
      siteName: 'Al Amin Academy Math & Science Club',
      siteLogoText: 'AAAM&S Club',
      siteMotto: '"Empowering Minds through Rigorous Logic, Inquiry, and Innovative Discovery."',
      heroTitle: 'Unlocking Logic.\nDecoding Discovery.',
      heroSubtitle: 'Welcome to the Al Amin Academy Math & Science Club (AAAM&S Club). We nurture analytical thinkers, support breakthrough student research, and compete across global olympiad arenas.',
      countdownTitle: '8th National AAAM&S Carnival',
      countdownTarget: '2026-08-14T08:00:00',
      stats: [
        { value: '450+', label: 'Active General Members' },
        { value: '45+', label: 'Innovative Prototypes' },
        { value: '120+', label: 'National Olympiad Medals' },
        { value: '8 Yrs', label: 'Legacy of Academic Excellence' }
      ],
      footerDescription: 'The official pre-university academic organization representing Al Amin Academy, nurturing mathematical rigor and scientific empirical inquiry since 2018.',
      footerCopyright: '© 2026 Al Amin Academy Math & Science Club. All academic rights reserved.',
      socialFacebook: 'https://facebook.com',
      socialLinkedin: 'https://linkedin.com',
      socialGithub: 'https://github.com',
      about: {
        subtitle: 'Al Amin Academy',
        title: 'About the AAAM&S Club',
        description: 'A premium scientific forum dedicated to logic, reasoning, and building engineering prototypes from high school foundations.',
        mission: 'To provide students with state-of-the-art platforms, mentorship circles, and empirical guidelines to transform curiosity into verified mathematical research and engineering prototypes. We prepare students to represent Chandpur and Bangladesh in international science forums.',
        vision: 'To establish AAAM&S Club as the leading high school scientific forum in South Asia, where cross-discipline peer learning (combining analytical math, chemistry, biology, and computer science) forms the bedrock of tomorrow\'s scientific breakthroughs.',
        milestones: [
          { year: '2018', title: 'The Genesis', desc: 'Founded by a group of five enthusiastic pre-engineering and medical stream students. Standardized the first constitution and recruited 40 inaugural members.' },
          { year: '2020', title: 'Inaugural National Carnival', desc: 'Hosted the 1st National Math & Science Carnival with 300+ external participants. Established collaborations with national math olympiad networks.' },
          { year: '2022', title: 'Science Horizon Launch', desc: 'Released the first peer-reviewed Student Research Journal, enabling school-level researchers to write and publish abstracts.' },
          { year: '2024', title: 'Olympiad Glory & Research Grants', desc: 'Won 4 Gold medals at the Bangladesh National Math Olympiad. CHRF and Bangladesh Academy of Sciences authorized student research grants.' },
          { year: '2026', title: 'The Digital Renaissance', desc: 'Launched the digital science portal and online training academies, expanding accessibility to rural schools across Chandpur.' }
        ],
        collaborations: [
          { name: 'Bangladesh Math Olympiad Committee', role: 'Regional Partner' },
          { name: 'CHRF Research Council', role: 'Genetics Mentor' },
          { name: 'BUET Robotics Lab', role: 'Hardware Advisory' },
          { name: 'Dhaka University Science Lab', role: 'Auditor Support' }
        ]
      },
      contact: {
        location: 'Al Amin Academy, Campus-2,\nCollege Road, Chandpur,\nBangladesh.',
        phone: '+880 1712-345678',
        email: 'info.aaamsc@alaminacademy.edu.bd',
        officeHours: 'Sunday - Thursday: 02:00 PM - 05:00 PM BDT',
        mapTitle: 'Al Amin Academy Campus-2 Layout',
        mapDesc: 'Academic laboratory zones, auditorium & club office offices.'
      }
    };
  });

  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem('aaamsc_collections');
    if (saved) return JSON.parse(saved);
    return {
      announcements: defaultAnnouncements,
      events: defaultClubEvents,
      projects: defaultProjects,
      publications: defaultPublications,
      achievements: defaultAchievements,
      constitution: defaultConstitutionArticles,
      committee: defaultExecutiveCommittee,
      advisors: defaultAdvisors,
      founders: defaultFounders,
      photos: [
        { title: 'National Math Olympiad Preparation Grid (2025)', url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600', category: 'Training' },
        { title: '7th National Science Carnival Project Displays (2024)', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600', category: 'Exhibition' },
        { title: 'Biochemistry Electrophoresis Laboratory Trial (2025)', url: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600', category: 'Research' },
        { title: 'Robotics Autonomous Obstacle Detection Showcase (2024)', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600', category: 'Robotics' },
        { title: 'Award Ceremony Wall of Champion Shields (2025)', url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600', category: 'Ceremony' },
        { title: 'Weekly Math Circle Euler Algebra Sessions (2025)', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600&q=80&w=600', category: 'Math Circle' }
      ],
      docs: [
        { title: 'AAAM&S Founding Charter Booklet (2018)', size: '4.8 MB', code: 'DOC-FOUND-18' },
        { title: '6th National Carnival Souvenir Publication (2023)', size: '8.2 MB', code: 'DOC-SOUV-23' },
        { title: 'Theoretical Physics Euler Seminar Compendium (2022)', size: '3.1 MB', code: 'DOC-COMP-22' }
      ]
    };
  });

  const [admins, setAdmins] = useState<any[]>(() => {
    const saved = localStorage.getItem('aaamsc_admins');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', name: 'Zubayer Chowdhury', email: 'superadmin@aaamsc.edu', role: 'Super Admin', status: 'Active' },
      { id: '2', name: 'Ria Ferdous', email: 'admin@aaamsc.edu', role: 'Admin', status: 'Active' }
    ];
  });

  const [transferHistory, setTransferHistory] = useState<any[]>(() => {
    const saved = localStorage.getItem('aaamsc_transfer_history');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', date: '2026-01-15T10:00:00Z', fromAdmin: 'Zubayer Chowdhury', toAdmin: 'Zubayer Chowdhury', note: 'System Initialization Super Admin Assign' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('aaamsc_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('aaamsc_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('aaamsc_admins', JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem('aaamsc_transfer_history', JSON.stringify(transferHistory));
  }, [transferHistory]);

  // Sync helper for AdminConsole state updates
  const handleUpdateState = (key: string, data: any) => {
    if (key === 'settings') {
      setSettings(data);
    } else if (key === 'collections') {
      setCollections(data);
    } else if (key === 'admins') {
      setAdmins(data);
    } else if (key === 'transferHistory') {
      setTransferHistory(data);
    }
  };

  // Find the flash announcement to pass to the Header
  const flashAnnouncement = (collections.announcements || []).find((ann: any) => ann.isFlash);

  // Helper renderer to map pages to corresponding views
  const renderView = () => {
    switch (activePage) {
      case Page.Home:
        return (
          <HomeView 
            announcements={collections.announcements} 
            events={collections.events} 
            projects={collections.projects} 
            achievements={collections.achievements} 
            settings={settings}
            setActivePage={setActivePage} 
          />
        );
      case Page.About:
        return (
          <AboutView 
            setActivePage={setActivePage} 
            aboutContent={settings.about}
          />
        );
      case Page.Constitution:
        return <ConstitutionView articles={collections.constitution} />;
      case Page.Announcements:
        return <AnnouncementsView announcements={collections.announcements} />;
      case Page.Activities:
        return <ActivitiesView events={collections.events} />;
      case Page.Publications:
        return <PublicationsView publications={collections.publications} />;
      case Page.Projects:
        return <ProjectsView projects={collections.projects} />;
      
      // Committee division mappings
      case Page.Executive:
        return (
          <CommitteeView 
            committee={collections.committee} 
            advisors={collections.advisors} 
            founders={collections.founders} 
            initialTab="ec" 
          />
        );
      case Page.Advisory:
        return (
          <CommitteeView 
            committee={collections.committee} 
            advisors={collections.advisors} 
            founders={collections.founders} 
            initialTab="advisors" 
          />
        );
      case Page.Founders:
        return (
          <CommitteeView 
            committee={collections.committee} 
            advisors={collections.advisors} 
            founders={collections.founders} 
            initialTab="founders" 
          />
        );

      case Page.Membership:
        return <MembershipView />;
      case Page.Finance:
        return <FinanceView fundingSources={financialRecords} fundDistribution={fundDistribution} />;
      case Page.Legacy:
        return <LegacyView photos={collections.photos} docs={collections.docs} />;
      case Page.Awards:
        return <AwardsView achievements={collections.achievements} />;
      case Page.Contact:
        return <ContactView contactInfo={settings.contact} />;
      
      case Page.Admin:
        return (
          <AdminConsole 
            state={{ settings, collections, admins, transferHistory }}
            updateState={handleUpdateState}
            setActivePage={setActivePage}
          />
        );

      default:
        return (
          <HomeView 
            announcements={collections.announcements} 
            events={collections.events} 
            projects={collections.projects} 
            achievements={collections.achievements} 
            settings={settings}
            setActivePage={setActivePage} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans" id="app-root">
      
      {/* Universal Sticky Header Header */}
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        flashAnnouncement={flashAnnouncement} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        settings={settings}
      />

      {/* Main Container with smooth fading page transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="w-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Institutional Academic Footer Footer */}
      <Footer setActivePage={setActivePage} settings={settings} />

    </div>
  );
}
