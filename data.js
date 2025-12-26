// =============================================================================
// SITE DATA - Central data store for all projects, writing, and repos
// =============================================================================

const SITE_DATA = {
  // ---------------------------------------------------------------------------
  // Site Info
  // ---------------------------------------------------------------------------
  site: {
    title: "Bryson Tang",
    tagline: "DATA ARTISAN & ARCHITECT",
    website: "https://brysontang.dev",
    github: "https://github.com/brysontang",
    email: "brysontang@gmail.com", // TODO: Consider using a contact form instead
    lastUpdated: "Dec 24, 2025",
    visitorCount: "018538",
    sidebar: {
      now: {
        header: "Currently Reading",
        title: "Paper: Scaling Laws for Neural Language Models",
        url: "https://arxiv.org/abs/2001.08361",
        note: "Understanding the empirical laws governing model performance."
      },
      quote: {
        header: "Axiom",
        text: "Prefer legibility over cleverness."
      }
    }
  },

  // ---------------------------------------------------------------------------
  // Featured Lab Projects (Engineering/Technical)
  // ---------------------------------------------------------------------------
  labProjects: [
    {
      name: "Bloomdesk",
      description: "Addressing the \"Translation Gap\" between users and engineers. An intelligent pipeline that converts vague bug reports into structured, high-entropy technical tickets using LLMs.",
      tags: ["Product", "AI Pipeline"],
      links: [
        { label: "View Project", url: "https://bloomdesk.dev" }
      ]
    },
    {
      name: "DeltaTask",
      description: "An MCP server that enables AI assistants to manage tasks in Obsidian. Bridges the gap between conversational AI and personal knowledge management.",
      tags: ["MCP", "Python", "Obsidian", "SQLite"],
      links: [
        { label: "GitHub", url: "https://github.com/brysontang/DeltaTask" }
      ]
    },
    {
      name: "crystallize",
      description: "A lightweight framework for rigorous, reproducible data science. Solving the \"hidden state\" problem of Jupyter notebooks by enforcing a \"Pipeline-as-Code\" philosophy.",
      tags: ["Python", "MLOps", "Reproducibility"],
      links: [
        { label: "GitHub", url: "https://github.com/brysontang/crystallize" },
        { label: "Docs", url: "https://brysontang.github.io/crystallize/" }
      ]
    },
    {
      name: "ai-safety-compass",
      description: "An interactive tool for exploring AI safety perspectives and frameworks. Visualize where different approaches fall on the safety landscape.",
      tags: ["Next.js", "Python", "AI Safety"],
      links: [
        { label: "GitHub", url: "https://github.com/brysontang/ai-safety-compass" },
        { label: "Live Demo", url: "https://ai-safety-compass.vercel.app" }
      ]
    },
    {
      name: "agent-tokens",
      description: "A standard proposal for AI Agent Identity. Shifting from adversarial bot detection to declared cryptographic provenance.",
      tags: ["Protocol", "Identity", "AI Safety"],
      links: [
        { label: "GitHub", url: "https://github.com/brysontang/agent-tokens" },
        { label: "Read PDF", url: "https://github.com/brysontang/agent-tokens/blob/main/Introducing%20Agent%20Tokens.pdf" }
      ]
    },
    {
      name: "resume-mcp",
      description: "Your identity as an API endpoint. An MCP server that lets AI agents query your professional profile with structured tools instead of scraping HTML.",
      tags: ["MCP", "Cloudflare Workers", "Agent Tokens"],
      links: [
        { label: "GitHub", url: "https://github.com/brysontang/resume-mcp" },
        { label: "Live Endpoint", url: "https://mcp.brysontang.dev" }
      ]
    },
    {
      name: "gcomm",
      description: "A Rust CLI for seamless communication with Ollama models. Fast, ergonomic, and designed for developer workflows.",
      tags: ["Rust", "Ollama", "DevTools"],
      links: [
        { label: "GitHub", url: "https://github.com/brysontang/gcomm" },
        { label: "crates.io", url: "https://crates.io/crates/gcomm" }
      ]
    }
  ],

  // ---------------------------------------------------------------------------
  // Studio Projects (Creative/Generative Art)
  // ---------------------------------------------------------------------------
  studioProjects: [
    {
      name: "Inscription #18,538 (The Quine)",
      description: "A recursive inscription created using a barebones node setup. No APIs, just raw CLI. It is a Quine—a program that outputs its own source code. It lives on every node in the network.",
      date: "Jan 2023",
      medium: "Bitcoin Blockchain",
      links: [
        { label: "View on Ordinals", url: "https://ordinals.com/inscription/12efbc30f725fda94e6ebad175f19568e8ec6b7f353a8344a34efd37c81b4eb7i0" },
        { label: "Write-up", url: "https://medium.com/@brysontang/p5js-inscriptions-guide-8188ab132f58" }
      ]
    },
    {
      name: "Matroid",
      description: "A decentralized curation client for generative art. Built on Nostr to separate identity from storage. Implements Kind 95 events to render p5.js sketches live in the browser, ensuring the art is a performance, not a recording.",
      medium: "TypeScript | Nostr Protocol",
      links: [
        { label: "GitHub", url: "https://github.com/brysontang/matroid" }
      ]
    },
    {
      name: "Tree of Processing",
      description: "The genesis of my artistic journey. Using recursive logic to generate organic forms. \"The map is not the territory, but the tree is the seed.\"",
      medium: "Generative Algorithm",
      links: [
        { label: "GitHub", url: "https://github.com/brysontang/tree-of-processing" },
        { label: "Write-up", url: "https://medium.com/@brysontang/tree-of-processing-bd002ca91396" }
      ]
    },
    {
      name: "Whisker",
      description: "A recipe discovery and management app. Clean, fast, and focused on the cooking experience.",
      medium: "Web App",
      links: [
        { label: "GitHub", url: "https://github.com/brysontang/Whisker" },
        { label: "Live", url: "https://whisker.recipes" }
      ]
    },
    {
      name: "Generative-Art",
      description: "A collection of generative art experiments and explorations in algorithmic aesthetics.",
      medium: "p5.js | Processing",
      links: [
        { label: "GitHub", url: "https://github.com/brysontang/Generative-Art" }
      ]
    },
    {
      name: "p5js-webxr",
      description: "Experiments bridging p5.js with WebXR for immersive generative experiences.",
      medium: "WebXR | p5.js",
      links: [
        { label: "GitHub", url: "https://github.com/brysontang/p5js-webxr" }
      ]
    }
  ],

  // ---------------------------------------------------------------------------
  // Writing (Blog posts, articles)
  // ---------------------------------------------------------------------------
  writing: [
    {
      title: "Tree of Processing",
      url: "https://medium.com/@brysontang/tree-of-processing-bd002ca91396",
      date: "2023",
      platform: "Medium"
    },
    {
      title: "Creating a Nostr Client in TypeScript",
      url: "https://medium.com/@brysontang/creating-a-nostr-client-in-typescript-a0ce023a0bfc",
      date: "2023",
      platform: "Medium"
    },
    {
      title: "p5.js Recursive Inscriptions Guide",
      url: "https://medium.com/@brysontang/p5js-inscriptions-guide-8188ab132f58",
      date: "2023",
      platform: "Medium"
    },
    {
      title: "Your Prompt's Favorite Prompt",
      url: "https://medium.com/@brysontang/your-prompts-favorite-prompt-fae76a0b0eb0",
      date: "2024",
      platform: "Medium"
    },
    // TODO: Add Bear blog posts here
    // {
    //   title: "Post Title",
    //   url: "https://your-bear-blog.bearblog.dev/post-slug",
    //   date: "2024",
    //   platform: "Bear"
    // }
  ],

  // ---------------------------------------------------------------------------
  // All Public Repos (for Archive index)
  // ---------------------------------------------------------------------------
  allRepos: [
    { name: "crystallize", url: "https://github.com/brysontang/crystallize" },
    { name: "mlx-lab", url: "https://github.com/brysontang/mlx-lab" },
    { name: "code2prompt", url: "https://github.com/brysontang/code2prompt" },
    { name: "nanoGPT-bilinear", url: "https://github.com/brysontang/nanoGPT-bilinear" },
    { name: "detachment-prompt", url: "https://github.com/brysontang/detachment-prompt" },
    { name: "bridge-protocol", url: "https://github.com/brysontang/bridge-protocol" },
    { name: "ChatGPT-System-Prompts", url: "https://github.com/brysontang/ChatGPT-System-Prompts" },
    { name: "ai-safety-compass", url: "https://github.com/brysontang/ai-safety-compass" },
    { name: "gcomm", url: "https://github.com/brysontang/gcomm" },
    { name: "triple-handshake", url: "https://github.com/brysontang/triple-handshake" },
    { name: "DeltaTask", url: "https://github.com/brysontang/DeltaTask" },
    { name: "inscription-minify", url: "https://github.com/brysontang/inscription-minify" },
    { name: "orchestra", url: "https://github.com/brysontang/orchestra" },
    { name: "Kacoach", url: "https://github.com/brysontang/Kacoach" },
    { name: "katrain-llm", url: "https://github.com/brysontang/katrain-llm" },
    { name: "insect", url: "https://github.com/brysontang/insect" },
    { name: "Whisker", url: "https://github.com/brysontang/Whisker" },
    { name: "agent-tokens", url: "https://github.com/brysontang/agent-tokens" },
    { name: "remote-prompt-caching", url: "https://github.com/brysontang/remote-prompt-caching" },
    { name: "activation-maximization", url: "https://github.com/brysontang/activation-maximization" },
    { name: "nextui", url: "https://github.com/brysontang/nextui" },
    { name: "matroid", url: "https://github.com/brysontang/matroid" },
    { name: "Generative-Art", url: "https://github.com/brysontang/Generative-Art" },
    { name: "p5js-webxr", url: "https://github.com/brysontang/p5js-webxr" },
    { name: "dot-product", url: "https://github.com/brysontang/dot-product" },
    { name: "tree-of-processing", url: "https://github.com/brysontang/tree-of-processing" },
    { name: "p5js-renderer-svelte", url: "https://github.com/brysontang/p5js-renderer-svelte" },
    { name: "kinds", url: "https://github.com/brysontang/kinds" },
    { name: "daisy", url: "https://github.com/brysontang/daisy" },
    { name: "arxiv-sanity-lite", url: "https://github.com/brysontang/arxiv-sanity-lite" },
    { name: "let-w--new-World", url: "https://github.com/brysontang/let-w--new-World" },
    { name: "DefinitelyTyped", url: "https://github.com/brysontang/DefinitelyTyped" },
    { name: "public-eth-wallet", url: "https://github.com/brysontang/public-eth-wallet" },
    { name: "budget-app", url: "https://github.com/brysontang/budget-app" },
    { name: "blog", url: "https://github.com/brysontang/blog" },
    { name: "bryt12.github.io", url: "https://github.com/brysontang/bryt12.github.io" },
    { name: "DS3010-Case-Study-1", url: "https://github.com/brysontang/DS3010-Case-Study-1" },
    { name: "Rubiks-Cube-Solver", url: "https://github.com/brysontang/Rubiks-Cube-Solver" },
    { name: "maze_creator", url: "https://github.com/brysontang/maze_creator" },
    { name: "maze_solver", url: "https://github.com/brysontang/maze_solver" },
    { name: "geb", url: "https://github.com/brysontang/geb" },
    { name: "Pop-music-predictor", url: "https://github.com/brysontang/Pop-music-predictor" },
    { name: "Heaps-Of-Work", url: "https://github.com/brysontang/Heaps-Of-Work" },
    { name: "Tron", url: "https://github.com/brysontang/Tron" }
  ]
};
