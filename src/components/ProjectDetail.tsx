import { useState } from 'react';
import type { Project, ProjectStatus } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onChange: (project: Project) => void;
}

const statuses: ProjectStatus[] = ['Idea', 'Building', 'Testing', 'Shipped', 'Paused'];

export function ProjectDetail({ project, onBack, onChange }: ProjectDetailProps) {
  const [decisionTitle, setDecisionTitle] = useState('');
  const [decisionNote, setDecisionNote] = useState('');
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

  async function copySummary() {
    const text = `${project.name} — ${project.category}\n${project.tagline}\nStatus: ${project.status} · ${project.progress}%\nPróximo marco: ${project.nextMilestone}`;
    await navigator.clipboard.writeText(text);
  }

  if (preview) {
    return (
      <section className="public-shell">
        <button className="back-link" onClick={() => setPreview(false)}>← Voltar ao workspace</button>
        <div className="public-card">
          <div className="public-mark" style={{ borderColor: project.accent }}><span style={{ background: project.accent }} /></div>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.name}</h1>
          <p className="public-tagline">{project.tagline}</p>
          <div className="public-meta"><span>{project.status}</span><span>{project.progress}%</span><span>Atualizado {new Date(`${project.updatedAt}T12:00:00`).toLocaleDateString('pt-BR')}</span></div>
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
