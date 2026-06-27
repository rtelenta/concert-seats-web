# Spec: File Naming Convention

## Purpose

Defines the file naming rules for TypeScript source files in this project to ensure consistent, predictable names across the codebase.

## Requirements

### Requirement: TypeScript files use camelCase naming
All multi-word TypeScript source files in `components/`, `features/`, and `lib/` SHALL use camelCase file names (e.g., `showCard.tsx`, `useShows.ts`). Single-word files and Next.js reserved file names (`page.tsx`, `layout.tsx`) are exempt.

#### Scenario: Multi-word component file is camelCase
- **WHEN** a new TypeScript file with multiple words in its name is created
- **THEN** the file name SHALL use camelCase (e.g., `myComponent.tsx`), not kebab-case (`my-component.tsx`)

#### Scenario: Next.js reserved files are exempt
- **WHEN** a file serves as a Next.js route or config entry point
- **THEN** it SHALL follow Next.js naming conventions (`page.tsx`, `layout.tsx`, `next.config.ts`) regardless of this rule
