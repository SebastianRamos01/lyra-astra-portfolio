# Lyra Astra

Portfolio website for the photographer Lyra Astra: a single-page gallery with one large photograph and a dock-style thumbnail strip below it.

## Stack

- Next.js 16 (App Router) and React 19
- Tailwind CSS 4
- Motion, for the hero transitions
- Embla Carousel, for the thumbnail strip
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

The site runs at http://localhost:3000.

| Command | What it does |
| --- | --- |
| `pnpm dev` | Starts the dev server |
| `pnpm build` | Creates a production build |
| `pnpm start` | Serves the production build |
| `pnpm lint` | Runs ESLint |

## Project structure

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | The page: header and gallery |
| `app/globals.css` | Layout, design tokens and animations |
| `components/Header.tsx` | Site header |
| `components/SplitText.tsx` | Splits a line into animated characters, with a full-text copy for SEO |
| `components/Gallery.tsx` | Holds the selected photo and connects the hero to the strip |
| `components/Hero.tsx` | The large photograph |
| `components/ThumbStrip.tsx` | The looping thumbnail carousel |
| `lib/photos.ts` | The photo list and the photo the page opens on |
| `assets/images/` | The photographs |

## How the site behaves

**Navigation.** Visitors drag the strip, click a thumbnail, or use the left and right arrow keys when the strip has focus. The thumbnail closest to the center becomes the large photo.

**Layout.** The page is exactly one screen tall. The hero takes the space left by the header and the strip, up to `--hero-h`. Phones held sideways are the exception: there isn't enough height, so the page scrolls.

**Header.**

| Screen width | Layout |
| --- | --- |
| Below 1024px | Single column |
| 1024px to 1279px | 16-column grid, each item spans 4 |
| 1280px and up | 24-column grid, each item spans 4 |

**Animations.**

| Element | When | Effect |
| --- | --- | --- |
| Header text | Page load | Characters rise into place one after the other |
| Hero | Page load | Bottom-to-top `clip-path` wipe |
| Hero | Photo change | Crossfade with a small zoom, from 1 to 1.03 |
| Thumbnails | Page load | Bottom-to-top wipe and fade, cascading out from the center |

All of these respect the visitor's reduced-motion setting.

## Changing the photos

1. Add the image to `assets/images/`.
2. Import it in `lib/photos.ts` and add an entry to `photos` with an `id` and an `alt` text. The alt texts are in Spanish.
3. To change the photo the page opens on, update `initialPhotoIndex`.

The list is meant to be replaced by a CMS query (for example Sanity) when content goes live.

## Before launch

- [ ] Add the real URL for the "Website by" link in `components/Header.tsx` (it currently points to `#`).
- [ ] Replace the generic Instagram URL with the real profile.
- [ ] Confirm the credit spelling: `@Sbas` or `@sebas`.
