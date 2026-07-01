import { 
  CommitteeMember, 
  Founder, 
  AdvisoryBoardMember, 
  ClubEvent, 
  Project, 
  Publication, 
  ConstitutionArticle, 
  FinancialRecord, 
  Achievement,
  Announcement
} from '../types';

export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Registration Open for 8th National AAAM&S Carnival 2026',
    date: 'July 15, 2026',
    content: 'We are proud to host our annual Science and Math Carnival. Events include Math Olympiad, Physics & Chemistry Olympiad, Project Display, Wall Magazine, and Scrapbook submissions. Students from across the nation are welcome to register.',
    category: 'Competition',
    isFlash: true,
    isPinned: true,
    isUrgent: true,
    authorName: 'Zubayer Chowdhury',
    featuredImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600'
    ],
    documents: [
      { name: 'Official Carnival Brochure 2026.pdf', url: '#' },
      { name: 'Rulebook & Registration Guidelines.pdf', url: '#' }
    ],
    externalLinks: [
      { name: 'Register via Google Form', url: 'https://forms.google.com' }
    ],
    videoLinks: [
      { name: 'Teaser Video (YouTube)', url: 'https://youtube.com/watch?v=dQw4w9WgXcQ' }
    ]
  },
  {
    id: 'ann-2',
    title: 'Weekly Seminar: Application of Differential Equations in Epidemiology',
    date: 'July 05, 2026',
    content: 'Join us for our monthly seminar featuring Dr. Mahbub Alam, Professor of Mathematics at DU. The session will explore mathematical models for infectious diseases.',
    category: 'General',
    isFlash: false,
    isPinned: false,
    authorName: 'Ria Ferdous',
    featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
    documents: [
      { name: 'Seminar Lecture Notes (Abstract).pdf', url: '#' }
    ],
    externalLinks: [
      { name: 'Join Zoom Live Stream', url: 'https://zoom.us' }
    ]
  },
  {
    id: 'ann-3',
    title: 'Outstanding Performance in Bangladesh Physics Olympiad',
    date: 'June 28, 2026',
    content: 'Congratulations to our club members who secured 3 Gold and 2 Silver medals in the national round of Bangladesh Physics Olympiad! Their dedications and continuous efforts under club mentorship has paid off immensely.',
    category: 'Urgent',
    isFlash: false,
    isPinned: true,
    isUrgent: true,
    authorName: 'Zubayer Chowdhury',
    featuredImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ann-4',
    title: 'Release of Science Horizon Journal Vol. VII',
    date: 'June 20, 2026',
    content: 'Our flagship peer-reviewed student journal is now available in digital PDF format. Read the pioneering research by school scholars.',
    category: 'General',
    isFlash: false,
    isPinned: false,
    authorName: 'Zubayer Chowdhury',
    documents: [
      { name: 'Science Horizon Journal Vol VII.pdf', url: '#' }
    ]
  }
];

