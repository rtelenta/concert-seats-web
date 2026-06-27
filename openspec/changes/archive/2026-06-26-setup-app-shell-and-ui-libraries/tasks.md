## 1. Install Dependencies

- [x] 1.1 Run `bun add @clerk/nextjs @tanstack/react-query react-hook-form zod` to install runtime dependencies
- [x] 1.2 Run `bunx shadcn@latest init` to initialise shadcn/ui (accept defaults; we override CSS in task 3)
- [x] 1.3 Run `bunx shadcn@latest add button` to generate `components/ui/button.tsx`

## 2. Clean Up Demo Content

- [x] 2.1 Delete `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg`
- [x] 2.2 Clear `app/page.tsx` (replace with thin shell — see task 5)

## 3. Write the Concert Dark Theme

- [x] 3.1 Rewrite `app/globals.css` with the `@theme inline {}` block mapping Tailwind tokens to CSS vars
- [x] 3.2 Add all `--*` colour tokens under a single `:root {}` block (see design.md section 3)
- [x] 3.3 Add `html { color-scheme: dark; }` and base `body` styles

## 4. Patch the Button Component

- [x] 4.1 Open `components/ui/button.tsx` and add `cursor-pointer` to the base class string inside `buttonVariants`

## 5. Build the Root Layout

- [x] 5.1 Create `components/providers.tsx` as a `"use client"` component wrapping `QueryClientProvider` (QueryClient instantiated via `useState`)
- [x] 5.2 Rewrite `app/layout.tsx`: `ClerkProvider` outermost, `<html lang="en" className="... dark">`, `<Providers>` inside body

## 6. Build the Home Page Shell

- [x] 6.1 Create `features/home/pages/home-page.tsx` exporting `HomePage` with title + subtitle using `t()` keys
- [x] 6.2 Add `home.title` and `home.subtitle` keys to `locales/en.json`
- [x] 6.3 Update `app/page.tsx` to import and render `<HomePage />`

## 7. Environment Setup

- [x] 7.1 Create `.env.example` documenting `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
- [x] 7.2 Verify `.env.local` is in `.gitignore`

## 8. Verify

- [x] 8.1 Run `bun dev` and confirm the app loads with the dark concert theme and no demo content
- [x] 8.2 Confirm `<html>` has the `dark` class and `color-scheme: dark` is applied in DevTools
- [x] 8.3 Inspect a Button element and confirm `cursor-pointer` is in the computed styles
