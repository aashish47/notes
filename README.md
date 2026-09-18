# Notes Site

Static personal notes website built with Next.js App Router, TypeScript, Tailwind CSS, and MDX.

## Stack

- Next.js 16.3.x
- React 19.2.x
- TypeScript
- Tailwind CSS 4.3.x
- MDX via `@next/mdx`
- `remark-gfm`, `remark-math`
- `rehype-slug`, `rehype-katex`, `rehype-pretty-code`
- Next.js DevTools MCP
- `AGENTS.md` + project skills under `.agents/skills/`

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

For a production static build:

```bash
npm run build
```

The exported site is written to `out/`.

## Add notes

Create:

```text
content/<subject>/<chapter>.mdx
```

Export `title`, optional `description`, and optional `order`. The home page and route list discover content automatically.

## Agent support

- `AGENTS.md` tells coding agents to use the version-matched Next.js docs bundled in `node_modules/next/dist/docs/`.
- `.mcp.json` enables the official Next.js DevTools MCP server for Next.js 16+.
- `.agents/skills/` contains reusable instructions for MDX authoring and note management.
