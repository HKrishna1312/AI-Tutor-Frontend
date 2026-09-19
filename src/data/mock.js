export const resume = {
  fileName: 'Alex_Johnson_Staff_Backend.pdf',
  fileSize: '284 KB',
  uploadedAt: '2 days ago',
  score: 86,
  status: 'Analyzed',
  name: 'Alex Johnson',
  email: 'alex.johnson@hireai.dev',
  phone: '+1 (415) 555-0182',
  location: 'San Francisco, CA',
  summary:
    'Staff Backend Engineer with 9+ years building high-throughput Python services and distributed systems. Design pragmatic architectures, own reliability at scale, and translate ambiguous product goals into shipped systems that hold together under load.',
  skills: [
    'Python', 'FastAPI', 'AsyncIO', 'PostgreSQL', 'Docker', 'Kubernetes',
    'Distributed Systems', 'Kafka', 'Raft', 'Terraform', 'Event-driven Design',
  ],
  experience: [
    {
      role: 'Staff Backend Engineer',
      company: 'Stripe',
      period: '2021 — Present',
      points: [
        'Led the concurrency and resilience program for payment reconciliation service serving ~1.2M req/min.',
        'Designed an event-driven pipeline (Kafka + Raft) cutting reprocessing time by 70%.',
        'Mentored 6 engineers and introduced a reliability scorecard now used org-wide.',
      ],
    },
    {
      role: 'Senior Backend Engineer',
      company: 'Cloudflare',
      period: '2018 — 2021',
      points: [
        'Built low-latency edge configuration APIs handling spike traffic to 40M RPS.',
        'Owned hot-path caching layer; reduced p99 latency from 180ms to 42ms.',
        'Introduced load-testing culture and chaos experiments across core services.',
      ],
    },
    {
      role: 'Backend Engineer',
      company: 'Datadog',
      period: '2016 — 2018',
      points: [
        'Shipped distributed tracing ingestion with deterministic sampling at scale.',
        'Improved query planner for tag-based metrics, cutting median timeseries write cost by 55%.',
      ],
    },
  ],
  education: [
    {
      school: 'Stanford University',
      degree: 'M.S. Computer Science — Distributed Systems',
      period: '2014 — 2016',
    },
    {
      school: 'UC Berkeley',
      degree: 'B.S. Electrical Engineering & Computer Science',
      period: '2010 — 2014',
    },
  ],
  projects: [
    {
      name: 'Reconcile-Ops',
      description: 'Open-source reconciliation engine with pluggable transports and idempotent retry semantics. ~2.1k GitHub stars.',
    },
    {
      name: 'Raft Viz',
      description: 'Live visualizer for Raft consensus that renders log replication, elections, and partitioned clusters.',
    },
  ],
  certifications: ['AWS Solutions Architect — Associate', 'Certified Kubernetes Administrator (CKA)'],
}

export const stageLabels = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected / Rejected']

const RESUME_KEY = 'hireai_resume'

const blankResume = {
  fileName: '',
  fileSize: '',
  uploadedAt: 'Just now',
  score: null,
  status: 'Analyzed',
  name: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certifications: [],
}

function isMockRecord(r) {
  return !!r && r.name === 'Alex Johnson' && String(r.email || '').endsWith('@hireai.dev')
}

