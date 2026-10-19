# Next.js Blog Theme

A modern Next.js + Tailwind blog starter.

## Stack

- [Next.js](https://nextjs.org/) 15 — App Router, Server Components, Turbopack dev
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- [MDX](https://mdxjs.com/) v3 — posts as `.mdx` files in `/posts`
- [Shiki](https://shiki.style/) — syntax highlighting in code blocks
- TypeScript

## Getting Started

```shell
npm install
npm run dev
```

Open <http://localhost:3000>.

## Structure

- `app/` — App Router (`layout.tsx`, `page.tsx`, `posts/[slug]/page.tsx`)
- `components/` — UI components (`Header`, `Footer`, `Layout`, `ArrowIcon`)
- `lib/` — `mdx.ts` (frontmatter + body processing), `global-data.ts` (env config)
- `posts/` — blog content as `.mdx` files with YAML frontmatter (`title`, `description`, `date`)
- `app/globals.css` — Tailwind v4 + `@theme` design tokens

## Deploy

Builds to `.next` and is deployable to any platform supporting Next.js (Netlify via `@netlify/plugin-nextjs`, Vercel, etc.).

```shell
npm run build
npm run start
```

Environment variables (optional, with defaults):

| Variable | Description | Default |
|---|---|---|
| `BLOG_NAME` | site name | `William Power` |
| `BLOG_TITLE` | home page header | `Next.js Blog Theme` |
| `BLOG_FOOTER_TEXT` | footer text | `All rights reserved.` |
