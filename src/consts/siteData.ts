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
  description?: string;
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
  phone: string;
  lastUpdated: string;
  visitorCount: string;
  sidebar: {
    now: SidebarNow;
    quote: SidebarQuote;
  };
}

// ---------------------------------------------------------------------------
// Resume Types
// ---------------------------------------------------------------------------

export interface Achievement {
  value: string;
  description: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl?: string;
  companyNote?: string;
  location: string;
  dateStart: string;
  dateEnd: string | null;
  dateDisplay: string;
  section: 'main' | 'early';
  highlights: string[];
}

export interface SkillCategory {
  label: string;
  key: string;
  items: string[];
}

export interface Education {
  institution: string;
  institutionUrl?: string;
  degree: string;
  minor?: string;
  graduation: string;
  graduationDisplay: string;
  gpa?: string;
  honors?: string;
  details?: string;
}

export interface Publication {
  title: string;
  description: string;
  url?: string;
  urlLabel?: string;
  year: string;
}

export interface LeadershipEntry {
  title: string;
  detail: string;
}

export interface Mentorship {
  period: string;
  summary: string;
  curriculum: string[];
  methodology: string;
  output: string;
}

export interface ResumeData {
  headline: string;
  location: string;
  summary: string;
  status: string;
  availability: string;
  achievements: Achievement[];
  experience: ExperienceEntry[];
  skills: SkillCategory[];
  education: Education[];
  publications: Publication[];
  leadership: LeadershipEntry[];
  mentorship: Mentorship;
}

