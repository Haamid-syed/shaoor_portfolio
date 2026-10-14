# The Signal Room

A vintage electronics engineer portfolio, built around an interactive analog oscilloscope and an engineering field journal. Cream paper, olive hardware, brass details, editorial typography, and purpose-built illustrations.

## Run locally

```bash
npm install
npm run dev
```

Open the Local URL Vite prints. To build a static production version, run `npm run build`. The output is in `dist/`. Use `npm run preview` to inspect that build locally.

## Personalize the portfolio

**All biographical information is sample content.** Alex Morgan is an illustrative name. Projects and hobbies are illustrative, employment and education use explicit placeholders, and `hello@example.com` is a sample address.

Edit `src/content.js` to replace the name, introduction, biography, email, project case studies, experience, education, and hobbies. The first name appears in the introduction and signature. Project `id` values select the corresponding illustration in `src/art.js`; retain these IDs unless you add new artwork. Replace or remove the sample-content notes in `src/main.js` once your real content is supplied. Update `index.html` for your final title and description.

The contact link opens the visitor's email application. The copy button copies the displayed email. There is no contact form or server receiving messages. Social URL fields are reserved for personalization; social links are not shown while empty.

## What works

- A real Three.js oscilloscope: drag the cabinet or use arrow keys to rotate it, tune the frequency, switch between sine/triangle/square waveforms, switch power, or reset its orientation. Drag the lower physical dial vertically to tune it too.
- A calibration loader tied to fonts and shader preparation, synchronized with the hero entrance.
- Staggered assembly entrances for the oscilloscope and project components, plus chapter reveals and drawn schematics.
- Scroll parallax for the instrument, notebook, project artwork, hobby illustrations, and correspondence card. Entrance, pointer, and scroll effects use independent layers.
- Interactive hobby cards and perspective project illustrations.
- Three project case studies in native dialogs, with Escape dismissal and focus return.
- A sticky navbar with measured anchor offsets, a hand-drawn hero underline, a reading-progress line, and mobile navigation.
- A correspondence section with an animated envelope, direct email link, and copy feedback.
- A motion switch that persists locally and honors the system's reduced-motion preference by default.
- A static illustration fallback when WebGL is unavailable. The 3D renderer pauses when the instrument is offscreen or the browser tab is hidden.
- Locally bundled fonts; no runtime third-party font or image requests.

## Source map

| File | Purpose |
| --- | --- |
| `src/content.js` | Editable personal and project content |
| `src/main.js` | Page markup, navigation, dialogs, and animation orchestration |
| `src/scene.js` | Procedural Three.js instrument, lighting, and CRT waveform |
| `src/art.js` | Custom SVG icons, sketches, and hardware illustrations |
| `src/style.css` | Original layout, illustrations, and existing responsive styles |
| `src/edition.css` | Refined typography, print details, and independent parallax layers |
| `src/responsive.css` | Phone and tablet layout refinements |
| `src/motion.js` | Component assembly entrances, chapter reveals, parallax, and pointer effects |
| `src/loader.js` | Loading stages and synchronized paper-to-hero handoff |
| `public/loader.css` | Critical opening-sequence styles |

Stack: Vite, vanilla JavaScript, Three.js, and GSAP. No backend is required.

## Validation

JavaScript syntax checks, production build, and loader lifecycle checks cover ordered reveal, repeated calls, reduced motion, interruption, and failure recovery. Browser checks at 320, 390, 768, and 1440 pixels confirmed content fits the viewport, sticky navigation stays visible, mobile navigation closes after selection, and narrow project dialogs scroll without horizontal overflow. The browser console reported no warnings or errors during this check.

The source is prepared for GitHub. Website hosting is a separate step and has not been requested for this revision.
