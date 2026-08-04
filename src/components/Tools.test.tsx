import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { Tools } from './Tools'
import { ToolsPreview } from './ToolsPreview'
import i18n from '@/lib/i18n'
import { AnimationProvider } from '@/lib/animations'

const AYAH_FLOW_APP_STORE_URL =
  'https://apps.apple.com/us/app/ayah-flow/id6758680834'

describe('Tools', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('shows Ayah Flow with its safe iOS App Store link', () => {
    render(
      <AnimationProvider>
        <Tools />
      </AnimationProvider>,
    )

    expect(
      screen.getByRole('heading', { name: 'Ayah Flow' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Ayah Flow logo' })).toHaveAttribute(
      'src',
      '/src/assets/ayah-flow-logo.png',
    )
    expect(
      screen.getByText(
        'A listening-first Quran app with synchronized ayah and word highlighting. Listen to renowned reciters, follow the English translation and word-by-word transliteration, build memorization playlists, and continue where you left off.',
      ),
    ).toBeInTheDocument()

    const appStoreLink = screen.getByRole('link', { name: 'iOS App Store' })

    expect(appStoreLink).toHaveAttribute('href', AYAH_FLOW_APP_STORE_URL)
    expect(appStoreLink).toHaveAttribute('target', '_blank')
    expect(appStoreLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows the Arabic Ayah Flow description', async () => {
    await i18n.changeLanguage('ar')

    render(
      <AnimationProvider>
        <Tools />
      </AnimationProvider>,
    )

    expect(
      screen.getByText(
        'تطبيق قرآن يضع الاستماع أولًا، مع تمييز متزامن للآيات والكلمات. استمع إلى نخبة من القرّاء، وتابع الترجمة الإنجليزية والنطق بالحروف اللاتينية كلمةً بكلمة، وأنشئ قوائم تشغيل للحفظ، وواصل من حيث توقفت.',
      ),
    ).toBeInTheDocument()
  })

  it('places Ayah Flow after Quran Tab without unverified stats', () => {
    render(
      <AnimationProvider>
        <Tools />
      </AnimationProvider>,
    )

    expect(
      screen
        .getAllByRole('article')
        .map((article) => article.getAttribute('aria-label')),
    ).toEqual([
      'Quran Station',
      'Quran Tab',
      'Ayah Flow',
      'Pray On Time',
      'Nawaya',
    ])

    const ayahFlowCard = screen.getByRole('article', { name: 'Ayah Flow' })
    expect(within(ayahFlowCard).getAllByRole('link')).toHaveLength(1)
    expect(
      within(ayahFlowCard).queryByText(/ratings|users/i),
    ).not.toBeInTheDocument()
  })
})

describe('ToolsPreview', () => {
  it('shows Ayah Flow after Quran Tab', () => {
    render(
      <AnimationProvider>
        <ToolsPreview />
      </AnimationProvider>,
    )

    expect(
      screen.getAllByRole('img').map((image) => image.getAttribute('alt')),
    ).toEqual([
      'Quran Station',
      'Quran Tab',
      'Ayah Flow',
      'Pray On Time',
      'Nawaya',
    ])
    expect(screen.getByRole('img', { name: 'Ayah Flow' })).toHaveAttribute(
      'src',
      '/src/assets/ayah-flow-logo.png',
    )
  })
})
