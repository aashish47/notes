---
name: note-management
description: Add, move, rename, or inspect subjects and chapters in the notes site.
---

# Note management

## Structure

- `content/<subject>/<chapter>.mdx` is the source of truth for notes.
- `/notes/<subject>/<chapter>/` is the generated App Router route.
- The home page discovers subjects and chapters from the content directory.

## Adding a chapter

1. Create a `.mdx` file under the appropriate subject directory.
2. Export `title`, `description`, and `order` from the MDX file.
3. Add headings normally; the TOC is generated automatically.
4. Run typecheck and build.

## Adding a subject

Create a new directory under `content/` and add at least one chapter. The home page will discover it automatically.
