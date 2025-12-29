// =============================================================================
// SITE DATA - Central data store for all projects, writing, and repos
// =============================================================================

export interface ProjectLink {
  label: string;
  url: string;
}

export interface LabProject {
  name: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
}

export interface StudioProject {
  name: string;
  description: string;
  date?: string;
  medium?: string;
  links: ProjectLink[];
}

export interface WritingPost {
  title: string;
  url: string;
  date: string;
  platform: string;
}

export interface Repo {
  name: string;
  url: string;
}

export interface SidebarNow {
  header: string;
  title: string;
  url?: string;
  note?: string;
}

export interface SidebarQuote {
  header: string;
  text: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteInfo {
  title: string;
  tagline: string;
  website: string;
  github: string;
  linkedin: string;
  bearblog: string;
  email: string;
  lastUpdated: string;
  visitorCount: string;
  sidebar: {
    now: SidebarNow;
    quote: SidebarQuote;
  };
}

export interface SiteData {
  site: SiteInfo;
  navigation: NavItem[];
  research: LabProject[];
  engineering: LabProject[];
  studioProjects: StudioProject[];
  writing: WritingPost[];
  allRepos: Repo[];
}

export const SITE_DATA: SiteData = {
  // ---------------------------------------------------------------------------
  // Site Info
  // ---------------------------------------------------------------------------
  site: {
    title: 'Bryson Tang',
    tagline: 'SYSTEMS ARCHITECT & RESEARCHER',
    website: 'https://brysontang.com',
    github: 'https://github.com/brysontang',
    linkedin: 'https://www.linkedin.com/in/bryson-t-datascience/',
    bearblog: 'https://noise2signal.bearblog.dev/',
    email: 'brysontang@gmail.com',
    lastUpdated: 'Dec 28, 2025',
    visitorCount: '018538',
    sidebar: {
      now: {
        header: 'Currently Investigating',
        title: 'Superposition & Sparse Feature Decomposition',
        url: 'https://transformer-circuits.pub/2022/toy_model/index.html',
        note: 'Investigating how neural networks encode more features than dimensions.',
      },
      quote: {
        header: 'Motto',
        text: 'I want to leave things better than I found them.',
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Navigation Links
  // ---------------------------------------------------------------------------
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'The Lab', href: '/lab' },
    { label: 'The Studio', href: '/studio' },
    { label: 'The Archive', href: '/archive' },
    { label: 'Resume', href: '/resume' },
    { label: 'Guestbook', href: '/guestbook' },
  ],

  // ---------------------------------------------------------------------------
  // Research & Foundations (Deep Tech / Theory)
  // ---------------------------------------------------------------------------
  research: [
    {
      name: 'Synapse',
      description:
        'A research spike exploring fast-weight plasticity, built to validate that Crystallize + LLM-assisted development enables rapid hypothesis iteration. The architecture implements error-modulated Hebbian updates (ΔW = η(y ⊗ x)) — but the real artifact is the workflow: framework → theory → AI-assisted implementation → verification → next cycle.',
      tags: ['Research', 'Fast Weights', 'Meta-Tooling', 'LLM-Assisted'],
      links: [{ label: 'GitHub', url: 'https://github.com/brysontang/Synapse' }],
    },
    {
      name: 'crystallize',
      description:
        'A rigorous experimental framework for data science. Solves the "hidden state" problem of notebooks by treating experiments as immutable graphs with statistical verification. Built as the structural precursor for self-learning agents to autonomously iterate on hypotheses.',
      tags: ['Research Tooling', 'Reproducibility', 'Experimental Rigor'],
      links: [
        { label: 'GitHub', url: 'https://github.com/brysontang/crystallize' },
        { label: 'Docs', url: 'https://brysontang.github.io/crystallize/' },
      ],
    },
    {
      name: 'agent-tokens',
      description:
        'A cryptographic protocol for agent provenance. Formalizes identity via digital signatures rather than heuristic detection, applying distributed systems theory to the emerging agent ecosystem.',
      tags: ['Protocol', 'Identity', 'Cryptography', 'Agent Systems'],
      links: [
        { label: 'Website', url: 'https://agenttokens.org' },
        { label: 'Spec', url: 'https://github.com/agentokens/agent-tokens' },
      ],
    },
    {
      name: 'ai-safety-compass',
      description:
        'An interactive survey of the AI safety landscape, visualizing the topological relationships between divergent alignment frameworks and safety methodologies.',
      tags: ['AI Safety', 'Visualization', 'Alignment'],
      links: [
        { label: 'GitHub', url: 'https://github.com/brysontang/ai-safety-compass' },
        { label: 'Live Demo', url: 'https://ai-safety-compass.vercel.app' },
      ],
    },
    {
      name: 'Kern',
      description:
        'Event-driven ML service architecture enabling long-running agentic workflows. Designed around distributed systems constraints: Kafka for async (no HTTP timeouts), Redis for large results (Pusher limits), dual-mode for internal app + external API. 525K requests/month in production.',
      tags: ['Systems Architecture', 'FastAPI', 'Kafka', 'Distributed Systems'],
      links: [],
    },
    {
      name: 'Bias in Embedding-Based Hiring',
      description:
        'Led intern through AI fairness research: designed paper curriculum (Few-Shot Learners → Chain-of-Thought → Sparks of AGI → Bostrom → Debiasing Embeddings → Polysemantic Neurons), structured research methodology (hypotheses → experiments → paper draft). Investigated gender bias in synthetic resume retrieval. Unpublished paper on utilitarian frameworks for LLM ethics in hiring.',
      tags: ['Research Leadership', 'AI Fairness', 'Mentorship', 'Ethics'],
      links: [],
    },
    {
      name: 'Backprop Paper Replication',
      description:
        'Implemented backpropagation from scratch following the original 1986 Rumelhart paper. Hand-derived gradients using chain rule (∂E/∂w via ∂E/∂y → ∂E/∂x), implemented momentum updates (Δw(t) = -ε∂E/∂w + αΔw(t-1)), built MLP on Apple MLX. No AI assistance — just the paper and framework docs. Includes weight matrix evolution visualizations.',
      tags: ['Paper Implementation', 'MLX', 'Foundations', 'From Scratch'],
      links: [{ label: 'GitHub', url: 'https://github.com/brysontang/mlx-lab' }],
    },
  ],

  // ---------------------------------------------------------------------------
  // Applied Engineering (Products / Systems)
  // ---------------------------------------------------------------------------
  engineering: [
    {
      name: 'Bloomdesk',
      description:
        'Addressing the "Translation Gap" between users and engineers. An intelligent pipeline that converts vague bug reports into structured, high-entropy technical tickets using LLMs.',
      tags: ['Product', 'AI Pipeline', 'SaaS'],
      links: [{ label: 'View Project', url: 'https://bloomdesk.dev' }],
    },
    {
      name: 'resume-mcp',
      description:
        'Your identity as an API endpoint. An MCP server that lets AI agents query your professional profile with structured tools instead of scraping HTML.',
      tags: ['MCP', 'Cloudflare Workers', 'API'],
      links: [
        { label: 'GitHub', url: 'https://github.com/brysontang/resume-mcp' },
        { label: 'Live Endpoint', url: 'https://mcp.brysontang.com' },
      ],
    },
    {
      name: 'DeltaTask',
      description:
        'An MCP server that enables AI assistants to manage tasks in Obsidian. Bridges the gap between conversational AI and personal knowledge management.',
      tags: ['MCP', 'Python', 'Obsidian', 'SQLite'],
      links: [{ label: 'GitHub', url: 'https://github.com/brysontang/DeltaTask' }],
    },
    {
      name: 'gcomm',
      description:
        'A Rust CLI for seamless communication with Ollama models. Fast, ergonomic, and designed for developer workflows.',
      tags: ['Rust', 'Ollama', 'DevTools'],
      links: [
        { label: 'GitHub', url: 'https://github.com/brysontang/gcomm' },
        { label: 'crates.io', url: 'https://crates.io/crates/gcomm' },
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Studio Projects (Creative/Generative Art)
  // ---------------------------------------------------------------------------
  studioProjects: [
    {
      name: 'Inscription #18,538 (The Quine)',
      description:
        'A recursive inscription created using a barebones node setup. No APIs, just raw CLI. It is a Quine—a program that outputs its own source code. It lives on every node in the network.',
      date: 'Jan 2023',
      medium: 'Bitcoin Blockchain',
      links: [
        {
          label: 'View on Ordinals',
          url: 'https://ordinals.com/inscription/12efbc30f725fda94e6ebad175f19568e8ec6b7f353a8344a34efd37c81b4eb7i0',
        },
        {
          label: 'Write-up',
          url: 'https://medium.com/@brysontang/p5js-inscriptions-guide-8188ab132f58',
        },
      ],
    },
    {
      name: 'Matroid',
      description:
        'A decentralized curation client for generative art. Built on Nostr to separate identity from storage. Implements Kind 95 events to render p5.js sketches live in the browser, ensuring the art is a performance, not a recording.',
      medium: 'TypeScript | Nostr Protocol',
      links: [{ label: 'GitHub', url: 'https://github.com/brysontang/matroid' }],
    },
    {
      name: 'Tree of Processing',
      description:
        'The genesis of my artistic journey. Using recursive logic to generate organic forms. "The map is not the territory, but the tree is the seed."',
      medium: 'Generative Algorithm',
      links: [
        { label: 'GitHub', url: 'https://github.com/brysontang/tree-of-processing' },
        {
          label: 'Write-up',
          url: 'https://medium.com/@brysontang/tree-of-processing-bd002ca91396',
        },
      ],
    },
    {
      name: 'Whisker',
      description:
        'A recipe discovery and management app. Clean, fast, and focused on the cooking experience.',
      medium: 'Web App',
      links: [
        { label: 'GitHub', url: 'https://github.com/brysontang/Whisker' },
        { label: 'Live', url: 'https://whisker.recipes' },
      ],
    },
    {
      name: 'Generative-Art',
      description:
        'A collection of generative art experiments and explorations in algorithmic aesthetics.',
      medium: 'p5.js | Processing',
      links: [{ label: 'GitHub', url: 'https://github.com/brysontang/Generative-Art' }],
    },
    {
      name: 'p5js-webxr',
      description: 'Experiments bridging p5.js with WebXR for immersive generative experiences.',
      medium: 'WebXR | p5.js',
      links: [{ label: 'GitHub', url: 'https://github.com/brysontang/p5js-webxr' }],
    },
  ],

  // ---------------------------------------------------------------------------
  // Writing (Blog posts, articles)
  // ---------------------------------------------------------------------------
  writing: [
    {
      title: 'Calibration, Not Benchmarking',
      url: 'https://noise2signal.bearblog.dev/calibration-not-benchmarking/',
      date: 'Dec 2025',
      platform: 'Bear Blog',
    },
    {
      title: "Your Prompt's Favorite Prompt",
      url: 'https://medium.com/@brysontang/your-prompts-favorite-prompt-fae76a0b0eb0',
      date: 'Nov 2025',
      platform: 'Medium',
    },
    {
      title: 'The Bitter Lesson 2.0: Reasoning Without Worlds',
      url: 'https://noise2signal.bearblog.dev/the-bitter-lesson-20-reasoning-without-worlds/',
      date: 'Oct 2025',
      platform: 'Bear Blog',
    },
    {
      title: 'Circuit Engineers: The Next Frontier of Software',
      url: 'https://noise2signal.bearblog.dev/circuit-engineers-the-next-frontier-of-software/',
      date: 'Sep 2025',
      platform: 'Bear Blog',
    },
    {
      title: 'The ChatBubble: Stop Bolting. Start Building.',
      url: 'https://noise2signal.bearblog.dev/the-chatbubble-build-value-not-boltons/',
      date: 'Aug 2025',
      platform: 'Bear Blog',
    },
    {
      title: 'Twelve Principles of AI-Native Engineering',
      url: 'https://noise2signal.bearblog.dev/twelve-principles-of-ainative-engineering/',
      date: 'Aug 2025',
      platform: 'Bear Blog',
    },
    {
      title: "The Last Illusion is 'As a Large Language Model'",
      url: 'https://noise2signal.bearblog.dev/the-last-illusion/',
      date: 'Jul 2025',
      platform: 'Bear Blog',
    },
    {
      title: 'The Quiet Pivot of Dr. Seuss',
      url: 'https://noise2signal.bearblog.dev/quiet-pivot-of-dr-seuss/',
      date: 'Jun 2025',
      platform: 'Bear Blog',
    },
    {
      title: 'Grain of Thought',
      url: 'https://noise2signal.bearblog.dev/grain-of-thought/',
      date: 'Jun 2025',
      platform: 'Bear Blog',
    },
    {
      title: 'p5.js Recursive Inscriptions Guide',
      url: 'https://medium.com/@brysontang/p5js-inscriptions-guide-8188ab132f58',
      date: 'Feb 2025',
      platform: 'Medium',
    },
    {
      title: 'Creating a Nostr Client in TypeScript',
      url: 'https://medium.com/@brysontang/creating-a-nostr-client-in-typescript-a0ce023a0bfc',
      date: 'Oct 2023',
      platform: 'Medium',
    },
    {
      title: 'Tree of Processing',
      url: 'https://medium.com/@brysontang/tree-of-processing-bd002ca91396',
      date: 'Jun 2023',
      platform: 'Medium',
    },
  ],

  // ---------------------------------------------------------------------------
  // All Public Repos (for Archive index)
  // ---------------------------------------------------------------------------
  allRepos: [
    { name: 'Synapse', url: 'https://github.com/brysontang/Synapse' },
    { name: 'crystallize', url: 'https://github.com/brysontang/crystallize' },
    { name: 'mlx-lab', url: 'https://github.com/brysontang/mlx-lab' },
    { name: 'code2prompt', url: 'https://github.com/brysontang/code2prompt' },
    { name: 'nanoGPT-bilinear', url: 'https://github.com/brysontang/nanoGPT-bilinear' },
    { name: 'detachment-prompt', url: 'https://github.com/brysontang/detachment-prompt' },
    { name: 'bridge-protocol', url: 'https://github.com/brysontang/bridge-protocol' },
    { name: 'ChatGPT-System-Prompts', url: 'https://github.com/brysontang/ChatGPT-System-Prompts' },
    { name: 'ai-safety-compass', url: 'https://github.com/brysontang/ai-safety-compass' },
    { name: 'gcomm', url: 'https://github.com/brysontang/gcomm' },
    { name: 'triple-handshake', url: 'https://github.com/brysontang/triple-handshake' },
    { name: 'DeltaTask', url: 'https://github.com/brysontang/DeltaTask' },
    { name: 'inscription-minify', url: 'https://github.com/brysontang/inscription-minify' },
    { name: 'orchestra', url: 'https://github.com/brysontang/orchestra' },
    { name: 'Kacoach', url: 'https://github.com/brysontang/Kacoach' },
    { name: 'katrain-llm', url: 'https://github.com/brysontang/katrain-llm' },
    { name: 'insect', url: 'https://github.com/brysontang/insect' },
    { name: 'Whisker', url: 'https://github.com/brysontang/Whisker' },
    { name: 'agent-tokens', url: 'https://github.com/agentokens/agent-tokens' },
    { name: 'remote-prompt-caching', url: 'https://github.com/brysontang/remote-prompt-caching' },
    {
      name: 'activation-maximization',
      url: 'https://github.com/brysontang/activation-maximization',
    },
    { name: 'nextui', url: 'https://github.com/brysontang/nextui' },
    { name: 'matroid', url: 'https://github.com/brysontang/matroid' },
    { name: 'Generative-Art', url: 'https://github.com/brysontang/Generative-Art' },
    { name: 'p5js-webxr', url: 'https://github.com/brysontang/p5js-webxr' },
    { name: 'dot-product', url: 'https://github.com/brysontang/dot-product' },
    { name: 'tree-of-processing', url: 'https://github.com/brysontang/tree-of-processing' },
    { name: 'p5js-renderer-svelte', url: 'https://github.com/brysontang/p5js-renderer-svelte' },
    { name: 'kinds', url: 'https://github.com/brysontang/kinds' },
    { name: 'daisy', url: 'https://github.com/brysontang/daisy' },
    { name: 'arxiv-sanity-lite', url: 'https://github.com/brysontang/arxiv-sanity-lite' },
    { name: 'let-w--new-World', url: 'https://github.com/brysontang/let-w--new-World' },
    { name: 'DefinitelyTyped', url: 'https://github.com/brysontang/DefinitelyTyped' },
    { name: 'public-eth-wallet', url: 'https://github.com/brysontang/public-eth-wallet' },
    { name: 'budget-app', url: 'https://github.com/brysontang/budget-app' },
    { name: 'blog', url: 'https://github.com/brysontang/blog' },
    { name: 'bryt12.github.io', url: 'https://github.com/brysontang/bryt12.github.io' },
    { name: 'DS3010-Case-Study-1', url: 'https://github.com/brysontang/DS3010-Case-Study-1' },
    { name: 'Rubiks-Cube-Solver', url: 'https://github.com/brysontang/Rubiks-Cube-Solver' },
    { name: 'maze_creator', url: 'https://github.com/brysontang/maze_creator' },
    { name: 'maze_solver', url: 'https://github.com/brysontang/maze_solver' },
    { name: 'geb', url: 'https://github.com/brysontang/geb' },
    { name: 'Pop-music-predictor', url: 'https://github.com/brysontang/Pop-music-predictor' },
    { name: 'Heaps-Of-Work', url: 'https://github.com/brysontang/Heaps-Of-Work' },
    { name: 'Tron', url: 'https://github.com/brysontang/Tron' },
  ],
};

// Helper function to generate LLM-friendly markdown export
export function generateLLMExport(): string {
  const { site, research, engineering, studioProjects, writing } = SITE_DATA;

  let md = `# ${site.title}\n`;
  md += `**${site.tagline}**\n\n`;

  md += `## Contact\n`;
  md += `- Website: ${site.website}\n`;
  md += `- GitHub: ${site.github}\n`;
  md += `- LinkedIn: ${site.linkedin}\n`;
  md += `- Email: ${site.email}\n\n`;

  md += `## About\n`;
  md += `Systems Architect and Researcher working at the intersection of AI theory and production systems. `;
  md += `Building rigorous experimental frameworks, investigating fast-weight plasticity, and architecting identity protocols for AI agents.\n\n`;

  md += `## Research & Foundations\n\n`;
  research.forEach((project) => {
    md += `### ${project.name}\n`;
    md += `${project.description}\n`;
    md += `- Tags: ${project.tags.join(', ')}\n`;
    project.links.forEach((link) => {
      md += `- ${link.label}: ${link.url}\n`;
    });
    md += `\n`;
  });

  md += `## Applied Engineering\n\n`;
  engineering.forEach((project) => {
    md += `### ${project.name}\n`;
    md += `${project.description}\n`;
    md += `- Tags: ${project.tags.join(', ')}\n`;
    project.links.forEach((link) => {
      md += `- ${link.label}: ${link.url}\n`;
    });
    md += `\n`;
  });

  md += `## Creative Projects (The Studio)\n\n`;
  studioProjects.forEach((project) => {
    md += `### ${project.name}\n`;
    if (project.date || project.medium) {
      md += `*${project.date ? project.date + '. ' : ''}${project.medium || ''}*\n`;
    }
    md += `${project.description}\n`;
    project.links.forEach((link) => {
      md += `- ${link.label}: ${link.url}\n`;
    });
    md += `\n`;
  });

  md += `## Writing\n\n`;
  writing.forEach((post) => {
    md += `- **${post.title}** (${post.date}) - ${post.platform}\n`;
    md += `  ${post.url}\n`;
  });
  md += `\n`;

  if (site.sidebar?.now) {
    md += `## Currently Investigating\n`;
    md += `${site.sidebar.now.title}\n`;
    if (site.sidebar.now.url) md += `${site.sidebar.now.url}\n`;
    if (site.sidebar.now.note) md += `*${site.sidebar.now.note}*\n`;
    md += `\n`;
  }

  if (site.sidebar?.quote) {
    md += `## Personal Axiom\n`;
    md += `"${site.sidebar.quote.text}"\n\n`;
  }

  md += `---\n`;
  md += `*This context was exported from ${site.website} for use with LLMs.*\n`;

  return md;
}
