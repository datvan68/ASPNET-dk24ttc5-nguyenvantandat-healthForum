# backend_schema.md — Schema, Indexing & Query Rules

## Schema Definition
- Define every collection in `schema/{Entity}.schema.json`
- Required fields must have `required: true` — never implicit
- Field names must match `screen_spec.md` exactly (verified by QA Agent)
- Use BSON types explicitly: `ObjectId`, `Date`, `Decimal128` — not generic `string`/`number` where precision matters
- Always include: `createdAt`, `updatedAt` (auto-managed), `_id` (ObjectId)
- Soft delete: use `deletedAt: Date | null` — never hard delete production data unless explicitly required

## Schema Example
```json
{
  "collection": "users",
  "fields": {
    "_id": { "type": "ObjectId", "required": true },
    "email": { "type": "string", "required": true, "unique": true },
    "role": { "type": "string", "enum": ["admin", "user"], "required": true },
    "deletedAt": { "type": "Date", "default": null },
    "createdAt": { "type": "Date", "auto": true },
    "updatedAt": { "type": "Date", "auto": true }
  }
}
```

## Indexing Rules
- Index every field used in `find()`, `sort()`, or `$lookup` filter
- Compound index: order fields by selectivity (most selective first)
- Unique index: `email`, `slug`, and any natural key
- TTL index: for session, token, or temporary collections
- Never index low-cardinality fields alone (e.g. boolean, small enum) — compound only
- Document all indexes in `schema/{Entity}.schema.json` under `"indexes"` key

## Query Rules
- Always use **projection** — never return full document when subset is enough
- Paginate all list queries: `skip` + `limit` or cursor-based for large collections
- Cursor-based pagination preferred over `skip` for collections > 10k documents
- Never use `$where` or unindexed `$regex` on large collections
- Aggregation pipelines: `$match` and `$project` must be first two stages
- Max query execution time: set `maxTimeMS(5000)` on all queries

## Migrations
- Every schema change requires a migration script: `migrations/{timestamp}_{description}.ts`
- Migration must be idempotent — safe to run twice
- Include `up()` and `down()` functions
- Test `down()` before deploying `up()` in production
- Never modify existing migration files — create a new one
- Log migration result to Orchestrator on completion or failure