import { useMemo, useState } from 'react';
import type { Project } from '../types';
import { getProjectContextState } from '../types';
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
  const [contextFilter, setContextFilter] = useState<'all' | 'attention'>('all');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );

  const filtered = projects.filter((project) => {
    const matchesQuery = `${project.name} ${project.category} ${project.tagline}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'All' || project.category === category;
    const freshness = getProjectContextState(project).freshness;
    const matchesContext = contextFilter === 'all' || freshness !== 'current';
    return matchesQuery && matchesCategory && matchesContext;
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
  const contextDue = projects.filter((project) => getProjectContextState(project).freshness !== 'current').length;

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
          <article><small>CONTEXT DUE</small><strong>{contextDue}</strong><span>sem update recente</span></article>
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
        <select value={contextFilter} onChange={(event) => setContextFilter(event.target.value as 'all' | 'attention')} aria-label="Filtrar contexto">
          <option value="all">Todo contexto</option>
          <option value="attention">Precisa de update</option>
        </select>
      </div>

      <div className="project-grid">
        {filtered.length ? filtered.map((project) => <ProjectCard key={project.id} project={project} onOpen={onOpen} />) : (
          <div className="project-empty">
            <strong>Nenhum projeto neste recorte.</strong>
            <span>{contextFilter === 'attention' ? 'O contexto dos projetos está em dia.' : 'Tente ajustar a busca ou os filtros.'}</span>
          </div>
        )}
      </div>
    </section>
  );
}
