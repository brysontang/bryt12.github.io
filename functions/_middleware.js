/**
 * Cloudflare Pages Functions Middleware
 * Handles ?agent=true requests for AI agent discovery
 */

// Agent profile data - kept in sync with site content
const AGENT_DATA = {
  profile: {
    name: 'Bryson Tang',
    tagline: 'AI Systems Architect & Research Engineer',
    location: 'Nashua, NH (Remote/Relocation Ready)',
    status: 'Open to Research Engineering, AI Systems Architecture, and AI Safety roles',
    availability: 'Hybrid (3 days/week) or Remote | US Work Authorized',
    links: {
      website: 'https://brysontang.com',
      github: 'https://github.com/brysontang',
      linkedin: 'https://www.linkedin.com/in/bryson-t-datascience/',
      mcp: 'https://mcp.brysontang.com',
    },
    contact: {
      email: 'brysontang@gmail.com',
      phone: '978-935-6430',
    },
  },

  summary: `AI Systems Architect who builds infrastructure for ML at scale. Designed Kern (525K requests/month event-driven ML service), Crystallize (rigorous experimental framework), and Synapse (fast-weight plasticity research). Implements from first principles—from Hebbian updates (ΔW = η(y ⊗ x)) to production Kafka pipelines. WPI Data Science graduate (3.75 GPA). BlueDot AI Safety Alignment certified.`,

  experience: [
    {
      role: 'Chief AI Officer',
      company: 'CazVid LLC',
      dates: 'May 2025 - Present',
      highlights: [
        'Founded Palmera Labs (internal R&D) to investigate RAG systems and agentic alignment',
        'Investigating fast-weight plasticity and error-modulated Hebbian updates',
        'Transformed 150k-line legacy codebase into agent-native code (1400 lint → 900 type → 300 tests)',
        'Lead AI architecture for video-based matching (hybrid vector/sparse retrieval)',
      ],
    },
    {
      role: 'Director of AI',
      company: 'CazVid LLC',
      dates: 'Sep 2024 - May 2025',
      highlights: [
        'Architected retrieval system using hybrid vector/sparse search strategies',
        'Delivered sub-1s search across 300k resume chunks',
        'Built Kern ML service event-driven architecture',
      ],
    },
    {
      role: 'Senior Software Engineer / AI Specialist',
      company: 'CazVid LLC',
      dates: 'Aug 2023 - Oct 2024',
      highlights: [
        'Integrated LLM reasoning loops into automated client workflows',
        'Built RAG-powered support desk with 94% resolution rate',
      ],
    },
  ],

  skills: {
    research: ['Hebbian Learning', 'Fast Weights', 'Meta-Learning', 'Mechanistic Interpretability', 'Agent Protocols'],
    languages: ['Python', 'TypeScript', 'JavaScript', 'Rust', 'SQL', 'Bash'],
    ml_ai: ['PyTorch', 'MLX', 'scikit-learn', 'Hugging Face', 'LangChain', 'RAG pipelines'],
    mlops: ['Apache Airflow', 'MLflow', 'Docker', 'Kubernetes', 'GitHub Actions'],
    infrastructure: ['AWS (ECS, S3, Lambda, SageMaker)', 'Cloudflare Workers', 'Terraform', 'Kafka', 'Redis'],
    web: ['React', 'Next.js', 'Vue.js', 'Astro', 'FastAPI', 'NestJS'],
  },

  projects: [
    {
      name: 'Synapse',
      description: 'Research spike validating Crystallize + LLM workflow for rapid hypothesis iteration. The loop is the artifact.',
      url: 'https://github.com/brysontang/Synapse',
    },
    {
      name: 'crystallize',
      description: 'Rigorous experimental framework for data science with immutable contexts and statistical verification',
      url: 'https://github.com/brysontang/crystallize',
    },
    {
      name: 'Agent Tokens Protocol',
      description: 'Cryptographic standard for agent provenance and identity',
      url: 'https://agenttokens.org',
    },
    {
      name: 'resume-mcp',
      description: 'MCP server exposing professional profile as queryable API',
      url: 'https://mcp.brysontang.com',
    },
    {
      name: 'Bloomdesk',
      description: 'AI pipeline converting bug reports into structured technical tickets',
      url: 'https://bloomdesk.dev',
    },
    {
      name: 'Kern',
      description: 'Event-driven ML architecture (525K req/month). Kafka + Redis + FastAPI for long-running agentic workflows.',
      url: null,
    },
    {
      name: 'Bias in Embedding-Based Hiring',
      description: 'Research leadership: designed paper curriculum, structured methodology, led intern through AI fairness research.',
      url: null,
    },
  ],

  education: [
    {
      institution: 'Worcester Polytechnic Institute (WPI)',
      degree: 'B.S. Data Science, Minor in Mathematical Sciences',
      year: '2021',
      details: 'GPA: 3.75/4.0 | Graduated with High Distinction',
    },
    {
      institution: 'BlueDot Impact',
      degree: 'AI Safety Fundamentals: Alignment',
      year: '2024',
      details: '12-week certification program',
    },
  ],
};

