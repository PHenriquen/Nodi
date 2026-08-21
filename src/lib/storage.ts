import type { Project } from '../types';

const STORAGE_KEY = 'nodi.projects.v1';

export function loadProjects(fallback: Project[]): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Project[];
    return Array.isArray(parsed) && parsed.length ? parsed : fallback;
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
