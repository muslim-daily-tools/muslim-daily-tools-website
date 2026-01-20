export type MindMapCategory = 'quran' | 'seerah' | 'books'

export interface MindMap {
  slug: string
  titleKey: string
  descriptionKey: string
  category: MindMapCategory
  pdfPath: string
  published: boolean
}

export const mindMaps: MindMap[] = [
  // MVP Launch (published: true)
  {
    slug: 'prophet-lineage',
    titleKey: 'mindMaps:items.prophetLineage.title',
    descriptionKey: 'mindMaps:items.prophetLineage.description',
    category: 'seerah',
    pdfPath: '/mindmaps/prophet-lineage.pdf',
    published: true,
  },
  // Next Releases (published: false initially)
  {
    slug: 'juz-amma-names',
    titleKey: 'mindMaps:items.juzAmmaNames.title',
    descriptionKey: 'mindMaps:items.juzAmmaNames.description',
    category: 'quran',
    pdfPath: '/mindmaps/juz-amma-names.pdf',
    published: false,
  },
  {
    slug: 'juz-tabarak-names',
    titleKey: 'mindMaps:items.juzTabarakNames.title',
    descriptionKey: 'mindMaps:items.juzTabarakNames.description',
    category: 'quran',
    pdfPath: '/mindmaps/juz-tabarak-names.pdf',
    published: false,
  },
  // Future Releases (published: false initially)
  {
    slug: 'surah-al-mursalat',
    titleKey: 'mindMaps:items.surahAlMursalat.title',
    descriptionKey: 'mindMaps:items.surahAlMursalat.description',
    category: 'quran',
    pdfPath: '/mindmaps/surah-al-mursalat.pdf',
    published: false,
  },
  {
    slug: 'surah-al-insan',
    titleKey: 'mindMaps:items.surahAlInsan.title',
    descriptionKey: 'mindMaps:items.surahAlInsan.description',
    category: 'quran',
    pdfPath: '/mindmaps/surah-al-insan.pdf',
    published: false,
  },
  {
    slug: 'surah-al-qiyamah',
    titleKey: 'mindMaps:items.surahAlQiyamah.title',
    descriptionKey: 'mindMaps:items.surahAlQiyamah.description',
    category: 'quran',
    pdfPath: '/mindmaps/surah-al-qiyamah.pdf',
    published: false,
  },
  {
    slug: 'surah-al-muddathir',
    titleKey: 'mindMaps:items.surahAlMuddathir.title',
    descriptionKey: 'mindMaps:items.surahAlMuddathir.description',
    category: 'quran',
    pdfPath: '/mindmaps/surah-al-muddathir.pdf',
    published: false,
  },
  {
    slug: 'surah-al-muzzammil',
    titleKey: 'mindMaps:items.surahAlMuzzammil.title',
    descriptionKey: 'mindMaps:items.surahAlMuzzammil.description',
    category: 'quran',
    pdfPath: '/mindmaps/surah-al-muzzammil.pdf',
    published: false,
  },
  {
    slug: 'surah-al-jinn',
    titleKey: 'mindMaps:items.surahAlJinn.title',
    descriptionKey: 'mindMaps:items.surahAlJinn.description',
    category: 'quran',
    pdfPath: '/mindmaps/surah-al-jinn.pdf',
    published: false,
  },
  {
    slug: 'surah-nuh',
    titleKey: 'mindMaps:items.surahNuh.title',
    descriptionKey: 'mindMaps:items.surahNuh.description',
    category: 'quran',
    pdfPath: '/mindmaps/surah-nuh.pdf',
    published: false,
  },
  {
    slug: 'surah-al-maarij',
    titleKey: 'mindMaps:items.surahAlMaarij.title',
    descriptionKey: 'mindMaps:items.surahAlMaarij.description',
    category: 'quran',
    pdfPath: '/mindmaps/surah-al-maarij.pdf',
    published: false,
  },
  {
    slug: 'surah-al-haqqah',
    titleKey: 'mindMaps:items.surahAlHaqqah.title',
    descriptionKey: 'mindMaps:items.surahAlHaqqah.description',
    category: 'quran',
    pdfPath: '/mindmaps/surah-al-haqqah.pdf',
    published: false,
  },
  {
    slug: 'surah-al-qalam',
    titleKey: 'mindMaps:items.surahAlQalam.title',
    descriptionKey: 'mindMaps:items.surahAlQalam.description',
    category: 'quran',
    pdfPath: '/mindmaps/surah-al-qalam.pdf',
    published: false,
  },
  {
    slug: 'book-finding-flow',
    titleKey: 'mindMaps:items.bookFindingFlow.title',
    descriptionKey: 'mindMaps:items.bookFindingFlow.description',
    category: 'books',
    pdfPath: '/mindmaps/book-finding-flow.pdf',
    published: false,
  },
  {
    slug: 'book-todo-formula',
    titleKey: 'mindMaps:items.bookTodoFormula.title',
    descriptionKey: 'mindMaps:items.bookTodoFormula.description',
    category: 'books',
    pdfPath: '/mindmaps/book-todo-formula.pdf',
    published: false,
  },
  {
    slug: 'book-skilled-speaker',
    titleKey: 'mindMaps:items.bookSkilledSpeaker.title',
    descriptionKey: 'mindMaps:items.bookSkilledSpeaker.description',
    category: 'books',
    pdfPath: '/mindmaps/book-skilled-speaker.pdf',
    published: false,
  },
]

export const categories: Record<MindMapCategory, { labelKey: string }> = {
  quran: { labelKey: 'mindMaps:categories.quran' },
  seerah: { labelKey: 'mindMaps:categories.seerah' },
  books: { labelKey: 'mindMaps:categories.books' },
}

