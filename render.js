// =============================================================================
// RENDER FUNCTIONS - Generate HTML from SITE_DATA
// =============================================================================

/**
 * Render project cards for The Lab section
 */
function renderLabProjects() {
  const container = document.getElementById('lab-projects');
  if (!container) return;

  const html = SITE_DATA.labProjects.map(project => `
    <div class="project-card">
      <h4>${escapeHtml(project.name)}</h4>
      <p class="mono" style="font-size: 0.8rem; color: var(--dim-text)">
        ${project.tags.join(' | ')}
      </p>
      <p>${escapeHtml(project.description)}</p>
      <div class="project-links">
        ${project.links.map(link =>
          `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">[ ${escapeHtml(link.label)} ]</a>`
        ).join(' ')}
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

/**
 * Render projects for The Studio section
 */
function renderStudioProjects() {
  const container = document.getElementById('studio-projects');
  if (!container) return;

  const html = SITE_DATA.studioProjects.map(project => `
    <div class="studio-item">
      <h3>${escapeHtml(project.name)}</h3>
      <p><em>${project.date ? project.date + '. ' : ''}${escapeHtml(project.medium || '')}</em></p>
      <p>${escapeHtml(project.description)}</p>
      <div class="project-links">
        ${project.links.map(link =>
          `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">[ ${escapeHtml(link.label)} ]</a>`
        ).join(' ')}
      </div>
      <div class="decorative-hr">~ ~ ~</div>
    </div>
  `).join('');

  container.innerHTML = html;
}

/**
 * Render writing list for The Archive section
 */
function renderWritingList() {
  const container = document.getElementById('writing-list');
  if (!container) return;

  const html = SITE_DATA.writing.map(post => `
    <li>
      <span class="mono" style="color: var(--dim-text)">[${escapeHtml(post.date)}]</span>
      <a href="${escapeHtml(post.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(post.title)}</a>
      <span class="mono" style="font-size: 0.75rem; color: var(--dim-text)">— ${escapeHtml(post.platform)}</span>
    </li>
  `).join('');

  container.innerHTML = html;
}

/**
 * Render public repo index for The Archive section
 */
function renderRepoIndex() {
  const container = document.getElementById('repo-index');
  if (!container) return;

  const html = SITE_DATA.allRepos.map(repo =>
    `<a href="${escapeHtml(repo.url)}" target="_blank" rel="noopener noreferrer" class="repo-badge">${escapeHtml(repo.name)}</a>`
  ).join('');

  container.innerHTML = html;
}

/**
 * Render sidebar meta (Currently Reading + Axiom)
 */
function renderSidebarMeta() {
  const now = SITE_DATA.site.sidebar?.now;
  const quote = SITE_DATA.site.sidebar?.quote;

  const nowHeader = document.getElementById("now-header");
  const nowBody = document.getElementById("now-body");
  if (now && nowHeader && nowBody) {
    nowHeader.textContent = now.header || "Currently Reading";
    const linkHtml = now.url
      ? `<a href="${escapeHtml(now.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(now.title)}</a>`
      : escapeHtml(now.title);
    const noteHtml = now.note ? ` — ${escapeHtml(now.note)}` : '';
    nowBody.innerHTML = `<span>${linkHtml}${noteHtml}</span>`;
  }

  const quoteHeader = document.getElementById("quote-header");
  const quoteBody = document.getElementById("quote-body");
  if (quote && quoteHeader && quoteBody) {
    quoteHeader.textContent = quote.header || "Axiom";
    quoteBody.textContent = `"${quote.text || ""}"`;
  }
}

/**
 * Format SITE_DATA as LLM-friendly markdown and copy to clipboard
 */
function copyExperienceToClipboard() {
  const site = SITE_DATA.site;
  const btn = document.getElementById('copy-experience-btn');

  // Build the markdown string
  let md = `# ${site.title}\n`;
  md += `**${site.tagline}**\n\n`;

  md += `## Contact\n`;
  md += `- Website: ${site.website}\n`;
  md += `- GitHub: ${site.github}\n`;
  md += `- LinkedIn: https://www.linkedin.com/in/bryson-t-datascience/\n`;
  md += `- Email: ${site.email}\n\n`;

  md += `## About\n`;
  md += `Systems Architect and Data Artisan working at the intersection of Data Science, Generative Art, and Decentralized Protocols. `;
  md += `Focused on building reproducible ML pipelines, architecting identity protocols for AI agents, and inscribing recursive algorithms on Bitcoin.\n\n`;

  // Lab Projects
  md += `## Engineering Projects (The Lab)\n\n`;
  SITE_DATA.labProjects.forEach(project => {
    md += `### ${project.name}\n`;
    md += `${project.description}\n`;
    md += `- Tags: ${project.tags.join(', ')}\n`;
    project.links.forEach(link => {
      md += `- ${link.label}: ${link.url}\n`;
    });
    md += `\n`;
  });

  // Studio Projects
  md += `## Creative Projects (The Studio)\n\n`;
  SITE_DATA.studioProjects.forEach(project => {
    md += `### ${project.name}\n`;
    if (project.date || project.medium) {
      md += `*${project.date ? project.date + '. ' : ''}${project.medium || ''}*\n`;
    }
    md += `${project.description}\n`;
    project.links.forEach(link => {
      md += `- ${link.label}: ${link.url}\n`;
    });
    md += `\n`;
  });

  // Writing
  md += `## Writing\n\n`;
  SITE_DATA.writing.forEach(post => {
    md += `- **${post.title}** (${post.date}) - ${post.platform}\n`;
    md += `  ${post.url}\n`;
  });
  md += `\n`;

  // Currently reading
  if (site.sidebar?.now) {
    md += `## Currently Reading\n`;
    md += `${site.sidebar.now.title}\n`;
    if (site.sidebar.now.url) md += `${site.sidebar.now.url}\n`;
    if (site.sidebar.now.note) md += `*${site.sidebar.now.note}*\n`;
    md += `\n`;
  }

  // Axiom
  if (site.sidebar?.quote) {
    md += `## Personal Axiom\n`;
    md += `"${site.sidebar.quote.text}"\n\n`;
  }

  md += `---\n`;
  md += `*This context was exported from ${site.website} for use with LLMs.*\n`;

  // Copy to clipboard
  navigator.clipboard.writeText(md).then(() => {
    const originalText = btn.textContent;
    btn.textContent = '[ Copied! ]';
    btn.style.borderColor = 'var(--link)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.borderColor = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    btn.textContent = '[ Failed to copy ]';
    setTimeout(() => {
      btn.textContent = '[ Copy My Experience for LLM ]';
    }, 2000);
  });
}

/**
 * Initialize all renders based on what's on the page
 */
function initRenders() {
  renderLabProjects();
  renderStudioProjects();
  renderWritingList();
  renderRepoIndex();
  renderSidebarMeta();
}

/**
 * Simple HTML escaping for security
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initRenders);