export const constitutionArticles: ConstitutionArticle[] = [
  {
    id: 'art-1',
    number: 'Article I',
    title: 'Name, Emblem, and Objectives',
    clauses: [
      'The organization shall be officially known as the "Al Amin Academy Math & Science Club", hereinafter referred to as the "AAAM&S Club".',
      'The emblem of the club shall feature a stylized DNA double helix intersecting a coordinate plane and mathematical sigma, bordered in royal blue and emerald green.',
      'The primary objective is to foster mathematical inquiry, scientific reasoning, and innovative problem-solving among the students of Al Amin Academy.',
      'The club shall organize national level science fairs, competitive workshops, olympiad training, and publications to propagate science education.'
    ]
  },
  {
    id: 'art-2',
    number: 'Article II',
    title: 'Membership & Enrollment Criteria',
    clauses: [
      'Membership is divided into three tiers: General Student Member, Associate Alumni Member, and Honorary Academic Fellow.',
      'Any student enrolled in Class VI to XII in Al Amin Academy who demonstrates key interest in mathematics and science can apply for enrollment.',
      'Every General Member must pay a nominal subscription fee and actively contribute to at least one club publication or project per academic year.',
      'A member can be suspended or expelled for continuous non-attendance or actions conflicting with the integrity and academic spirit of the Academy.'
    ]
  },
  {
    id: 'art-3',
    number: 'Article III',
    title: 'The Executive Committee Structure',
    clauses: [
      'The Executive Committee (EC) shall consist of 12 elected/selected officers representing Mathematics, Science, logistics, and digital publication divisions.',
      'The EC shall hold office for a strict term of one academic year, overseen by the Moderator and Advisory Board.',
      'Decisions inside the EC are made through a democratic majority vote. In case of an equal tie, the President holds the casting vote.',
      'The EC is mandated to submit a full transparent ledger of all finances and activities to the Moderator at the end of each semester.'
    ]
  },
  {
    id: 'art-4',
    number: 'Article IV',
    title: 'Financial Management & Audit Protocols',
    clauses: [
      'The funds of the club shall consist of school administrative grants, general member subscriptions, corporate sponsorships, and alumni endowments.',
      'All financial disbursements require joint authorization from the Treasurer and the Faculty Moderator.',
      'A comprehensive audit of the club ledger shall be executed annually by an independent academy panel.',
      'No club officer shall receive pecuniary benefits or salaries from the assets or revenues generated by club initiatives.'
    ]
  },
  {
    id: 'art-5',
    number: 'Article V',
    title: 'Founders Council & Advisory Vetos',
    clauses: [
      'The Founders Council comprises the original student founders of 2018 who maintain permanent guardianship roles.',
      'The Advisory Board and Moderator hold absolute veto power over any structural constitutional amendments.',
      'Constitutional amendments require a two-thirds majority in a combined session of the Executive Committee and Founders Council, ratified finally by the Principal.'
    ]
  }
];

export const founders: Founder[] = [
  {
    id: 'f-1',
    name: 'Engr. S. M. Rayhan Tasnim',
    designation: 'Founder President (2018) & Software Engineer',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    message: 'When we laid the foundations of the AAAM&S Club in 2018, our vision was simple: to create a sanctuary where science is not just memorized, but active, living, and fun. Today, seeing the academy scholars lead national competitions fulfills that dream. Keep pushing the boundaries of discovery!',
    tenure: '2018 - 2019',
    contribution: 'Drafted the club charter, pioneered the first Science Carnival with 120+ attendees, and set up the mathematical training camps.'
  },
  {
    id: 'f-2',
    name: 'Dr. Tasnim Ara Hossain',
    designation: 'Founding General Secretary & Medical Researcher',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    message: 'At AAAM&S, we learned that failure in an experiment is just the first step of discovery. The analytical mindset I built here has guided my research in molecular pathology. I advise current members to read extensively beyond their textbooks.',
    tenure: '2018 - 2019',
    contribution: 'Inaugurated the Science Horizon Student Journal, organized the first biomedical design seminar, and established the alumni research network.'
  },
  {
    id: 'f-3',
    name: 'Abrar Chowdhury, PhD',
    designation: 'Founding VP of Math & Theoretical Physicist',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    message: 'Math is the poetry of science. The mathematical thinking we fostered in our early study groups is now a cornerstone of the club. Stay curious, stay rigorous.',
    tenure: '2018 - 2020',
    contribution: 'Initiated the weekly Math Circle sessions, formulated the competitive math syllabus, and authored the inaugural issue of Math-Puzzles.'
  }
];

export const advisors: AdvisoryBoardMember[] = [
  {
    id: 'adv-1',
    name: 'Prof. Dr. Mohammad Kaykobad',
    designation: 'Distinguished Professor of CSE',
    institution: 'Bangladesh University of Engineering and Technology (BUET)',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    specialty: 'Algorithms, Combinatorics, Olympiad Mentor'
  },
  {
    id: 'adv-2',
    name: 'Dr. Senjuti Saha',
    designation: 'Director and Scientist',
    institution: 'Child Health Research Foundation (CHRF)',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    specialty: 'Molecular Microbiology, Genomics, Public Health advocacy'
  },
  {
    id: 'adv-3',
    name: 'Mr. Md. Al Amin',
    designation: 'Principal & Chief Patron',
    institution: 'Al Amin Academy',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    specialty: 'Educational Policy, Academic Administration, Physics Pedagogy'
  }
];

