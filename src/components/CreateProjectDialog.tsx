import { useState } from 'react';
import type { Project } from '../types';

interface CreateProjectDialogProps {
  onClose: () => void;
  onCreate: (project: Project) => void;
}

const accents = ['#8bf0c8', '#70a8ff', '#f3c46f', '#ff6f62', '#c8a7ff'];

export function CreateProjectDialog({ onClose, onCreate }: CreateProjectDialogProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Digital Product');
  const [tagline, setTagline] = useState('');
  const [nextMilestone, setNextMilestone] = useState('Definir o primeiro marco verificável.');
  const [accent, setAccent] = useState(accents[0]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    const now = new Date().toISOString().slice(0, 10);
    onCreate({
      id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now().toString(36)}`,
      name: name.trim(),
      category: category.trim() || 'Project',
      tagline: tagline.trim() || 'Projeto em definição.',
      status: 'Idea',
      progress: 5,
      nextMilestone: nextMilestone.trim() || 'Definir o próximo passo.',
      updatedAt: now,
      accent,
      links: [],
      decisions: [],
      updates: [],
      timeline: [{ id: crypto.randomUUID(), label: 'Projeto criado no Nodi', date: now, kind: 'milestone' }],
    });
  }

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <form className="dialog" onSubmit={submit} onMouseDown={(event) => event.stopPropagation()}>
        <div className="dialog-head"><div><p className="eyebrow">NEW NODE</p><h2>Criar projeto</h2></div><button type="button" className="ghost" onClick={onClose}>×</button></div>
        <label>Nome<input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Nodi" /></label>
        <label>Categoria<input value={category} onChange={(event) => setCategory(event.target.value)} /></label>
        <label>Descrição curta<textarea rows={3} value={tagline} onChange={(event) => setTagline(event.target.value)} placeholder="O que este projeto tenta resolver?" /></label>
        <label>Próximo marco<input value={nextMilestone} onChange={(event) => setNextMilestone(event.target.value)} /></label>
        <div className="accent-picker">
          <span>Cor do projeto</span>
          <div>{accents.map((item) => <button key={item} type="button" aria-label={`Usar ${item}`} className={accent === item ? 'selected' : ''} style={{ background: item }} onClick={() => setAccent(item)} />)}</div>
        </div>
        <div className="dialog-actions"><button type="button" className="secondary" onClick={onClose}>Cancelar</button><button className="primary" type="submit">Criar projeto</button></div>
      </form>
    </div>
  );
}
