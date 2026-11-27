window.CONFIG = {
  name: "Abinivesh M",
  role: "Software Development Engineer | AI Product Engineer | Backend & Intelligent Systems",
  location: "Coimbatore, Tamil Nadu, India",
  status: "Open to SDE & AI Product Roles",
  accentColor: "#ff9a4d",
  headingFont: "Anton, sans-serif",
  bodyFont: "Inter, sans-serif",
  
  about: {
    eyebrow: "01 — ABOUT ME",
    title: "Building practical backend systems and intelligent AI solutions.",
    paragraph: "2nd-year B.E. ECE student at SKCET with a 9.1 CGPA. I focus on building reliable backend APIs, practical AI workflows, and computer vision prototypes. 3× Hackathon Winner, 2× IIT Finalist, HackerRank Campus Crew Leader, and Class Representative.",
    stats: [
      { value: "1st Place", label: "PromptWars RTC", sub: "₹20,000 Winner & Team Lead" },
      { value: "9.1", label: "CGPA @ SKCET", sub: "B.E. ECE (Current)" },
      { value: "3× / 2×", label: "Hackathons / IIT", sub: "Team Leader · IIT Madras & KGP" },
      { value: "113+", label: "LeetCode Solved", sub: "Python · 81.3% Accuracy" }
    ]
  },

  projects: [
    {
      id: "skillnexus",
      title: "SkillNexus AI",
      tagline: "6-Agent Career Orchestration Platform",
      award: "1st Place Winner (₹20,000) — PromptWars 2026",
      desc: "Architected a 6-agent collaborative workflow (Profile, Gap, Curriculum, Resource, Assessor, Mentor) with readiness scoring, DAG sequencing, and counterfactual simulation via Gemini API and FastAPI. Won 1st place at PromptWars 2026.",
      tech: ["Python", "FastAPI", "Google Gemini API", "Docker", "Cloud Run"],
      github: "https://github.com/abinivesh-m/Skillnexus-ai",
      live: "https://skillnexus-ai.vercel.app",
      image: "media/screenshot-skillnexus.png"
    },
    {
      id: "nexus-shield",
      title: "NexusShield",
      tagline: "AI Scam Detection Engine",
      award: "38/38 Passing pytest CI/CD Tests",
      desc: "AI scam detection engine scoring offers 0–100 with Gemini API red-flag analysis, employer domain verification, and HMAC-SHA256 verification receipts. Enforced with 38/38 passing pytest CI/CD test suites.",
      tech: ["Python", "FastAPI", "PostgreSQL", "Google Gemini API", "pytest", "HMAC-SHA256"],
      github: "https://github.com/abinivesh-m/Nexus-Shield",
      live: "https://github.com/abinivesh-m/Nexus-Shield/releases/latest",
      image: "media/screenshot-nexusshield-zoomed.png"
    },
    {
      id: "trackx",
      title: "TrackX",
      tagline: "City-Wide ANPR Vehicle Intelligence",
      award: "SIH 2026 BEL Problem (Top 50 of 750)",
      desc: "City-wide ANPR vehicle tracking pipeline fusing plate OCR, vehicle appearance, and camera timestamps from CCTV video feeds. Real-time FastAPI backend served to a live React trajectory dashboard.",
      tech: ["Python", "OpenCV", "YOLO", "FastAPI", "React"],
      github: "https://github.com/abinivesh-m/TrackX",
      image: "media/screenshot-trackx.png"
    },
    {
      id: "roadsos",
      title: "RoadSOS",
      tagline: "Driver Safety & Emergency Response",
      award: "National Finalist — Top 5 of 21,000+ (BIMSTEC, IIT Madras)",
      desc: "Real-time driver safety monitoring detecting phone distraction (YOLOv8) and drowsiness (MediaPipe EAR) with an automated GPS SOS alert pipeline and 15-second cancel timer. National Finalist at IIT Madras.",
      tech: ["Python", "YOLOv8", "MediaPipe", "Streamlit", "GPS"],
      github: "https://github.com/abinivesh-m/RoadSOS-AI",
      image: "media/screenshot-roadsos.png"
    },
    {
      id: "waterlog",
      title: "Waterlog Watch",
      tagline: "AI Flood Alerts on Serverless AWS",
      award: "100% Serverless AWS Architecture",
      desc: "Crowd-sourced AI-verified street flooding alerts. Vision assessment with Gemini API and real-time vehicle route safety checks.",
      tech: ["Python", "AWS Lambda", "Gemini API", "FastAPI"],
      github: "https://github.com/abinivesh-m/waterlog-watch",
      live: "https://lwj4clgh53.execute-api.ap-south-1.amazonaws.com/dashboard",
      image: "media/screenshot-waterlog.png"
    },
    {
      id: "dejavu",
      title: "Deja Vu",
      tagline: "On-Call SRE Agent with Memory",
      award: "Hackathon Production Prototype",
      desc: "SRE incident response assistant designed to recall past incident solutions and suggest troubleshooting steps for developer alerts.",
      tech: ["Python", "FastAPI", "Gemini API", "Streamlit"],
      github: "https://github.com/abinivesh-m/dejavu",
      live: "https://dejavu-tau.vercel.app",
      image: "media/screenshot-dejavu.png"
    }
  ],

  skills: {
    "Languages & Web": ["Python", "SQL", "HTML5", "CSS3", "Streamlit"],
    "Backend & Databases": ["FastAPI (Async APIs)", "REST APIs", "PostgreSQL", "SQLite", "DynamoDB"],
    "AI, LLMs & Vision": ["Google Gemini API", "Amazon Bedrock", "Groq", "Tavily", "Prompt Engineering", "Machine Learning", "Computer Vision", "OpenCV", "YOLOv8", "MediaPipe"],
    "Cloud, DevOps & Tools": ["AWS (Lambda, API Gateway, S3)", "Docker", "Git", "GitHub Actions (CI/CD)", "pytest (TDD)", "Linux CLI", "Postman", "Vercel"]
  },

  resume: {
    eyebrow: "04 — RÉSUMÉ",
    pdfPath: "media/resume.pdf",
    experience: [
      {
        role: "Embedded Systems Intern (Virtual)",
        company: "SYNKOC IT Services, Bangalore · AICTE",
        period: "Oct 2026 – Nov 2026",
        desc: "Completed a 1-month embedded systems program via the AICTE Internship Portal; independently built the capstone 'Smart EV Monitoring & Anti-Theft System using IoT', approved by a SYNKOC instructor.",
        verify: [
          { label: "Certificate · IC-2026-072", href: "media/SYNKOC-IC-2026-072-Embedded-Systems-Certificate.pdf" },
          { label: "Recommendation Letter · LOR-2026-070", href: "media/SYNKOC-LOR-2026-070-Recommendation-Letter.pdf" }
        ]
      },
      {
        role: "HackerRank Campus Crew Leader",
        company: "SKCET",
        period: "Nov 2026 – Present",
        desc: "Direct campus developer community (500+ peers); organized 'Mission 404' 6-problem contest; lead peer problem-solving sessions in Python."
      },
      {
        role: "Hackathon Team Lead",
        company: "National Competitions",
        period: "Aug 2025 – Present",
        desc: "Led cross-functional student teams in national hackathons; won 1st Place at PromptWars 2026 (₹20,000) and placed Top 5 of 21,000+ at the BIMSTEC AI Road Safety Hackathon, IIT Madras."
      },
      {
        role: "Class Representative",
        company: "Dept. of ECE, SKCET",
        period: "Aug 2025 – Present",
        desc: "Elected student representative for 60+ engineers; coordinate academic deliverables and department technical symposium schedules with senior faculty."
      },
      {
        role: "Software Engineering Intern",
        company: "Thiranex (Remote)",
        period: "May 2026 – Jun 2026",
        desc: "Developed responsive full-stack features and automated linting/test workflows in GitHub Actions CI/CD pipelines under senior engineer code reviews."
      }
    ],
    education: [
      {
        degree: "B.E. Electronics & Communication Engineering",
        institution: "Sri Krishna College of Engineering & Technology (SKCET), Coimbatore",
        period: "Aug 2025 – Aug 2029 (Expected)",
        details: "CGPA: 9.1 / 10.0 (Current)"
      }
    ]
  },

  contact: {
    eyebrow: "05 — CONTACT",
    title: "LET'S BUILD SOMETHING EXTRAORDINARY.",
    email: "abinivesh.1203@gmail.com",
    phone: "+91 77084 63449",
    github: "https://github.com/abinivesh-m",
    linkedin: "https://linkedin.com/in/abinivesh-m-883052380",
    leetcode: "https://leetcode.com/u/Abinivesh__M/"
  }
};
