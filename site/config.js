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
      { value: "9.1", label: "CGPA @ SKCET", sub: "B.E. ECE (4th Semester)" },
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
      desc: "Built a 6-agent collaborative workflow (Profile, Gap, Curriculum, Resource, Assessor, Mentor) with readiness scoring and DAG sequencing using FastAPI and Gemini API. Won 1st place at PromptWars 2026.",
      tech: ["Python", "FastAPI", "Gemini API", "Docker", "Cloud Run"],
      github: "https://github.com/abinivesh-m/Skillnexus-ai",
      live: "https://skillnexus-ai.vercel.app",
      image: "media/screenshot-skillnexus.png"
    },
    {
      id: "nexus-shield",
      title: "NexusShield",
      tagline: "AI Scam Detection Engine",
      award: "38/38 Passing CI/CD Tests",
      desc: "Scam detection engine scoring internship/job offers with red-flag explanations, employer domain verification, and HMAC-SHA256 verification receipts.",
      tech: ["Python", "FastAPI", "PostgreSQL", "Google Gemini API", "HMAC-SHA256"],
      github: "https://github.com/abinivesh-m/Nexus-Shield",
      live: "https://github.com/abinivesh-m/Nexus-Shield/releases/latest",
      image: "media/screenshot-nexusshield-zoomed.png"
    },
    {
      id: "trackx",
      title: "TrackX",
      tagline: "City-Wide ANPR Vehicle Intelligence",
      award: "SIH 2026 BEL Problem (Top 50 of 750)",
      desc: "Vehicle tracking pipeline fusing plate OCR, vehicle appearance, GPS, and timestamp from existing CCTV infrastructure. Real-time inference served via FastAPI with React dashboard.",
      tech: ["Python", "OpenCV", "YOLO", "FastAPI", "React"],
      github: "https://github.com/abinivesh-m/TrackX",
      image: "media/screenshot-trackx.png"
    },
    {
      id: "roadsos",
      title: "RoadSOS",
      tagline: "Driver Safety & Emergency Response",
      award: "National Finalist — IIT Madras (15,000+ regs)",
      desc: "Real-time driver monitoring detecting phone usage via YOLOv8 and drowsiness via MediaPipe Eye Aspect Ratio with automated GPS SOS countdown alert pipeline.",
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
    "Languages & Web": ["Python", "SQL", "HTML5", "CSS3"],
    "Backend & APIs": ["FastAPI", "REST APIs", "PostgreSQL", "SQLite", "Docker", "Git"],
    "AI & Computer Vision": ["Google Gemini API", "Prompt Engineering", "OpenCV", "YOLOv8", "MediaPipe"],
    "DevOps & Tools": ["GitHub Actions (CI/CD)", "Streamlit", "Postman", "Linux CLI", "Vercel"]
  },

  resume: {
    eyebrow: "04 — RÉSUMÉ",
    pdfPath: "media/resume.pdf",
    experience: [
      {
        role: "HackerRank Campus Crew Leader",
        company: "SKCET",
        period: "Nov 2026 – Present",
        desc: "Direct campus developer community; organized 'Mission 404' 6-problem contest; lead peer problem-solving sessions."
      },
      {
        role: "Class Representative",
        company: "Dept. of ECE, SKCET",
        period: "Aug 2025 – Present",
        desc: "Elected student representative; communicate academic schedules and technical events for a cohort of 60+ students."
      },
      {
        role: "Technical Team Lead",
        company: "Hackathons & Competitions",
        period: "Aug 2025 – Present",
        desc: "Led student teams across national hackathons (1st Place PromptWars RTC, National Finalist IIT Madras)."
      },
      {
        role: "Software Engineering Intern",
        company: "Thiranex (Remote)",
        period: "May 2026 – Jun 2026",
        desc: "Contributed to full-stack feature development and automated testing workflows via GitHub Actions CI/CD."
      }
    ],
    education: [
      {
        degree: "B.E. Electronics & Communication Engineering",
        institution: "Sri Krishna College of Engineering & Technology (SKCET), Coimbatore",
        period: "Aug 2025 – Aug 2029 (Expected)",
        details: "CGPA: 9.1 / 10.0 (4th Semester)"
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
