export interface MetricItem {
  value: string;
  label: string;
}

export interface BuiltProject {
  id: string;
  name: string;
  tag: string;
  tagType: 'built' | 'rag' | 'teardown' | 'data';
  description: string;
  metrics: MetricItem[];
  chips: string[];
  isFeatured?: boolean;
  links: {
    label: string;
    url: string;
    type: 'live' | 'github';
  }[];
  deepDive?: {
    hypothesis: string;
    evidence: string;
    architecture: string[];
    guardrails: string[];
  };
}

export interface TeardownItem {
  id: string;
  name: string;
  tag: string;
  insight: string;
  description: string;
  chips: string[];
  opportunityArea: string;
}

export interface RepoItem {
  id: string;
  name: string;
  description: string;
  org: string;
  url: string;
  group: 'ai' | 'data';
  tags?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const HERO_DATA = {
  badge: "Open to AI PM · Founding PM · Growth PM roles",
  headline: {
    line1: "Product Manager",
    line2: "who ships AI —",
    line3: "not just strategizes.",
  },
  subtext:
    "I build evidence-first AI products with live demos, real user research, and deployed code. Every case study here started with a falsifiable hypothesis and ended with an artifact you can click.",
  ctas: [
    { label: "View case studies", href: "#built", primary: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sankalp-shah-300596", primary: false },
    { label: "GitHub", href: "https://github.com/sankalp305zeus", primary: false },
    { label: "blazing-llama", href: "https://github.com/blazing-llama", primary: false },
  ],
  stats: [
    {
      target: 10000,
      suffix: "+",
      display: "10,000+",
      isStatic: true,
      label: "Reviews & data points processed across app stores, Reddit, and blogs — via AI pipelines with guardrails and RAG evals",
    },
    {
      target: 40,
      suffix: "",
      display: "30–50",
      isStatic: true,
      label: "Average primary research respondents per project (surveys + interviews)",
    },
    {
      target: 4,
      suffix: "",
      display: "4",
      isStatic: true,
      label: "Live deployed products",
    },
    {
      target: 7,
      suffix: "",
      display: "7",
      isStatic: true,
      label: "AI & PM projects built end-to-end",
    },
  ],
};

export const MARQUEE_ITEMS = [
  "n8n",
  "LangGraph",
  "Pydantic AI",
  "FastAPI",
  "RAG",
  "Groq",
  "React",
  "Vercel",
  "BGE Embeddings",
  "RICE",
  "ICE",
  "Hook Model",
  "KPI Trees",
  "North Star Metric",
  "JTBD",
  "User Interviews",
  "Ollama",
  "Python",
];

export const BUILT_PROJECTS: BuiltProject[] = [
  {
    id: "blinkit",
    name: "Blinkit Discovery Concierge",
    tag: "Graduation Project · Live MVP",
    tagType: "built",
    isFeatured: true,
    description:
      "Quick commerce solved delivery — not discovery. Only 2.5% of 2,029 reviews mentioned any non-grocery category. Built an n8n multi-agent pipeline to analyze 1,180 reviews, ran primary research (N=20 + 5 interviews) to confirm the real barrier was non-consideration, then shipped a React MVP with deterministic checkout recommendations and a traceable 'Why This?' panel.",
    metrics: [
      {
        value: "1,180",
        label: "Play Store reviews processed through hub-and-spoke agent",
      },
      {
        value: "2.5%",
        label: "Corpus signal on category discovery — primary research required",
      },
      {
        value: "6",
        label: "Deterministic guardrails — 13/13 tests, 0% hallucination rate",
      },
      {
        value: "RICE 64",
        label: "Checkout Moment scored vs. Home Banner (10), Pre-Occasion Push (4.5)",
      },
    ],
    chips: ["n8n", "React", "Groq", "JTBD Research", "RICE", "Vercel"],
    links: [
      {
        label: "Live demo ↗",
        url: "https://graduation-project-delta-ivory.vercel.app/",
        type: "live",
      },
    ],
    deepDive: {
      hypothesis:
        "Users default to grocery on Blinkit not due to bad catalog, but zero consideration at intent formulation.",
      evidence:
        "1,180 customer reviews clustered into intent buckets. Only 2.5% organic mentions of high-margin general merchandise.",
      architecture: [
        "n8n hub-and-spoke orchestrator",
        "Groq-powered Llama 3 for inference under 400ms",
        "Deterministic cart rules + dynamic contextual add-ons",
      ],
      guardrails: [
        "Zero hallucination catalog matching",
        "Strict basket compatibility score thresholds",
        "Explainable 'Why This?' breakdown for every suggestion",
      ],
    },
  },
  {
    id: "myntra",
    name: "Myntra Wishlist Intelligence",
    tag: "Built · Live MVP",
    tagType: "built",
    description:
      "Wishlist saves rarely became purchases. AI discovery on 2,203 reviews (n=137 gold set, 0.875 accuracy) plus N=32 survey and 6 interviews. Built a price-certainty tracker with honest confidence states and zero manufactured urgency.",
    metrics: [
      {
        value: "94%",
        label: "Leave the app to research before buying (n=32)",
      },
      {
        value: "6/6",
        label: "Interviews raised availability decay unprompted",
      },
      {
        value: "0.875",
        label: "Sentiment classification accuracy on 137 gold set reviews",
      },
    ],
    chips: ["Streamlit", "Groq", "User Interviews", "Vercel"],
    links: [
      {
        label: "Live MVP ↗",
        url: "https://mvp-henna-delta.vercel.app",
        type: "live",
      },
      {
        label: "GitHub ↗",
        url: "https://github.com/blazing-llama/NL-Myntra-Graduation-Project",
        type: "github",
      },
    ],
  },
  {
    id: "chatgpt-voice",
    name: "ChatGPT Voice India",
    tag: "Case Study · Full PRD",
    tagType: "built",
    description:
      "78% of Indian college students knew about ChatGPT Voice. Under 20% used it regularly. The drop happened at repeat use, not trial. Four-milestone research project with ICE prioritization across three solution directions, full PRD with wireframes and rollout plan.",
    metrics: [
      {
        value: "n=36",
        label: "Survey + 6 interviews across Delhi, Pune, Bengaluru",
      },
      {
        value: "ICE 18",
        label: "Voice-Safe Mode vs. Hinglish ASR Rebuild (5.0)",
      },
      {
        value: "<350ms",
        label: "Acoustic latency budget allocated for ambient voice gate",
      },
    ],
    chips: ["User Research", "PRD", "Hook Model", "KPI Tree", "ICE"],
    links: [],
  },
  {
    id: "weekly-review-pulse",
    name: "Weekly Review Pulse",
    tag: "Built · Live Automation",
    tagType: "built",
    description:
      "Multi-agent AI pipeline that scrapes Play Store reviews, clusters themes via LLM, and delivers a sub-250-word weekly product health note via Gmail — automatically. Three-agent architecture on n8n: orchestrator, engineering sub-agent, QA reviewer.",
    metrics: [
      {
        value: "3",
        label: "Specialized AI agents in hub-and-spoke architecture",
      },
      {
        value: "0",
        label: "Manual steps after setup — fully automated delivery",
      },
      {
        value: "10,000+",
        label: "Reviews clustered across stores, Reddit & blogs",
      },
    ],
    chips: ["n8n", "Groq", "Google Docs MCP", "Gmail"],
    links: [
      {
        label: "GitHub ↗",
        url: "https://github.com/sankalp305zeus/Milestone---Weekly-Product-review-pulse",
        type: "github",
      },
    ],
  },
  {
    id: "mf-faq",
    name: "MF FAQ Assistant",
    tag: "Built · Live RAG POC",
    tagType: "rag",
    description:
      "Facts-only RAG chatbot grounded in HDFC scheme data across 15–25 AMC/SEBI/AMFI pages. Refuses advisory questions with a compliant redirect. Zero hallucination by design — every answer traces to a retrieved passage, with a PII sanitizer on all inputs.",
    metrics: [
      {
        value: "0",
        label: "Hallucination rate — answers only from retrieved passages",
      },
      {
        value: "0",
        label: "Advisory responses — hard refusal with SEBI-safe redirect",
      },
      {
        value: "25+",
        label: "Verified AMC & SEBI regulatory filings in grounded corpus",
      },
    ],
    chips: ["FastAPI", "BGE Embeddings", "Groq", "RAG"],
    links: [
      {
        label: "Live POC Spec ↗",
        url: "#built",
        type: "live",
      },
    ],
  },
];

export const TEARDOWNS: TeardownItem[] = [
  {
    id: "groww",
    name: "Groww — MF Evaluation Gap",
    tag: "Teardown · Opportunity Analysis",
    opportunityArea: "Evaluation & Decision Friction",
    insight:
      '"The core problem is not information availability — Groww has the data. It is retrieval UX. Users don\'t read factsheets; they ask questions."',
    description:
      "Groww's personalization wins onboarding but loses the user at fund evaluation. Mapped the full friction chain and found it clusters at Evaluation and Decision — after acquisition spend, before revenue. Designed a facts-only conversational layer as the fix; built MF FAQ Assistant as the working proof of concept.",
    chips: ["Friction mapping", "SEBI compliance", "RAG opportunity", "Guardrail metrics"],
  },
  {
    id: "zomato",
    name: "Zomato — Cold-Start Personalization",
    tag: "Teardown · Opportunity Analysis",
    opportunityArea: "Cold-Start & New City Personalization",
    insight:
      '"Zomato\'s recommendation system isn\'t weak — it\'s asymmetric. It personalizes beautifully for users it already understands and defaults to the crowd for everyone else."',
    description:
      "Zomato's recommendation system isn't weak — it's asymmetric. It personalizes beautifully for users it already understands and defaults to the crowd for everyone else. The fix is a second signal source: stated intent at first open, working from session one.",
    chips: ["Cold-start problem", "Personalization", "Segmentation", "A/B design"],
  },
];

export const REPOS: RepoItem[] = [
  {
    id: "legal-os",
    name: "LegalOS",
    description:
      "AI-powered legal document assistant for Indian SMBs — contract analysis and plain-language summaries.",
    org: "blazing-llama / LegalOS",
    url: "https://github.com/blazing-llama/LegalOS",
    group: "ai",
    tags: ["LLM", "SMB Legal", "Parser"],
  },
  {
    id: "navigo",
    name: "Navigo — AI Travel Planner",
    description:
      "Multi-agent travel planner built with LangGraph + Pydantic AI + React.",
    org: "sankalp305zeus / ai-travel-planner",
    url: "https://github.com/sankalp305zeus/ai-travel-planner",
    group: "ai",
    tags: ["LangGraph", "Pydantic AI", "Agents"],
  },
  {
    id: "pmos",
    name: "PMOS v1",
    description:
      "Product Management OS — AI-assisted PM workflows and decision logs.",
    org: "sankalp305zeus / PMOS-v1",
    url: "https://github.com/sankalp305zeus/PMOS-v1",
    group: "ai",
    tags: ["Workflows", "Decision Logs", "AI"],
  },
  {
    id: "ai-prd",
    name: "AI PRD Generator",
    description:
      "Generates structured PRDs from problem statements using Claude — RICE scores, user stories, success metrics.",
    org: "sankalp305zeus / ai-prd-generator",
    url: "https://github.com/sankalp305zeus/ai-prd-generator",
    group: "ai",
    tags: ["PRD", "RICE Scoring", "Claude"],
  },
  {
    id: "telecom-churn",
    name: "Telecom Churn Analysis",
    description:
      "Domain-oriented churn prediction — feature engineering on telecom usage signals with business metric focus.",
    org: "blazing-llama",
    url: "https://github.com/blazing-llama/Domain-Oriented-Telecom-Churn-Case-Study",
    group: "data",
    tags: ["Feature Engineering", "Retention", "Telecom"],
  },
  {
    id: "boombikes",
    name: "BoomBikes Demand Model",
    description:
      "Linear regression model predicting bike-sharing demand. Feature selection + residual diagnostics.",
    org: "blazing-llama",
    url: "https://github.com/blazing-llama/BoomBikes-Bike-Sharing-Assignment-",
    group: "data",
    tags: ["Linear Regression", "Residuals", "Forecasting"],
  },
  {
    id: "eda-credit",
    name: "EDA — Credit & Loans",
    description:
      "Exploratory data analysis on loan application data — risk profiling, imbalanced class handling.",
    org: "blazing-llama",
    url: "https://github.com/blazing-llama/EDA-Credit-Assignment-on-Loan-Applications",
    group: "data",
    tags: ["EDA", "Risk Profiling", "Imbalanced Data"],
  },
];

export interface HowIWorkStep {
  step: string;
  title: string;
  principle: string;
}

export const HOW_I_WORK_STEPS: HowIWorkStep[] = [
  {
    step: "01",
    title: "Problem",
    principle: "Identify where user intent is high but product delivery breaks.",
  },
  {
    step: "02",
    title: "Evidence",
    principle: "Mine reviews & conduct primary interviews. No ungrounded guesses.",
  },
  {
    step: "03",
    title: "Prioritize",
    principle: "Score via ICE / RICE with strict non-negotiable guardrails.",
  },
  {
    step: "04",
    title: "Build",
    principle: "Ship working software, n8n pipelines & live code — not slide decks.",
  },
  {
    step: "05",
    title: "Measure",
    principle: "Track falsifiable outcomes: error rate, retrieval SLA, and retention.",
  },
];

export interface OutsideBacklogItem {
  id: string;
  label: string;
  detail: string;
  meta: string;
  tag: string;
}

export const OUTSIDE_BACKLOG_ITEMS: OutsideBacklogItem[] = [
  {
    id: "thor",
    label: "Thor",
    detail: "Grey & white Staffy / Pitbull. Chief morale officer, ball obsessive, zero sprint velocity drop.",
    meta: "Daily companion · Pune",
    tag: "The Pup",
  },
  {
    id: "chess",
    label: "Chess",
    detail: "Tactical foresight, tempo management, and positional play under clock pressure.",
    meta: "Rapid & Blitz · Sicilian / King's Indian",
    tag: "Strategy",
  },
  {
    id: "travel",
    label: "Travel",
    detail: "Backpacking across 14+ countries with a single carry-on and curiosity-first exploration.",
    meta: "14+ countries · Off-beat routes",
    tag: "Curiosity",
  },
  {
    id: "cinema",
    label: "Cinema",
    detail: "Deep appreciation for cinematic pacing, auteur storytelling, and visual tension (Nolan, Villeneuve).",
    meta: "Storytelling & Visual Pacing",
    tag: "Narrative",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Product",
    skills: [
      "RICE",
      "ICE",
      "JTBD",
      "Hook Model",
      "KPI Trees",
      "North Star",
      "Guardrail Metrics",
      "A/B Design",
    ],
  },
  {
    category: "AI",
    skills: [
      "n8n",
      "LangGraph",
      "Pydantic AI",
      "RAG",
      "Groq",
      "BGE Embeddings",
      "Ollama",
    ],
  },
  {
    category: "Data",
    skills: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "SQL",
      "Linear Regression",
      "Classification",
      "EDA",
    ],
  },
  {
    category: "Build",
    skills: [
      "React",
      "FastAPI",
      "ComfyUI",
      "Vercel",
    ],
  },
  {
    category: "Business",
    skills: [
      "User Interviews",
      "Survey Design",
      "Corpus NLP",
      "Enterprise SaaS Sales",
      "Stakeholder Communication",
    ],
  },
];

export const ABOUT_DATA = {
  narrative: [
    "I spent six years in enterprise B2B SaaS sales at BrowserStack and Freshworks. Selling complex dev tools taught me how buyers actually evaluate value, where roadmaps fall short of customer pain, and how critical it is for product teams to build with technical empathy.",
    "I transitioned to building products myself — first mastering data science and predictive modeling at IIIT Bangalore, then specializing in AI systems as a NextLeap AI PM Fellow. I target Indian fintech and high-growth B2B SaaS startups where a PM must understand system latency, vector retrieval, and agent deterministic guardrails, not just manage Jira tickets.",
    "My rule is simple: every feature starts with a falsifiable hypothesis backed by corpus evidence or primary user interviews. If the data disproves the thesis, we pivot the recommendation. Then we ship a working artifact you can test.",
  ],
  credentials: [
    { label: "Location", value: "Pune, India" },
    { label: "AI PM Fellowship", value: "NextLeap AI PM Fellow" },
    { label: "Executive PG", value: "Data Science & Business Analysis, IIIT Bangalore" },
    { label: "MBA", value: "Northumbria University, Newcastle UK" },
    { label: "Sales Foundations", value: "Enterprise SaaS at BrowserStack & Freshworks" },
  ],
};
