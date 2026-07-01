export enum Page {
  Home = 'home',
  About = 'about',
  Constitution = 'constitution',
  Activities = 'activities',
  Publications = 'publications',
  Projects = 'projects',
  Executive = 'executive',
  Advisory = 'advisory',
  Founders = 'founders',
  Membership = 'membership',
  Finance = 'finance',
  Legacy = 'legacy',
  Awards = 'awards',
  Contact = 'contact',
  Admin = 'admin',
  Announcements = 'announcements'
}

export interface Administrator {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'Super Admin' | 'Admin';
}

export interface TransferHistory {
  id: string;
  date: string;
  fromName: string;
  fromEmail: string;
  toName: string;
  toEmail: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  department?: 'Mathematics' | 'Science' | 'Administration' | 'IT & Publication' | 'Logistics';
  photoUrl: string;
  bio: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
}

export interface Founder {
  id: string;
  name: string;
  designation: string;
  photoUrl: string;
  message: string;
  tenure: string;
  contribution: string;
}

export interface AdvisoryBoardMember {
  id: string;
  name: string;
  designation: string;
  institution: string;
  photoUrl: string;
  specialty: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  category: 'Science Fair' | 'Olympiad' | 'Workshop' | 'Research Program' | 'Competition' | 'Seminar';
  description: string;
  date: string;
  time: string;
  venue: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  imagePlaceholder: string;
  regUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Mathematics' | 'Applied Science' | 'Robotics & AI' | 'Environmental Tech' | 'Biomedical';
  description: string;
  innovators: string[];
  mentor: string;
  year: string;
  awardStatus?: string;
  blueprintDetails?: string;
  status: 'Prototype' | 'Tested' | 'Field Deployed';
  imagePlaceholder: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  category: 'Article' | 'Research Paper' | 'Journal' | 'Newsletter';
  volume?: string;
  publishDate: string;
  abstract: string;
  pdfUrl?: string;
  tags: string[];
}

export interface ConstitutionArticle {
  id: string;
  number: string;
  title: string;
  clauses: string[];
}

export interface FinancialRecord {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  recipient: string;
  rank: string;
  description: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  category: 'General' | 'Olympiad' | 'Competition' | 'Urgent' | 'News' | 'Meeting' | 'Workshop';
  isFlash?: boolean;
  isPinned?: boolean;
  isUrgent?: boolean;
  isArchived?: boolean;
  scheduleDate?: string;
  authorName?: string;
  featuredImage?: string;
  additionalImages?: string[];
  documents?: { name: string; url: string }[];
  externalLinks?: { name: string; url: string }[];
  videoLinks?: { name: string; url: string }[];
}