export const executiveCommittee: CommitteeMember[] = [
  {
    id: 'ec-1',
    name: 'Nafis Al Anzar',
    role: 'President',
    department: 'Administration',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    bio: 'Nafis is a Class XII science scholar who won Silver at the National Physics Olympiad. He oversees the strategic management and representations of AAAM&S.',
    email: 'president.aaamsc@gmail.com',
    linkedin: '#'
  },
  {
    id: 'ec-2',
    name: 'Suhana Ferdous',
    role: 'Vice President of Science',
    department: 'Science',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    bio: 'A passionate bio-chemistry researcher who led the first place project in the National Bio-science Exhibition. She mentors the science project division.',
    email: 'vp.science.aaamsc@gmail.com',
    github: '#'
  },
  {
    id: 'ec-3',
    name: 'Tanzir Hasan Chowdhury',
    role: 'Vice President of Mathematics',
    department: 'Mathematics',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    bio: 'Three-time national medalist at the Bangladesh Mathematical Olympiad. Tanzir conducts the weekly Math Circle and coordinate training camps.',
    email: 'vp.math.aaamsc@gmail.com'
  },
  {
    id: 'ec-4',
    name: 'Zareen Subah',
    role: 'General Secretary',
    department: 'Administration',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    bio: 'Class XII scholar known for outstanding analytical skills. Zareen handles inter-club collaborations, administrative records, and communications.',
    email: 'gs.aaamsc@gmail.com'
  },
  {
    id: 'ec-5',
    name: 'Rashedul Islam',
    role: 'Treasurer',
    department: 'Administration',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    bio: 'Responsible for budget allocations, record auditing, and grant tracking. Rashedul ensures absolute transparent ledgers for every club expenditure.',
    email: 'treasurer.aaamsc@gmail.com'
  },
  {
    id: 'ec-6',
    name: 'Faiaz Rahman',
    role: 'IT & Publications Secretary',
    department: 'IT & Publication',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    bio: 'Faiaz is a full-stack coder and competitive programmer who maintains the web portals and design architectures of Science Horizon volumes.',
    email: 'pub.aaamsc@gmail.com',
    github: 'https://github.com'
  },
  {
    id: 'ec-7',
    name: 'Anika Bushra',
    role: 'Logistics Secretary',
    department: 'Logistics',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    bio: 'Anika coordinates venue setups, physical materials for laboratory workshops, and oversees structural logistics for the annual Carnival.',
    email: 'logistics.aaamsc@gmail.com'
  },
  {
    id: 'ec-8',
    name: 'Tahmid Khan',
    role: 'Organising Secretary',
    department: 'Administration',
    photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400',
    bio: 'Tahmid plans event schedules, invitations, security compliance, and ensures volunteer operations during high-profile science symposia.'
  }
];

