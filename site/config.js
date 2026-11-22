window.CONFIG = {
  name: "Abinivesh M",
  role: "AI Product Engineer · Full Stack SDE",
  location: "Namakkal & Coimbatore, Tamil Nadu, India",
  status: "Open to Tier-1 SDE & AI Roles",
  accentColor: "#ff9a4d",
  headingFont: "Anton, sans-serif",
  bodyFont: "Inter, sans-serif",
  
  about: {
    eyebrow: "01 — ABOUT ME",
    title: "I build AI systems that solve real problems and ship to production.",
    paragraph: "2nd-year ECE student at SKCET with a 9.1 CGPA. I architect end-to-end distributed systems, multi-agent LLM swarms, and high-throughput vision pipelines. 3× Hackathon Winner, 2× IIT Finalist & Team Leader, and HackerRank Campus Crew Leader.",
    stats: [
      { value: "1st Place", label: "PromptWars RTC", sub: "₹20,000 Winner" },
      { value: "9.1", label: "CGPA @ SKCET", sub: "B.E. ECE (Top Tier)" },
      { value: "113", label: "LeetCode Solved", sub: "1480 Rating · 81.3% Acc" },
      { value: "3× / 2×", label: "Hackathons / IIT", sub: "IIT Madras & Kharagpur" }
    ]
  },

  projects: [
    {
      id: "skillnexus",
      title: "SkillNexus AI",
      tagline: "6-Agent Career Orchestration Platform",
      award: "1st Place Winner (₹20,000) — PromptWars 2026",
      desc: "Architected a 6-agent LLM swarm (Profile, Gap, Curriculum, Resource, Assessor, Mentor) with deterministic weighted readiness scoring and DAG prerequisite sequencing. Includes counterfactual what-if simulation.",
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
      image: "media/screenshot-nexusshield-v2.png"
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
    "AI & Agents": ["Google Gemini API", "LLM Swarms", "Prompt Engineering", "RAG", "Amazon Bedrock", "Groq", "NVIDIA Nemotron 3", "YOLOv8", "ONNX", "MediaPipe"],
    "Backend & Systems": ["FastAPI", "Python", "REST APIs", "SQLAlchemy", "Pydantic", "PostgreSQL", "SQLite", "DynamoDB", "HMAC-SHA256", "JWT Auth", "Docker"],
    "Frontend & Mobile": ["Next.js", "React", "Flutter (Dart)", "Tailwind CSS", "Three.js / 3D Canvas", "TypeScript", "HTML5 / Canvas"],
    "DevOps & Tools": ["AWS (Lambda, S3, API Gateway)", "GitHub Actions (CI/CD)", "Vercel", "Git", "Linux CLI", "Postman", "C++", "SQL"]
  },

  resume: {
    eyebrow: "04 — RÉSUMÉ",
    pdfPath: "media/resume.pdf",
    experience: [
      {
        role: "Software Engineering Intern (Full Stack)",
        company: "Thiranex (Remote)",
        period: "May 2026 – Jun 2026",
        desc: "Shipped full-stack features with strict code review standards and CI/CD pipelines."
      },
      {
        role: "HackerRank Campus Crew Leader",
        company: "SKCET",
        period: "Nov 2026 – Present",
        desc: "Led campus dev community; authored and directed 'Mission 404' 6-problem contest."
      }
    ],
    education: [
      {
        degree: "B.E. Electronics & Communication Engineering",
        institution: "Sri Krishna College of Engineering & Technology (SKCET), Coimbatore",
        period: "Aug 2025 – Aug 2029 (Expected)",
        details: "CGPA: 9.1 / 10 · Class Representative"
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