export function getResume() {
  try {
    const raw = localStorage.getItem(RESUME_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (isMockRecord(parsed)) {
      localStorage.removeItem(RESUME_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function saveResume(profile = {}, meta = {}) {
  localStorage.setItem(
    RESUME_KEY,
    JSON.stringify({
      ...blankResume,
      ...profile,
      ...meta,
      uploadedAt: 'Just now',
    }),
  )
}

export function clearResume() {
  localStorage.removeItem(RESUME_KEY)
}

export const jobs = [
  {
    id: 'job-1',
    title: 'Python Backend Developer',
    company: 'Stripe',
    tile: 'S',
    tileClass: 'hot',
    location: 'Remote',
    salary: '$185k – $220k',
    experience: '3+ years',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
    matched: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    missing: ['AWS'],
    match: 89,
    description:
      'Build and scale the payments platform’s core Python services. You will own features end-to-end, improve reliability, and collaborate with product engineers across the company.',
    responsibilities: [
      'Design, build, and operate Python/FastAPI microservices in the payments core.',
      'Improve async throughput and resilience across a multi-region fleet.',
      'Work with product and data teams to ship payment features with correctness guarantees.',
      'Contribute to the platform’s developer experience and observability.',
    ],
  },
  {
    id: 'job-2',
    title: 'Platform Engineer',
    company: 'Vercel',
    tile: '▲',
    tileClass: 'blue',
    location: 'Remote',
    salary: '$175k – $215k',
    experience: '5+ years',
    skills: ['TypeScript', 'Kubernetes', 'Edge Computing', 'Systems Design', 'Go'],
    matched: ['Kubernetes', 'Systems Design', 'Distributed Systems'],
    missing: ['TypeScript', 'Go'],
    match: 92,
    description:
      'Own the control plane that powers a global edge runtime. Drive reliability and real-time synthesis across millions of concurrent deployments.',
    responsibilities: [
      'Design edge concurrency primitives and live problem synthesis tooling.',
      'Harden a multi-tenant control plane under global traffic.',
      'Evaluate system design trade-offs and publish design reviews.',
    ],
  },
  {
    id: 'job-3',
    title: 'Distributed Systems Engineer',
    company: 'Cloudflare',
    tile: 'CF',
    tileClass: 'amber',
    location: 'Hybrid — SF / Austin',
    salary: '$175k – $210k',
    experience: '4+ years',
    skills: ['Rust', 'C++', 'Low-Latency Networking', 'Kafka', 'Raft'],
    matched: ['Kafka', 'Raft', 'Low-Latency Networking', 'Distributed Systems'],
    missing: ['Rust', 'C++'],
    match: 88,
    description:
      'Deep-dive into the internals that move traffic around the world. This team owns the distributed state and consensus layers behind the edge.',
    responsibilities: [
      'Build consensus and replication primitives used across the edge.',
      'Profile and optimize hot paths to the nanosecond.',
    ],
  },
  {
    id: 'job-4',
    title: 'AI Infrastructure Engineer',
    company: 'Cohere',
    tile: 'C',
    tileClass: 'hot',
    location: 'Remote',
    salary: '$190k – $230k',
    experience: '5+ years',
    skills: ['LLM Serving', 'vLLM', 'Triton', 'GPU Orchestration', 'Terraform'],
    matched: ['Terraform', 'Kubernetes', 'Distributed Systems'],
    missing: ['vLLM', 'Triton'],
    match: 85,
    description:
      'Run the platform behind enterprise LLM deployments — serving stacks, GPU orchestration, and the tools that make inference reliable and fast.',
    responsibilities: [
      'Operate LLM serving infrastructure with strict SLOs.',
      'Automate GPU cluster provisioning and autoscaling.',
      'Build internal tooling for model observability and rollouts.',
    ],
  },
]

export const applications = [
  {
    id: 'app-1',
    jobId: 'job-2',
    company: 'Vercel',
    title: 'Platform Engineer',
    stage: 3,
    updatedAt: 'Today',
    match: 92,
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    company: 'Stripe',
    title: 'Python Backend Developer',
    stage: 2,
    updatedAt: '2 days ago',
    match: 89,
  },
  {
    id: 'app-3',
    jobId: 'job-3',
    company: 'Cloudflare',
    title: 'Distributed Systems Engineer',
    stage: 1,
    updatedAt: '1 week ago',
    match: 88,
  },
  {
    id: 'app-4',
    jobId: 'job-4',
    company: 'Cohere',
    title: 'AI Infrastructure Engineer',
    stage: 1,
    updatedAt: '1 week ago',
    match: 85,
  },
]

export const interviews = [
  {
    id: 'int-1',
    jobId: 'job-2',
    title: 'Platform Engineer',
    company: 'Vercel',
    tile: '▲',
    tileClass: 'blue',
    scheduledAt: 'Tomorrow · 10:00 AM PST',
    format: '25-min Autonomous AI Voice Screen',
    evaluates: 'System design, edge concurrency, live problem synthesis',
    status: 'scheduled',
    result: null,
  },
  {
    id: 'int-2',
    jobId: 'job-1',
    title: 'Python Backend Developer',
    company: 'Stripe',
    tile: 'S',
    tileClass: 'hot',
    scheduledAt: 'Completed · 3 days ago',
    format: '30-min AI Voice Screen',
    evaluates: 'Async performance, systems design, collaboration',
    status: 'completed',
    result: {
      overall: 82,
      technical: 85,
      communication: 78,
      problemSolving: 82,
      strengths: [
        'Deep Python/FastAPI fluency with concrete production evidence.',
        'Articulated trade-offs for async throughput clearly and concisely.',
      ],
      weaknesses: ['Rushed the initial system-design estimate before considering failure modes.'],
      improvement: [
        'Structure answers with claim → rationale → trade-off before jumping to code.',
        'Practice whiteboarding distributed consensus scenarios under time pressure.',
      ],
      recommendation:
        'Strong hire for the role after one focused follow-up on systems design. Recommend a second-round technical screen.',
    },
  },
]

export const suggestedQuestions = [
  'What are my strongest skills?',
  'How much Python experience do I have?',
  'What skills am I missing?',
  'How can I improve my resume?',
  'What jobs are suitable for me?',
  'Give me interview questions based on my resume.',
]

const ASK_BANK = {
  strongest: {
    text:
      'Your strongest signals are Python, FastAPI, and distributed systems. Your Stripe tenure shows production evidence of AsyncIO and concurrency engineering at high throughput, and Raft/Kafka experience adds credibility for consensus and event-driven design. Lead with these in any conversation.',
  },
  python: {
    text:
      'Based on your resume: roughly 9 years of professional Python, including 5+ years using it for high-throughput backend services (AsyncIO, FastAPI) since your time at Datadog. Your concurrency and microservices work is your most marketable Python evidence.',
  },
  missing: {
    text:
      'Compared to recommended roles, you are light on explicit AWS/ECS and Terraform production evidence — the Cohere and Stripe roles both call for it. GPU/LLM serving (vLLM, Triton) is another gap if you target AI-infra roles. Adding one deployed IaC project would close the biggest gap.',
  },
  improve: {
    text:
      'Recommend three quick wins: (1) quantify AWS/ECS/Terraform exposure with a concrete example, (2) add metrics to every bullet — impact beats activity, and (3) drop generic descriptors and lead with the systems you own. Your education section is solid and can stay compact.',
  },
  jobs: {
    text:
      'Your resume aligns best with Python-backed systems roles: Stripe Python Backend Developer (89%), Cloudflare Distributed Systems Engineer (88%), and Vercel Platform Engineer (92%). AI-infra roles are adjacent but need vLLM/Triton exposure to move past 85%.',
  },
  interview: {
    text:
      'Most likely questions for your profile: (1) walk through a time you designed a high-throughput async service, (2) explain how you would make a Raft-based system tolerant to network partitions, (3) design a job queue that must never lose a message, (4) how do you debug a p99 latency regression. Happy to run you through any of these.',
  },
  resume: () => ({
    text: `I can see your latest resume — ${getResume()?.fileName || 'your resume'} — analyzed and stored. Your profile is indexed and ready. Ask me about any part of your experience, skills, projects, or career.`,
  }),
}

export function askResume(question) {
  const q = question.toLowerCase()
  if (q.includes('skill') && (q.includes('missing') || q.includes('lack'))) return ASK_BANK.missing
  if (q.includes('improve') || q.includes('better') || q.includes('fix')) return ASK_BANK.improve
  if (q.includes('python') || q.includes('experience')) return ASK_BANK.python
  if (q.includes('job') || q.includes('suitable') || q.includes('role') || q.includes('career')) return ASK_BANK.jobs
  if (q.includes('interview') || q.includes('question')) return ASK_BANK.interview
  if (q.includes('strong') || q.includes('skill')) return ASK_BANK.strongest
  return ASK_BANK.resume()
}

export const interviewQuestions = [
  'Walk me through the last high-throughput Python service you designed. What were the bottlenecks and how did you resolve them?',
  'A distributed job queue must never lose a message. How would you design it, and what failure modes keep you up at night?',
  'Your reconciliation service saw p99 latency regress after a deploy. Walk me through your debugging process step by step.',
  'Explain how you would make a Raft-based storage layer tolerate a network partition without losing availability guarantees.',
]

export function interviewResult() {
  return {
    overall: 82,
    technical: 85,
    communication: 78,
    problemSolving: 82,
    strengths: [
      'Clear articulation of production trade-offs for concurrency.',
      'Strong command of Python/FastAPI ecosystem details.',
      'Demonstrated care for reliability and observable systems.',
    ],
    weaknesses: [
      'Initial systems-design answer jumped to a solution before scoping constraints.',
      'Paced slightly fast when discussing failure-mode trade-offs.',
    ],
    improvement: [
      'Use claim → rationale → trade-off structure before sketching code.',
      'Spend 60 seconds restating the problem before proposing a design.',
      'Practice whiteboarding consensus and queue designs under a timer.',
    ],
    recommendation:
      'Strong hire. Recommend a brief follow-up touchpoint focused on systems design, then proceed to the offer stage alongside the recruiter loop.',
  }
}

export function scoreClass(score) {
  if (score >= 90) return 'score-high'
  if (score >= 70) return 'score-mid'
  return 'score-low'
}

export function stageStatus(stageIndex, currentIndex) {
  if (stageIndex < currentIndex) return 'done'
  if (stageIndex === currentIndex) return 'current'
  return 'todo'
}

const APP_KEY = 'hireai_applications'

export function getApplications() {
  try {
    const raw = localStorage.getItem(APP_KEY)
    if (!raw) return applications
    const userApps = JSON.parse(raw)
    return [...userApps, ...applications.filter(a => !userApps.some(u => u.jobId === a.jobId))]
  } catch {
    return applications
  }
}

export function applyToJob(job) {
  try {
    const stored = JSON.parse(localStorage.getItem(APP_KEY) || '[]')
    if (stored.some(s => s.jobId === job.id)) return getApplications()
    stored.unshift({
      id: `app-${Date.now()}`,
      jobId: job.id,
      company: job.company,
      title: job.title,
      stage: 0,
      updatedAt: 'Just now',
      match: job.match,
    })
    localStorage.setItem(APP_KEY, JSON.stringify(stored))
  } catch {}
  return getApplications()
}

const SAVED_KEY = 'hireai_saved'

export function getSavedJobs() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || '[]')
  } catch {
    return []
  }
}

export function toggleSavedJob(jobId) {
  const saved = getSavedJobs()
  const next = saved.includes(jobId) ? saved.filter(id => id !== jobId) : [...saved, jobId]
  localStorage.setItem(SAVED_KEY, JSON.stringify(next))
  return next.includes(jobId)
}