// Generate navigation page
function generateNavigation() {
  return `<!DOCTYPE html>
<html>
<head><title>Bryson Tang - Agent View</title></head>
<body>
<pre>
BRYSON TANG - STRUCTURED DATA FOR AI AGENTS
============================================

MCP Endpoint (preferred): https://mcp.brysontang.com
Discovery: https://mcp.brysontang.com/.well-known/mcp.json

Available Content Sections:
- https://brysontang.com/?agent=true&content=profile
- https://brysontang.com/?agent=true&content=resume
- https://brysontang.com/?agent=true&content=projects
- https://brysontang.com/?agent=true&content=skills
- https://brysontang.com/?agent=true&content=contact

Current Status: ${AGENT_DATA.profile.status}
Location: ${AGENT_DATA.profile.location}

Quick Summary:
- AI Systems Architect & Research Engineer
- Creator of Synapse (Fast-Weight Architecture) & Agent Tokens Protocol
- Builder of Crystallize (Experimental Framework)
- WPI Data Science (3.75 GPA, High Distinction)
- BlueDot AI Safety Alignment certified

Fetch any section URL above for detailed data.
</pre>
</body>
</html>`;
}

// Generate profile content
function generateProfile() {
  const p = AGENT_DATA.profile;
  return `BRYSON TANG - PROFILE
=====================

Name: ${p.name}
Title: ${p.tagline}
Location: ${p.location}

Status: ${p.status}
Availability: ${p.availability}

Links:
- Website: ${p.links.website}
- GitHub: ${p.links.github}
- LinkedIn: ${p.links.linkedin}
- MCP Endpoint: ${p.links.mcp}

Summary:
${AGENT_DATA.summary}

---
Other sections:
- https://brysontang.com/?agent=true&content=resume
- https://brysontang.com/?agent=true&content=projects
- https://brysontang.com/?agent=true&content=skills
- https://brysontang.com/?agent=true&content=contact
`;
}

// Generate resume content
function generateResume() {
  let output = `BRYSON TANG - RESUME
====================

${AGENT_DATA.profile.name}
${AGENT_DATA.profile.tagline}
${AGENT_DATA.profile.location}

SUMMARY
-------
${AGENT_DATA.summary}

EXPERIENCE
----------
`;

  for (const job of AGENT_DATA.experience) {
    output += `\n${job.role} | ${job.company}\n${job.dates}\n`;
    for (const h of job.highlights) {
      output += `  - ${h}\n`;
    }
  }

  output += `\nEDUCATION
---------
`;
  for (const edu of AGENT_DATA.education) {
    output += `${edu.institution}\n${edu.degree} (${edu.year})\n${edu.details}\n\n`;
  }

  output += `---
Other sections:
- https://brysontang.com/?agent=true&content=profile
- https://brysontang.com/?agent=true&content=projects
- https://brysontang.com/?agent=true&content=skills
- https://brysontang.com/?agent=true&content=contact
`;

  return output;
}

// Generate projects content
function generateProjects() {
  let output = `BRYSON TANG - PROJECTS
======================

`;
  for (const proj of AGENT_DATA.projects) {
    output += `${proj.name}\n${proj.description}\nURL: ${proj.url}\n\n`;
  }

  output += `---
Other sections:
- https://brysontang.com/?agent=true&content=profile
- https://brysontang.com/?agent=true&content=resume
- https://brysontang.com/?agent=true&content=skills
- https://brysontang.com/?agent=true&content=contact
`;

  return output;
}

// Generate skills content
function generateSkills() {
  const s = AGENT_DATA.skills;
  return `BRYSON TANG - SKILLS
====================

Research Interests: ${s.research.join(', ')}

Languages: ${s.languages.join(', ')}

ML/AI: ${s.ml_ai.join(', ')}

MLOps: ${s.mlops.join(', ')}

Infrastructure: ${s.infrastructure.join(', ')}

Web: ${s.web.join(', ')}

---
Other sections:
- https://brysontang.com/?agent=true&content=profile
- https://brysontang.com/?agent=true&content=resume
- https://brysontang.com/?agent=true&content=projects
- https://brysontang.com/?agent=true&content=contact
`;
}

// Generate contact content
function generateContact() {
  const p = AGENT_DATA.profile;
  return `BRYSON TANG - CONTACT
=====================

Email: ${p.contact.email}
Phone: ${p.contact.phone}
LinkedIn: ${p.links.linkedin}
GitHub: ${p.links.github}
Website: ${p.links.website}

MCP Endpoint: ${p.links.mcp}
(For AI agents: query structured data via MCP protocol)

Current Status: ${p.status}
Availability: ${p.availability}

---
Other sections:
- https://brysontang.com/?agent=true&content=profile
- https://brysontang.com/?agent=true&content=resume
- https://brysontang.com/?agent=true&content=projects
- https://brysontang.com/?agent=true&content=skills
`;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const isAgentMode = url.searchParams.get('agent') === 'true';

  // If not agent mode, pass through to static site
  if (!isAgentMode) {
    return context.next();
  }

  // Agent mode - determine content type
  const content = url.searchParams.get('content');

  let responseText;
  let contentType = 'text/plain; charset=utf-8';

  switch (content) {
    case 'profile':
      responseText = generateProfile();
      break;
    case 'resume':
      responseText = generateResume();
      break;
    case 'projects':
      responseText = generateProjects();
      break;
    case 'skills':
      responseText = generateSkills();
      break;
    case 'contact':
      responseText = generateContact();
      break;
    default:
      // Navigation page
      responseText = generateNavigation();
      contentType = 'text/html; charset=utf-8';
  }

  return new Response(responseText, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
