import { useState } from 'react';
import type { Project, ProjectHealth, ProjectStatus } from '../types';
import { getProjectContextState, getProjectHealth } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onChange: (project: Project) => void;
}

const statuses: ProjectStatus[] = ['Idea', 'Building', 'Testing', 'Shipped', 'Paused'];
const healthOptions: Exclude<ProjectHealth, 'No update'>[] = ['On track', 'At risk', 'Off track'];

export function ProjectDetail({ project, onBack, onChange }: ProjectDetailProps) {
  const [decisionTitle, setDecisionTitle] = useState('');
  const [decisionNote, setDecisionNote] = useState('');
  const [updateHealth, setUpdateHealth] = useState<Exclude<ProjectHealth, 'No update'>>('On track');
  const [updateSummary, setUpdateSummary] = useState('');
  const [updateNext, setUpdateNext] = useState('');
  const [preview, setPreview] = useState(false);

  function patch(change: Partial<Project>) {
    onChange({ ...project, ...change, updatedAt: new Date().toISOString().slice(0, 10) });
  }

  function addDecision(event: React.FormEvent) {
    event.preventDefault();
    if (!decisionTitle.trim()) return;
    const date = new Date().toISOString().slice(0, 10);
    const decision = { id: crypto.randomUUID(), title: decisionTitle.trim(), note: decisionNote.trim(), date };
    patch({
      decisions: [decision, ...project.decisions],
      timeline: [{ id: crypto.randomUUID(), label: decision.title, date, kind: 'decision' }, ...project.timeline],
    });
    setDecisionTitle('');
    setDecisionNote('');
  }

  function addUpdate(event: React.FormEvent) {
    event.preventDefault();
    if (!updateSummary.trim()) return;
    const date = new Date().toISOString().slice(0, 10);
    const update = {
      id: crypto.randomUUID(),
      health: updateHealth,
      summary: updateSummary.trim(),
      next: updateNext.trim(),
      date,
    };
    patch({
      updates: [update, ...project.updates],
      timeline: [{ id: crypto.randomUUID(), label: `Update: ${update.health}`, date, kind: 'update' }, ...project.timeline],
    });
    setUpdateSummary('');
    setUpdateNext('');
  }

  async function copySummary() {
    const latestUpdate = project.updates[0];
    const text = [
      `${project.name} — ${project.category}`,
      project.tagline,
      `Status: ${project.status} · ${project.progress}% · Health: ${getProjectHealth(project)}`,
      `Próximo marco: ${project.nextMilestone}`,
      latestUpdate ? `Último update: ${latestUpdate.summary}` : '',
    ].filter(Boolean).join('\n');
    await navigator.clipboard.writeText(text);
  }

  const latestUpdate = project.updates[0];
  const context = getProjectContextState(project);
  const contextMessage = context.freshness === 'missing'
    ? 'Este projeto ainda não tem contexto publicado.'
    : context.freshness === 'aging'
      ? `O último contexto tem ${context.daysSinceUpdate} dias. Vale confirmar se ele ainda representa o projeto.`
      : context.freshness === 'stale'
        ? `O último contexto tem ${context.daysSinceUpdate} dias e pode não representar mais o projeto.`
        : null;

  if (preview) {
    return (
      <section className="public-shell">
        <button className="back-link" onClick={() => setPreview(false)}>← Voltar ao workspace</button>
        <div className="public-card">
          <div className="public-mark" style={{ borderColor: project.accent }}><span style={{ background: project.accent }} /></div>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.name}</h1>
          <p className="public-tagline">{project.tagline}</p>
          <div className="public-meta"><span>{project.status}</span><span>{project.progress}%</span><span>{getProjectHealth(project)}</span><span>Atualizado {new Date(`${project.updatedAt}T12:00:00`).toLocaleDateString('pt-BR')}</span></div>
          {latestUpdate && <div className="public-section"><small>LATEST UPDATE</small><h3>{latestUpdate.summary}</h3>{latestUpdate.next && <p>{latestUpdate.next}</p>}</div>}
          <div className="public-section"><small>NEXT MILESTONE</small><h3>{project.nextMilestone}</h3></div>
          <div className="public-section"><small>DECISIONS</small>{project.decisions.slice(0, 3).map((decision) => <article key={decision.id}><strong>{decision.title}</strong><p>{decision.note || 'Sem nota adicional.'}</p></article>)}</div>
          <button className="secondary" onClick={copySummary}>Copiar resumo público</button>
        </div>
      </section>
    );
  }

  return (
    <section className="page detail-page">
      <button className="back-link" onClick={onBack}>← Projects</button>
      <header className="detail-header">
        <div>
          <div className="detail-title-row"><span className="project-dot large" style={{ background: project.accent }} /><div><p className="eyebrow">{project.category}</p><h1>{project.name}</h1></div></div>
          <p className="lead">{project.tagline}</p>
        </div>
        <button className="secondary" onClick={() => setPreview(true)}>Public preview</button>
      </header>

      <div className="detail-grid">
        <div className="detail-main">
          <article className="panel-card">
            <div className="section-head"><div><p className="eyebrow">PULSE</p><h2>Project update</h2></div><span className={`health-pill health-${getProjectHealth(project).toLowerCase().replaceAll(' ', '-')}`}>{getProjectHealth(project)}</span></div>
            {contextMessage && <div className={`context-notice context-${context.freshness}`}><strong>Context check</strong><span>{contextMessage}</span></div>}
            <form className="update-form" onSubmit={addUpdate}>
              <div className="health-picker">{healthOptions.map((health) => <button type="button" key={health} className={updateHealth === health ? 'selected' : ''} onClick={() => setUpdateHealth(health)}>{health}</button>)}</div>
              <textarea rows={3} value={updateSummary} onChange={(event) => setUpdateSummary(event.target.value)} placeholder="O que mudou desde o último update?" />
              <input value={updateNext} onChange={(event) => setUpdateNext(event.target.value)} placeholder="Risco, próximo passo ou contexto importante" />
              <button className="primary" type="submit">Publicar update</button>
            </form>
            <div className="update-history">
              {project.updates.length ? project.updates.slice(0, 5).map((update) => <article key={update.id}><div><time>{new Date(`${update.date}T12:00:00`).toLocaleDateString('pt-BR')}</time><span className={`health-dot health-${update.health.toLowerCase().replaceAll(' ', '-')}`} /></div><strong>{update.summary}</strong>{update.next && <p>{update.next}</p>}</article>) : <p className="muted">Ainda não há update. O primeiro deve explicar estado, risco e próximo passo sem tentar virar uma lista de tarefas.</p>}
            </div>
          </article>

          <article className="panel-card">
            <div className="section-head"><div><p className="eyebrow">MOMENTUM</p><h2>Progresso</h2></div><strong>{project.progress}%</strong></div>
            <input className="progress-range" type="range" min="0" max="100" value={project.progress} onChange={(event) => patch({ progress: Number(event.target.value) })} />
            <label>Próximo marco<input value={project.nextMilestone} onChange={(event) => patch({ nextMilestone: event.target.value })} /></label>
          </article>

          <article className="panel-card">
            <div className="section-head"><div><p className="eyebrow">WHY</p><h2>Decision log</h2></div><small>{project.decisions.length} decisões</small></div>
            <form className="decision-form" onSubmit={addDecision}>
              <input value={decisionTitle} onChange={(event) => setDecisionTitle(event.target.value)} placeholder="O que foi decidido?" />
              <textarea rows={2} value={decisionNote} onChange={(event) => setDecisionNote(event.target.value)} placeholder="Por que essa decisão foi tomada?" />
              <button className="primary" type="submit">Salvar decisão</button>
            </form>
            <div className="decision-list">
              {project.decisions.map((decision) => <div key={decision.id}><time>{new Date(`${decision.date}T12:00:00`).toLocaleDateString('pt-BR')}</time><strong>{decision.title}</strong><p>{decision.note || 'Sem nota adicional.'}</p></div>)}
            </div>
          </article>
        </div>

        <aside className="detail-side">
          <article className="panel-card"><p className="eyebrow">STATUS</p><div className="status-stack">{statuses.map((status) => <button key={status} className={project.status === status ? 'selected' : ''} onClick={() => patch({ status })}>{status}</button>)}</div></article>
          <article className="panel-card"><p className="eyebrow">LINKS</p>{project.links.length ? <div className="link-list">{project.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}<span>↗</span></a>)}</div> : <p className="muted">Nenhum link conectado ainda.</p>}</article>
          <article className="panel-card"><p className="eyebrow">TIMELINE</p><div className="mini-timeline">{project.timeline.slice(0, 5).map((event) => <div key={event.id}><span /><div><strong>{event.label}</strong><small>{event.date}</small></div></div>)}</div></article>
        </aside>
      </div>
    </section>
  );
}
