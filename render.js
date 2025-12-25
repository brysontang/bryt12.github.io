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
 * Initialize all renders based on what's on the page
 */
function initRenders() {
  renderLabProjects();
  renderStudioProjects();
  renderWritingList();
  renderRepoIndex();
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
