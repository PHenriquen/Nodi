export type ProjectStatus = 'Idea' | 'Building' | 'Testing' | 'Shipped' | 'Paused';

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

export interface TimelineEvent {
  id: string;
  label: string;
  date: string;
  kind: 'milestone' | 'decision' | 'release' | 'note';
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
  timeline: TimelineEvent[];
}
