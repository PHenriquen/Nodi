import type { Project } from './types';

export const seedProjects: Project[] = [
  {
    id: 'illume',
    name: 'Illume',
    category: 'AI Assistant',
    tagline: 'Assistente local para desktop com voz, contexto e automações controladas.',
    status: 'Building',
    progress: 62,
    nextMilestone: 'Consolidar a identidade Lumi/Illume e simplificar o fluxo de voz.',
    updatedAt: '2026-08-21',
    accent: '#8bf0c8',
    links: [{ label: 'GitHub', url: 'https://github.com/PHenriquen/Noa' }],
    decisions: [
      {
        id: 'illume-d1',
        title: 'Local-first por padrão',
        note: 'Dados, memória e modelo local continuam como base antes de integrações remotas.',
        date: '2026-08-21',
      },
    ],
    updates: [
      {
        id: 'illume-u1',
        health: 'On track',
        summary: 'A base local continua estável enquanto a próxima etapa foca voz, permissões e identidade.',
        next: 'Validar o novo fluxo de ação com confirmação explícita antes de ampliar automações.',
        date: '2026-08-21',
      },
    ],
    timeline: [
      { id: 'illume-t1', label: 'Projeto renomeado para Illume', date: '2026-08-21', kind: 'decision' },
      { id: 'illume-t2', label: 'Living Core v1.0.2', date: '2026-08-20', kind: 'release' },
    ],
  },
  {
    id: 'requiem',
    name: 'Réquiem',
    category: 'Game',
    tagline: 'Roguelite de ação e ritmo com narrativa solitária e progressão por cartas.',
    status: 'Building',
    progress: 34,
    nextMilestone: 'Validar o primeiro combat toy e fechar o loop de ritmo + cartas.',
    updatedAt: '2026-08-20',
    accent: '#ff6f62',
    links: [{ label: 'GitHub', url: 'https://github.com/PHenriquen/Game-R-quiem' }],
    decisions: [
      {
        id: 'requiem-d1',
        title: 'Campanha finita + desafio infinito',
        note: 'A história continua autoral enquanto um modo de domínio sustenta replay e pontuação.',
        date: '2026-08-15',
      },
    ],
    updates: [
      {
        id: 'requiem-u1',
        health: 'At risk',
        summary: 'A plataforma rítmica avançou, mas o feeling ainda não foi validado em um playtest real no Godot.',
        next: 'Não promover o sistema para a campanha até confirmar build e testar movimento, timing e telegraphs.',
        date: '2026-08-21',
      },
    ],
    timeline: [
      { id: 'requiem-t1', label: 'Primeiro combat toy', date: '2026-08-17', kind: 'milestone' },
      { id: 'requiem-t2', label: 'Título “Ecos do Silêncio” definido', date: '2026-08-15', kind: 'decision' },
    ],
  },
  {
    id: 'sincrohub',
    name: 'SincroHub',
    category: 'Industrial Platform',
    tagline: 'Telemetria, incidentes e decisões operacionais em um fluxo industrial conectado.',
    status: 'Building',
    progress: 71,
    nextMilestone: 'Fortalecer ingestão de telemetria e o histórico de incidentes.',
    updatedAt: '2026-08-19',
    accent: '#70a8ff',
    links: [{ label: 'GitHub', url: 'https://github.com/PHenriquen/SincroHub' }],
    decisions: [
      {
        id: 'sincrohub-d1',
        title: 'Incidente como unidade central',
        note: 'Telemetria vira contexto operacional quando desemboca em incidente, ação e histórico.',
        date: '2026-08-18',
      },
    ],
    updates: [
      {
        id: 'sincrohub-u1',
        health: 'On track',
        summary: 'A arquitetura está clara e o próximo ganho real vem de tornar o histórico operacional mais útil.',
        next: 'Priorizar ingestão, correlação e contexto de incidentes antes de expandir dashboards.',
        date: '2026-08-19',
      },
    ],
    timeline: [
      { id: 'sincrohub-t1', label: 'README e arquitetura consolidados', date: '2026-08-18', kind: 'release' },
    ],
  },
  {
    id: 'manopla',
    name: 'Manopla Inteligente',
    category: 'Hardware + Software',
    tagline: 'Protótipo vestível com ESP32, sensores, protocolo binário e mecânica digital.',
    status: 'Building',
    progress: 28,
    nextMilestone: 'Levar o desenho digital para uma primeira validação física.',
    updatedAt: '2026-08-17',
    accent: '#f3c46f',
    links: [{ label: 'GitHub', url: 'https://github.com/PHenriquen/Manopla-Inteligente' }],
    decisions: [
      {
        id: 'manopla-d1',
        title: 'Firmware antes da estética final',
        note: 'Priorizar telemetria, protocolo e integração antes de investir em acabamento físico.',
        date: '2026-08-17',
      },
    ],
    updates: [
      {
        id: 'manopla-u1',
        health: 'At risk',
        summary: 'O desenho digital está organizado, mas a principal incerteza ainda é física: ergonomia, montagem e sensores.',
        next: 'Construir uma primeira validação de bancada antes de aprofundar carcaça e acabamento.',
        date: '2026-08-17',
      },
    ],
    timeline: [
      { id: 'manopla-t1', label: 'Firmware e mecânica digital organizados', date: '2026-08-17', kind: 'milestone' },
    ],
  },
];
