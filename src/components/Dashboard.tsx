import { useMemo, useState } from 'react';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';

interface DashboardProps {
  projects: Project[];
  mode: 'overview' | 'projects' | 'activity';
  onOpen: (project: Project) => void;
  onCreate: () => void;
}

export function Dashboard({ projects, mode, onOpen, onCreate }: DashboardProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );

  const filtered = projects.filter((project) => {
    const matchesQuery = `${project.name} ${project.category} ${project.tagline}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === 'All' || project.category === category);
  });

  const activity = projects
    .flatMap((project) => project.timeline.map((event) => ({ ...event, project: project.name, accent: project.accent })))
    .sort((a, b) => b.date.localeCompare(a.date));

  if (mode === 'activity') {
    return (
      <section className="page">
        <header className="page-header">
          <div><p className="eyebrow">WORK LOG</p><h1>Activity</h1></div>
          <button className="primary" onClick={onCreate}>New project</button>
        </header>
        <div className="activity-list">
          {activity.map((event) => (
            <button key={`${event.project}-${event.id}`} className="activity-row" onClick={() => {
              const project = projects.find((item) => item.name === event.project);
              if (project) onOpen(project);
            }}>
              <span className="activity-dot" style={{ background: event.accent }} />
              <div><strong>{event.label}</strong><small>{event.project} · {event.kind}</small></div>
              <time>{new Date(`${event.date}T12:00:00`).toLocaleDateString('pt-BR')}</time>
            </button>
          ))}
        </div>
      </section>
    );
  }

  const average = projects.length ? Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length) : 0;
  const active = projects.filter((project) => ['Building', 'Testing'].includes(project.status)).length;

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">PROJECT OPERATING SYSTEM</p>
          <h1>{mode === 'overview' ? 'Build with context.' : 'Projects'}</h1>
          {mode === 'overview' && <p className="lead">Não perca as decisões que transformam uma ideia em produto.</p>}
        </div>
        <button className="primary" onClick={onCreate}>New project</button>
      </header>

      {mode === 'overview' && (
        <div className="metric-grid">
          <article><small>PROJECTS</small><strong>{projects.length}</strong><span>em um único workspace</span></article>
          <article><small>ACTIVE</small><strong>{active}</strong><span>em construção ou teste</span></article>
          <article><small>AVG. PROGRESS</small><strong>{average}%</strong><span>visão simples, não promessa</span></article>
        </div>
      )}

      <div className="project-toolbar">
        <label className="search-box">
          <span>⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar projeto, categoria ou ideia…" />
        </label>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>

      <div className="project-grid">
        {filtered.map((project) => <ProjectCard key={project.id} project={project} onOpen={onOpen} />)}
      </div>
    </section>
  );
}
