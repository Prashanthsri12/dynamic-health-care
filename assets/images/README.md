# Image Replacement Guide — Dynamic Health Care Website

Every JPG in this folder is a **placeholder**. To use a real photo, simply
**overwrite the file with the same filename** (keep the `.jpg` extension).
The website will pick it up automatically — no code change needed.

For best results, match the recommended dimensions below. Slightly larger is
fine (the browser will scale down); much smaller will look blurry on retina
displays.

## Recommended dimensions

| File                    | Size (W x H px) | What it is                              |
|-------------------------|-----------------|-----------------------------------------|
| `hero-home.jpg`         | 1400 x 700      | Homepage hero — full-width banner       |
| `hero-general.jpg`      | 1400 x 700      | General Medicine page hero              |
| `hero-gynae.jpg`        | 1400 x 700      | Gynaecology page hero                   |
| `hero-neuro.jpg`        | 1400 x 700      | Neurology page hero                     |
| `about-team.jpg`        |  900 x 700      | "Our Story" team photo                  |
| `dr-prithviraj.jpg`     |  400 x 500      | Dr. R. Prithviraj — portrait            |
| `dr-priyanka.jpg`       |  400 x 500      | Dr. S.V. Priyanka — portrait            |
| `dr-subramanian.jpg`    |  400 x 500      | Dr. K. Sankara Subramanian — portrait   |
| `service-general.jpg`   |  800 x 600      | Homepage services card — General Med    |
| `service-gynae.jpg`     |  800 x 600      | Homepage services card — Gynaecology    |
| `service-neuro.jpg`     |  800 x 600      | Homepage services card — Neurology      |
| `service-homecare.jpg`  |  800 x 600      | Homepage services card — Home Care      |
| `blog-sleep.jpg`        |  800 x 600      | Sleep blog cover                        |
| `blog-general.jpg`      |  800 x 600      | Hypertension blog cover                 |
| `blog-gynae.jpg`        |  800 x 600      | PCOS blog cover                         |
| `blog-neuro.jpg`        |  800 x 600      | Stroke / FAST blog cover                |

## Tips for great photos

- **Portraits**: shoot against a clean, light background. Subject roughly
  centred, head and shoulders visible. JPEG quality 80% or higher.
- **Hero banners**: use bright, warm, well-lit interior shots of the clinic —
  reception, examination rooms, smiling staff. Avoid stock-photo look.
- **Service cards**: close-up working photos (a doctor reviewing a chart, an
  EEG screen, a pharmacist behind a counter).
- **File size**: keep each JPG under 300 KB if you can — the site loads
  faster on mobile. Free tools like [Squoosh](https://squoosh.app) compress
  without losing visible quality.

## What if I delete a file by accident?

The website will still load — every `<img>` has a CSS fallback that shows a
soft grey panel with a medical-cross icon. The page won't look broken.
