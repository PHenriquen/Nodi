# Nodi

Nodi is an early-stage SaaS for people who build projects and want one place to keep the **work, decisions and evolution** together.

Instead of trying to replace GitHub or a task manager, the first MVP focuses on the context that usually gets lost between them: what a project is, what changed, why a decision was made and what should happen next.

> **Status:** v0.1 MVP foundation. The current version is intentionally local-first and browser-persisted while the core workflow is validated.

## Current MVP

- overview with active-project signals;
- project cards, search and category filters;
- project detail with status and progress;
- next milestone editing;
- decision log with rationale;
- authored health updates with a context history;
- stale-context signals and an attention filter;
- lightweight timeline;
- public-page preview;
- local persistence through `localStorage`;
- seeded workspace so the product can be evaluated immediately.

The demo data is only a starting workspace. Creating and editing projects is functional and persists in the browser.

## Product idea

A normal task board answers **what needs to be done?**

Nodi should also answer:

- What is this project trying to become?
- Why did we make this decision?
- What changed over time?
- What is the next meaningful milestone?
- How can I show the project without sending someone through an entire repository?

More detail is in [`docs/PRODUCT.md`](docs/PRODUCT.md).

## Stack

- React 19
- TypeScript
- Vite
- CSS without a component framework
- browser storage for the first validation build

There is deliberately no backend, authentication or billing in v0.1. Those become useful only after the project-history workflow proves itself.

## Run locally

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run typecheck
npm run build
```

## Structure

```text
src/
├── components/     # dashboard, project detail and creation UI
├── lib/            # browser persistence
├── App.tsx         # app state and navigation
├── data.ts         # initial workspace
├── styles.css      # visual system
└── types.ts        # project domain types

docs/
├── PRODUCT.md
└── ROADMAP.md
```

## Next

The next technical step is durable hosted persistence and authentication, followed by a narrow GitHub integration. Nodi should not become another issue tracker; GitHub data should enrich the project timeline and public story instead.

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the staged plan.
