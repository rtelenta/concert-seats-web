# Spec: app-shell

## Purpose

Defines the minimal, always-present application scaffolding: root layout, provider tree, and home page placeholder. All feature pages build on top of this shell.

---

## Requirements

### Layout

- The root `<html>` element MUST have the `dark` class applied statically (never toggled at runtime).
- The root layout MUST wrap all children in `ClerkProvider` as the outermost boundary.
- The root layout MUST include a client-side `Providers` component that houses `QueryClientProvider`.
- `ClerkProvider` MUST be a server-side wrapper (no `"use client"` in `layout.tsx`).
- `app/layout.tsx` MUST set `<html lang="en">` and include font CSS variables.

### Home Page

- `app/page.tsx` MUST be a thin shell that renders `<HomePage />` from `features/home/pages/home-page.tsx`.
- The home page content MUST use locale keys from `locales/en.json` via the `t()` util — no hardcoded UI strings.
- The home page MUST display a title and a subtitle at minimum.

### Providers

- `components/providers.tsx` MUST be a `"use client"` component.
- `QueryClient` MUST be instantiated with `useState` (not module-level) to prevent state leaking across requests.

### Cleanup

- All Next.js demo SVG assets (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) MUST be removed from `public/`.
- Demo content MUST NOT remain in any `app/` file after this change.

---

## Out of Scope

- Navigation, header, footer components
- Auth-protected routes or middleware
- Any domain feature pages
