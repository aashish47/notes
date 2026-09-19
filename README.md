# Notes Site

A static personal notes website built with Next.js App Router, TypeScript, Tailwind CSS v4, MDX, shadcn/ui conventions, and static generation.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- MDX
- remark-gfm / remark-math
- rehype-slug / rehype-katex / rehype-pretty-code
- shadcn/ui-compatible component structure
- Next.js DevTools MCP
- shadcn MCP
- Agent skill in `.agents/skills/shadcn-ui/`

## Run

```bash
pnpm install
pnpm dev
```

Static production build:

```bash
pnpm build
```

The exported site is written to `out/`.

## Add shadcn components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

The project already contains `components.json`, Tailwind v4 CSS variables, aliases, and `.mcp.json` for the shadcn MCP server.

## Content

Add a subject directory and MDX chapters under `content/`:

```text
content/
  databases/
    relational-model.mdx
    sql.mdx
```

The home page and subject navigation discover them automatically.

## Agent support

`.mcp.json` configures:

- `next-devtools`
- `shadcn`

Restart the MCP-capable coding agent after changing MCP configuration.
