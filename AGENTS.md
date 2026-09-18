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
- Run `npm run typecheck` and `npm run build` after structural changes.
- Use Next.js App Router conventions and async `params` APIs.
