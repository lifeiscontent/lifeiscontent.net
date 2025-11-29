# Tailwind v4 Theme Variables Cheat Sheet

> Based on Tailwind CSS `packages/tailwindcss/src/utilities.ts` @ `a1f533a0`.[^1]

## Core Mechanics

- **Theme namespaces**: Every functional utility points at one or more CSS Custom Property namespaces (`--token-name`). When a class such as `w-4` is parsed, Tailwind calls `theme.resolve(<value>, ['--width','--spacing','--container'])` and takes the first namespace that contains the requested key.
- **Automatic fallbacks**: If the primary namespace is missing a key, Tailwind walks the remaining namespaces in the array. Example: `--divide-color` falls back to `--border-color`, which itself falls back to `--color`.
- **Fractions & bare numbers**: Utilities flagged with `supportsFractions` turn ratios like `1/2` into `calc(0.5 * 100%)`. Utilities that allow bare numbers (spacing, leading, etc.) multiply the raw number by the global `--spacing` multiplier so `p-1.5` works even without explicit theme entries.
- **Color modifiers**: For any color-oriented utility, opacity modifiers (e.g., `bg-red/50`) are resolved via `asColor`, which first checks the `opacity` namespace, then interprets numeric modifiers as percentages.
- **Static defaults**: Many components (`border`, `ring`, `outline`, transitions) read literal defaults such as `--default-border-width` when the related namespace is missing, guaranteeing that base utilities still emit CSS.

## Custom `@utility` Flow (`--value(...)` / `--modifier(...)`)

- Functional `@utility foo-* { ... }` blocks can call `--value(...)` to read literals, bare data types (`number`, `integer`, `ratio`, `percentage`), arbitrary values (via `[type]`), or theme namespaces (`--color`, `--spacing-*`, etc.). Tailwind normalizes the AST so hints such as `--text-*--line-height` are parsed consistently.
- `--modifier(...)` mirrors `--value(...)` and is intended for optional suffixes (e.g., `foo-2/3` or `foo-red/50`). A utility is only valid if all `--value(...)`/`--modifier(...)` usages resolve successfully.
- Tailwind tracks which namespaces each `@utility` touches so the CLI can surface completion suggestions for custom utilities alongside the core set.

## Default Tokens Worth Knowing

| Token                                                                   | Purpose                                                                                                 |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `--default-border-width`                                                | Literal fallback (`1px` by default) for `border`/`divide` utilities when `--border-width` is unset.     |
| `--default-outline-width`                                               | Similar fallback for `outline`.                                                                         |
| `--default-ring-color`, `--default-ring-width`                          | Ensure `ring` utilities still work without a theme scale.                                               |
| `--default-transition-duration`, `--default-transition-timing-function` | Provide values for `transition` utilities when `--transition-duration` / `--ease` namespaces are empty. |

## Token Prefix Reference

- **Format**: `Fallback chain` shows the order Tailwind checks. `none` means “no automatic fallback”.
- **Coverage**: Includes every namespace referenced in `utilities.ts`, grouped for readability.

### Spacing & Layout

