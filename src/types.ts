export type ProjectStatus = 'Idea' | 'Building' | 'Testing' | 'Shipped' | 'Paused';
export type ProjectHealth = 'On track' | 'At risk' | 'Off track' | 'No update';
export type ContextFreshness = 'current' | 'aging' | 'stale' | 'missing';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectDecision {
  id: string;
  title: string;
  note: string;
  date: string;
}

export interface ProjectUpdate {
  id: string;
  health: Exclude<ProjectHealth, 'No update'>;
  summary: string;
  next: string;
  date: string;
}

export interface TimelineEvent {
  id: string;
  label: string;
  date: string;
  kind: 'milestone' | 'decision' | 'release' | 'note' | 'update';
}

export interface Project {
  id: string;
  name: string;
  category: string;
  tagline: string;
  status: ProjectStatus;
  progress: number;
  nextMilestone: string;
  updatedAt: string;
  accent: string;
  links: ProjectLink[];
  decisions: ProjectDecision[];
  updates: ProjectUpdate[];
  timeline: TimelineEvent[];
}

export function getProjectHealth(project: Project): ProjectHealth {
  return project.updates[0]?.health ?? 'No update';
}

export interface ProjectContextState {
  freshness: ContextFreshness;
  daysSinceUpdate: number | null;
}

export function getProjectContextState(project: Project, now = new Date()): ProjectContextState {
  const latestDate = project.updates[0]?.date;
  if (!latestDate) return { freshness: 'missing', daysSinceUpdate: null };

  const updateTime = Date.parse(`${latestDate}T12:00:00Z`);
  if (Number.isNaN(updateTime)) return { freshness: 'missing', daysSinceUpdate: null };

  const referenceTime = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12);
  const daysSinceUpdate = Math.max(0, Math.floor((referenceTime - updateTime) / 86_400_000));
  if (daysSinceUpdate <= 14) return { freshness: 'current', daysSinceUpdate };
  if (daysSinceUpdate <= 30) return { freshness: 'aging', daysSinceUpdate };
  return { freshness: 'stale', daysSinceUpdate };
}
