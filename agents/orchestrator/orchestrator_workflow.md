# orchestrator_workflow.md — Pipeline Execution

## Step 0 — Parse & Validate Input
Extract from user input:
- `figma_url` — must contain `?node-id=` param
- `node_id` — parse from URL
- `scope_description` — human-readable target (e.g. "Danh mục tab")

Validation:
- [ ] `node_id` present → if missing: STOP, ask user
- [ ] `scope_description` unambiguous → if unclear: STOP, ask user
- [ ] Figma URL accessible via MCP → if not: `MCP_CONNECTION_ERROR`

→ For large tasks (multiple screens): STOP, load `planner_agent_core.md` first

---

## Step 1 — Design Agent
Inject constraints:
```
- Read ONLY node_id: {node_id}
- DO NOT scan entire file
- DO NOT redesign or infer beyond what exists in Figma
- Output max 200 lines per file
```

Trigger: Design Agent with `agent_core.md` + `rules.md` + `schemas.md`

Await outputs:
- `design_tokens.json` ✅
- `screen_spec.md` ✅
- `component_map.json` ✅
- `animation_hints.json` ⬜
- `asset_manifest.json` ⬜

Validate before proceeding:
- [ ] All required outputs present and non-empty
- [ ] No `naming_issues` flagged as unresolved
- [ ] `component_map.json` node names consistent with `screen_spec.md`
- [ ] `TYPOGRAPHY_INCONSISTENCY` absent or explicitly acknowledged

→ Fail → rework (max 1x) → still fail → escalate to user

---

## Step 2 — Backend Agent
Inject constraints:
```
- Stack: ASP.NET MVC (.NET 8) · EF Core · T-SQL · SQL Server
- Pattern: Controller → Service → Repository
- Scope: only entities referenced in screen_spec.md node {node_id}
- Field names must match screen_spec.md exactly
- Output max 200 lines per file
```

Trigger: Backend Agent with `backend_agent_core.md` + `backend_schema.md` + `backend_api.md`

Pass inputs:
- `screen_spec.md` (from Step 1)
- `data_requirements.md` (from user / Orchestrator)
- DB connection details

Await outputs:
- `schema/{Entity}.cs` (EF Core model) ✅
- `openapi.yaml` ✅
- `Controllers/{Entity}Controller.cs` ✅
- `Services/{Entity}Service.cs` ✅
- `Repositories/{Entity}Repository.cs` ✅
- `Migrations/{timestamp}_{name}.cs` ⬜
- `frontend/mock-data/{entity}.json` ✅

Validate before proceeding:
- [ ] All field names match `screen_spec.md`
- [ ] `openapi.yaml` documents all endpoints with request + response schemas
- [ ] `mock-data/{entity}.json` covers: normal list, empty, single, null fields, last page, error shape
- [ ] No sensitive fields exposed in response shape
- [ ] `MOCK_READY: {entity}` received

→ Fail → rework (max 1x) → still fail → escalate to user

---

## Step 3 — UI Agent
Inject constraints:
```
- Framework: Next.js App Router
- Distinguish Server Component vs Client Component ("use client") explicitly
- Skeleton: Suspense boundary only — never useState loading
- Scope: only components in component_map.json for node {node_id}
- Output max 200 lines per file
```

Trigger: UI Agent with `ui_agent_core.md` + `ui_sizing.md` + `ui_data.md`

Pass inputs:
- `screen_spec.md` ✅
- `design_tokens.json` ✅
- `component_map.json` ✅
- `animation_hints.json` ⬜
- `openapi.yaml` (as api_spec) ✅
- `frontend/mock-data/` ✅

Await outputs:
- `components/{ScreenName}/{ComponentName}.tsx` ✅
- `components/shared/Pagination.tsx` ✅ (if pagination in spec)
- `hooks/use{Entity}.ts` ✅
- `mock-data/{entity}.json` ✅

