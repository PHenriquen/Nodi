import type { Project } from '../types';
import { getProjectHealth } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const health = getProjectHealth(project);
  const healthClass = health.toLowerCase().replaceAll(' ', '-');

  return (
    <button className="project-card" onClick={() => onOpen(project)}>
      <div className="project-card-head">
        <span className="project-dot" style={{ background: project.accent }} />
        <div className="project-card-signals"><span className={`health-dot health-${healthClass}`} /><span className={`status status-${project.status.toLowerCase()}`}>{project.status}</span></div>
      </div>
      <div>
        <p className="eyebrow">{project.category}</p>
        <h3>{project.name}</h3>
        <p className="project-tagline">{project.tagline}</p>
      </div>
      <div className="project-progress">
        <div><span style={{ width: `${project.progress}%`, background: project.accent }} /></div>
        <small>{project.progress}%</small>
      </div>
      <div className="project-next">
        <small>{health.toUpperCase()}</small>
        <span>{project.updates[0]?.summary ?? project.nextMilestone}</span>
      </div>
    </button>
  );
}
