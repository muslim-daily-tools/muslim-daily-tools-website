import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import i18n from '@/lib/i18n'
import { Route as ChangelogFileRoute } from '@/routes/changelog'

async function renderChangelog(initialEntry: string) {
  const rootRoute = createRootRoute({ component: Outlet })
  const changelogRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/changelog',
    validateSearch: ChangelogFileRoute.options.validateSearch,
    component: ChangelogFileRoute.options.component,
  })
  const router = createRouter({
    routeTree: rootRoute.addChildren([changelogRoute]),
    history: createMemoryHistory({ initialEntries: [initialEntry] }),
  })

  await act(async () => {
    await router.load()
    render(<RouterProvider router={router} />)
  })
}

describe('Quran Station changelog', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('accepts the Quran Station public query value', () => {
    expect(
      ChangelogFileRoute.options.validateSearch?.({
        tool: 'quran-station',
      }),
    ).toEqual({ tool: 'quran-station' })
  })

  it('shows the English 2.0.6 entry first with the Quran Station logo', async () => {
    await renderChangelog('/changelog?tool=quran-station')

    expect(screen.getAllByRole('heading', { level: 3 })[0]).toHaveTextContent(
      'v2.0.6',
    )
    expect(
      screen.getByText(
        'Build playlists from Surah ranges, reorder them, and resume from where you stopped.',
      ),
    ).toBeInTheDocument()
    expect(
      screen
        .getByRole('button', { name: 'Quran Station' })
        .querySelector('img'),
    ).toHaveAttribute('src', '/src/assets/quran-station-logo.png')
    expect(
      screen.queryByText('No changelog entries yet'),
    ).not.toBeInTheDocument()
  })

  it('shows the same 2.0.6 release in Arabic', async () => {
    await i18n.changeLanguage('ar')
    await renderChangelog('/changelog?tool=quran-station')

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'v2.0.6',
    )
    expect(
      screen.getByText(
        'أنشئ قوائم تشغيل من نطاقات السور، وأعد ترتيبها، واستكمل من حيث توقفت.',
      ),
    ).toBeInTheDocument()
    expect(screen.queryByText('لا توجد تحديثات بعد')).not.toBeInTheDocument()
  })
})
