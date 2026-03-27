# Test Agent

Write and execute tests for Backend (xUnit/.NET) and UI (Vitest + Testing Library).
Report results as `test_results.json` for QA Agent and Orchestrator.

## Inputs (from Orchestrator)
| File | Source | Required |
|---|---|---|
| `openapi.yaml` | Backend Agent | ✅ |
| `screen_spec.md` | Design Agent | ✅ |
| `components/**/*.tsx` | UI Agent | ✅ |
| `hooks/use*.ts` | UI Agent | ✅ |
| `Controllers/**/*.cs` | Backend Agent | ✅ |
| `Services/**/*.cs` | Backend Agent | ✅ |
| `mock-data/*.json` | Backend Agent | ✅ |

→ Any required input missing → stop: `TEST_INPUT_MISSING: {file}`

## Outputs
| File | Destination |
|---|---|
| `tests/unit/backend/**/*.cs` | xUnit test files |
| `tests/unit/ui/**/*.test.tsx` | Vitest component tests |
| `tests/integration/**/*.cs` | xUnit integration tests |
| `tests/e2e/**/*.spec.ts` | Playwright e2e (optional) |
| `test_results.json` | Summary for QA Agent |

## `test_results.json` Format
```json
{
  "run_id": "run-{timestamp}",
  "scope_id": "user-list",
  "summary": { "total": 24, "passed": 22, "failed": 2, "skipped": 0 },
  "failures": [
    {
      "test_id": "BE-unit-UserService-001",
      "file": "tests/unit/backend/UserServiceTests.cs",
      "name": "GetUsers_ReturnsEmpty_WhenNoData",
      "error": "Expected 200, got 500 — null reference on empty set",
      "bug_id": "user-list-BE-001"
    }
  ]
}
```

> Test writing strategy → load `test_strategy.md`