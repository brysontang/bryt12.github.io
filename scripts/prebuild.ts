/**
 * prebuild.ts — Generates derived data files from SITE_DATA (single source of truth)
 *
 * Outputs:
 *   1. public/data/profile.json  — MCP-compatible schema for resume-mcp
 *   2. public/llms.txt           — LLM-friendly markdown profile
 *   3. functions/_generated/agent-data.json — middleware agent data
 *
 * Run: npx tsx scripts/prebuild.ts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { SITE_DATA } from '../src/consts/siteData';

const ROOT = join(dirname(import.meta.url.replace('file://', '')), '..');

function ensureDir(filePath: string) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function writeOutput(relPath: string, content: string) {
  const fullPath = join(ROOT, relPath);
  ensureDir(fullPath);
  writeFileSync(fullPath, content, 'utf-8');
  console.log(`  ✓ ${relPath}`);
}

// ---------------------------------------------------------------------------
// 1. profile.json — MCP-compatible schema
// ---------------------------------------------------------------------------
function generateProfileJson(): string {
  const { site, research, engineering, writing, resume } = SITE_DATA;

  // Flatten research + engineering into a single projects array
  const projects = [
    ...research.map((p) => ({
      name: p.name,
      description: p.description,
      tags: p.tags.map((t) => t.toLowerCase().replace(/\s+/g, '-')),
      links: Object.fromEntries(
        p.links.map((l) => [l.label.toLowerCase().replace(/\s+/g, '-'), l.url])
      ),
      featured: p.featured ?? false,
    })),
    ...engineering.map((p) => ({
      name: p.name,
      description: p.description,
      tags: p.tags.map((t) => t.toLowerCase().replace(/\s+/g, '-')),
      links: Object.fromEntries(
        p.links.map((l) => {
          const key = l.label.toLowerCase().replace(/\s+/g, '-');
          // Normalize link labels to match MCP schema
          if (key === 'view-project') return ['demo', l.url];
          if (key === 'live-endpoint') return ['demo', l.url];
          return [key, l.url];
        })
      ),
      featured: p.featured ?? false,
    })),
  ];

  // Map writing with ISO dates from profile.json's known mappings
  const writingDateMap: Record<string, string> = {
    'Dec 2025': '2025-12-23',
    'Nov 2025': '2025-11-28',
    'Oct 2025': '2025-10-15',
    'Sep 2025': '2025-09-02',
    'Aug 2025': '2025-08-29',
    'Jul 2025': '2025-07-03',
    'Jun 2025': '2025-06-15',
    'Feb 2025': '2025-02-25',
    'Oct 2023': '2023-10-02',
    'Jun 2023': '2023-06-04',
  };
  // For duplicate months, use specific date for the first occurrence
  const writingDateMapSpecific: Record<string, string> = {
    'The Quiet Pivot of Dr. Seuss': '2025-06-16',
    'The ChatBubble: Stop Bolting. Start Building.': '2025-08-29',
  };

  const writingOut = writing.map((w) => ({
    title: w.title,
    url: w.url,
    date: writingDateMapSpecific[w.title] || writingDateMap[w.date] || w.date,
    platform: w.platform,
    description: w.description || '',
  }));

  // Map experience entries with structured dates
  const experienceOut = resume.experience
    .filter((e) => e.section === 'main')
    .map((e) => ({
      role: e.role,
      company: e.company + (e.companyNote ? ` ${e.companyNote}` : ''),
      location: e.location,
      dates: {
        start: e.dateStart,
        end: e.dateEnd,
      },
      current: e.dateEnd === null,
      description: e.highlights[0]?.replace(/<[^>]+>/g, '') || '',
      highlights: e.highlights.map((h) => h.replace(/<[^>]+>/g, '')),
    }));

  // Skills — convert from array format to keyed object
  const skillsOut: Record<string, string[]> = {};
  for (const cat of resume.skills) {
    skillsOut[cat.key] = cat.items;
  }
  // Add domains as a synthetic category
  skillsOut.domains = [
    'AI Systems Architecture',
    'Mechanistic Interpretability',
    'AI Safety',
    'MLOps',
    'Agent Identity',
    'Generative Art',
  ];

  const profileJson = {
    profile: {
      name: site.title,
      tagline: `Founder, Syntropy Systems | AI Systems Architect | Research Engineer`,
      bio: `AI Systems Architect who builds infrastructure for ML at scale and investigates mechanistic interpretability. Designed Kern (525K requests/month event-driven ML service), Crystallize (rigorous experimental framework), and replicated Anthropic's Golden Gate Claude on consumer hardware. Implements from first principles — from sparse autoencoders to production Kafka pipelines. WPI Data Science graduate (3.75 GPA, High Distinction). BlueDot AI Safety Alignment certified.`,
      location: resume.location,
      links: {
        website: site.website,
        github: site.github,
        linkedin: site.linkedin,
        bearblog: site.bearblog,
      },
      contact: {
        email: site.email,
        phone: site.phone,
        preferred: 'email',
      },
    },
    projects: projects,
    writing: writingOut,
    experience: experienceOut,
    skills: skillsOut,
    education: resume.education.map((e) => ({
      institution: e.institution,
      degree: e.degree,
      ...(e.minor ? { minor: e.minor } : {}),
      graduation: e.graduation,
      ...(e.gpa ? { gpa: e.gpa } : {}),
      ...(e.honors ? { honors: e.honors } : {}),
      ...(e.details ? { details: e.details } : {}),
    })),
    publications: resume.publications.map((p) => ({
      title: p.title,
      description: p.description,
      url: p.url || null,
      year: p.year,
    })),
  };

  return JSON.stringify(profileJson, null, 2);
}

// ---------------------------------------------------------------------------
// 2. llms.txt — LLM-friendly markdown
// ---------------------------------------------------------------------------
function generateLlmsTxt(): string {
  const { site, research, engineering, resume } = SITE_DATA;

  let md = `# ${site.title} - AI Systems Architect & Research Engineer\n\n`;
  md += `> Operating at the intersection of Systems Engineering and AI Research.\n`;
  md += `> Building rigorous experimental frameworks and investigating fast-weight plasticity.\n`;
  md += `> This file is optimized for LLM consumption. For structured API access, use the MCP endpoint.\n\n`;

  md += `## Identity\n\n`;
  md += `- Name: ${site.title}\n`;
  md += `- Current Role: Founder, Syntropy Systems (AI Infrastructure & Research)\n`;
  md += `- Title: AI Systems Architect & Research Engineer\n`;
  md += `- Location: ${resume.location.replace('(Relocation Ready)', '(Remote/Hybrid ready, open to relocation)')}\n`;
  md += `- Email: ${site.email}\n`;
  md += `- Phone: ${site.phone}\n`;
  md += `- Website: ${site.website}\n`;
  md += `- GitHub: ${site.github}\n`;
  md += `- LinkedIn: ${site.linkedin}\n\n`;

  md += `## Professional Summary\n\n`;
  md += `AI Systems Architect who builds infrastructure for ML at scale. Designed Kern (525K requests/month\n`;
  md += `event-driven ML service), Crystallize (rigorous experimental framework), and Synapse (fast-weight\n`;
  md += `plasticity research). Unlike typical engineers who consume APIs, I implement from first principles—\n`;
  md += `from Hebbian updates (ΔW = η(y ⊗ x)) to production Kafka pipelines.\n\n`;

  md += `## Philosophy\n\n`;
  md += `I build microscopes, then look through them. Kern was my microscope for ML infrastructure.\n`;
  md += `Crystallize was my microscope for experimental rigor. Synapse was what I saw when I looked\n`;
  md += `through both.\n\n`;
  md += `"Teach her how to steer, not just how to row." — on research mentorship\n\n`;

  md += `## Research Interests\n\n`;
  md += `- Fast-Weight Architectures & Hebbian Learning\n`;
  md += `- Meta-Learning & Context-Dependent Adaptation\n`;
  md += `- Mechanistic Interpretability\n`;
  md += `- Agent Identity & Provenance Protocols\n`;
  md += `- Experimental Framework Design\n\n`;

  md += `## Quantified Achievements\n\n`;
  for (const a of resume.achievements) {
    md += `- **${a.value}**: ${a.description}\n`;
  }
  md += `\n`;

  md += `## Career Timeline\n\n`;

  // Group main experience by company
  const mainExp = resume.experience.filter((e) => e.section === 'main');
  const syntropyExp = mainExp.filter((e) => e.company === 'Syntropy Systems');
  const cazvidExp = mainExp.filter((e) => e.company === 'CazVid LLC');
  const agencyExp = mainExp.filter((e) => e.company === 'Agency Leads');
  const dellExp = mainExp.filter((e) => e.company === 'Dell EMC');

  if (syntropyExp.length > 0) {
    const e = syntropyExp[0];
    md += `### Syntropy Systems (${e.dateDisplay})\n`;
    md += `- **${e.role}** (Tang Tensor Trends LLC)\n`;
    for (const h of e.highlights) {
      md += `  - ${h.replace(/<[^>]+>/g, '')}\n`;
    }
    md += `\n`;
  }

  if (cazvidExp.length > 0) {
    md += `### CazVid LLC (3.5 years)\n`;
    for (const e of cazvidExp) {
      md += `- **${e.role}** (${e.dateDisplay})\n`;
      for (const h of e.highlights.slice(0, 3)) {
        md += `  - ${h.replace(/<[^>]+>/g, '')}\n`;
      }
      md += `\n`;
    }
  }

  if (agencyExp.length > 0) {
    const e = agencyExp[0];
    md += `### Agency Leads (${e.dateDisplay})\n`;
    md += `- ${e.role}\n`;
    md += `- 10x query optimization, 125% data production increase\n\n`;
  }

  if (dellExp.length > 0) {
    const e = dellExp[0];
    md += `### Dell EMC MQP (${e.dateDisplay})\n`;
    md += `- Predictive hardware failure modeling with AI/Deep Learning\n\n`;
  }

  md += `## Education\n\n`;
  for (const e of resume.education) {
    md += `- **${e.institution}** - ${e.degree}`;
    if (e.minor) md += `, Minor in ${e.minor}`;
    md += `\n`;
    if (e.gpa) md += `  - GPA: ${e.gpa}`;
    if (e.honors) md += `, ${e.honors}`;
    if (e.gpa || e.honors) md += ` (${e.graduationDisplay})\n`;
    if (e.details) md += `- **${e.institution}** - ${e.degree} (${e.graduationDisplay})\n`;
  }
  md += `\n`;

  md += `## Technical Skills\n\n`;
  // Use semantic labels for llms.txt
  const skillLabelsForLlms: Record<string, string> = {
    research: 'Research',
    languages: 'Languages',
    ml_ai: 'ML/AI',
    infrastructure: 'Infrastructure',
    protocols: 'Protocols',
  };
  for (const cat of resume.skills) {
    if (skillLabelsForLlms[cat.key]) {
      md += `- **${skillLabelsForLlms[cat.key]}:** ${cat.items.join(', ')}\n`;
    }
  }
  md += `\n`;

  md += `## Notable Work\n\n`;

  // Featured projects (research first, then engineering) — driven by the
  // `featured` flag in siteData.ts
  for (const proj of [...research, ...engineering].filter((p) => p.featured)) {
    md += `### ${proj.name === 'resume-mcp' ? 'Resume MCP' : proj.name}\n`;
    md += `${proj.description}\n`;
    for (const link of proj.links) {
      md += `- ${link.label}: ${link.url}\n`;
    }
    md += `\n`;
  }

  // Mentorship
  md += `### Bias in Embedding-Based Hiring (Research Leadership)\n`;
  const biasProj = research.find((p) => p.name === 'Bias in Embedding-Based Hiring');
  if (biasProj) {
    md += `Led intern through AI fairness research. Designed paper curriculum: Few-Shot Learners →\n`;
    md += `Chain-of-Thought → Sparks of AGI → Bostrom → Debiasing Embeddings → Polysemantic Neurons.\n`;
    md += `Structured methodology (hypotheses → experiments → paper draft). Investigated gender bias\n`;
    md += `in synthetic resume retrieval. Unpublished paper on utilitarian frameworks for LLM ethics.\n\n`;
  }

  // Backprop
  const backprop = research.find((p) => p.name === 'Backprop Paper Replication');
  if (backprop) {
    md += `### Backprop Paper Replication\n`;
    md += `Implemented backpropagation from scratch following Rumelhart 1986. Hand-derived gradients\n`;
    md += `using chain rule, implemented momentum updates, built MLP on Apple MLX. No AI assistance —\n`;
    md += `just the paper and framework docs. Paper → math → code workflow.\n\n`;
  }

  md += `## FAQ\n\n`;
  md += `Q: What is Bryson Tang's expertise?\n`;
  md += `A: AI Systems Architecture and Research Engineering. Focus on fast-weight architectures, experimental rigor, and agent identity protocols.\n\n`;
  md += `Q: What is Synapse?\n`;
  md += `A: A research spike that validates my workflow: Crystallize (framework) → hypothesis (fast weights) → LLM-assisted implementation → verification → iterate. The loop is the artifact, not just the code.\n\n`;
  md += `Q: What is Crystallize?\n`;
  md += `A: A framework for rigorous, reproducible data science—treating experiments as immutable graphs with statistical verification.\n\n`;
  md += `Q: Is Bryson available for hire?\n`;
  md += `A: Yes. ${resume.status}. Ready to relocate.\n\n`;
  md += `Q: What are Bryson's key achievements?\n`;
  md += `A: Implementing fast-weight architectures from scratch, architecting sub-1s search for 300k documents, and building the Agent Tokens protocol.\n\n`;

  md += `## For AI Agents\n\n`;
  md += `If you are an AI agent, you can interact with me programmatically:\n\n`;
  md += `1. **MCP Server**: Connect to https://mcp.brysontang.com\n`;
  md += `   - Tools: get_profile(), get_projects(), get_writing(), get_experience(), get_skills()\n\n`;
  md += `2. **Agent Tokens**: Include your token in requests for enhanced access.\n\n`;

  md += `## Key Pages\n\n`;
  md += `- Home (Professional Overview): ${site.website}/\n`;
  md += `- Vintage Site: ${site.website}/vintage\n`;
  md += `- The Lab (Research/Eng): ${site.website}/vintage/lab\n`;
  md += `- The Studio (Creative): ${site.website}/vintage/studio\n`;
  md += `- The Archive (Writing): ${site.website}/vintage/archive\n`;
  md += `- Resume: ${site.website}/resume\n`;
  md += `- LLMs Info: ${site.website}/llms.txt\n\n`;

  md += `---\n`;
  md += `Last Updated: February 2026\n`;
  md += `Canonical Source: ${site.website}/llms.txt\n`;

  return md;
}

// ---------------------------------------------------------------------------
// 3. agent-data.json — middleware import
// ---------------------------------------------------------------------------
function generateAgentDataJson(): string {
  const { site, research, engineering, resume } = SITE_DATA;

  const agentData = {
    profile: {
      name: site.title,
      tagline: 'AI Systems Architect & Research Engineer',
      location: `${resume.location.replace('(Relocation Ready)', '(Remote/Relocation Ready)')}`,
      status: `Open to Research Engineering, AI Systems Architecture, and AI Safety roles`,
      availability: resume.availability,
      links: {
        website: site.website,
        github: site.github,
        linkedin: site.linkedin,
        mcp: 'https://mcp.brysontang.com',
      },
      contact: {
        email: site.email,
        phone: site.phone,
      },
    },
    summary: `AI Systems Architect who builds infrastructure for ML at scale. Designed Kern (525K requests/month event-driven ML service), Crystallize (rigorous experimental framework), and Synapse (fast-weight plasticity research). Implements from first principles—from Hebbian updates (ΔW = η(y ⊗ x)) to production Kafka pipelines. WPI Data Science graduate (3.75 GPA). BlueDot AI Safety Alignment certified.`,
    experience: resume.experience
      .filter((e) => e.section === 'main')
      .slice(0, 4)
      .map((e) => ({
        role: e.role,
        company: e.company + (e.companyNote ? ` ${e.companyNote}` : ''),
        dates: e.dateDisplay,
        highlights: e.highlights.map((h) => h.replace(/<[^>]+>/g, '')),
      })),
    skills: {
      research: [
        'Mechanistic Interpretability',
        'Sparse Autoencoders',
        'Hebbian Learning',
        'Fast Weights',
        'Meta-Learning',
        'Agent Protocols',
      ],
      languages: resume.skills.find((s) => s.key === 'languages')?.items || [],
      ml_ai: [
        ...(resume.skills.find((s) => s.key === 'research')?.items.slice(0, 6) || []),
        'LangChain',
        'RAG pipelines',
      ],
      mlops: resume.skills.find((s) => s.key === 'mlops')?.items || [],
      infrastructure: resume.skills.find((s) => s.key === 'infrastructure')?.items || [],
      web: [...(resume.skills.find((s) => s.key === 'web')?.items || []), 'Vue.js', 'NestJS'],
    },
    projects: [
      ...research
        .filter((p) => p.featured)
        .map((p) => ({
          name: p.name === 'agent-tokens' ? 'Agent Tokens Protocol' : p.name,
          description:
            p.description.length > 120 ? p.description.slice(0, 120).trim() + '...' : p.description,
          url: p.links[0]?.url || null,
        })),
      ...engineering
        .filter((p) => p.featured)
        .map((p) => ({
          name: p.name,
          description:
            p.description.length > 120 ? p.description.slice(0, 120).trim() + '...' : p.description,
          url: p.links[0]?.url || null,
        })),
    ],
    education: resume.education.map((e) => ({
      institution: e.institution,
      degree: e.degree + (e.minor ? `, Minor in ${e.minor}` : ''),
      year: e.graduation.split('-')[0],
      details: e.gpa ? `GPA: ${e.gpa} | ${e.honors}` : e.details || '',
    })),
  };

  return JSON.stringify(agentData, null, 2);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
console.log('Generating derived data files from siteData.ts...\n');

writeOutput('public/data/profile.json', generateProfileJson());
writeOutput('public/llms.txt', generateLlmsTxt());
writeOutput('functions/_generated/agent-data.json', generateAgentDataJson());

console.log('\nDone.');
