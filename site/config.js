window.CONFIG = {
  name: "Abinivesh M",
  role: "Software Development Engineer (SDE) · AI Product Engineer",
  location: "Namakkal & Coimbatore, Tamil Nadu, India",
  status: "Open to SDE & AI Product Roles",
  accentColor: "#ff9a4d",
  headingFont: "Anton, sans-serif",
  bodyFont: "Inter, sans-serif",
  
  about: {
    eyebrow: "01 — ABOUT ME",
    title: "Think like a founder. Build like an engineer. Lead like a product manager.",
    paragraph: "2nd-year ECE student at SKCET with a 9.1 CGPA. I operate at the intersection of systems engineering, applied AI swarms, and product leadership — turning 0-to-1 problems into production software. 3× Hackathon Winner, 2× IIT Finalist & Team Lead, HackerRank Campus Crew Leader, and Class Representative.",
    stats: [
      { value: "1st Place", label: "PromptWars RTC", sub: "₹20,000 Winner & Team Lead" },
      { value: "9.1", label: "CGPA @ SKCET", sub: "Top 1% · Class Representative" },
      { value: "3× / 2×", label: "Hackathons / IIT", sub: "Team Leader · IIT Madras & KGP" },
      { value: "113+", label: "LeetCode Solved", sub: "1480 Rating · 81.3% Accuracy" }
    ]
  },

  projects: [
    {
      id: "skillnexus",
      title: "SkillNexus AI",
      tagline: "6-Agent Career Orchestration Platform",
      award: "1st Place Winner (₹20,000) — PromptWars 2026",
      desc: "Architected a 6-agent LLM swarm (Profile, Gap, Curriculum, Resource, Assessor, Mentor) with deterministic weighted readiness scoring and DAG prerequisite sequencing. Led the sprint to 1st place victory.",
      tech: ["Python", "FastAPI", "LLM Swarm", "Docker", "Cloud Run"],
      github: "https://github.com/abinivesh-m/Skillnexus-ai",
      live: "https://skillnexus-ai.vercel.app",
      image: "media/screenshot-skillnexus.png"
    },
    {
      id: "nexus-shield",
      title: "NexusShield",
      tagline: "AI Scam Detection Engine",
      award: "38/38 Passing CI/CD Tests",
      desc: "Scam detection engine scoring internship/job offers 0–100 with red-flag explanations, employer domain verification, and tamper-evident HMAC-SHA256 cryptographic public receipts.",
      tech: ["Flutter", "FastAPI", "PostgreSQL", "Google Gemini", "HMAC-SHA256"],
      github: "https://github.com/abinivesh-m/Nexus-Shield",
      live: "https://github.com/abinivesh-m/Nexus-Shield/releases/latest",
      image: "media/screenshot-nexusshield-zoomed.png"
    },
    {
      id: "trackx",
      title: "TrackX",
      tagline: "City-Wide ANPR Vehicle Intelligence",
      award: "SIH 2026 BEL Problem (Top 50 of 750)",
      desc: "Vehicle tracking pipeline fusing plate OCR, vehicle appearance, GPS, and timestamp from existing CCTV infrastructure. Real-time ONNX model inference served via FastAPI with React dashboard.",
      tech: ["Python", "OpenCV", "ONNX", "FastAPI", "React"],
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
      desc: "Crowd-sourced AI-verified street flooding alerts. Multimodal vision assessment with Bedrock and Gemini fallback, DynamoDB geohash spatial queries, and real-time vehicle route checks.",
      tech: ["Flutter", "AWS Lambda", "DynamoDB", "Bedrock", "Location Service"],
      github: "https://github.com/abinivesh-m/waterlog-watch",
      live: "https://lwj4clgh53.execute-api.ap-south-1.amazonaws.com/dashboard",
      image: "media/screenshot-waterlog.png"
    },
    {
      id: "dejavu",
      title: "Deja Vu",
      tagline: "On-Call SRE Agent with Memory",
      award: "97% Incident Recall vs 31% Baseline",
      desc: "SRE incident response agent with long-term episodic memory using Hindsight + Groq. Automatically cites prior incident fix histories to diagnose production alerts instantly.",
      tech: ["Python", "FastAPI", "Hindsight", "Groq"],
      github: "https://github.com/abinivesh-m/dejavu",
      live: "https://dejavu-tau.vercel.app",
      image: "media/screenshot-dejavu.png"
    }
  ],

  skills: {
    "AI & Intelligent Systems": ["Google Gemini API", "LLM Swarms", "Prompt Engineering", "RAG", "Amazon Bedrock", "Groq", "NVIDIA Nemotron 3", "YOLOv8", "ONNX", "MediaPipe"],
    "Software Engineering & Systems": ["Python", "FastAPI", "REST API Design", "SQL", "PostgreSQL", "DynamoDB", "HMAC-SHA256", "Docker", "Data Structures & Algos"],
    "Product Engineering & Leadership": ["Technical Team Leadership", "Product Engineering (0 → 1 MVP)", "System Architecture & RFCs", "User Research & Roadmapping", "Agile Sprints & Reviews"],
    "Cloud & DevOps Platforms": ["AWS (Lambda, S3, API Gateway)", "GitHub Actions (CI/CD)", "Vercel", "Git", "Linux CLI", "Postman", "Streamlit", "HTML5 & CSS3"]
  },

  resume: {
    eyebrow: "04 — RÉSUMÉ",
    pdfPath: "media/resume.pdf",
    experience: [
      {
        role: "HackerRank Campus Crew Leader",
        company: "SKCET",
        period: "Nov 2026 – Present",
        desc: "Direct campus developer community (500+ peers); authored and managed 'Mission 404' 6-problem contest; lead algorithmic problem-solving and system workshops."
      },
      {
        role: "Technical Team Lead & AI Product Architect",
        company: "Hackathons & IIT Symposiums",
        period: "Aug 2025 – Present",
        desc: "Led engineering teams across 5+ national hackathons (IIT Madras Shaastra, IIT Kharagpur Megalith, PromptWars RTC); owned 0 → 1 product lifecycle from user research to production cloud deployments."
      },
      {
        role: "Software Engineering Intern (Full Stack)",
        company: "Thiranex (Remote)",
        period: "May 2026 – Jun 2026",
        desc: "Shipped production features with strict CI/CD pipelines, automated testing (38/38 passing test suites), and peer code reviews."
      }
    ],
    education: [
      {
        degree: "B.E. Electronics & Communication Engineering",
        institution: "Sri Krishna College of Engineering & Technology (SKCET), Coimbatore",
        period: "Aug 2025 – Aug 2029 (Expected)",
        details: "CGPA: 9.1 / 10 · Class Representative · Top 1% of Batch"
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
