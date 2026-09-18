import Link from 'next/link'
import { getSubjectChapters, getSubjectLabel, listSubjects } from '@/lib/notes'

export default function HomePage() {
  const subjects = listSubjects()

  return (
    <main className="min-h-screen">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">Knowledge base</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">My Notes</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            Structured notes written in MDX and rendered as a fast static site.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => {
            const chapters = getSubjectChapters(subject)
            return (
              <article key={subject} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h2 className="text-xl font-semibold">{getSubjectLabel(subject)}</h2>
                <p className="mt-2 text-sm text-neutral-500">{chapters.length} chapter{chapters.length === 1 ? '' : 's'}</p>
                <ul className="mt-5 space-y-2">
                  {chapters.map((chapter) => (
                    <li key={chapter.slug}>
                      <Link
                        className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        href={`/notes/${subject}/${chapter.slug}/`}
                      >
                        <span>{chapter.title}</span>
                        <span className="opacity-0 transition group-hover:opacity-100">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
