@AGENTS.md

# Project

This is a Next.js project for a gallery with tailwind, motion and embla carousel. It is a single-page portfolio for the photographer Lyra Astra. See README.md for the structure, behavior and pending launch items.

User-facing copy and alt texts are in Spanish.

# Commands

Dev Server : 'pnpm dev'
Lint : 'pnpm lint'
Typecheck : 'npx tsc --noEmit'

# Layout rules

- `.page` is exactly `100dvh`. The hero fits the leftover space: `.hero-cell` uses `container-type: size` and `max-height: var(--hero-h)`, and `.hero` sizes itself with `cqw`/`cqh`. Don't size the hero from the viewport, or short screens start scrolling again.
- The `240px` floor on the stage row is intentional. Phones held sideways scroll because of it.
- The `.hero-cell` height must never depend on the photo, or the strip jumps on every change.
- Header: column below `lg`, `grid-cols-16` from `lg`, `grid-cols-24` from `xl`, and every child spans 4.
- The strip's bottom alignment is what shapes the dock (`transform-origin: 50% 100%`). Keep thumbnails on that line unless asked otherwise.

# Animation rules

- The server-rendered page must look right before hydration. Prefer CSS animations that start at first paint (hero wipe, header text). Anything that needs JS must stay hidden until it is ready.
- The strip stays hidden until `ThumbStrip` sets `data-ready`. That hidden state lives inside `@media (scripting: enabled)` so the strip still shows without JS.
- `applyScale` and `revealThumbs` write `--s`, `--i` and `z-index` straight to the DOM on purpose, to avoid re-rendering on every scroll frame.
- `.hero` mounts once, so `hero-reveal` plays only on load. Photo changes re-mount the inner `motion.div` through `key={photo.id}`.
- `clip-path` can't transition to `none`, so the end state must be an explicit `inset(0)`.
- `text-decoration` doesn't reach inline-block children. `.split-line` and `.split-char` inherit it explicitly.

# Pitfalls that already caused bugs

- `prefers-reduced-motion` overrides must come after the rule they override. They have the same specificity, so the later rule wins.
- Never let `useReducedMotion()` change a rendered value such as `animate={{ scale }}`: it causes a hydration mismatch. Only change durations.
- Don't put `<div>` inside `<p>`. `SplitText` renders divs, so its parents must be divs too.
- Don't mutate local variables during render (`react-hooks/immutability` fails lint).

# Verifying changes

Check animations in a real browser, including reduced motion and a mobile width, and look at the console for hydration errors. Typecheck and lint don't catch these.