export const clubEvents: ClubEvent[] = [
  {
    id: 'evt-1',
    title: '8th Annual National AAAM&S Carnival 2026',
    category: 'Science Fair',
    description: 'The pinnacle event of Al Amin Academy bringing together 1000+ students from 50+ schools. High-profile project competitions, robot races, math olympiad, and science trivia panels.',
    date: 'August 14-16, 2026',
    time: '08:00 AM - 05:00 PM',
    venue: 'Main Auditorium & Campus Grounds, Al Amin Academy',
    status: 'Upcoming',
    imagePlaceholder: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
    regUrl: '#/register-carnival'
  },
  {
    id: 'evt-2',
    title: 'Advanced Mathematical Olympiad Grid-Camp',
    category: 'Olympiad',
    description: 'Intense three-day residency camp targeting advanced combinatorics, number theory, and modern Euclidean geometry led by distinguished national university mentors.',
    date: 'July 22-24, 2026',
    time: '09:00 AM - 04:00 PM',
    venue: 'Academic Lab Room 405',
    status: 'Upcoming',
    imagePlaceholder: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    regUrl: '#/register-math-camp'
  },
  {
    id: 'evt-3',
    title: 'Microbial Analysis & Molecular Genetics Workshop',
    category: 'Workshop',
    description: 'Hands-on training session in PCR amplification, agar-gel electrophoresis, and bacterial culture safety. For Class IX to XII science students.',
    date: 'June 18, 2026',
    time: '10:00 AM - 02:00 PM',
    venue: 'High School Biology Laboratory',
    status: 'Completed',
    imagePlaceholder: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'evt-4',
    title: 'Annual In-House Science Innovation Summit',
    category: 'Competition',
    description: 'Intra-school exhibition where club members display prototype solutions for municipal environmental challenges. Top selected projects receive research incubation funding.',
    date: 'May 10, 2026',
    time: '09:30 AM - 03:30 PM',
    venue: 'Academy Multi-purpose Hall',
    status: 'Completed',
    imagePlaceholder: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600'
  }
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Smart Solar-Hydroponic Agricultural Grid',
    category: 'Environmental Tech',
    description: 'An automated vertical farming system optimizing chemical nutrient flow and lighting using soil moisture feedback and solar arrays. Drastically lowers water use in dry regions.',
    innovators: ['Suhana Ferdous', 'Abrarul Kabir', 'Fahad Bin Halim'],
    mentor: 'Dr. Shahriar Khan (BUET)',
    year: '2025',
    awardStatus: 'Champion (Environmental Category) - National Science Festival',
    blueprintDetails: 'Microcontroller controlled peristaltic pump feeding a continuous loop of nutrient rich mineral solutions. Automated spectral adjustment with variable high-intensity LEDs.',
    status: 'Field Deployed',
    imagePlaceholder: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'proj-2',
    title: 'MathSense: AI Braille Formula Interpreter',
    category: 'Robotics & AI',
    description: 'A hardware-software hybrid reading mathematical notations and LaTeX formulas from physical books, generating real-time verbal explanations and interactive braille outputs.',
    innovators: ['Faiaz Rahman', 'Jubayer Ahmed'],
    mentor: 'Prof. Mohammad Kaykobad',
    year: '2025',
    awardStatus: 'Outstanding Innovation Laureate - ICT Division Expo',
    blueprintDetails: 'Built using OpenCV for character detection, custom Convolutional Neural Networks for mathematical structural prediction, and a solenoid-actuated pins display.',
    status: 'Tested',
    imagePlaceholder: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'proj-3',
    title: 'Bacteriophage Water Purifier Pen',
    category: 'Biomedical',
    description: 'A low-cost, portable pen-like device integrating specific engineered phages targeting E. coli and Vibrio cholerae in stagnant aquatic reserves, sterilizing water in minutes.',
    innovators: ['Nafis Al Anzar', 'Tasnim Ara Hossain'],
    mentor: 'Dr. Senjuti Saha (CHRF)',
    year: '2024',
    awardStatus: 'First Runner Up - Bio-science Olympiad Exhibition',
    blueprintDetails: 'A dual chamber cartridge incorporating a biodegradable chitosan filter and safe, non-pathogenic phage solutions desiccated inside biological capsules.',
    status: 'Prototype',
    imagePlaceholder: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600'
  }
];

