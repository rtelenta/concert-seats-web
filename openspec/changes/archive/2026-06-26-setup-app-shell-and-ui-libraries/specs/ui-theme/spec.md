# Spec: ui-theme

## Purpose

Defines the shadcn/ui initialisation, the concert-brand dark-only colour palette, and component-level style requirements that apply globally across the app.

---

## Requirements

### Dark Mode

- The app MUST be dark-mode only. There is no light mode and no runtime theme toggle.
- The colour tokens in `app/globals.css` MUST be defined under a single `:root` block — no `.dark {}` override block.
- `html { color-scheme: dark; }` MUST be set so the browser renders native elements (scrollbars, inputs) in dark mode.

### Colour Palette

The following semantic tokens MUST be defined (oklch colour space):

| Token | Role | Value |
|---|---|---|
| `--background` | Page background | Deep midnight (`oklch(0.10 0.02 275)`) |
| `--foreground` | Primary text | Near-white (`oklch(0.96 0.005 275)`) |
| `--card` | Elevated surface | `oklch(0.14 0.025 275)` |
| `--primary` | Brand CTA / interactive | Electric violet (`oklch(0.62 0.22 295)`) |
| `--primary-foreground` | Text on primary | `oklch(0.99 0 0)` |
| `--secondary` | Subdued surface | `oklch(0.20 0.04 285)` |
| `--muted` | Dimmed surface | `oklch(0.18 0.02 275)` |
| `--muted-foreground` | Hint / placeholder text | `oklch(0.60 0.015 280)` |
| `--accent` | Highlight / hover spark | Neon cyan (`oklch(0.72 0.18 210)`) |
| `--accent-foreground` | Text on accent | `oklch(0.10 0.02 275)` |
| `--destructive` | Error / danger actions | `oklch(0.58 0.22 25)` |
| `--border` | Subtle dividers | `oklch(0.25 0.03 280)` |
| `--input` | Form field background | `oklch(0.22 0.03 280)` |
| `--ring` | Focus ring | Same as `--primary` |
| `--radius` | Global border radius | `0.625rem` |

### Tailwind v4 Token Mapping

All `--color-*` and `--radius-*` Tailwind theme tokens MUST be mapped to the CSS vars above inside an `@theme inline {}` block, so utility classes like `bg-primary`, `text-muted-foreground`, `rounded-lg` resolve to the concert palette.

### Button Component

- The shadcn `Button` component MUST include `cursor-pointer` in its base class string (inside `buttonVariants`).
- This MUST be applied at the CVA base level so every button variant inherits it without repetition.

### Component Initialisation

- shadcn/ui MUST be initialised via the CLI (`bunx shadcn@latest init`).
- All generated component files land in `components/ui/`.
- At minimum, the `Button` component MUST be added as part of this change (`bunx shadcn@latest add button`).

---

## Out of Scope

- Custom animations beyond what `tw-animate-css` provides
- Typography plugin configuration
- Dark/light switcher component
