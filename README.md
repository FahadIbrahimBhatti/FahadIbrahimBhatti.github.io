# Academic website

The personal research website of Muhammad Fahd Ibrahim Bhatti. Open `index.html` in a browser to preview the site. Fonts, illustrations, and the CV are served from the repository. The site has no build step.

## Design

The charcoal and gunmetal palette uses burnt orange for links and active states, with cyan reserved for technical metadata. Space Grotesk sets the headings, Inter handles reading text, and IBM Plex Mono distinguishes technical labels. The original exploded processor drawing and thin rules carry the industrial theme. The publication list uses a conventional citation layout.

The featured research panels stack on small screens. The SpikeDuet, VQ-LIC, and cerebellar decoding figures come from the supplied manuscripts and open at full size. The compilation diagram depicts the research workflow conceptually. The site defaults to dark mode and remembers an explicit theme choice.

## Update or publish on GitHub Pages

1. Edit `index.html` for the biography, projects, publications, and contact information. Replace `cv.pdf` when the public CV changes. Keep both the stylesheet and `assets/` at their current relative paths.
2. Preview locally, then commit the website changes and push them to `main` in `FahadIbrahimBhatti/FahadIbrahimBhatti.github.io`.
3. In the repository, open **Settings → Pages**. If needed, set **Source** to **Deploy from a branch**, select **main** and **/(root)**, and save. Keep `.nojekyll` in the repository root. [GitHub Pages publishing documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
4. Check the Pages deployment in **Actions**, then open the site. [Live site](https://fahadibrahimbhatti.github.io/)

Run these commands from the GitHub Pages checkout to publish the current redesign.

```sh
git add -- index.html styles.css main.js assets cv.pdf README.md
git commit -m "Redesign academic research portfolio"
git push origin main
```

## Publication records to review

- The IEEE EMBC 2026 entry links to the conference program and records the presentation. Add the publisher link or DOI when you can verify a proceedings record. [Official EMBC program](https://cmsworkshops.com/EMBC2026/view_session.php?SessionID=1148)
- The public CV still lists review statuses for VQ-LIC, SpikeDuet, and the hardware-matched SNN manuscript, and calls the EMBC proceedings forthcoming. The website uses their publicly verifiable arXiv and program records. Confirm the submission or publication statuses before updating the CV.
