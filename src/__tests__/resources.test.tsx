import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { Route as ResourcesFileRoute } from '@/routes/resources'
import i18n from '@/lib/i18n'

async function renderResources(initialEntry = '/resources') {
  const rootRoute = createRootRoute({ component: Outlet })
  const resourcesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/resources',
    validateSearch: ResourcesFileRoute.options.validateSearch,
    component: ResourcesFileRoute.options.component,
  })
  const router = createRouter({
    routeTree: rootRoute.addChildren([resourcesRoute]),
    history: createMemoryHistory({ initialEntries: [initialEntry] }),
  })

  await act(async () => {
    await router.load()
    render(<RouterProvider router={router} />)
  })

  return router
}

describe('resources search validation', () => {
  const validateSearch = ResourcesFileRoute.options.validateSearch!

  it('accepts the Ayah Flow deep-link value', () => {
    expect(validateSearch({ tool: 'ayah-flow' })).toEqual({
      tool: 'ayah-flow',
    })
  })

  it('keeps missing and invalid values on the default tool', () => {
    expect(validateSearch({})).toEqual({ tool: undefined })
    expect(validateSearch({ tool: 'not-a-tool' })).toEqual({ tool: undefined })
  })
})

describe('ResourcesPage', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('opens the Ayah Flow tab from its public deep link', async () => {
    await renderResources('/resources?tool=ayah-flow')

    expect(screen.getByRole('button', { name: 'Ayah Flow' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('exposes the wrapping tool selector as a labeled pressed-button group', async () => {
    await renderResources('/resources?tool=ayah-flow')

    const selector = screen.getByRole('group', { name: 'Choose a tool' })
    const buttons = within(selector).getAllByRole('button')

    expect(buttons).toHaveLength(3)
    expect(buttons.map((button) => button.textContent)).toEqual([
      'Quran Tab',
      'Ayah Flow',
      'Quran Station',
    ])
    for (const button of buttons) {
      expect(button).toHaveAttribute('type', 'button')
      expect(button).toHaveAttribute('aria-pressed')
    }
    expect(buttons[1].querySelector('img')).toHaveAttribute(
      'src',
      '/src/assets/ayah-flow-logo.png',
    )
  })

  it('defaults invalid query values to Quran Tab', async () => {
    await renderResources('/resources?tool=not-a-tool')

    expect(screen.getByRole('button', { name: 'Quran Tab' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(
      screen.getByRole('heading', { level: 4, name: 'QuranEnc API' }),
    ).toBeInTheDocument()
  })

  it('navigates from Quran Tab to Ayah Flow', async () => {
    const router = await renderResources('/resources')

    fireEvent.click(screen.getByRole('button', { name: 'Ayah Flow' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Ayah Flow' })).toHaveAttribute(
        'aria-pressed',
        'true',
      )
    })
    expect(router.state.location.search).toEqual({ tool: 'ayah-flow' })
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Quran Foundation Content API/QuranCDN',
      }),
    ).toBeInTheDocument()
  })

  it('lists Ayah Flow API sources with accurate copy and safe links', async () => {
    await renderResources('/resources?tool=ayah-flow')

    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Quran Foundation Content API/QuranCDN',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Provides recitation metadata, verse- and word-level timestamps, and word audio for synchronized Quran playback.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 4, name: 'QuranicAudio' }),
    ).toBeInTheDocument()

    const apiLink = screen.getByRole('link', {
      name: 'Quran Foundation Content API/QuranCDN - Open link',
    })
    expect(apiLink).toHaveAttribute(
      'href',
      'https://api-docs.quran.foundation/docs/sdk/javascript/audio/',
    )
    expect(apiLink).toHaveAttribute('target', '_blank')
    expect(apiLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('lists the Ayah Flow libraries with verified license badges', async () => {
    await renderResources('/resources?tool=ayah-flow')

    const libraryNames = [
      'React Native',
      'Expo',
      'React Native Track Player v4',
      'Zustand',
      'NativeWind',
      'FlashList',
    ]

    for (const name of libraryNames) {
      expect(
        screen.getByRole('heading', { level: 4, name }),
      ).toBeInTheDocument()
    }

    expect(
      screen.getByText(
        'Lightweight state management with persistence support.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'High-performance virtualized lists for rendering synchronized Quran verses.',
      ),
    ).toBeInTheDocument()

    const trackPlayerCard = screen.getByRole('heading', {
      level: 4,
      name: 'React Native Track Player v4',
    }).parentElement!
    expect(within(trackPlayerCard).getByText('Apache-2.0')).toBeInTheDocument()
  })

  it('lists the Ayah Flow fonts without an unverified QPC license', async () => {
    await renderResources('/resources?tool=ayah-flow')

    for (const name of ['Readex Pro', 'Rubik', 'QPC Hafs Font']) {
      expect(
        screen.getByRole('heading', { level: 4, name }),
      ).toBeInTheDocument()
    }

    const rubikCard = screen.getByRole('heading', {
      level: 4,
      name: 'Rubik',
    }).parentElement!
    expect(within(rubikCard).getByText('OFL')).toBeInTheDocument()

    const qpcFontCard = screen.getByRole('heading', {
      level: 4,
      name: 'QPC Hafs Font',
    }).parentElement!
    expect(
      within(qpcFontCard).queryByText(/^(?:MIT|OFL|Apache-2\.0)$/),
    ).not.toBeInTheDocument()
  })

  it('lists the Ayah Flow Quran data sources', async () => {
    await renderResources('/resources?tool=ayah-flow')

    for (const name of [
      'QUL Recitation Segments',
      'QPC Hafs Script',
      'Saheeh International',
    ]) {
      expect(
        screen.getByRole('heading', { level: 4, name }),
      ).toBeInTheDocument()
    }

    expect(
      screen.getByText(
        'Recitation timing data used for synchronized ayah and word highlighting.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: 'Saheeh International - Open link',
      }),
    ).toHaveAttribute(
      'href',
      'https://qul.tarteel.ai/resources/translation/193',
    )
  })

  it('completes the 17-resource catalog with development tools', async () => {
    await renderResources('/resources?tool=ayah-flow')

    for (const name of ['TypeScript', 'Vitest', 'Maestro']) {
      expect(
        screen.getByRole('heading', { level: 4, name }),
      ).toBeInTheDocument()
    }
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(17)

    const typescriptCard = screen.getByRole('heading', {
      level: 4,
      name: 'TypeScript',
    }).parentElement!
    expect(within(typescriptCard).getByText('Apache-2.0')).toBeInTheDocument()
    expect(
      screen.getByText('End-to-end mobile UI testing for critical iOS flows.'),
    ).toBeInTheDocument()
  })

  it('keeps every Ayah Flow resource link safe and omits stale sources', async () => {
    await renderResources('/resources?tool=ayah-flow')

    const resourceLinks = screen.getAllByRole('link')
    expect(resourceLinks).toHaveLength(17)
    for (const link of resourceLinks) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }

    for (const excludedName of [
      'Tafsir API',
      'PostHog',
      'MP3Quran API',
      'Every Ayah',
      'Playwright',
    ]) {
      expect(
        screen.queryByRole('heading', { level: 4, name: excludedName }),
      ).not.toBeInTheDocument()
    }
  })

  it('shows the Ayah Flow resource copy in Arabic', async () => {
    await i18n.changeLanguage('ar')
    await renderResources('/resources?tool=ayah-flow')

    expect(
      screen.getByText(
        'يوفّر بيانات التلاوات والتوقيتات على مستوى الآية والكلمة وصوت الكلمات لمزامنة تشغيل القرآن.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 4, name: 'خط QPC حفص' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('group', { name: 'اختر الأداة' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'قوائم افتراضية عالية الأداء لعرض آيات القرآن المتزامنة.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'اختبارات شاملة لواجهات الهاتف في المسارات الأساسية على iOS.',
      ),
    ).toBeInTheDocument()
  })
})
