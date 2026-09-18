import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getNoteMeta, getSubjectChapters, getSubjectLabel, listSubjects, readNoteSource, getToc } from '@/lib/notes'
import { NotePage } from '@/components/NotePage'

export const dynamicParams = false

export function generateStaticParams() {
  return listSubjects().flatMap((subject) =>
    getSubjectChapters(subject).map((chapter) => ({ subject, chapter: chapter.slug })),
  )
}

export async function generateMetadata({ params }: { params: Promise<{ subject: string; chapter: string }> }): Promise<Metadata> {
  const { subject, chapter } = await params
  const chapters = getSubjectChapters(subject)
  if (!chapters.some((item) => item.slug === chapter)) return {}
  const meta = getNoteMeta(subject, chapter)
  return { title: `${meta.title} · ${getSubjectLabel(subject)}`, description: meta.description }
}

export default async function NoteRoute({ params }: { params: Promise<{ subject: string; chapter: string }> }) {
  const { subject, chapter } = await params
  if (!listSubjects().includes(subject) || !getSubjectChapters(subject).some((item) => item.slug === chapter)) {
    notFound()
  }

  const { default: Content } = await import(`@/content/${subject}/${chapter}.mdx`)
  const source = readNoteSource(subject, chapter)
  const [toc] = await Promise.all([getToc(source)])
  const meta = getNoteMeta(subject, chapter)

  return (
    <NotePage meta={meta} toc={toc} subject={getSubjectLabel(subject)}>
      <Content />
    </NotePage>
  )
}
