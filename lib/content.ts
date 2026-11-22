export const stats = [
  { label: 'LeetCode Solved', value: '113', sub: '39 Easy · 59 Medium · 15 Hard' },
  { label: 'Contest Rating', value: '1480', sub: 'Beats 69–77% of users' },
  { label: 'Hackathons Won', value: '3×', sub: 'PromptWars, FlowZint, Product Space' },
  { label: 'IIT Finals', value: '2×', sub: 'BIMSTEC · ChurnZero' },
] as const

export const projects = [
  {
    id: 'nexus-shield',
    name: 'NexusShield',
    tagline: 'AI Scam Detection Engine',
    description:
      'AI-powered scam detection system scoring internship and job offers from 0–100 with red-flag explanations and employer-domain verification. Flutter + FastAPI + PostgreSQL on Vercel, HMAC-SHA256 signed public revocable receipts, and 38 backend tests with CI/CD.',
    tech: ['Flutter', 'FastAPI', 'PostgreSQL', 'Google Gemini', 'HMAC-SHA256', 'Vercel'],
    live: 'https://github.com/abinivesh-m/Nexus-Shield/releases/latest',
    github: 'https://github.com/abinivesh-m/Nexus-Shield',
    impact: '38 backend tests · CI/CD deployed · Privacy-first hashed + redacted storage',
    image: '/assets/screenshot-nexus.png',
  },
  {
    id: 'skillnexus',
    name: 'SkillNexus AI',
    tagline: '6-Agent Career Orchestration Platform',
    description:
      'Six-agent LLM swarm (Profile, Gap, Curriculum, Resource, Assessor, Mentor) with deterministic weighted readiness scoring and DAG-based prerequisite sequencing. Won 1st place (₹20,000) at PromptWars × RTC GDC Hackathon 2026.',
    tech: ['Python', 'FastAPI', 'LLM Agents', 'Docker', 'Cloud Run'],
    live: 'https://skillnexus-ai.vercel.app',
    github: 'https://github.com/abinivesh-m/Skillnexus-ai',
    impact: '1st place ₹20,000 · 6-agent swarm · <1 MB production build',
    image: '/assets/screenshot-skillnexus.png',
  },
  {
    id: 'trackx',
    name: 'TrackX',
    tagline: 'City-Wide ANPR Vehicle Intelligence',
    description:
      'ANPR vehicle tracking pipeline fusing plate text, vehicle appearance, geolocation, and time from existing CCTV infrastructure. Smart India Hackathon 2026 (BEL problem statement, TRL 4–5). ONNX detection model with FastAPI inference and React dashboard.',
    tech: ['Python', 'OpenCV', 'ONNX', 'FastAPI', 'React', 'SIH 2026'],
    github: 'https://github.com/abinivesh-m/TrackX',
    impact: 'Top 50 of 750 teams SIH 2026 · Team Leader · Real-time inference pipeline',
    image: '/assets/screenshot-trackx.png',
  },
  {
    id: 'roadsos',
    name: 'RoadSOS',
    tagline: 'Driver Monitoring & Emergency Response',
    description:
      'Real-time driver monitoring detecting phone usage (YOLOv8) and drowsiness (MediaPipe Eye Aspect Ratio) with automated SOS countdown and GPS alerting. National finalist at BIMSTEC AI Road Safety Hackathon 2026 (IIT Madras), 15,000+ registrations.',
    tech: ['Python', 'YOLOv8', 'MediaPipe', 'Streamlit'],
    github: 'https://github.com/abinivesh-m/RoadSOS-AI',
    impact: 'National Finalist IIT Madras · Risk scoring engine · SOS countdown pipeline',
    image: '/assets/screenshot-trackx.png',
  },
  {
    id: 'waterlog',
    name: 'Waterlog Watch',
    tagline: 'AI Flood Alerts',
    description:
      'Crowd-sourced AI-verified street flooding alerts for Indian cities. Serverless AWS (Lambda, API Gateway, DynamoDB, S3, Bedrock, Location Service) with geohash queries and multilingual support (Tamil/Hindi/English).',
    tech: ['Flutter', 'AWS Lambda', 'DynamoDB', 'Bedrock', 'S3'],
    live: 'https://lwj4clgh53.execute-api.ap-south-1.amazonaws.com/dashboard',
    github: 'https://github.com/abinivesh-m/waterlog-watch',
    impact: 'Bharat Builds Tour · AWS Serverless · Multilingual flood alerts',
    image: '/assets/screenshot-nexus.png',
  },
  {
    id: 'dejavu',
    name: 'Deja Vu',
    tagline: 'On-call SRE Agent',
    description:
      'On-call SRE agent with long-term incident memory using Hindsight + Groq. 97% incident recall with cited fix history vs 31% without memory.',
    tech: ['Python', 'FastAPI', 'Hindsight', 'Groq'],
    live: 'https://dejavu-tau.vercel.app',
    github: 'https://github.com/abinivesh-m/dejavu',
    impact: '97% recall vs 31% · Auditable fix history · On-call SRE agent',
    image: '/assets/screenshot-skillnexus.png',
  },
  {
    id: 'claimshield',
    name: 'ClaimShield',
    tagline: 'AI Claim Verification',
    description:
      'Breaks text into verifiable claims, searches live web sources, returns verdicts (Verified/Disputed/False) with confidence scores and citations. HackGlobal 2026 RAG track.',
    tech: ['Python', 'FastAPI', 'RAG', 'Tavily'],
    live: 'https://claimshield-pi.vercel.app',
    github: 'https://github.com/abinivesh-m/ClaimShield',
    impact: 'HackGlobal 2026 · Real-time verification · Trust score 0–100',
    image: '/assets/screenshot-trackx.png',
  },
] as const

