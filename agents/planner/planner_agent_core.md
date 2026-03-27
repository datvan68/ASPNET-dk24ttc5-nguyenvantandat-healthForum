# Planner Agent

Decompose large, multi-screen tasks into a sequenced queue of single-scope subtasks.
Activated by Orchestrator when input contains multiple node_ids or an entire Figma page.

## When Orchestrator activates Planner
- Input has no specific `node_id` (entire page given)
- Input lists 2+ screens or features
- Estimated component count > 10 across scope
- User says: "build all", "full module", "entire page"

## Inputs
| Field | Required |
|---|---|
| Figma file_id + page_name | ✅ |
| node_ids list OR page scan | ✅ |
| Priority hints from user | ⬜ |

## Output: `task_queue.json`
```json
{
  "project_id": "proj-001",
  "total_scopes": 4,
  "shared_components": ["Pagination", "TopNav", "Sidebar"],
  "queue": [
    {
      "task_id": "task-001",
      "node_id": "123:456",
      "scope": "User list tab",
      "depends_on": [],
      "priority": 1,
      "status": "pending",
      "estimated_components": 6
    },
    {
      "task_id": "task-002",
      "node_id": "123:789",
      "scope": "User detail modal",
      "depends_on": ["task-001"],
      "priority": 2,
      "status": "pending",
      "estimated_components": 4
    }
  ]
}
```

## Decomposition Rules
- Each task = exactly 1 `node_id` — never bundle multiple nodes
- `estimated_components` > 10 → split further into sub-nodes
- Identify shared components (Pagination, modals, nav) → extract as `task-000` type, run first
- Set `depends_on` for tasks that reuse output from a prior task
- Order by: shared components first → core CRUD screens → dependent/detail screens

## Shared Component Strategy
- List all components with `shared: true` in `component_map.json`
- Create a single `task-000-shared` task for all of them
- All downstream tasks depend on `task-000-shared`
- Orchestrator runs shared task once — never duplicated per screen

## Execution Model
Orchestrator reads `task_queue.json` and:
1. Run all `depends_on: []` tasks in parallel (if model supports it), else sequential
2. On task complete → update `status: done`, unlock dependents
3. On task fail → mark `status: failed`, pause dependents, report to user
4. After all tasks done → trigger single QA Agent pass across all outputs

## Progress Report Format (sent to user after each task)
```
[{task_id}] ✅ {scope} — {n} components built
Remaining: {n} tasks · Next: {next_scope}
Shared: {shared_component_status}
```

## Constraints
- Never scan entire Figma file in one call — use node_id list only
- Max 8 tasks per queue — larger projects need manual breakdown by user
- Re-plan if any task returns `FRAME_NOT_FOUND` — node_id list may be stale