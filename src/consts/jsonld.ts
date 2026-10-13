// =============================================================================
// JSON-LD Structured Data (GEO) — shared by the professional landing page and
// the vintage BaseLayout so both surfaces emit identical entity data.
// =============================================================================

import { SITE_DATA } from './siteData';

const { site } = SITE_DATA;

// Using stable @id URIs for entity resolution across knowledge graphs
export const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.website}/#person`,
  name: site.title,
  givenName: 'Bryson',
  familyName: 'Tang',
  jobTitle: 'AI Systems Architect',
  description:
    'Founder of Syntropy Systems. Systems architect and researcher building agent evaluation and experiment infrastructure, interpretability tools, agent identity protocols, and generative art.',
  url: site.website,
  sameAs: [
    site.github,
    site.linkedin,
    site.bearblog,
    'https://medium.com/@brysontang',
    'https://ordinals.com/inscription/12efbc30f725fda94e6ebad175f19568e8ec6b7f353a8344a34efd37c81b4eb7i0',
  ],
  email: `mailto:${site.email}`,
  // Wikidata entity links for unambiguous semantic grounding
  knowsAbout: [
    { '@type': 'Thing', '@id': 'https://www.wikidata.org/wiki/Q2539', name: 'Machine Learning' },
    {
      '@type': 'Thing',
      '@id': 'https://www.wikidata.org/wiki/Q30642',
      name: 'Natural Language Processing',
    },
    { '@type': 'Thing', '@id': 'https://www.wikidata.org/wiki/Q80006', name: 'Data Science' },
    { '@type': 'Thing', '@id': 'https://www.wikidata.org/wiki/Q189136', name: 'Generative Art' },
    { '@type': 'Thing', name: 'Decentralized Systems' },
    { '@type': 'Thing', '@id': 'https://www.wikidata.org/wiki/Q13479982', name: 'Cryptocurrency' },
    { '@type': 'Thing', name: 'AI Safety' },
    { '@type': 'Thing', name: 'Agent Identity Protocols' },
    { '@type': 'Thing', name: 'MCP Servers' },
    { '@type': 'Thing', name: 'MLOps' },
    { '@type': 'Thing', name: 'Mechanistic Interpretability' },
    { '@type': 'Thing', name: 'Agent Evaluation' },
  ],
  // Proprietary concepts originated by this entity
  mainEntityOfPage: [
    {
      '@type': 'CreativeWork',
      name: 'Agent Tokens Protocol',
      description: 'A standard for AI agent identity via cryptographic provenance',
      url: 'https://agenttokens.org',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Resume MCP',
      description: 'Your identity as an API endpoint for AI agents',
      url: 'https://mcp.brysontang.com',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Crystallize',
      description: 'A framework for rigorous, reproducible data science pipelines',
      url: 'https://github.com/brysontang/crystallize',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Wind Tunnel',
      description: 'Unittest for tool-using LLM agents',
      url: 'https://github.com/syntropy-systems-oss/windtunnel',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Pit',
      description: 'A prediction market that schedules experiments',
      url: 'https://github.com/syntropy-systems-oss/pit',
    },
  ],
  // Education - linked to Wikidata for entity resolution
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    '@id': 'https://www.wikidata.org/wiki/Q49110',
    name: 'Worcester Polytechnic Institute',
    sameAs: 'https://www.wpi.edu',
  },
  // Current employer
  worksFor: {
    '@type': 'Organization',
    name: 'Syntropy Systems, Inc.',
    url: 'https://syntropy.systems',
    description: 'AI workers that handle routine work in the tools a team already uses',
  },
  // Current job title
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Founder',
    occupationLocation: {
      '@type': 'City',
      name: 'Nashua, NH',
    },
  },
};

export function buildJsonLdWebsite(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.website}/#website`,
    name: `${site.title} | The Digital Matroid`,
    url: site.website,
    description: description,
    inLanguage: 'en-US',
    author: { '@id': `${site.website}/#person` },
    publisher: { '@id': `${site.website}/#person` },
  };
}

// Additional schema for the MCP API endpoint
export const jsonLdApi = {
  '@context': 'https://schema.org',
  '@type': 'WebAPI',
  '@id': 'https://mcp.brysontang.com/#api',
  name: 'Bryson Tang MCP Server',
  description:
    'Model Context Protocol server for AI agents to query professional profile, projects, and skills',
  url: 'https://mcp.brysontang.com',
  documentation: 'https://mcp.brysontang.com/.well-known/mcp.json',
  provider: { '@id': `${site.website}/#person` },
  termsOfService: 'https://agenttokens.org',
};