Validate before proceeding:
- [ ] All components present per `component_map.json`
- [ ] No field renamed vs `screen_spec.md`
- [ ] Skeleton via Suspense boundary — no `useState` loading pattern
- [ ] Pagination uses `components/shared/Pagination.tsx`
- [ ] `INPUT_MISSING` or `SCHEMA_MISMATCH` errors absent

→ Fail → rework (max 1x) → still fail → escalate to user

---

## Step 4 — Test Agent
Trigger: Test Agent with `test_agent_core.md` + `test_strategy.md`

Pass inputs:
- `openapi.yaml` ✅
- `screen_spec.md` ✅
- `components/**/*.tsx` ✅
- `Controllers/**/*.cs` ✅

Await outputs:
- `tests/unit/**` ✅
- `tests/integration/**` ✅
- `tests/e2e/**` ⬜
- `test_results.json` ✅

Validate:
- [ ] All API endpoints have at least 1 integration test
- [ ] All UI components with async state have loading/error test
- [ ] `test_results.json` present with pass/fail counts

→ Test failures → assign `bug_id`, pass to Step 5 QA with results

---

## Step 5 — QA Agent
Inject constraints:
```
- Validate scope: node {node_id} only
- No extra fields or features beyond spec
- Report only — do not fix
- Assign bug_id to every issue using format: {scope_id}-{agent_code}-{seq}
- Output max 200 lines
```

Trigger: QA Agent with `qa_agent_core.md` + `qa_checks.md`

Pass all outputs from Steps 1–4 including `test_results.json`.

Await: `qa_report.md`

Evaluate:
- [ ] Zero `CRITICAL` → proceed to Step 6
- [ ] Any `CRITICAL` → `QA_BLOCKER: {bug_id_list}` → halt, escalate to user immediately
- [ ] `HIGH` → route each `bug_id` to responsible agent (see routing table below)
- [ ] `MEDIUM` / `LOW` → log in final output, do not block

**Bug routing table:**
| bug_id prefix | Route to |
|---|---|
| `{scope}-DS-{n}` | Design Agent |
| `{scope}-BE-{n}` | Backend Agent |
| `{scope}-UI-{n}` | UI Agent |
| `{scope}-TS-{n}` | Test Agent |

**Fix loop (max 1 rework per bug_id):**
1. Send bug_id + affected_files + detail to responsible agent
2. Agent fixes and returns updated files
3. Re-trigger QA Agent on affected_files only (not full pipeline)
4. QA reports `QA_FIX_VERIFIED: {bug_id}` or `QA_FIX_FAILED: {bug_id}`
5. `QA_FIX_FAILED` after 1 attempt → escalate to user with full bug detail

---

## Step 6 — Final Output
Compile and return:
```json
{
  "summary": "...",
  "scope": { "node_id": "...", "description": "..." },
  "agent_results": {
    "design": "pass | fail | skipped",
    "backend": "pass | fail | skipped",
    "ui": "pass | fail | skipped",
    "test": "pass | fail | skipped",
    "qa": "pass | fail | skipped"
  },
  "bugs_resolved": ["user-list-UI-001", "user-list-BE-002"],
  "bugs_open": [],
  "issues_logged": ["user-list-UI-005 (LOW) — minor alignment"],
  "errors": [],
  "status": "complete | blocked | escalated"
}
```

Notify user:
- List of generated files with paths
- `MEDIUM`/`LOW` issues logged (non-blocking)
- Escalation reason + bug detail if `status: escalated`

---

## Escalation Message Format (to user)
```
ESCALATION — {agent} Agent: {bug_id} unresolved after rework

Scope: {node_id} / {scope_description}
Bug ID: {bug_id}
Severity: {severity}
File: {affected_file} · Line: {line_ref}
Rule violated: {rule}
Detail: {detail}

What QA found: {exact mismatch description}
What rework produced: {what changed, why it still fails}

Action required from you:
- {specific decision or clarification needed}
```