export interface SiteData {
  site: SiteInfo;
  navigation: NavItem[];
  research: LabProject[];
  engineering: LabProject[];
  studioProjects: StudioProject[];
  writing: WritingPost[];
  allRepos: Repo[];
  resume: ResumeData;
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
    phone: '978-935-6430',
    lastUpdated: 'Feb 23, 2026',
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
      name: 'AI Safety Compass',
      description:
        'Research paper exploring a gap: do models actually believe what their creators say about safety? I call this "meta-alignment"—not whether models do safe things, but whether they\'ve internalized their lab\'s safety philosophy. Surveyed 10 frontier models with 40 questions derived from 70+ papers. Interactive tool included.',
      tags: ['Research', 'AI Safety', 'Meta-Alignment', 'Literature Synthesis'],
      links: [
        { label: 'GitHub', url: 'https://github.com/brysontang/ai-safety-compass' },
        {
          label: 'Paper',
          url: 'https://github.com/brysontang/ai-safety-compass/blob/main/PAPER.md',
        },
        { label: 'Live Demo', url: 'https://ai-safety-compass.vercel.app' },
      ],
    },
    {
      name: 'crystallize',
      description:
        "A framework that makes data science experiments reproducible. Jupyter notebooks hide state—you can't tell what order cells ran or what values held. Crystallize treats each experiment as an immutable record with automatic statistical checks. Long-term goal: infrastructure that lets AI agents run their own experiments.",
      tags: ['Research Tooling', 'Reproducibility', 'Experimental Rigor'],
      links: [
        { label: 'GitHub', url: 'https://github.com/brysontang/crystallize' },
        { label: 'Docs', url: 'https://brysontang.github.io/crystallize/' },
      ],
    },
    {
      name: 'Bias in Embedding-Based Hiring',
      description:
        'Mentored an intern through AI fairness research. Designed a reading curriculum building from language model basics through AI ethics and embedding bias. Structured methodology: hypotheses → experiments → paper draft. Result: unpublished paper investigating gender bias in AI-powered hiring systems.',
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
    {
      name: 'agent-tokens',
      description:
        'A protocol for declaring agent intent at the HTTP layer. The problem: when an agent makes a request, origins can\'t tell if it matches what the user actually wanted. User says "check weather," agent calls the bank API—how does the bank know to block it? Agent Tokens let agents declare their allowed scope upfront so middleware can enforce policy automatically.',
      tags: ['Protocol', 'Intent', 'Policy', 'Agent Systems'],
      links: [
        { label: 'Website', url: 'https://agenttokens.org' },
        { label: 'Spec', url: 'https://github.com/agentokens/agent-tokens' },
      ],
    },
    {
      name: 'Golden Gate Qwen',
      description:
        "Minimal replication of Anthropic's Golden Gate Claude on consumer hardware. Trains a Sparse Autoencoder on Qwen2.5-1.5B, discovers interpretable features, and steers model behavior — all on an RTX 3070 Ti. Demonstrates that mechanistic interpretability research is accessible beyond frontier-scale compute.",
      tags: [
        'Interpretability',
        'Sparse Autoencoder',
        'Feature Steering',
        'Mechanistic Interpretability',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/brysontang/golden-gate-qwen' }],
    },
    {
      name: 'ContextWars',
      description:
        'Adversarial token convergence experiments on MLX. Pits language models against each other to reveal training strata — solo mode converges in 2 iterations, adversarial mode never does. Under pressure, models collapse to their most defensible tokens, revealing composition invisible in normal evaluation.',
      tags: ['Interpretability', 'Adversarial', 'Model Fingerprinting', 'MLX'],
      links: [{ label: 'GitHub', url: 'https://github.com/brysontang/ContextWars' }],
    },
    {
      name: 'Synapse',
      description:
        "A proof-of-concept testing a new research workflow: use Crystallize to structure experiments, then let an LLM help implement hypotheses rapidly. Built in an evening to validate the loop. The insight wasn't the model—it was proving the workflow enables fast iteration.",
      tags: ['Workflow Demo', 'Fast Weights', 'Crystallize + LLM'],
      links: [{ label: 'GitHub', url: 'https://github.com/brysontang/Synapse' }],
    },
  ],

  // ---------------------------------------------------------------------------
  // Applied Engineering (Products / Systems)
  // ---------------------------------------------------------------------------
  engineering: [
    {
      name: 'Kern',
      description:
        'Event-driven ML service architecture enabling long-running agentic workflows. Designed around distributed systems constraints: Kafka for async (no HTTP timeouts), Redis for large results (Pusher limits), dual-mode for internal app + external API. 525K requests/month in production.',
      tags: ['Systems Architecture', 'FastAPI', 'Kafka', 'Distributed Systems'],
      links: [],
    },
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
      name: 'Generative-Art',
      description:
        "~430 pieces created over COVID — one per day, then weekly, then monthly. Learning to express myself through code after never practicing art growing up. All hand-written p5.js, no AI. Here, bugs aren't things to fix but interesting threads to follow toward emergent beauty.",
      medium: 'p5.js | Daily Practice | Emergence',
      links: [
        { label: 'Instagram', url: 'https://www.instagram.com/illiiillliililliiili/' },
        { label: 'GitHub', url: 'https://github.com/brysontang/Generative-Art' },
      ],
    },
    {
      name: 'Tree of Processing',
      description:
        "Mapped the Tree of Thought paper to generative art — could a branching structure make models more creative? Early LLM API experiments, back when you had to parse code from inconsistent outputs and couldn't pass images. The genesis of my artistic and research journeys intersecting.",
      medium: 'Generative Algorithm | LLM Research | Tree of Thought',
      links: [
        { label: 'GitHub', url: 'https://github.com/brysontang/tree-of-processing' },
        {
          label: 'Write-up',
          url: 'https://medium.com/@brysontang/tree-of-processing-bd002ca91396',
        },
      ],
    },
    {
      name: 'Inscription #18,538 (The Quine)',
      description:
        'A recursive Quine — a program that outputs its own source code — inscribed permanently on Bitcoin. Downloaded the entire blockchain locally to inscribe via CLI. Started when there were <100 inscriptions, hoping for under 1,000. Got 18,538. There are now ~100,000,000. It lives on every node in the network.',
      date: 'Jan 2023',
      medium: 'Bitcoin Blockchain | Ordinals',
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
      description: 'On measuring AI capabilities through calibration rather than benchmarks.',
    },
    {
      title: "Your Prompt's Favorite Prompt",
      url: 'https://medium.com/@brysontang/your-prompts-favorite-prompt-fae76a0b0eb0',
      date: 'Nov 2025',
      platform: 'Medium',
      description: 'LLMs are a megaphone, not a magic wand. Meta-prompting techniques.',
    },
    {
      title: 'The Bitter Lesson 2.0: Reasoning Without Worlds',
      url: 'https://noise2signal.bearblog.dev/the-bitter-lesson-20-reasoning-without-worlds/',
      date: 'Oct 2025',
      platform: 'Bear Blog',
      description: "Revisiting Rich Sutton's bitter lesson in the age of reasoning models.",
    },
    {
      title: 'Circuit Engineers: The Next Frontier of Software',
      url: 'https://noise2signal.bearblog.dev/circuit-engineers-the-next-frontier-of-software/',
      date: 'Sep 2025',
      platform: 'Bear Blog',
      description: 'How AI is changing the nature of software engineering.',
    },
    {
      title: 'The ChatBubble: Stop Bolting. Start Building.',
      url: 'https://noise2signal.bearblog.dev/the-chatbubble-build-value-not-boltons/',
      date: 'Aug 2025',
      platform: 'Bear Blog',
      description: 'Building AI-native products vs bolting AI onto existing ones.',
    },
    {
      title: 'Twelve Principles of AI-Native Engineering',
      url: 'https://noise2signal.bearblog.dev/twelve-principles-of-ainative-engineering/',
      date: 'Aug 2025',
      platform: 'Bear Blog',
      description: 'A manifesto for building software in the age of AI.',
    },
    {
      title: "The Last Illusion is 'As a Large Language Model'",
      url: 'https://noise2signal.bearblog.dev/the-last-illusion/',
      date: 'Jul 2025',
      platform: 'Bear Blog',
      description: 'On the performative nature of AI disclaimers.',
    },
    {
      title: 'The Quiet Pivot of Dr. Seuss',
      url: 'https://noise2signal.bearblog.dev/quiet-pivot-of-dr-seuss/',
      date: 'Jun 2025',
      platform: 'Bear Blog',
      description: 'Creativity, constraints, and finding your voice.',
    },
    {
      title: 'Grain of Thought',
      url: 'https://noise2signal.bearblog.dev/grain-of-thought/',
      date: 'Jun 2025',
      platform: 'Bear Blog',
      description: 'On the texture and granularity of reasoning.',
    },
    {
      title: 'p5.js Recursive Inscriptions Guide',
      url: 'https://medium.com/@brysontang/p5js-inscriptions-guide-8188ab132f58',
      date: 'Feb 2025',
      platform: 'Medium',
      description: 'How to inscribe generative art onto the Bitcoin blockchain for ~$12.',
    },
    {
      title: 'Creating a Nostr Client in TypeScript',
      url: 'https://medium.com/@brysontang/creating-a-nostr-client-in-typescript-a0ce023a0bfc',
      date: 'Oct 2023',
      platform: 'Medium',
      description: 'Building a creative coding platform on the Nostr protocol.',
    },
    {
      title: 'Tree of Processing',
      url: 'https://medium.com/@brysontang/tree-of-processing-bd002ca91396',
      date: 'Jun 2023',
      platform: 'Medium',
      description: 'Using recursive logic to generate organic forms in generative art.',
    },
  ],

  // ---------------------------------------------------------------------------
  // All Public Repos (for Archive index)
  // ---------------------------------------------------------------------------
  allRepos: [
    { name: 'golden-gate-qwen', url: 'https://github.com/brysontang/golden-gate-qwen' },
    { name: 'ContextWars', url: 'https://github.com/brysontang/ContextWars' },
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

  // ---------------------------------------------------------------------------
  // Resume Data
  // ---------------------------------------------------------------------------
  resume: {
    headline: 'Research Engineer | AI Systems Architect | MLOps | Agent Identity Protocols',
    location: 'Nashua, NH (Relocation Ready)',
    summary:
      '10 years building data and ML systems — from high school SQL dashboards to production infrastructure handling 525K requests/month. Research background: 70-paper literature synthesis on AI safety, backpropagation implementation from 1986 Rumelhart paper, research mentorship designing paper curricula. Architected sub-1s semantic search across 300k documents using vector embeddings + MongoDB hybrid queries. Created Agent Tokens Protocol (open standard for AI agent identity). Built 5-agent orchestration pipeline handling 150k+ line edits with zero regressions. WPI Data Science graduate (3.75 GPA, High Distinction). BlueDot AI Safety Alignment certified.',
    status: 'Open to AI Systems Architecture, MLOps, AI Safety, and Product roles',
    availability: 'Hybrid (3 days/week) or Remote | Relocation Ready | US Work Authorized',

    achievements: [
      { value: '525K', description: 'requests/month on production ML infrastructure' },
      { value: '150k', description: 'lines \u2192 agent-native codebase' },
      { value: '10x', description: 'query latency reduction (4s \u2192 0.4s)' },
      { value: '300k', description: 'resume chunks searchable in <1s via RAG' },
      { value: '466', description: 'safe merge requests shipped without regressions' },
      { value: '2wks\u21922d', description: 'prototype cycle acceleration via agent workflows' },
    ],

    experience: [
      {
        role: 'Founder',
        company: 'Syntropy Systems',
        companyUrl: 'https://syntropysystems.com',
        companyNote: '(Tang Tensor Trends LLC)',
        location: 'Nashua, NH',
        dateStart: '2026-01',
        dateEnd: null,
        dateDisplay: 'Jan 2026 - Present',
        section: 'main',
        highlights: [
          'Building AI infrastructure company: shared authentication, payments, and LLM tooling across product portfolio',
          'Independent research: replicating Anthropic\u2019s <strong>Golden Gate Claude</strong> on consumer hardware \u2014 training sparse autoencoders on Qwen2.5-1.5B for mechanistic interpretability',
          'Go backend architecture designed to scale with users, not ideas \u2014 hosting 100+ products on minimal infrastructure',
        ],
      },
      {
        role: 'Chief AI Officer',
        company: 'CazVid LLC',
        companyUrl: 'https://cazvid.com',
        companyNote: '(Bootstrapped, ~20 employees)',
        location: 'Nashua, NH (Remote)',
        dateStart: '2025-05',
        dateEnd: '2025-12',
        dateDisplay: 'May 2025 - Dec 2025',
        section: 'main',
        highlights: [
          'Architect <strong>Kern</strong> ML infrastructure (525K requests/month): event-driven pipelines, probabilistic classification, embedding systems, evaluation frameworks',
          'Design AI systems using frontier models; evaluate tradeoffs between approaches (cost, latency, accuracy) and select architectures that match business constraints',
          'Transformed 150k-line legacy codebase into agent-native code: 1400 lint fixes \u2192 900 type resolutions \u2192 300-test suite. Agentic coding now works like greenfield.',
          'Founded <strong>Palmera Labs</strong> (internal R&D): RAG systems, agent frameworks, fast-weight plasticity research',
          'Technical leadership: onboard 7-engineer team on AI coding agents, translate CEO/COO requirements into technical roadmaps',
          'Drove 466 merge requests with zero production regressions via automated guardrails',
        ],
      },
      {
        role: 'Director of AI',
        company: 'CazVid LLC',
        location: 'Nashua, NH',
        dateStart: '2024-09',
        dateEnd: '2025-05',
        dateDisplay: 'Sep 2024 - May 2025',
        section: 'main',
        highlights: [
          'Achieved sub-1s full-text search across 300k resume chunks via LLM/RAG + MongoDB hybrid filters',
          'Architected <strong>Kern ML service</strong>: FastAPI intake \u2192 Kafka queue \u2192 Redis state \u2192 NestJS/Pusher delivery',
          'Built universal matching algorithm using triplet loss embeddings + hybrid vector/text search',
          'Created no-code interface enabling non-engineers to deploy Codex-generated branches to production',
          'Synced GitLab CI/CD with GitHub Actions enabling repo-level context for AI agents',
        ],
      },
      {
        role: 'Senior Software Engineer / AI Specialist',
        company: 'CazVid LLC',
        companyNote: '(Bootstrapped, ~20 employees)',
        location: 'Phoenix, AZ',
        dateStart: '2023-08',
        dateEnd: '2024-10',
        dateDisplay: 'Aug 2023 - Oct 2024',
        section: 'main',
        highlights: [
          'Integrated ChatGPT API for automated client workflows, reducing response latency by 60%',
          'Built RAG-powered support desk handling 500+ daily queries with 94% resolution rate',
          'Designed vector-based matching algorithms using MongoDB Atlas Vector Search, improving match accuracy 35%',
          'Managed Apache Airflow pipelines processing 10k+ documents/day with 99.9% data consistency',
          'Maintained AWS ECS/Terraform infrastructure supporting $50k/mo cloud budget at 99.5% uptime',
        ],
      },
      {
        role: 'Software Engineer / Data Scientist',
        company: 'CazVid LLC',
        companyNote: '(Bootstrapped, ~20 employees)',
        location: 'Phoenix, AZ',
        dateStart: '2022-06',
        dateEnd: '2023-08',
        dateDisplay: 'Jun 2022 - Aug 2023',
        section: 'main',
        highlights: [
          'Engineered AWS infrastructure (ECS, S3) supporting 10k+ DAU with auto-scaling',
          'Architected web platform extending mobile app, increasing user engagement 40%',
          'Led post-acquisition technical integration: unified CI/CD, consolidated 3 codebases into 1',
        ],
      },
      {
        role: 'Full Stack Engineer / Junior Data Scientist',
        company: 'Agency Leads',
        location: 'Manchester, NH',
        dateStart: '2021-09',
        dateEnd: '2022-06',
        dateDisplay: 'Sep 2021 - Jun 2022',
        section: 'main',
        highlights: [
          'Built Vue.js + Express.js data entry platform from scratch, processing 50k+ records',
          'Reduced Typesense query latency from 4s to 0.4s (10x improvement) via index tuning',
          'Increased data production 125% by implementing work classification specializations',
          'Deployed AWS ECS infrastructure with Terraform enabling zero-downtime deployments',
          'Created Tableau dashboards driving $2M+ in data-informed sales decisions',
        ],
      },
      {
        role: 'AI/ML Capstone Project (MQP)',
        company: 'Dell EMC',
        location: 'Worcester, MA',
        dateStart: '2020-09',
        dateEnd: '2021-05',
        dateDisplay: 'Sep 2020 - May 2021',
        section: 'main',
        highlights: [
          'Built predictive model for hardware failure detection using deep learning on log data',
          'Applied Chi-Squared + Pearson correlation for feature selection across 500+ variables',
          'Presented weekly to Dell engineers; model deployed for internal diagnostic testing',
        ],
      },
      {
        role: 'Research Intern',
        company: 'WPI Computer Science Dept',
        location: 'Worcester, MA',
        dateStart: '2020-06',
        dateEnd: '2020-08',
        dateDisplay: 'Jun 2020 - Aug 2020',
        section: 'early',
        highlights: [
          'Built COVID-19 demographic dataset aggregating UN, WHO, and Johns Hopkins data. Wrote Python pipelines, hosted on MySQL, published to Kaggle for research community.',
        ],
      },
      {
        role: 'Software Engineering Intern',
        company: 'CyberSN',
        location: 'Boston, MA',
        dateStart: '2017-08',
        dateEnd: '2020-01',
        dateDisplay: 'Aug 2017 - Jan 2020 (2.5 years)',
        section: 'early',
        highlights: [
          'Full stack development on internal sales tooling (Blitz). Rapid prototyping, documented codebase architecture. Attended DEF CON 2019 (company-sponsored).',
        ],
      },
      {
        role: 'Data Intern',
        company: 'Biscom',
        location: 'Westford, MA',
        dateStart: '2015-05',
        dateEnd: '2017-07',
        dateDisplay: 'May 2015 - Jul 2017 (2 years)',
        section: 'early',
        highlights: [
          'First technical role at age 16. SQL queries on production databases, built user analytics dashboards in Excel, presented findings to company president and engineering team.',
        ],
      },
    ],

    skills: [
      {
        label: 'Research',
        key: 'research',
        items: [
          'PyTorch',
          'MLX',
          'NumPy',
          'scikit-learn',
          'Hugging Face',
          'distilabel',
          'Jupyter',
          'matplotlib',
          'LaTeX',
        ],
      },
      {
        label: 'Languages',
        key: 'languages',
        items: ['Python', 'TypeScript', 'JavaScript', 'Rust', 'SQL', 'Bash'],
      },
      {
        label: 'ML/AI',
        key: 'ml_ai',
        items: ['LangChain', 'RAG pipelines', 'Vector Embeddings', 'Triplet Loss'],
      },
      {
        label: 'MLOps',
        key: 'mlops',
        items: [
          'Apache Airflow',
          'MLflow',
          'Docker',
          'Kubernetes',
          'Weights & Biases',
          'GitHub Actions',
        ],
      },
      {
        label: 'Infrastructure',
        key: 'infrastructure',
        items: ['AWS (ECS, S3)', 'Cloudflare Workers', 'Terraform', 'Kafka', 'Redis'],
      },
      {
        label: 'Databases',
        key: 'databases',
        items: ['PostgreSQL', 'MongoDB', 'Typesense', 'Pinecone', 'SQLite'],
      },
      {
        label: 'Web',
        key: 'web',
        items: ['FastAPI', 'React', 'Next.js', 'Astro'],
      },
      {
        label: 'Protocols',
        key: 'protocols',
        items: ['MCP (Model Context Protocol)', 'Agent Tokens', 'REST', 'GraphQL', 'Nostr'],
      },
    ],

    education: [
      {
        institution: 'Worcester Polytechnic Institute (WPI)',
        degree: 'B.S. Data Science',
        minor: 'Mathematical Sciences',
        graduation: '2021-05',
        graduationDisplay: 'May 2021',
        gpa: '3.75/4.0',
        honors: 'Graduated with High Distinction',
      },
      {
        institution: 'BlueDot Impact',
        degree: 'AI Safety Fundamentals: Alignment',
        graduation: '2024-06',
        graduationDisplay: 'June 2024',
        details: '12-week certification',
      },
    ],

    publications: [
      {
        title: 'AI Safety Compass',
        description:
          '70-paper literature review exploring model meta-alignment. Original survey methodology mapping where models sit on alignment/openness axes.',
        url: 'https://github.com/brysontang/ai-safety-compass/blob/main/PAPER.md',
        urlLabel: 'Paper',
        year: '2024',
      },
      {
        title: 'Backprop Paper Replication',
        description:
          'Hand-derived gradients from Rumelhart et al. 1986, implemented on Apple MLX. No AI assistance \u2014 just the paper and framework docs.',
        url: 'https://github.com/brysontang/mlx-lab',
        urlLabel: 'GitHub',
        year: '2024',
      },
      {
        title: 'Introducing Agent Tokens',
        description:
          'Open standard for AI agent identity via cryptographic provenance. 50+ GitHub stars.',
        url: 'https://agenttokens.org',
        urlLabel: 'Website',
        year: '2024',
      },
      {
        title: 'Project EVE: Novel Launchsondes for Atmospheric Data',
        description: 'IEEE Xplore published. Co-author on environmental sensor network paper.',
        url: 'https://ieeexplore.ieee.org/document/9705814',
        urlLabel: 'Paper',
        year: '2022',
      },
    ],

    leadership: [
      { title: 'Founder, Palmera Labs', detail: 'Internal AI R&D division at CazVid (2025)' },
      {
        title: 'Founder, Syntropy Systems',
        detail: '(Tang Tensor Trends LLC) - AI infrastructure and research (2024-Present)',
      },
      { title: 'President, Phi Sigma Kappa', detail: 'WPI Chapter, 50+ members (2019)' },
      {
        title: 'Secretary, SIAM',
        detail: 'Society of Industrial and Applied Mathematics (2018)',
      },
    ],

    mentorship: {
      period: 'Summer 2025',
      summary:
        'Designed and led intern research project investigating bias in embedding-based hiring systems.',
      curriculum: [
        'Language Models are Few-Shot Learners (GPT-3)',
        'Chain-of-Thought Prompting Elicits Reasoning',
        'ReAct: Synergizing Reasoning and Acting',
        'Sparks of AGI: Early Experiments with GPT-4',
        'Core Views on AI Safety: When, Why, What, How',
        'Constitutional AI: Harmlessness from AI Feedback',
        'The Superintelligent Will (Bostrom 2012)',
        'Man is to Computer as Woman is to Homemaker? Debiasing Embeddings',
        'Synthetic Data Generation: A Survey',
        'Demystifying Embedding Spaces using LLMs',
        'What are polysemantic neurons?',
      ],
      methodology:
        'Structured research board (hypotheses \u2192 experiments \u2192 paper draft), weekly syncs, "stay one week ahead" cadence.',
      output:
        'Unpublished paper applying utilitarian frameworks to LLM ethics, investigating gender bias in synthetic resume retrieval systems.',
    },
  },
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
