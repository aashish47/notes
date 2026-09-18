<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. The installed Next.js version is the source of truth.
<!-- END:nextjs-agent-rules -->

## Project rules

- This is a static notes site. Keep content in `content/**/*.mdx`.
- Do not put note content directly in React components.
- Preserve the reusable `NotePage` abstraction.
- When changing MDX processing, keep `rehype-slug`, `remark-gfm`, `remark-math`, `rehype-katex`, and `rehype-pretty-code` working together.
- Heading IDs must remain compatible with the generated table of contents.
- New subjects are directories under `content/`; chapters are `.mdx` files inside them.
- Use the shadcn/ui setup in `components.json` and reuse `components/ui/*` before creating new primitives.
- Prefer `npx shadcn@latest add <component>` or the configured shadcn MCP for new UI components.
- Keep Tailwind CSS v4; do not add a Tailwind config file unless required by a future dependency.
- Keep the Next.js App Router and static `generateStaticParams` architecture.
- Run `npm run typecheck` and `npm run build` after structural changes.

## Agent tooling

This project exposes two MCP servers in `.mcp.json`:

- `next-devtools` — Next.js runtime/build/dev tooling.
- `shadcn` — browse, search, and install shadcn registry components.

The project also contains `.agents/skills/shadcn-ui/SKILL.md` for project-aware shadcn conventions.
