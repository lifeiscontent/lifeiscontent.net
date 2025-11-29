## Tailwind v4 How-To (Working Notes)

These notes snapshot the current rules for building inside the refreshed Tailwind v4 setup. Keep them nearby so every new component feels like it shipped with the same system DNA.

### 1. Token-first everything

- Tailwind only outputs utilities when a corresponding token exists inside `@theme`. If you need a new color, size, or shadow, define it as a semantic token (`--text-color-default`, `--background-color-surface-card`, `--shadow-card-soft`, etc.) and let Tailwind emit the utility.
- Token names describe intent, not hue (`-page`, `-muted`, `-surface-card`, `-inverse`). Consistent suffixes keep classes readable.
- Never hand-roll helpers like `.text-default`. Use the generated classes (`text-default`, `bg-background-color-page`, `shadow-card-soft`). If you feel tempted to write custom CSS for spacing or color, you probably need another token.

### 2. Light/dark parity

- Stick with standard media queries because Tailwind v4’s compiler still expects them:

  ```css
  @theme {
    /* light tokens */
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background-color-page: #050505;
      --text-color-default: oklch(92% 0.02 262);
      /* … */
    }
  }
  ```

- Token names must match between schemes so utilities flip automatically.
- When writing bespoke CSS (e.g., in `globals.css`), include fallbacks (`var(--background-color-page, #ffffff)`) to prevent flashes before JS/hydration kicks in.

### 3. Layout grammar

- **Mobile first:** the viewport meta includes `initial-scale=1` and both `html` + `body` enforce a `min-width: 360px`. Design for that width first, then layer on `sm:` and upward.
- **Section shell pattern:**
  1. `section` adds page padding + rhythm (`px-4 py-16 sm:py-20`).
  2. Inner wrapper: `div.grid.w-full.place-items-center`.
  3. Content stack: `div.flex.w-full.max-w-4xl.flex-col.gap-*`.
- **Spacing discipline:** no `m*`, `space-*`, `divide-*`, or ornamental borders. Whitespace comes from `gap-*` inside flex/grid parents plus the section padding. Use whitespace to show unrelated content, not to “style” a component.
- **Borders & lines:** avoid them. Lean on fills, depth (`shadow-card-soft`), or layout shifts. Focus states can still use semantic border/ring tokens when required for accessibility.

### 4. Component nuances

- Buttons and badges already consume semantic tokens (`text-inverse`, `bg-background-color-page`, etc.). When adding a variant, only compose existing tokens; never inject literal colors.
- Card, hero, and CTA blocks use the same flex stack. If you need new micro-patterns (e.g., a new list style), extract a component so spacing stays centralized.
- Logo grids: keep them inside responsive grids (`grid grid-cols-2 gap-8 sm:grid-cols-3 place-items-center`). This removes the temptation to sprinkle ad-hoc margins.

### 5. Authoring with `@variant`

- Tailwind rewrites `@variant` blocks into their registered selectors, so you can compose interactions without bloated class lists:
  ```css
  .card {
    @variant hover {
      background: var(--background-color-surface-card-hover);
    }
    @variant @md {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  ```
- Descendant helpers: `@variant *` (direct children) and `@variant **` (any depth) go last inside the block.
- Functional variants cover `aria-*`, `data-*`, nth-child helpers, `supports-[...]`, etc. Prefer these over bolting extra wrapper classes into the DOM.
- `docs/tailwind.md` documents every namespace + fallback chain. Reference it before inventing new tokens.

### 6. Working checklist

1. Define or reuse the needed tokens in `@theme`. No tokens = no utilities.
2. Build the layout with the standard section shell + stack. Add `gap-*` for rhythm; avoid margins.
3. Reach for existing UI primitives (button, badge, card). If a net-new pattern emerges, extract it once, not per-page.
4. Test both color schemes (`prefers-color-scheme: dark`) and small viewports (360 px). Sections should remain centered without horizontal scrolling.
5. Run `pnpm run build` after theme changes. It validates `@variant`, catches `@dark` misuse, and regenerates the `_astro` CSS bundle.
6. Update this doc when the system rules shift so every future change starts from the same baseline.

Sticking to these conventions keeps the site token-driven, mobile-first, and “borderless,” which preserves the seamless narrative experience we’re aiming for.
