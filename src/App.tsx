import { useEffect, useMemo, useState } from 'react';
import { CreateProjectDialog } from './components/CreateProjectDialog';
import { Dashboard } from './components/Dashboard';
import { ProjectDetail } from './components/ProjectDetail';
import { Sidebar } from './components/Sidebar';
import { seedProjects } from './data';
import { loadProjects, saveProjects } from './lib/storage';
import type { Project } from './types';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(() => loadProjects(seedProjects));
  const [view, setView] = useState<'overview' | 'projects' | 'activity'>('overview');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => saveProjects(projects), [projects]);

  const selected = useMemo(() => projects.find((project) => project.id === selectedId) ?? null, [projects, selectedId]);

  function updateProject(updated: Project) {
    setProjects((current) => current.map((project) => project.id === updated.id ? updated : project));
  }

  function createProject(project: Project) {
    setProjects((current) => [project, ...current]);
    setSelectedId(project.id);
    setCreating(false);
  }

  function navigate(next: string) {
    setSelectedId(null);
    setView(next as typeof view);
  }

  return (
    <div className="app-shell">
      {!selected && <Sidebar active={view} onNavigate={navigate} projectCount={projects.length} />}
      <main className={selected ? 'content detail-content' : 'content'}>
        {selected ? (
          <ProjectDetail project={selected} onBack={() => setSelectedId(null)} onChange={updateProject} />
        ) : (
          <Dashboard projects={projects} mode={view} onOpen={(project) => setSelectedId(project.id)} onCreate={() => setCreating(true)} />
        )}
      </main>
      {creating && <CreateProjectDialog onClose={() => setCreating(false)} onCreate={createProject} />}
    </div>
  );
}
