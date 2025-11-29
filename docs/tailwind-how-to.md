## Tailwind v4 How-To

This doc reflects the current Tailwind v4 + Astro setup. Everything below assumes the tokens, utilities, and bespoke CSS that ship in `src/styles/globals.css`.

### 1. Ground rules

1. **Token-first** – Tailwind only emits utilities for tokens declared in `@theme`. If you reach for a color, spacing value, or type scale that does not exist, add the token first. Literal hex values are noise for the compiler and break light/dark parity.
2. **No custom spacing classes** – spacing lives in flex/grid `gap-*` utilities or the canonical section shell. Avoid `m-*`, `space-*`, `divide-*`, or bespoke border tricks to create rhythm.
3. **Reuse primitives** – Section, Stack, Grid, Heading, Text, Anchor, etc. expose the exact props we use in the site. If a new pattern requires more, add it once inside the component rather than sprinkling conditional CSS everywhere else.
4. **Accessibility first** – Our tokens already back accessible contrast. When creating new combinations, check both color schemes and keyboard focus states before shipping.

### 2. Global layer & celestial system

`src/styles/globals.css` does most of the heavy lifting:

- **Root tokens** – `@layer base { :root { … } }` declares all code-theme variables plus the celestial palette used for the background gradients. Every new custom property must have a dark variant inside `@variant dark { … }` at the same selector depth.
- **Custom property plumbing** – The scroll animation rides on `@property --celestial-progress` and the `celestial-track` keyframes applied to `body`. Extend or remix the animation by reading that property instead of inventing a second scroll timeline.
- **Background composition** – `html`, `body`, and their pseudo-elements stack multiple gradients, grain overlays, and conic/radial fills. Modifications should tweak tokens (`--celestial-halo`, `--celestial-ring`, etc.) rather than overriding `background-*` directly. That keeps dark mode, reduced motion, and the blend modes aligned.
- **Reduced motion** – The `@media (prefers-reduced-motion: reduce)` block locks the animation and sets a sensible fallback `--celestial-progress`. Any new motion-driven effect must respect the same guard.
- **Utility namespace** – The `@utility no-print { … }` example is the template for future global utilities. Declare them here so Tailwind’s analyzer picks them up and dedupes output.

### 3. Layout grammar

1. **Section shell** – Outer wrapper handles page padding (`px-4 py-16 sm:py-20`). Inside that, center content with `grid w-full place-items-center`, then stack real content in a `Stack` component limited to `max-w-4xl` (or `max-w-3xl` depending on the layout). Every page follows this spine.
2. **Stacks everywhere** – Instead of manual `flex` markup, use `Stack` for direction, gap, wrap, and width controls. Props already reflect the responsive combos we actually use, so no extra `class` juggling is necessary.
3. **Grids for collections** – Grid exposes the column counts we support. If a new breakpoint is needed, add it once in the component; do not inline `grid-cols-*` values across pages.
4. **Whitespace as structure** – We avoid ornamental borders and rely on whitespace + tone shifts. If you feel compelled to add `border`/`divide`, consider whether a lighter/darker Section tone or additional `gap` communicates separation more cohesively.

### 4. Component usage notes

- **Heading/Text** – Sizes and tones are trimmed to the combos actually used. If you need a new tone, add usage first (e.g., on a page) then wire the component, so dead branches don’t return.
- **Anchor** – Supports `size="inherit" | "sm" | "base"` plus `variant="primary" | "secondary"` and `underline="none" | "hover"`. Reuse those combos instead of adding extra typography wrappers.
- **CalloutPanel / Card** – Max width is baked into the component (always `max-w-4xl`), and Card only exposes `gap="sm|md"`. Respect that contract so future audits can keep trimming safely.
- **Blog primitives** – Blog posting cards, lists, keyword badges, etc. already encapsulate the responsive logic and prop sets we still use; no need for extra wrappers.

### 5. Authoring with `@variant`

`globals.css` demonstrates the preferred hierarchy:

```css
html {
  /* default visuals */
  @variant dark {
    /* dark-mode overrides at the same selector */
  }
}

body {
  animation-name: celestial-track;
  @variant dark {
    /* dark-specific gradients */
  }
}
```

- `@variant hover`, `@variant focus-visible`, `@variant md`, etc., replace the old `:hover`/media queries so Tailwind can statically analyze the block.
- `@variant *` and `@variant **` stand in for `>` and descendant selectors. Keep them at the bottom of the block to match Tailwind’s expansion order.
- Functional variants (e.g., `@variant aria-pressed`) are preferred over custom attribute selectors. They read better and integrate with Tailwind’s deduper.

### 6. Working checklist

1. **Add/verify tokens** – Update `@theme` (and `@variant dark` blocks) before writing markup.
2. **Compose with primitives** – Reach for Section/Stack/Grid/Text/Heading/Anchor/Banners first. If a change needs a new prop, add it and document the usage.
3. **Guard light/dark & motion** – Test in both schemes and with reduced-motion enabled. Custom properties should retain sensible defaults even before JS hydrates.
4. **Run the suite** – `pnpm check:lint`, `pnpm check:astro`, and `pnpm run build` should stay green. Lint now covers `.astro` files, and `astro check` is our oracle for type safety across components/content.
5. **Update docs** – Any structural change (new tokens, layout deviation, component prop add/remove) gets called out here so the next pass has full context.

Following these rules keeps the system cohesive: tokens drive Tailwind output, globals.css handles the immersive backdrop, and components remain narrowly scoped to the props we actually use.
