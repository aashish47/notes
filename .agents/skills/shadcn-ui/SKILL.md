---
name: shadcn-ui
description: Use shadcn/ui conventions for this notes site. Prefer existing components in components/ui, consult components.json, and use the shadcn CLI/MCP for new components instead of inventing duplicate primitives.
---

# shadcn/ui project rules

- Read `components.json` before adding UI components.
- Reuse `components/ui/*` before creating another primitive.
- Prefer shadcn/ui components and composition over custom one-off widgets.
- Keep components accessible and responsive.
- For new shadcn components, prefer `npx shadcn@latest add <component>` or the shadcn MCP server.
- Keep the current Tailwind CSS v4 setup; do not create a Tailwind config unless the project requires it.
- Keep MDX content independent from the UI layer.
- Do not move notes into hard-coded React pages; content belongs in `content/**/*.mdx`.
- When changing navigation, preserve static App Router routes and `generateStaticParams`.
