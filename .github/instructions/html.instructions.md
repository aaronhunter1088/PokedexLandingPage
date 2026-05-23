---
applyTo: '**/*.html'
description: 'Hyper Text Transfer Protocol Instructions'
---
Apply these instructions when editing HTML files.

## General

- Use **2-space indentation** — no tabs.
- Maximum line length is **100 characters**.
- End every file with a **trailing newline**.
- Use **lowercase** for all HTML element names and attribute names.
- Use **double quotes** for HTML attribute values.
- Use HTML entities for accented or special characters (e.g., `&#233;` for é, not the literal character).

## File Roles

| File | Purpose |
| ---- | ------- |
| `src/index.html` | Application shell — `<head>` meta, fonts, favicon, and the Angular root element |
| `src/app/app.html` | Root component template — layout, sidenav, header, and settings panel |
| `src/tiles/tiles.html` | Tile component template — the three navigable app cards |

## index.html Rules

- Always include `<!doctype html>` (lowercase) on the first line.
- Always set `lang="en"` on `<html>`.
- Include `<meta charset="utf-8">` and the viewport meta tag.
- Use `<base href="/">` for Angular router compatibility.
- Load Google Fonts and Material Icons via `<link>` in `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

- The `<body>` should contain **only** `<app-root></app-root>`.
- Use a comment to reference the icon source for maintainability:

```html
<!-- icons: https://fonts.google.com/icons -->
```

## Decorative File Header

Add a decorative asterisk banner comment block at the top of component templates to identify the file:

```html
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
<!-- * * * * * * * * * *  Component Name  * * * * * * * * * * * * * -->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
```

## Angular Template Syntax

### Interpolation

- Use `{{ signal() }}` to render signal values — always call signals with `()`:

```html
{{ regionName() }}
{{ Math.round(showThisTransparency() * 100) }}%
```

### Property Binding

- Use `[property]="expression"` for dynamic property binding:

```html
[style.background-image]="getBackgroundImageUrl()"
[checked]="matchTileBackgroundAndOutlineColor()"
[value]="showThisTransparency()"
[color]="matchedTileBackgroundAndOutlineColor()"
```

- Use `[style]="expression ? 'css-a' : 'css-b'"` for simple conditional inline styles:

```html
[style]="!toggle1Checked ? 'color:#FF9933;' : 'color:black'"
```

- Use `[href]="expression"` (not `href="{{ }}"`) for dynamic link targets:

```html
<a [href]="springbootAppUrl + '?darkmode=' + toggle1Checked" style="display: contents;">
```

### Event Binding

- Use `(click)="method()"` for click events.
- Use `(change)="method($event.checked)"` for checkbox/toggle changes.
- Use `(input)="method($event)"` for slider input events.
- Use `(onChange)="method($event)"` for `color-compact` (ngx-color) change events.
- Use `(opened)="signal.set(true)"` and `(closed)="signal.set(false)"` for expansion panel state.
- Use `(ngModelChange)="method($event)"` with `[(ngModel)]="property"` for slide-toggle two-way binding:

```html
<mat-slide-toggle (ngModelChange)="updateMode1($event);"
                  [(ngModel)]="toggle1Checked">
</mat-slide-toggle>
```

### Control Flow

- Use Angular's **`@if` / `@else`** block syntax (not `*ngIf`):

```html
@if (!backgroundImageAndNameSaved()) {
    <mat-icon>{{ saveIcon() }}</mat-icon>
} @else {
    <mat-icon>{{ savedIcon() }}</mat-icon>
}
```

### Template References

- Use `#referenceName` to create template references for `@ViewChild`:

```html
<mat-sidenav #sidenav ...>
<mat-expansion-panel #tileAccordian ...>
```

## Angular Material Patterns

### Cards

- Use `<mat-card>` with `tabindex="0"` to make cards keyboard-accessible.
- Structure cards as: `mat-card-header` → `mat-card-content` → `mat-card-footer`.
- Place `<img>` with `mat-card-avatar` inside `mat-card-header` for logo/avatar images.
- Wrap the navigable portion in `<a style="display: contents;">` so the card layout is not disrupted:

```html
<mat-card class="glass1" id="tile1" tabindex="0">
    <a [href]="springbootAppUrl" style="display: contents;">
        <mat-card-header>...</mat-card-header>
        <mat-card-content>...</mat-card-content>
    </a>
    <mat-card-footer>...</mat-card-footer>
</mat-card>
```

### Sidenav

