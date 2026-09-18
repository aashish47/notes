import Link from 'next/link'
import { TableOfContents } from './TableOfContents'
import type { NoteMeta, TocItem } from '@/lib/notes'

export function NotePage({
  meta,
  toc,
  subject,
  children,
}: {
  meta: NoteMeta
  toc: TocItem[]
  subject: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-8 md:px-8 xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0">
          <div className="mb-10 flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900">Notes</Link>
            <span>/</span>
            <span>{subject}</span>
          </div>
          <article className="prose-notes">
            <header className="mb-10 border-b border-neutral-200 pb-8">
              <h1>{meta.title}</h1>
              {meta.description && <p className="!mt-3 !text-lg !text-neutral-500">{meta.description}</p>}
            </header>
            {children}
          </article>
        </div>
        <TableOfContents items={toc} />
      </div>
    </main>
  )
}
