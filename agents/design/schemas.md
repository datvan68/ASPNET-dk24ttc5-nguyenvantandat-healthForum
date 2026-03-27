# schemas.md — Output Schemas

## design_tokens.json
```json
{
  "colors": { "primary/500": "#3B82F6" },
  "typography": {
    "heading/xl": { "fontFamily": "Inter", "fontSize": 32, "fontWeight": 700, "lineHeight": 1.2, "letterSpacing": -0.5 }
  },
  "spacing": { "section-gap": 48 },
  "radii": { "card": 12 },
  "shadows": { "card-shadow": "0 2px 8px rgba(0,0,0,0.08)" },
  "unnamed_tokens": [{ "location": "Button/Primary bg", "raw_value": "#2563EB" }]
}
```

## screen_spec.md (per screen)
```
## Screen: {FrameName}
Dimensions: {W}x{H}px | Layout: {auto|fixed}, {direction}, gap {n}px, padding {n}px

### Components
- {NodeName} — shadcn: <{Component}> — variants: {k=v}
  - Field: `{name}` ({type}, {required|optional})
  - Loading: Skeleton {W}x{H}px

### Shared
- Pagination → component_map.json

### Hidden Nodes
- {NodeName}
```

## component_map.json
```json
{
  "Pagination": { "figma_node": "Pagination", "shadcn_component": "custom", "shared": true, "used_in_screens": ["ScreenA"] },
  "Button/Primary": { "figma_node": "Button/Primary", "shadcn_component": "Button", "variants": { "variant": "default" } }
}
```

## animation_hints.json
```json
[{ "node_id": "123:456", "node_name": "Modal", "trigger": "on_open", "easing": "ease-out", "duration_ms": 200, "motion_type": "fade_slide_up" }]
```

## asset_manifest.json
```json
{
  "icons": [{ "node_name": "Icon/Close", "node_id": "12:34", "dimensions": "24x24", "format": "svg" }],
  "unmatched_icons": [{ "node_name": "Icon/Custom", "node_id": "56:78" }]
}
```