# rules.md — Extraction Reference

## Layout
- Extract dimensions, padding, gap, direction verbatim from auto-layout.
- Record: auto-layout vs fixed per container.
- Multiple frame sizes → extract per-breakpoint, document differences.

## Tokens
- Extract color/text/effect/grid styles by exact Figma style name.
- Format: `{category}/{variant}` e.g. `color/primary-500`, `text/heading-lg`.
- No named style → flag as unnamed token.
- Do not normalize or merge similar tokens.

## Typography
- Per style: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`.

## Components & Fields
- Per instance: node name, component set, variant properties.
- Map to shadcn/ui in `component_map.json`; use `"custom"` if no match.
- Per field: `name`, `type`, `placeholder`, `required|optional`, `validation` (if annotated).

## Icons
- Record: node name, node ID, dimensions, export format (SVG preferred).
- No Figma component → flag in `unmatched_icons`.
- Do not map to Lucide/Heroicons — Code Agent's job.

## States
- Extract per component: default, hover, active, focus, disabled, loading, error, empty.
- Loading → Skeleton with exact dimensions from Figma frame.

## Animations
- Extract prototype transitions → `animation_hints.json`.
- Fields: `node_id`, `node_name`, `trigger`, `easing`, `duration_ms`, `motion_type`, `notes`.