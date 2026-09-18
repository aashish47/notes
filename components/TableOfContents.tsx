import type { TocItem } from '@/lib/notes'

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null

  return (
    <aside className="toc hidden xl:block">
      <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-auto">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-400">On this page</p>
        <nav aria-label="Table of contents">
          <ul className="space-y-2 border-l border-neutral-200 pl-4 text-sm">
            {items.map((item) => (
              <li key={`${item.slug}-${item.depth}`} className={item.depth === 3 ? 'pl-3' : ''}>
                <a href={`#${item.slug}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
