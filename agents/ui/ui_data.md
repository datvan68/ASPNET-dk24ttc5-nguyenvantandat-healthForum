# ui_data.md — Data, Cache, Async & Pagination

## Data Source
Priority: `API/DB` (prod) → `mock-data/` (dev fallback) · no inline hardcoding
- Never mutate incoming data — derive display values only
- Preserve all field names from `api_spec.json` and `screen_spec.md`
- Normalize null/undefined at data layer (hooks), never in JSX
- Field name conflict between spec and api_spec → stop: `SCHEMA_MISMATCH: {field}`

## Async States (required on every data-driven component)
| State | Condition | UI |
|---|---|---|
| `initial-loading` | No cache | Full CSS skeleton (dimensions from screen_spec) |
| `fetching` | Cache exists | Overlay skeleton over stale data — never clear existing data |
| `idle` | Resolved | Render content with framer-motion entry animation |
| `error` | Failed | Inline error message + retry button · non-blocking toast on refetch fail |

Rules:
- Skeletons: CSS-only, no framer-motion, match layout from `screen_spec.md`
- Reserve layout space before load — zero layout shift
- Stable list keys: entity `id` always — never array index
- Never silently fail — every error must surface inline or via toast

## Cache Strategy (React Query / SWR)

Default: stale-while-revalidate

| Data type | staleTime |
|---|---|
| config / static | Infinity |
| slow-changing | 5–15 min |
| user / real-time | 0–30 s |

- `cacheTime` / `dedupingInterval` ≥ `staleTime`
- `keepPreviousData` / `useSWRImmutable` for read-only data
- Prefetch next page/tab before navigation
- Mutation: invalidate **exact** query keys only — never global invalidate
- Optimistic update → server confirm → rollback on error
- Never trigger full-page reload

## HTTP Cache Headers (coordinate with API Agent)
| Resource | Headers |
|---|---|
| Static assets | `public, max-age=31536000, immutable` |
| Slow-changing API | `private, max-age=300, stale-while-revalidate=60` |
| User / sensitive | `private, no-store` |
| Public API (CDN) | `public, s-maxage=60, stale-while-revalidate=30` |

- Include `ETag` or `Last-Modified` on all cacheable responses
- Never edge-cache auth tokens, session data, or PII
- Purge edge cache on publish or bulk mutation

## Pagination
- Component: always `components/shared/Pagination.tsx` — never re-implement inline
- Disable `prev` at page 1 · disable `next` at last page
- Persist current page in URL params (`?page=n`)
- No scroll reset on page change
- Prefetch next page data before user clicks
- Skeleton: show row-count skeletons matching `pageSize` during page fetch