- Use `<mat-sidenav-container>` wrapping `<mat-sidenav-content>` and `<mat-sidenav>`.
- Set `position="end"` on `<mat-sidenav>` for a right-side panel.
- Bind `[style.background-image]` on the container for the page background.

### Accordion / Expansion Panels

- Wrap all panels in `<mat-accordion>`.
- Use `<mat-panel-description>` (not `<mat-panel-title>`) for the panel header text.
- Show live panel state in the description using a signal ternary:

```html
<mat-panel-description>
    Adjust{{ panelTileSettingsOpenState() ? 'ing' : '' }} the tile settings
</mat-panel-description>
```

- Wrap scrollable panels in a `<div style="max-height: 70vh; overflow-y: auto; overflow-x: hidden;">`.

### Tabs

- Use `<mat-tab-group>` with `<mat-tab>` children.
- Define custom tab labels using `<ng-template mat-tab-label>`:

```html
<mat-tab>
    <ng-template mat-tab-label>
        <mat-icon class="example-tab-icon">opacity</mat-icon>
        Color
    </ng-template>
    <!-- tab content -->
</mat-tab>
```

### Sliders

- Use `<mat-slider>` with a nested `<input matSliderThumb>`:

```html
<mat-slider max="1" min="0" step="0.01">
    <input (input)="updateTileTransparency($event)"
           [value]="showThisTransparency()"
           matSliderThumb>
</mat-slider>
```

### Buttons

- Use `matFab extended` for the primary action buttons inside panels:

```html
<button matFab extended (click)="someAction()">
    <mat-icon>icon_name</mat-icon>
    Label
</button>
```

### Icons

- Use `<mat-icon>icon_name</mat-icon>` for filled icons.
- Use `<span class="material-symbols-outlined">icon_name</span>` inside `<mat-icon>` for outlined variants:

```html
<mat-icon>
    <span class="material-symbols-outlined">bedtime</span>
</mat-icon>
```

- Use `class="example-tab-icon"` on icons placed inside tab labels.

### Color Picker

- Use `<color-compact>` from `ngx-color` with `[color]` input and `(onChange)` output:

```html
<color-compact
    [color]="tile1BackgroundColor()"
    (onChange)="updateTileBackgroundColorVariables($event)">
</color-compact>
```

## Images

- Always use `ngSrc` (not `src`) on `<img>` elements for Angular's `NgOptimizedImage`:
  - Static path: `ngSrc="spring-logo-white.png"`
  - Dynamic path: `[ngSrc]="ngLogoImgValue"`
- Always provide explicit `width` and `height` attributes (required by `NgOptimizedImage`).
- Always provide a descriptive `alt` attribute; use interpolation for dynamic descriptions:

```html
<img [ngSrc]="ngLogoImgValue"
     alt="{{ toggle1Checked ? 'spring-logo-black' : 'spring-logo-white' }}"
     width="40"
     height="40"
     mat-card-avatar
     style="background:transparent;mix-blend-mode:normal;"/>
```

## Accessibility

- Add `tabindex="0"` to interactive elements that are not natively focusable (e.g., `<mat-card>`).
- Add `role="separator"` and `aria-label="Divider"` to decorative divider elements:

```html
<div class="divider" role="separator" aria-label="Divider"></div>
```

- All external links must include `rel="noopener noreferrer"` and `target="_blank"`:

```html
<a href="https://example.com" rel="noopener noreferrer" target="_blank">Link</a>
```

## Inline Styles

- Avoid inline styles where a CSS class can be used instead.
- Acceptable uses of inline styles in this project:
  - `style="display: contents;"` on `<a>` tags wrapping card content (preserves card layout).
  - `style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;"` on `mat-card-actions`.
  - One-off positional overrides (e.g., the fixed copyright paragraph).
- Never use inline styles to define or override CSS custom properties — set those via TypeScript.

## Section Comments

- Use HTML comments to label logical sections within large templates:

```html
<!-- Tile Settings Accordion -->
<!-- Region Name Settings Accordion -->
<!-- Background Settings Accordion -->
<!-- About This Application Accordion -->
```

- Commented-out code (`<!--<mat-panel-title>...</mat-panel-title>-->`) is acceptable while iterating, but remove it before merging.

## Attribute Ordering on Elements

When an element has multiple attributes, order them as follows:

1. `#templateRef`
2. Structural / control directives (`*ngFor`, `@if`)
3. Input bindings (`[property]`)
4. Output bindings (`(event)`)
5. Two-way bindings (`[(ngModel)]`)
6. Static attributes (`id`, `class`, `tabindex`, `role`, `aria-*`)
7. Inline `style`

For readability, place each attribute on its own line when an element has three or more attributes.

