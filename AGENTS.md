# Gnosis VPN Self-Onboarding

## Project Overview

A React + TypeScript onboarding wizard for Gnosis VPN. Users walk through a multi-step flow (welcome, OS selection, download, etc.) presented as a scrollable conversation-style UI.

## Tech Stack

- **Framework:** React 19 + TypeScript, Vite
- **UI library:** MUI (Material UI) v7 — use MUI for all new UI work
- **State:** Zustand (single store at `src/store/appStore.ts`)
- **Styling:** MUI `sx` prop. Do not use styled-components for new code (legacy `LandingPage.tsx` uses it)

## Project Structure

```
src/
  App.tsx              # Root view router (login | landing | onboarding)
  store/appStore.ts    # Zustand store (navigation, onboarding state, login form)
  components/          # Reusable components
    MessageBubble.tsx
    Button.tsx         # Landing page button (styled-components, legacy)
    onboarding/
      Button.tsx       # MUI onboarding button
      Step.tsx         # Step template (title, text, buttons)
      TopBar.tsx       # Fixed top navigation bar
  views/               # Page-level views
    Login.tsx
    LandingPage.tsx
    Onboarding.tsx     # Main onboarding shell with scroll logic
    onboarding/        # Individual onboarding steps
      1_welcome.tsx
      2_os.tsx
      3_download.tsx
      Z_summary.tsx
```

## Code Conventions

### Component Rules

1. **Always use MUI components** (`Box`, `Stack`, `Typography`, `Container`, etc.). Do not use raw HTML (`div`, `span`, `p`) when an MUI equivalent exists.

2. **No unnecessary nesting.** Never wrap `<Box>` inside `<Box>` or `<div>` inside `<div>` unless there is a concrete layout reason. Flatten the DOM. If a wrapper only exists to hold a single child with no additional styles, remove it.

3. **Every component gets a CSS class matching its name.** The root element of every component must have `className={`ComponentName${className ? ` ${className}` : ""}`}`. Every component accepts an optional `className?: string` prop and appends it.

4. **Keep code minimal.** Use the simplest approach. No over-engineering, no premature abstractions, no unnecessary wrappers or utilities.

5. **Lint after every change.** Run `yarn run lint` after modifying any file. Fix all errors before moving on. The build command is `yarn run build` (runs `tsc -b && vite build`).

### Styling

- Use the MUI `sx` prop for all styling. No inline `style={{}}` objects in new code.
- Use responsive values where appropriate: `{ xs: ..., sm: ..., md: ... }`.
- Keep color values consistent with the existing palette (`#333`, `#666`, `#e0e0e0`, `#f5f5f5`, etc.).

### State Management

- All shared state lives in `src/store/appStore.ts` via Zustand.
- Access state with `useAppStore((state) => state.fieldName)` — select only what you need.
- Onboarding progression is controlled by `onboardingStep` (number). Steps render conditionally: `onboardingStep >= N && <StepN />`.

### Step Components

- Each step is a view in `src/views/onboarding/` that renders `<Step>`.
- `<Step>` accepts: `title`, `text`, `buttons`, `onboardingStep` (for scroll targeting), `className`.
- Buttons should only render when the step is the current active step (e.g., `onboardingStep === 3 ? <buttons> : null`).

## Commands

```bash
yarn run dev      # Start dev server
yarn run build    # Type-check + build
yarn run lint     # ESLint
yarn run preview  # Preview production build
```
