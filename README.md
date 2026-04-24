# Ex-Spec Academic & Industry Research Initiative

Presented under **Wrek’d Tech | Ex-Spec**.

Tagline: **Greener Thinking. Smarter Recycling.**

## 1) Project overview
This repository contains a lightweight, single-page, static landing page for the **Ex-Spec Academic & Industry Research Initiative**. The page is designed for GitHub Pages and will support outreach to colleges, universities, researchers, grant partners, and industry collaborators.

The landing page uses plain HTML, CSS, and minimal vanilla JavaScript only. It introduces Ex-Spec in future-tense language and clearly states that Ex-Spec is currently in the conceptual and system-design stage.

## 2) File structure

```text
/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── docs/
    │   └── Wrekd-Tech-ExSpec-NDA.pdf
    ├── logos/
    │   └── (existing logo assets)
    └── images/
        └── placeholder-research-visual.svg
```

## 3) GitHub Pages deployment steps
1. Push the repository to GitHub.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select the branch (typically `main`) and folder `/ (root)`.
5. Save, then wait for deployment.
6. Confirm the site opens at your GitHub Pages URL.

## 4) Google Form setup steps
1. Create a Google Form titled for Ex-Spec research and partnership inquiry.
2. Make all fields below **required**:
   - First Name
   - Last Name
   - Institution / Organization
   - Title / Role
   - Email Address
   - Phone Number
   - Department
   - Area of Interest
   - Message / Interest Note / Description
3. Configure **Area of Interest** as a dropdown with these options:
   - Research collaboration
   - Technical validation
   - Faculty engagement
   - Student research participation
   - Systems engineering support
   - Robotics / automation
   - AI / sensing
   - Environmental research
   - Materials recovery research
   - Rare-earth element recovery
   - Hazardous-material handling and safety validation
   - Life-cycle assessment and sustainability impact research
   - Regulatory and compliance research
   - Workforce development / applied technical training
   - Grant collaboration
   - Consortium participation
   - Other
4. Publish the form and copy the embed URL.
5. Replace `REPLACE_WITH_GOOGLE_FORM_EMBED_URL` in `index.html` with the published embed URL.

## 5) NDA PDF placement instructions
- Expected NDA location:
  - `/assets/docs/Wrekd-Tech-ExSpec-NDA.pdf`
- This file is intended to be linked from the Google Form confirmation page after submission.
- Do not add legal text in this repo; upload only the finalized NDA PDF.

## 6) Google Form confirmation message template
Use the following confirmation message in Google Forms after submit:

```text
Thank you. Your inquiry has been received.

You may now access the NDA for review and signature here:
[INSERT LIVE NDA PDF URL]

After signing, please return the completed NDA to research@wrekdtech.com. Upon receipt, Wrek’d Tech will countersign and return a fully executed copy along with the material(s) approved for release.
```

## Operational notes
- Contact email used consistently across the site: `research@wrekdtech.com`.
- Ex-Spec statements are intentionally future-tense to avoid implying current commercial deployment.
- The Google Form embed and live NDA URL are the two expected owner-configured items.
