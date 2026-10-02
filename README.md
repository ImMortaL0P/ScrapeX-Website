# Scrape X — a Kraft Studios tool kit

The site for [scrapex.tools](https://scrapex.tools) — five Chrome tools that turn any
website into data a designer can use.

Built with Vite, React and Tailwind v4, on the same design system as the Kraft Studios
site: warm paper ground, one ink, one orange, IBM Plex with Instrument Serif for the
editorial line. Type is self-hosted — a site arguing that nothing should leave your
browser has no business calling Google for fonts.

## Working on it

```bash
npm install
npm run dev       # local, with hot reload
npm run build     # static bundle into dist/
npm run preview   # serve the built bundle
```

## Deploying

Pushing to `main` builds and publishes to GitHub Pages through
`.github/workflows/deploy.yml`. In the repository, set **Settings → Pages → Source**
to **GitHub Actions** once, and add `scrapex.tools` as the custom domain — `public/CNAME`
already carries it, so Pages will pick it up on each deploy.

At the registrar, point the apex at GitHub:

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
AAAA  @    2606:50c0:8000::153
AAAA  @    2606:50c0:8001::153
AAAA  @    2606:50c0:8002::153
AAAA  @    2606:50c0:8003::153
CNAME www  <your-github-username>.github.io.
```

Then tick **Enforce HTTPS** in Pages once the certificate is issued.

## Store links

Each tool in `src/data.ts` carries `storeUrl: null`. The install cards show **In review**
while that is null; set the Chrome Web Store URL and the card becomes an **Add to Chrome**
button. Nothing else needs touching.

---

© Kraft Studios · admin@kraftstudios.site