export const publications: Publication[] = [
  {
    id: 'pub-1',
    title: 'Mathematical Modeling of Fluid Dynamic Vortices on Finite Surfaces',
    authors: ['Tanzir Hasan Chowdhury', 'Dr. Mahbub Alam'],
    category: 'Research Paper',
    publishDate: 'May 2026',
    abstract: 'This paper examines the mathematical representation of Navier-Stokes approximations on finite non-Euclidean coordinates. We present a simplified computational structure utilizing vector calculations to approximate turbulence thresholds in school laboratory wind tunnels.',
    tags: ['Applied Mathematics', 'Fluid Dynamics', 'Eulerian Grid']
  },
  {
    id: 'pub-2',
    title: 'Science Horizon Journal - Vol. VII, Issue I',
    authors: ['AAAM&S Club Publication Board', 'Moderated by Dr. Senjuti Saha'],
    category: 'Journal',
    volume: 'Vol. 7',
    publishDate: 'June 2026',
    abstract: 'The official peer-reviewed academic journal of the Al Amin Academy. This issue incorporates 12 peer-reviewed scientific articles written exclusively by school-level researchers, spanning biochemistry, number theory, and agricultural technologies.',
    tags: ['Full Issue', 'Academic Research', 'School Science']
  },
  {
    id: 'pub-3',
    title: 'An Introduction to Graph Theory and Its Algebraic Representations',
    authors: ['S. M. Rayhan Tasnim'],
    category: 'Article',
    publishDate: 'March 2026',
    abstract: 'An educational guide detailing the matrix representation of complex networks, explaining adjacency lists, vertex colorings, and real-life algorithmic routing configurations for young scholars.',
    tags: ['Graph Theory', 'Algebra', 'Combinatorics']
  },
  {
    id: 'pub-4',
    title: 'The Math-Science Dispatch Newsletter (Summer Issue)',
    authors: ['Faiaz Rahman', 'Anika Bushra'],
    category: 'Newsletter',
    volume: 'Summer 2026',
    publishDate: 'June 2026',
    abstract: 'The quarterly newsletter containing brief updates on recent club activities, upcoming olympiad dates, brain teasers, and a message from the newly elected Executive President.',
    tags: ['Newsletter', 'Club News', 'Math Teasers']
  }
];

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Grand Champion Shield',
    event: 'National Math Olympiad (Bangladesh)',
    year: '2026',
    recipient: 'Tanzir Hasan Chowdhury',
    rank: '1st Place (Gold)',
    description: 'Awarded for scoring the highest record of 96% in the higher secondary category of mathematics theory exams.'
  },
  {
    id: 'ach-2',
    title: 'Best Eco-Innovation Award',
    event: 'National Science and Technology Week Exhibition',
    year: '2025',
    recipient: 'AAAM&S Engineering Division (Solar agricultural grid)',
    rank: 'Champion',
    description: 'Recognized by the Ministry of Science and Technology for developing low-cost water recycling agricultural designs.'
  },
  {
    id: 'ach-3',
    title: 'Youth Science Research Grant',
    event: 'Bangladesh Academy of Sciences Research Council',
    year: '2024',
    recipient: 'Bacteriophage Research Team',
    rank: 'Grantees',
    description: 'Secured a research grant worth 150,000 BDT to complete laboratory trials and biological assays on cholera pathogens.'
  }
];

export const financialRecords: FinancialRecord[] = [
  {
    category: 'Academy Administrative Grants',
    amount: 180000,
    percentage: 45,
    color: '#0284c7' // sky-600 (Blue)
  },
  {
    category: 'Corporate Sponsorships',
    amount: 120000,
    percentage: 30,
    color: '#16a34a' // green-600 (Green)
  },
  {
    category: 'Membership Subscriptions',
    amount: 60000,
    percentage: 15,
    color: '#0d9488' // teal-600
  },
  {
    category: 'Alumni Endowment Fund',
    amount: 40000,
    percentage: 10,
    color: '#ca8a04' // yellow-600
  }
];

export const fundDistribution: FinancialRecord[] = [
  {
    category: 'Olympiads & Training Camps',
    amount: 140000,
    percentage: 35,
    color: '#0284c7'
  },
  {
    category: 'National Science Carnival hosting',
    amount: 120000,
    percentage: 30,
    color: '#16a34a'
  },
  {
    category: 'Student Research & Project Incubation',
    amount: 100000,
    percentage: 25,
    color: '#0d9488'
  },
  {
    category: 'Journals, Digital Portals & Publications',
    amount: 40000,
    percentage: 10,
    color: '#ca8a04'
  }
];