| Token                   | Purpose                                      | Fallback chain                           |
| ----------------------- | -------------------------------------------- | ---------------------------------------- |
| `spacing`               | Global spacing multiplier for bare numbers   | none                                     |
| `size`                  | `size-*` (width & height together)           | `--size → --spacing`                     |
| `width`                 | Width utilities (`w-*`)                      | `--width → --spacing → --container`      |
| `min-width`             | `min-w-*`                                    | `--min-width → --spacing → --container`  |
| `max-width`             | `max-w-*`                                    | `--max-width → --spacing → --container`  |
| `height`                | Height utilities (`h-*`)                     | `--height → --spacing`                   |
| `min-height`            | `min-h-*`                                    | `--min-height → --height → --spacing`    |
| `max-height`            | `max-h-*`                                    | `--max-height → --height → --spacing`    |
| `flex-basis`            | `basis-*`                                    | `--flex-basis → --spacing → --container` |
| `inset`                 | Positional offsets (`top-*`, `left-*`, etc.) | `--inset → --spacing`                    |
| `margin`                | `m-*`, `mx-*`, `my-*`                        | `--margin → --spacing`                   |
| `padding`               | `p-*`, `px-*`, `py-*`                        | `--padding → --spacing`                  |
| `gap`                   | CSS gap utilities                            | `--gap → --spacing`                      |
| `space`                 | `space-x/y-*` between siblings               | `--space → --spacing`                    |
| `scroll-margin`         | Scroll margin utilities                      | `--scroll-margin → --spacing`            |
| `scroll-padding`        | Scroll padding utilities                     | `--scroll-padding → --spacing`           |
| `columns`               | Multi-column widths                          | `--columns → --container`                |
| `container`             | Container query size presets                 | none                                     |
| `breakpoint`            | Responsive breakpoints                       | none                                     |
| `aspect`                | `aspect-*` ratios                            | none                                     |
| `grid-auto-columns`     | `auto-cols-*`                                | none                                     |
| `grid-auto-rows`        | `auto-rows-*`                                | none                                     |
| `grid-column`           | `col-span-*`                                 | none                                     |
| `grid-column-start`     | `col-start-*`                                | none                                     |
| `grid-column-end`       | `col-end-*`                                  | none                                     |
| `grid-row`              | `row-span-*`                                 | none                                     |
| `grid-row-start`        | `row-start-*`                                | none                                     |
| `grid-row-end`          | `row-end-*`                                  | none                                     |
| `grid-template-columns` | `grid-cols-*` templates                      | none                                     |
| `grid-template-rows`    | `grid-rows-*` templates                      | none                                     |
| `radius`                | `rounded-*` border radius                    | none                                     |
| `object-position`       | `object-*`                                   | none                                     |
| `order`                 | Flex/grid ordering                           | none                                     |
| `z-index`               | Stacking context                             | none                                     |
| `line-clamp`            | `line-clamp-*`                               | none                                     |
| `list-style-type`       | `list-*` markers                             | none                                     |
| `list-style-image`      | Custom list bullets                          | none                                     |

### Typography & Text

| Token                       | Purpose                                                                   | Fallback chain                      |
| --------------------------- | ------------------------------------------------------------------------- | ----------------------------------- |
| `font`                      | Named font stacks                                                         | none                                |
| `font-weight`               | Weights for `font-*` + text scale                                         | none                                |
| `font-feature-settings`     | Feature settings resolved via `font` scale                                | none                                |
| `font-variation-settings`   | Variable font axes                                                        | none                                |
| `text`                      | Compound font-size scale (optionally returns line-height/tracking/weight) | none                                |
| `leading`                   | `leading-*` (line-height) bare numbers                                    | `--leading → --spacing`             |
| `line-height`               | Used by text scale options                                                | none                                |
| `letter-spacing`            | Read from text scale options                                              | none                                |
| `tracking`                  | Standalone `tracking-*` utilities                                         | none                                |
| `text-indent`               | `indent-*`                                                                | `--text-indent → --spacing`         |
| `text-color`                | `text-*` colors                                                           | `--text-color → --color`            |
| `text-decoration-color`     | `decoration-*` colors                                                     | `--text-decoration-color → --color` |
| `text-decoration-thickness` | `decoration-*` thickness                                                  | none                                |
| `text-underline-offset`     | `underline-offset-*`                                                      | none                                |
| `text-shadow`               | Preset text shadow shapes                                                 | none                                |
| `text-shadow-color`         | Text shadow color overrides                                               | `--text-shadow-color → --color`     |

### Color, Borders & Surfaces

| Token                           | Purpose                                                  | Fallback chain                              |
| ------------------------------- | -------------------------------------------------------- | ------------------------------------------- |
| `color`                         | Global color scale (foundation for most paint utilities) | none                                        |
| `background-color`              | `bg-*`                                                   | `--background-color → --color`              |
| `background-image`              | Preset background images + gradients                     | none                                        |
| `gradient-color-stop-positions` | Stop position helpers (`from-*`, `via-*`, `to-*`)        | none                                        |
| `accent-color`                  | `accent-*` for form controls                             | `--accent-color → --color`                  |
| `caret-color`                   | `caret-*`                                                | `--caret-color → --color`                   |
| `border-color`                  | `border-*`                                               | `--border-color → --color`                  |
| `border-width`                  | Border width scale                                       | none                                        |
| `border-spacing`                | `border-spacing-*`                                       | `--border-spacing → --spacing`              |
| `box-shadow-color`              | Used when forcing `shadow` colors                        | `--box-shadow-color → --color`              |
| `shadow`                        | Outer box-shadow presets (`shadow-*`)                    | none                                        |
| `inset-shadow`                  | Inset shadow presets                                     | none                                        |
| `drop-shadow`                   | Filter-based drop shadows                                | none                                        |
| `drop-shadow-color`             | Override color for drop shadows                          | `--drop-shadow-color → --color`             |
| `divide-color`                  | `divide-*` colors                                        | `--divide-color → --border-color → --color` |
| `divide-width`                  | `divide-*` widths                                        | `--divide-width → --border-width`           |
| `fill`                          | SVG fill utilities                                       | `--fill → --color`                          |
| `stroke`                        | SVG stroke color utilities                               | `--stroke → --color`                        |
| `stroke-width`                  | SVG stroke width scale                                   | none                                        |
| `outline-color`                 | `outline-*` colors                                       | `--outline-color → --color`                 |
| `outline-width`                 | `outline-*` widths                                       | none                                        |
| `outline-offset`                | `outline-offset-*`                                       | none                                        |
| `ring-color`                    | Ring color utilities                                     | `--ring-color → --color`                    |
| `ring-width`                    | Ring width scale                                         | none                                        |
| `ring-offset-color`             | Ring offset colors                                       | `--ring-offset-color → --color`             |
| `ring-offset-width`             | Ring offset widths                                       | none                                        |

