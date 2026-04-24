# Ex-Spec Academic & Industry Research Initiative

Presented under **Wrek’d Tech | Ex-Spec**.

Primary tagline: **Greener Thinking. Smarter Recycling.**

## 1) Project overview
This repository hosts a single-page, static GitHub Pages site for the Ex-Spec Academic & Industry Research Initiative.

The implementation uses:
- semantic HTML5 (`index.html`)
- plain CSS (`style.css`)
- vanilla JavaScript (`script.js`)

The page is intentionally written in future-tense program language and explicitly states that Ex-Spec is currently in the conceptual and system-design stage.

## 2) File structure
```text
/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── ReadMe.md
    ├── docs/
    │   ├── ReadMe.md
    │   └── Wrekd-Tech-ExSpec-NDA.pdf
    ├── images/
    │   ├── ReadMe.md
    │   ├── Recovered REE.jpg
    │   └── placeholder-research-visual.svg
    └── logos/
        ├── ReadMe.md
        └── (existing logo files)
```

## 3) GitHub Pages deployment steps
1. Push the latest commit to the branch used for publishing (typically `main`).
2. Open **GitHub → Repository → Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` (or desired branch) and folder `/ (root)`.
5. Save and wait for deployment.
6. Open the site URL and force refresh to verify the latest files are served.

## 4) Google Sheets columns
Required tab name:
- `Responses`

Required columns (in this order):
1. Timestamp
2. First Name
3. Last Name
4. Institution / Organization
5. Title / Role
6. Email Address
7. Phone Number
8. Department
9. Area of Interest
10. Message / Interest Note / Description
11. Consent Confirmation

## 5) Google Apps Script endpoint currently used
Working Apps Script URL:

`https://script.google.com/macros/s/AKfycbx8B0xEWk-KF6TVYvaAhVP0G-3yvjApVWe36u4OtIxU5oCE5C96ju0dxDxLAlTmaqdQ/exec`

## 6) How to replace/update the Apps Script URL
1. Open `script.js`.
2. Locate:
   ```js
   const GOOGLE_APPS_SCRIPT_WEB_APP_URL = "...";
   ```
3. Replace the URL string with the new deployed Apps Script Web App URL.
4. Commit and redeploy.

## 7) NDA PDF placement instructions
Expected NDA path:

`assets/docs/Wrekd-Tech-ExSpec-NDA.pdf`

The download button in `index.html` points to:

`/assets/docs/Wrekd-Tech-ExSpec-NDA.pdf`

If replacing the document, keep the same filename to avoid link changes.

## 8) Form field list
All fields are required:
- First Name (`firstName`)
- Last Name (`lastName`)
- Institution / Organization (`institution`)
- Title / Role (`role`)
- Email Address (`email`)
- Phone Number (`phone`)
- Department (`department`)
- Area of Interest (`areaOfInterest`)
- Message / Interest Note / Description (`message`)
- Consent checkbox (`consent`)

Submission payload keys:
```json
{
  "firstName": "",
  "lastName": "",
  "institution": "",
  "role": "",
  "email": "",
  "phone": "",
  "department": "",
  "areaOfInterest": "",
  "message": "",
  "consent": true
}
```

## 9) Testing checklist
- Open the live site.
- Confirm page design is professional and not using a Google Form iframe.
- Complete the inquiry form with test data.
- Confirm success message appears.
- Confirm NDA download section appears after submission.
- Confirm the test row appears in Google Sheet.
- Confirm mobile layout is readable.
- Confirm all navigation links scroll correctly.

## 10) Remaining TODO items
- Validate end-to-end Google Apps Script response behavior with production Sheet permissions.
- Confirm final legal review/version of `assets/docs/Wrekd-Tech-ExSpec-NDA.pdf`.
- If NDA PDF is not final, upload the final approved file to `assets/docs/Wrekd-Tech-ExSpec-NDA.pdf`.
