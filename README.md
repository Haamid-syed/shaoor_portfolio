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

- A real Three.js oscilloscope: drag to rotate it, tune the frequency, switch the signal on or off, or reset its orientation.
- GSAP entrance and scroll reveals, notebook parallax, a moving editorial strip, perspective project cards, and interactive hobby cards.
- Three project case studies in native dialogs, with Escape dismissal and focus return.
- Responsive navigation, a reading-progress line, anchor navigation, and email copy feedback.
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
| `src/style.css` | Color, typography, layout, illustrations, and responsive styles |
| `.openai/hosting.json` | Existing Sites identity and static deployment configuration |

Stack: Vite, vanilla JavaScript, Three.js, and GSAP. No backend is required.
