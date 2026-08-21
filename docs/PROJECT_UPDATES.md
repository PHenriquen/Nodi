# Project updates

Nodi should preserve the context around a project, not become another issue tracker. Structured project updates add one missing layer: **how the project is doing now, what changed, and what needs attention next**.

## Model

Each update contains:

- `health`: `On track`, `At risk`, or `Off track`;
- `summary`: the meaningful change since the previous update;
- `next`: risk, next step, or context worth carrying forward;
- `date`: when the update was posted.

The latest update becomes the project's current health signal. Previous updates remain historical context and are also represented in the project timeline.

## Why this shape

Research references:

- Linear project updates pair a simple health signal with narrative context and preserve an update history: https://linear.app/docs/initiative-and-project-updates
- Linear project status is intentionally manual instead of inferred from issue completion: https://linear.app/docs/project-status
- Plane keeps project updates alongside project/work knowledge, reinforcing the value of one context surface rather than another isolated tracker: https://plane.so/solutions/product

The transferable principle is **signal + explanation + history**. Nodi intentionally does not copy Linear's workflow, notification model, or issue system.

## Product rules

1. Health is authored by a person. Progress percentage does not automatically decide whether a project is healthy.
2. An update is not a task list. It should communicate a state change, risk, decision consequence, or next meaningful step.
3. `No update` is a valid state and is different from `On track`.
4. The public preview may show the latest update, but the full private history stays in the workspace.
5. Existing local-first data must survive schema evolution. The storage loader normalizes older projects that do not yet contain an `updates` field.

## Next validation

Before reminders, Slack delivery, AI summaries, or automatic staleness scoring, validate whether users naturally post updates when a project changes. If the behavior is useful, the next narrow extension is a stale-context indicator based on the **date of the last authored update**, without changing its health automatically.