export const experience = [
  {
    role: 'Software Engineering Intern (Full Stack)',
    company: 'Thiranex',
    type: 'Remote',
    period: 'May 2026 – Jun 2026',
    description:
      'Full-stack software engineering internship building practice projects under senior mentorship with code review and CI/CD feedback loops.',
  },
  {
    role: 'HackerRank Campus Crew',
    company: 'SKCET',
    type: 'Remote',
    period: 'Nov 2026 – Present',
    description:
      "Led HackerRank Campus Crew community at SKCET; designed and executed 'Mission 404,' a 6-problem coding contest with cross-department student participation.",
  },
  {
    role: 'Campus Ambassador',
    company: 'Unlox Academy',
    type: 'Remote',
    period: 'Apr 2026 – Aug 2026',
    description:
      'Drove student-community growth and career-program outreach across campus networks; acted as the organization–student communication bridge.',
  },
  {
    role: 'Member',
    company: 'Google Developer Group (GDG) Coimbatore',
    type: 'Coimbatore',
    period: 'Nov 2026 – Present',
    description: 'Participated in developer community events and technical workshops.',
  },
  {
    role: 'Class Representative',
    company: 'SKCET – B.E. ECE',
    type: 'On Campus',
    period: 'Aug 2025 – Present',
    description: 'Class representative for B.E. ECE batch; liaison between faculty and students, coordinating academic activities.',
  },
] as const

export const achievements = [
  '1st place — PromptWars × RTC GDC Hackathon 2026 (₹20,000)',
  'National Finalist — BIMSTEC AI National Road Safety Hackathon 2026 (IIT Madras; 15,000+ registrations)',
  '4th place — ChurnZero 2026, IIT Kharagpur',
  'Top 50 of 750 teams — Smart India Hackathon 2026 internal round, SKCET (Team Leader)',
  'Rank 8 — Season 2, National Cloud & AI Innovation Challenge (3SVK; 3.4K+ participants)',
  'Finalist — IEEE SmartAIthon 2026 (IEEE Smart Cities AI Hackathon, Karpagam College)',
  'Finalist — CodeSprint: One Shot Challenge (Oriental College of Technology, Bhopal)',
] as const

export const certifications = [
  'HackerRank Software Engineer Intern certification (ID: 6B083196A958)',
  'AI For Everyone — DeepLearning.AI / Coursera',
  'Google Data Analytics Capstone — Coursera',
  'CCNA: Networking Basics — Coursera (Logical Operations)',
  'Programming Fundamentals — Coursera (Duke University)',
  'The Fledgling — Infosys (ID: 836IW54LX3)',
] as const

export const skills = {
  languages: ['Python', 'Dart', 'C++', 'SQL', 'JavaScript'],
  backend: ['FastAPI', 'REST APIs', 'SQLAlchemy', 'Pydantic', 'PostgreSQL', 'SQLite', 'DynamoDB', 'JWT', 'bcrypt', 'HMAC-SHA256', 'rate limiting', 'CORS'],
  ai: ['Google Gemini API', 'LLM integration', 'prompt engineering', 'agentic workflows', 'scikit-learn', 'ONNX', 'YOLO', 'MediaPipe', 'NVIDIA Nemotron 3', 'Amazon Bedrock', 'Groq', 'Tavily'],
  mobile: ['Flutter (Dart)'],
  devops: ['Git', 'GitHub Actions (CI/CD)', 'Vercel', 'AWS (Lambda, API Gateway, DynamoDB, S3, Bedrock)', 'Docker', 'Postman', 'Linux CLI'],
} as const

export const leetcode = {
  solved: 113,
  easy: 39,
  medium: 59,
  hard: 15,
  acceptance: '81.29%',
  rating: 1480,
  beats: '69–77%',
  url: 'https://leetcode.com/u/Abinivesh__M/',
} as const