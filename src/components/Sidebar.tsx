interface SidebarProps {
  active: string;
  onNavigate: (view: string) => void;
  projectCount: number;
}

const items = [
  ['overview', 'Overview'],
  ['projects', 'Projects'],
  ['activity', 'Activity'],
];

export function Sidebar({ active, onNavigate, projectCount }: SidebarProps) {
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => onNavigate('overview')} aria-label="Abrir visão geral">
        <span className="brand-mark"><i /><i /><i /></span>
        <strong>NODI</strong>
      </button>

      <nav className="sidebar-nav" aria-label="Navegação principal">
        {items.map(([id, label]) => (
          <button key={id} className={active === id ? 'active' : ''} onClick={() => onNavigate(id)}>
            <span>{label}</span>
            {id === 'projects' && <small>{projectCount}</small>}
          </button>
        ))}
      </nav>

      <div className="sidebar-note">
        <span>EARLY MVP</span>
        <p>Projetos, decisões e evolução no mesmo contexto.</p>
      </div>
    </aside>
  );
}
