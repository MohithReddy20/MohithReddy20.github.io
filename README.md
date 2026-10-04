# Portfolio V2

Static Astro portfolio for Mohith Reddy Yannam. No React, server, database or CMS.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:4321. Stop the server with Ctrl+C.

## Checks and production preview

```sh
npm run check
npm run build
npm test
npm run preview
```

`check` typechecks TypeScript data files. It is not full Astro template diagnostics: the current Astro checker does not support this installed TypeScript 7 setup. The build compiles Astro pages. Tests inspect the generated `dist/` files, routes, local assets, anchor destinations, current content, and unchanged resume bytes. Run build before tests.

## Where to edit

- `src/data/`: profile, projects, experience, skills, achievements, capabilities.
- `src/components/`: shared homepage components and navigation.
- `src/pages/index.astro`: homepage composition and biography.
- `src/pages/projects/`: three explicit case-study narratives.
- `src/layouts/`: shared document shell and case-study presentation.
- `src/styles/`: global tokens, component styling, progressive reveal animation.
- `public/images/profile.webp`: externally cached, optimized portrait.
- `public/resume/MohithReddyYannam_Resume.pdf`: original supplied resume, unchanged.

## Content boundaries

The site reflects graduation in May 2026 and CGPA 8.41. The downloadable PDF is older and has a visible version note; replace it with an approved updated resume before publication, then update the hash test. The open-source PR was submitted, not represented as merged or adopted. Project metrics retain their supplied context. No missing repositories, screenshots, medical validation, model specifications or confidential DRDO artifacts have been invented.

## Before publication

- Complete visual checks at 320/375px mobile, 768/1024px tablet, and 1440px desktop on all four routes.
- Check menu with keyboard, Escape, link selection, short landscape screens, and 200% zoom.
- Check reduced motion, JavaScript disabled, anchor offsets and font loading.
- Confirm external destinations; the Render demo request timed out during local verification.
- Replace the outdated resume and add approved project media when available.
- Review the site locally with Mohith before any GitHub or deployment work.

No remote or Git repository was created or changed. The intended repository remains `MohithReddy20/MohithReddy20.github.io`. Deployment requires separate approval.
