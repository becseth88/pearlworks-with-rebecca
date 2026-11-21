# Pearlworks with Rebecca Seth

Open `index.html` in a browser. Keep the six page files and the `assets` folder together. The site includes its artwork and typefaces. Booking links open Rebecca’s TidyCal profile online.

## Site map

| Page | File |
| --- | --- |
| Home | `index.html` |
| Get Bookable | `get-bookable/index.html` |
| Pearl Sequence Sessions | `pearl-sequence-sessions/index.html` |
| Pearlsites | `pearlsites/index.html` |
| Pearlworks | `pearlworks/index.html` |
| About Rebecca | `about/index.html` |

## Editing

The text and links live in the individual HTML files. The shared design lives in `assets/site.css`. Illustration placement lives in `assets/artwork.css`. The menu, session accordions and three-part Pearlworks cycle use `assets/site.js`. Font licence files are in `assets/fonts/`.

Every booking button currently opens the general profile at `https://tidycal.com/becseth`. When a dedicated booking type is ready, update the corresponding links in the relevant pages.

## Publishing on GitHub Pages

In the repository’s **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, and save. Keep `index.html`, `.nojekyll` and the `assets/` folder at the repository root. The pages use relative links so the site works at its GitHub project address.

After deployment, **Settings → Pages → Visit site** opens the published website. Future updates to `main` publish to the same address.
