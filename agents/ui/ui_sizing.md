# ui_sizing.md — Component Sizing & UI Rules

## Size Tokens → Tailwind

| size | token ref | h | px | py | text | rounded |
|---|---|---|---|---|---|---|
| sm | size.sm | h-8 | px-3 | py-1 | text-xs | rounded |
| md | size.md | h-10 | px-4 | py-2 | text-sm | rounded-md |
| lg | size.lg | h-12 | px-5 | py-2 | text-base | rounded-md |

Applies to: Button · Input · Search · Textarea · Icon button · Checkbox / Radio

**Exceptions:**
- Textarea: `h-auto min-h-[80px]` · same px/py as md · always `w-full`
- Icon button: square — sm→`h-8 w-8` · md→`h-10 w-10` · lg→`h-12 w-12`
- Checkbox/Radio: `h-4 w-4` fixed — never size-variant

## Props Contract (all sized components)
```ts
size?: 'sm' | 'md' | 'lg'   // default: 'md'
className?: string           // consumer override
```
- Use `cn()` / `twMerge()` — never string concatenate
- `className` prop always wins over internal size classes
- Input/Search: always `w-full` — width controlled by parent

## UI Behaviors
- Modals: form validation required · sonner toast on success + failure
- Select popups: shadcn/ui `<Select>` component only
- Add/edit/delete actions: always fire a specific sonner toast
- Shared components (Pagination, modals): import from `components/shared/`

## Animation (framer-motion)
- Apply to: cards, list items, page transitions, content reveals
- Read motion type + easing + duration from `animation_hints.json`
- If hint absent for a node → use: `fade_slide_up`, ease-out, 200ms default
- Never animate: skeletons, overlays, error states, loading spinners
- Respect `prefers-reduced-motion` — wrap variants with `useReducedMotion()`

## Undocumented States
- State marked `undocumented` in spec → implement with sensible UI default
- Log to Orchestrator: `UNDOCUMENTED_STATE: {ComponentName}.{state}`
- Never silently skip a state