# Kunal Senani — Portfolio

Source for [kunalsenani.com](https://kunalsenani.com), the portfolio of Kunal Senani, video editor and filmmaker.

## How the live site works

The live site is plain static HTML — no build step. Vercel serves the repo folder as-is (see `vercel.json`).

| File | What it is |
| --- | --- |
| `index.html` | All page content: hero, showreel, work, experience, skills, contact |
| `styles.css` | All styling |
| `script.js` | Interactions (video previews, menus, animations) |
| `assets/` | Images, logos and video clips used by the page |

To change text, links or videos, edit `index.html`. Push to `main` and Vercel redeploys automatically.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Next.js version (not live)

`PortfolioPage.tsx`, `data.ts`, `package.json` and the Tailwind config are an in-progress Next.js rewrite. It is not what Vercel deploys, and it still needs its `components/` folder before it can build.
