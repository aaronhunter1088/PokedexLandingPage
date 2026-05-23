---
applyTo: '**/*.css'
description: 'Cascading Style Sheets Instructions'
---
Apply these instructions when editing CSS files.

## General

- Use **2-space indentation** — no tabs.
- Maximum line length is **100 characters**.
- End every file with a **trailing newline**.
- Use **kebab-case** for all class names, IDs, and CSS custom property names.
- Prefer shorthand properties where all values are meaningful (e.g., `padding`, `margin`).
- Use `rem` for font sizes and spacing; use `px` only for fixed structural dimensions (e.g., border widths, icon sizes, `z-index`-related heights).

## File Roles

| File | Purpose |
| ---- | ------- |
| `src/styles.css` | Global styles and all CSS custom property definitions in `:root` |
| `src/app/app.css` | App shell layout (header, sidenav container, region name overlay) |
| `src/tiles/tiles.css` | Tile card styles and responsive overrides |

- **Do not define CSS custom properties in component stylesheets.** All `--*` variable definitions belong in `styles.css` under `:root`.
- Component stylesheets only *consume* variables via `var()`.

## CSS Custom Properties

All dynamic/themeable values are driven by CSS custom properties set at runtime via TypeScript
(`document.documentElement.style.setProperty`). Follow these rules:

- Define every custom property in `:root` in `styles.css` with a sensible default value.
- Name variables with a **component-scope prefix** followed by the property role, all in kebab-case:
  - Tile background: `--tile1-red-color`, `--tile1-green-color`, `--tile1-blue-color`, `--tile1-transparency`
  - Tile outline: `--tile1-outline-red-color`, `--tile1-outline`, `--tile1-outline-color`
  - Tile blur: `--tile1-backdrop-filter`, `--tile1-webkit-backdrop-filter`
  - Tile text: `--tile1-text-font-family`, `--tile1-text-color`
  - Region name: `--region-name-*`
- Split RGB colors into **three separate channel variables** plus a transparency variable, then assemble into a composite `rgba()` variable:

```css
--tile1-red-color: 255;
--tile1-green-color: 255;
--tile1-blue-color: 255;
--tile1-transparency: 1;
--tile1-color: rgba(
    var(--tile1-red-color),
    var(--tile1-green-color),
    var(--tile1-blue-color),
    var(--tile1-transparency, 0));
```

- Always provide a fallback value in `var()` when the variable controls visibility (e.g., `var(--tile1-transparency, 0)`).

## Palette and Color Tokens

- Define palette colors in `:root` using **`oklch()`** for perceptually uniform values:

```css
--bright-blue: oklch(51.01% 0.274 263.83);
--vivid-pink: oklch(69.02% 0.277 332.77);
```

- Define named gradient variables in `:root` and reference them by name rather than repeating the gradient inline.
- Use `color-mix(in srgb, var(--accent) 5%, transparent)` for tinted backgrounds (e.g., pill hover states).

## Layout Patterns

- Use **`display: flex`** for most layout containers; use `inline-flex` when tiles must flow inline.
- Prefer `justify-content` and `align-items` / `align-content` for alignment.
- Use `box-sizing: border-box` globally (set in `:root`) — do not override without good reason.
- Fixed/sticky headers use `position: fixed` with explicit `top`, `left`, `right`, and a high `z-index` (e.g., `1000`).

## Typography

- The global `font-family` stack is defined in `:root` and includes system-ui fallbacks:

```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
```

- Apply `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` globally in `:root`.
- Themeable font families are driven by CSS custom properties (e.g., `--tile1-text-font-family`) and always include a generic `cursive` fallback:

```css
font-family: var(--tile1-text-font-family), cursive;
```

## Vendor Prefixes

- Always pair `backdrop-filter` with `-webkit-backdrop-filter`:

```css
backdrop-filter: var(--tile1-backdrop-filter);
-webkit-backdrop-filter: var(--tile1-webkit-backdrop-filter);
```

- No other vendor prefixes are currently required (Angular targets evergreen browsers).

## Card / Tile Styling

Each tile card (`.glass1`, `.glass2`, `.glass3`) follows this consistent pattern:

```css
.glass1 {
    width: 250px;
    height: auto;
    background: var(--tile1-color);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: var(--tile1-backdrop-filter);
    -webkit-backdrop-filter: var(--tile1-webkit-backdrop-filter);
    border: 1px solid var(--tile1-outline-color);
}
```

- `border-radius: 16px` is the standard for cards, pills, and overlay labels.
- `box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)` is the standard card shadow.
- `border: 1px solid var(--*-outline-color)` for all themed borders.

## Transitions and Hover Effects

- Use `transition` for interactive feedback; prefer short durations (150–300 ms):

```css
transition: transform 0.2s;
transition: background 0.3s ease;
```

- Scale-on-hover uses `transform: scale(1.5)` for icon-sized clickable elements.
- Gradient transitions use `transition: background 160ms ease-in-out, opacity 120ms ease`.

## Responsive Design

- The primary responsive breakpoint is **`max-width: 650px`**.
- Touch / mobile layouts also check `orientation: portrait`, `hover: none`, and `pointer: coarse`:

```css
@media screen and (max-width: 650px) and (orientation: portrait),
       (hover: none) and (pointer: coarse) and (orientation: portrait) { ... }
```

- On small screens, tile containers switch from `inline-flex` to `block`; vertical dividers become horizontal.
- Always add a comment explaining complex media query conditions.

## `!important`

- Use `!important` **only** to override Angular Material or other third-party library defaults.
- Always accompany `!important` with a comment explaining why it is necessary:

```css
/* Using !important is necessary to override Angular Material's default tab styles */
overflow: hidden !important;
```

- Never use `!important` in component-owned rules.

## Section Comments

- Use section comments to separate logical groups within a file:

```css
/* Tile Background Color Variables */
/* Tile Outline Variables */
/* Tile Blur Variables */
/* Tile Text Variables */
/* Region Name Background Color Variables */
```

- Add a brief comment on any non-obvious rule (e.g., why `flex: 0 0 2px` is used on a divider).

## Link Reset

- Reset `<a>` styles in component stylesheets where links appear inside styled tiles so that colors inherit from the tile rather than the browser default:

```css
a {
    color: inherit;
    text-decoration: none;
    outline: none;
}

a:link, a:visited, a:hover, a:active, a:focus {
    color: inherit;
    text-decoration: none;
    outline: none;
}
```
