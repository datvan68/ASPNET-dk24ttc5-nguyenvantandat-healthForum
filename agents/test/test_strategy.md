# test_strategy.md — Test Writing Rules

## Backend Tests (xUnit / .NET 8)

### Unit Tests — Services
Write 1 test class per Service file. Cover:
- Happy path: valid input → expected return
- Empty result: query returns 0 rows → return empty list, not null
- Not found: entity missing → throw `NotFoundException` (not null)
- Validation fail: invalid input → throw `ValidationException` with field name
- DB error: mock repository throws → service wraps and rethrows structured error

```csharp
// Naming: MethodName_Scenario_ExpectedResult
[Fact]
public async Task GetUsers_EmptyTable_ReturnsEmptyList() { }

[Fact]
public async Task GetUserById_NotFound_ThrowsNotFoundException() { }
```

Mock with: `Moq` — mock IRepository, never hit real DB in unit tests.

### Integration Tests — Controllers
Write 1 test class per Controller. Use `WebApplicationFactory<Program>`.
Cover every endpoint in `openapi.yaml`:
- `GET /v1/{resource}` → 200 with correct shape + pagination meta
- `GET /v1/{resource}/{id}` → 200 found · 404 not found
- `POST /v1/{resource}` → 201 created · 400 validation fail · 409 conflict
- `PATCH /v1/{resource}/{id}` → 200 updated · 404 not found · 400 invalid
- `DELETE /v1/{resource}/{id}` → 200 soft-deleted · 404 not found
- Auth: 401 on missing token · 403 on wrong role

Response shape must match `openapi.yaml` exactly — verify with JSON schema assertion.

### Test Data
Use mock-data files from `frontend/mock-data/` as seed data in integration tests.
Never hardcode test data inline — import from mock-data JSON.

---

## Frontend Tests (Vitest + React Testing Library)

### Component Tests
Write 1 test file per component: `{ComponentName}.test.tsx`
Cover all states from `screen_spec.md`:

**Loading state:**
```tsx
it('shows skeleton on initial load', () => {
  // Wrap in Suspense, mock hook to return loading
  expect(screen.getByRole('status')).toBeInTheDocument() // aria-busy skeleton
})
```

**Error state:**
```tsx
it('shows inline error + retry button on fetch failure', () => {
  // Mock hook to throw
  expect(screen.getByText(/error/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
})
```

**Empty state:**
```tsx
it('renders empty state when list is empty', () => {
  // Mock hook returns []
  expect(screen.getByText(/no results/i)).toBeInTheDocument()
})
```

**Field names:**
- Verify every field from `screen_spec.md` renders with correct value
- If field is renamed → test will fail → surfaces `SCHEMA_MISMATCH`

**Interactions:**
- Add / edit / delete → verify sonner toast fires
- Pagination → verify page param updates in URL
- Form submit → verify validation runs before API call

### Hook Tests
Write 1 test file per hook: `use{Entity}.test.ts`
Cover: fetch success · fetch error · staleTime behavior · mutation + cache invalidation

---

## E2E Tests (Playwright) — optional, run only if requested
Cover critical user paths end-to-end:
- Load page → data renders (no skeleton stuck)
- Add item → toast success → item appears in list
- Edit item → toast success → list reflects change
- Delete item → toast success → item removed
- Pagination → navigate to page 2 → URL updates → data loads

---

## Test Coverage Minimums
| Layer | Minimum |
|---|---|
| Service unit tests | 1 per public method |
| Controller integration | 1 per endpoint per HTTP method |
| UI component | 1 per async state (loading, error, empty, idle) |
| UI hooks | 1 per fetch + 1 per mutation |

## Bug ID Assignment
When a test fails, Test Agent assigns a `bug_id` and includes it in `test_results.json`:
- Backend failure → `{scope}-BE-{seq}`
- UI failure → `{scope}-UI-{seq}`

QA Agent links these to its own issue table via matching `bug_id`.