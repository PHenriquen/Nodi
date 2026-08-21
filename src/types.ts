export type ProjectStatus = 'Idea' | 'Building' | 'Testing' | 'Shipped' | 'Paused';
export type ProjectHealth = 'On track' | 'At risk' | 'Off track' | 'No update';

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
