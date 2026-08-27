import { describe, expect, it } from 'vitest';
import type { Project } from './types';
import { getProjectContextState } from './types';

function projectWithUpdate(date?: string): Project {
  return {
    id: 'project-1',
    name: 'Nodi',
    category: 'Product',
    tagline: 'Project context',
    status: 'Building',
    progress: 40,
    nextMilestone: 'Validate context updates',
    updatedAt: '2026-08-27',
    accent: '#8bf0c8',
    links: [],
    decisions: [],
    updates: date ? [{ id: 'update-1', health: 'On track', summary: 'Context added', next: '', date }] : [],
    timeline: [],
  };
}

const now = new Date('2026-08-27T12:00:00Z');

describe('getProjectContextState', () => {
  it('keeps updates current for the first fourteen days', () => {
    expect(getProjectContextState(projectWithUpdate('2026-08-13'), now)).toEqual({ freshness: 'current', daysSinceUpdate: 14 });
  });

  it('marks context as aging after fourteen days', () => {
    expect(getProjectContextState(projectWithUpdate('2026-08-12'), now)).toEqual({ freshness: 'aging', daysSinceUpdate: 15 });
  });

  it('marks context as stale after thirty days', () => {
    expect(getProjectContextState(projectWithUpdate('2026-07-27'), now)).toEqual({ freshness: 'stale', daysSinceUpdate: 31 });
  });

  it('keeps missing updates distinct from project health', () => {
    expect(getProjectContextState(projectWithUpdate(), now)).toEqual({ freshness: 'missing', daysSinceUpdate: null });
  });

  it('treats an invalid update date as missing context', () => {
    expect(getProjectContextState(projectWithUpdate('not-a-date'), now)).toEqual({ freshness: 'missing', daysSinceUpdate: null });
  });
});
