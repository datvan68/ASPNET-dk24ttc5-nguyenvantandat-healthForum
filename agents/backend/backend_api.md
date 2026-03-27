# backend_api.md — API, Mock Data & Security Rules

## REST API Design
- Document every endpoint in `openapi.yaml` before implementation
- URL convention: `/{version}/{resource}` — e.g. `/v1/users`
- Methods: GET (read) · POST (create) · PATCH (partial update) · DELETE (soft)
- Never use GET for mutations
- Versioning: `/v1/` prefix on all routes — never break existing version

## OpenAPI Spec Requirements
Every endpoint must document:
- `summary`, `operationId`, `tags`
- All request params: path, query, body (with JSON Schema)
- All response shapes: 200, 201, 400, 401, 403, 404, 409, 500
- Auth requirement (`bearerAuth` or `apiKey`)

## Response Shape (all endpoints)
```json
// Success
{ "data": { ... }, "meta": { "page": 1, "total": 42 } }

// Error
{ "error": { "code": "VALIDATION_FAILED", "message": "...", "field": "email" } }
```
- Never return raw MongoDB error messages to client
- Never expose `_id` internals, stack traces, or internal field names in error responses
- Paginated list always includes `meta.page`, `meta.pageSize`, `meta.total`

## Pagination API
- Query params: `?page=1&pageSize=20` (default pageSize: 20, max: 100)
- Response includes: `meta.page`, `meta.pageSize`, `meta.total`, `meta.totalPages`
- Cursor-based: use `?cursor={lastId}` for real-time or large collections

## Input Validation
- Validate at Controller layer before passing to Service
- Use schema-based validation (Zod / Joi / class-validator)
- Reject unknown fields — do not pass through unvalidated data
- Sanitize string inputs: trim whitespace, strip HTML
- Validate ObjectId format before any DB query

## Security Rules
- Never expose: passwords, tokens, PII, internal IDs in responses
- Hash passwords with bcrypt (min rounds: 12) — never MD5/SHA1
- Auth tokens: short-lived access token (15min) + refresh token (7d), stored httpOnly
- Rate limiting: apply on all public endpoints
- Never log sensitive fields (passwords, tokens, credit card numbers)
- CORS: whitelist explicit origins — never `*` in production
- All DB queries use parameterized inputs — no string interpolation

## Mock Data Rules
- Create `frontend/mock-data/{entity}.json` after every UI-facing feature
- Mock data must include all fields from `api_spec.json` response shape
- Required coverage:
  | Scenario | Required |
  |---|---|
  | Normal list (5–10 items) | ✅ |
  | Empty list `[]` | ✅ |
  | Single item | ✅ |
  | Null / missing optional fields | ✅ |
  | Max pagination (last page, partial) | ✅ |
  | Error response shape | ✅ |
- Field names must exactly match API response — no camelCase/snake_case drift
- Notify Orchestrator when mock-data file is ready: `MOCK_READY: {entity}`

## Error Handling
| Layer | Responsibility |
|---|---|
| Controller | Catch validation errors, return 400 with field detail |
| Service | Catch business logic errors, return 409/404/403 with code |
| Repository | Catch DB errors, wrap and rethrow — never expose raw error |
| Global handler | Catch unhandled errors, return 500, log internally |

- Every error response uses structured `{ error: { code, message, field? } }` shape
- Log all 5xx errors internally with: timestamp, endpoint, payload (sanitized), stack
- Never silently swallow errors at any layer