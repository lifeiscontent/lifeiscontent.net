## Tailwind v4 how-to

This guide describes the Tailwind v4 and Astro setup in this repo. The tokens and global styles are in `src/styles/globals.css`.

### 1. Ground rules

1. **Tokens first.** Tailwind only makes utilities for tokens in `@theme`. If you need a new color or size, add the token first. Do not use literal hex values.
2. **No class escape hatch.** Components omit `class` and `style` from their props. Pages pass intent props, such as `tone`, `variant`, and `spacing`. Each component maps those props to classes.
3. **Props are types.** Declare component props with `type Props = { … }`. For HTML attributes, use `type Props = Omit<HTMLAttributes<'div'>, 'class' | 'style'> & { … }`.
4. **Check both color schemes.** Each color needs a dark value. Check light mode, dark mode, and keyboard focus before you ship.

### 2. Color

- The site is neutral grays plus one accent, a clay color (`--color-accent-*`).
- Use the accent only for links and other interactive elements. The thin line at the top of the page and on `CalloutPanel` is the one decorative use.
- Code highlighting uses violet, sky, and emerald, so the accent always means "link".
- Text must meet 4.5:1 contrast. Muted text is `neutral-600` in light mode and `neutral-300` in dark mode.

### 3. Page layout

- **`PageSection`** is one full-width band of a page. It centers its content in the `max-w-4xl` column.
  - `spacing`: `compact` for the header and breadcrumb, `intro` for the first band on a page, `body` for all other bands.
  - `tone`: `transparent` (white), `page` (light gray), or `muted`.
  - `gap`: the space between its children.
  - `as` and `contentAs` set the outer and inner elements, for example `as="nav"` or `contentAs="article"`.
- **`SectionHeader`** is the eyebrow, title, and optional intro text. Use `variant="page"` for the `h1` that opens a page, `section` for an `h2` band, and `callout` for an `h2` inside a panel.
- Put bands next to each other with no gap between them. A gap shows the white page background as a stripe.

### 4. Primitives

- **`Stack` and `Grid`** do flex and grid layout inside a band. Use their props, not `flex` or `grid-cols-*` classes.
- **`Heading` and `Text`** set type size, tone, and weight. Both have `sizeAtSm` for the larger size at the `sm` breakpoint.
- **`Anchor`** is a text link. **`ButtonLink`** is a link that looks like a button. Use `primary` once per section and `secondary` (outlined) for other actions.
- **`BadgeLink`** is a pill link. Keyword tags use the `outline` variant, and `aria-current="page"` marks the current keyword.
- **`Icon`** draws the site's icons by name (`calendar`, `clock`, `refresh`, `external`, `github`, `x`, `email`, `rss`). Add new icons to `Icon`. Do not put inline SVGs in pages.
- **`Breadcrumb`** takes `parents` and `current`.

### 5. Posts

- **`Prose`** styles post content. Running text stops at `40rem`, which is about 70 characters per line in Geist at 18px. Code blocks use the full column width.
- Inline code wraps when it is wider than the screen, so long file paths do not make the page scroll sideways.
- **`BlogPostingCard`** chooses a presentation: `default` for lists or `compact` for "More like this". Each presentation uses `BlogPostingMeta`, `BlogPostingTitle`, and `BlogPostingDescription`.
- The post page uses `BlogPostingHeader`, `BlogPostingToc`, and `BlogPostingPager`. The table of contents shows when a post has three or more `h2` sections.

### 6. Checklist

1. Add or change tokens in `@theme`, with dark values, before you write markup.
2. Use the components above. If a change needs a new prop, add it to the component once.
3. Run `pnpm check` and `pnpm build`. The deploy workflow runs both. `pnpm check` includes Prettier, lint, and `astro check`.
4. Look at the changed pages in light mode, in dark mode, and at phone width.
5. If you change a component's props or the layout rules, update this guide.
