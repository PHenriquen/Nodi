import type { Project } from '../types';

const STORAGE_KEY = 'nodi.projects.v1';

function normalizeProject(project: Partial<Project>): Project | null {
  if (!project.id || !project.name || !project.status) return null;

  return {
    id: project.id,
    name: project.name,
    category: project.category ?? 'Project',
    tagline: project.tagline ?? 'Projeto em definição.',
    status: project.status,
    progress: Number.isFinite(project.progress) ? Number(project.progress) : 0,
    nextMilestone: project.nextMilestone ?? 'Definir o próximo passo.',
    updatedAt: project.updatedAt ?? new Date().toISOString().slice(0, 10),
    accent: project.accent ?? '#8bf0c8',
    links: Array.isArray(project.links) ? project.links : [],
    decisions: Array.isArray(project.decisions) ? project.decisions : [],
    updates: Array.isArray(project.updates) ? project.updates : [],
    timeline: Array.isArray(project.timeline) ? project.timeline : [],
  };
}

export function loadProjects(fallback: Project[]): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw) as Partial<Project>[];
    if (!Array.isArray(parsed) || !parsed.length) return fallback;

    const normalized = parsed.map(normalizeProject).filter((project): project is Project => project !== null);
    return normalized.length ? normalized : fallback;
  } catch {
    return fallback;
  }
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function resetProjects() {
  localStorage.removeItem(STORAGE_KEY);
}