### Filters & Backdrop Effects

| Token                 | Purpose               | Fallback chain                         |
| --------------------- | --------------------- | -------------------------------------- |
| `blur`                | `blur-*` filter       | none                                   |
| `backdrop-blur`       | Backdrop blur         | `--backdrop-blur → --blur`             |
| `brightness`          | `brightness-*`        | none                                   |
| `backdrop-brightness` | Backdrop brightness   | `--backdrop-brightness → --brightness` |
| `contrast`            | `contrast-*`          | none                                   |
| `backdrop-contrast`   | Backdrop contrast     | `--backdrop-contrast → --contrast`     |
| `grayscale`           | `grayscale` filter    | none                                   |
| `backdrop-grayscale`  | Backdrop grayscale    | `--backdrop-grayscale → --grayscale`   |
| `hue-rotate`          | `hue-rotate-*`        | none                                   |
| `backdrop-hue-rotate` | Backdrop hue rotation | `--backdrop-hue-rotate → --hue-rotate` |
| `invert`              | `invert-*`            | none                                   |
| `backdrop-invert`     | Backdrop invert       | `--backdrop-invert → --invert`         |
| `opacity`             | `opacity-*`           | none                                   |
| `backdrop-opacity`    | Backdrop opacity      | `--backdrop-opacity → --opacity`       |
| `saturate`            | `saturate-*`          | none                                   |
| `backdrop-saturate`   | Backdrop saturation   | `--backdrop-saturate → --saturate`     |
| `sepia`               | `sepia` filter        | none                                   |
| `backdrop-sepia`      | Backdrop sepia        | `--backdrop-sepia → --sepia`           |

### Motion, Transforms & Interaction

| Token                                | Purpose                                              | Fallback chain            |
| ------------------------------------ | ---------------------------------------------------- | ------------------------- |
| `animate`                            | `animate-*` keyframe bundles                         | none                      |
| `ease`                               | Named easing functions (`ease-in`, `ease-out`, etc.) | none                      |
| `transform-origin`                   | `origin-*`                                           | none                      |
| `translate`                          | `translate-*`                                        | `--translate → --spacing` |
| `scale`                              | `scale-*`                                            | none                      |
| `rotate`                             | `rotate-*`                                           | none                      |
| `skew`                               | `skew-*`                                             | none                      |
| `perspective`                        | `perspective-*`                                      | none                      |
| `perspective-origin`                 | Perspective origin utilities                         | none                      |
| `transition-property`                | `transition` presets                                 | none                      |
| `transition-duration`                | Duration scale                                       | none                      |
| `transition-delay`                   | Delay scale                                          | none                      |
| `default-transition-duration`        | Literal fallback for durations                       | none                      |
| `default-transition-timing-function` | Literal fallback for easing                          | none                      |
| `cursor`                             | `cursor-*`                                           | none                      |

### Structural & Authoring Helpers

| Token      | Purpose                                      | Fallback chain               |
| ---------- | -------------------------------------------- | ---------------------------- |
| `value`    | Used inside `@utility` via `--value(...)`    | Order defined per `@utility` |
| `modifier` | Used inside `@utility` via `--modifier(...)` | Order defined per `@utility` |

[^1]: [Tailwind CSS utilities source](https://raw.githubusercontent.com/tailwindlabs/tailwindcss/a1f533a0e04ab7f94a31ced50843e638dc99ecac/packages/tailwindcss/src/utilities.ts)
