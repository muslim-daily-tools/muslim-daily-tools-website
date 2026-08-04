import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export const Route = createFileRoute('/pedalprompt/privacy')({
  head: () => ({
    meta: [
      { title: 'PedalPrompt Teleprompter Privacy Policy' },
      {
        name: 'description',
        content:
          'Privacy policy for PedalPrompt Teleprompter, a local-first Android teleprompter app.',
      },
      { name: 'robots', content: 'index, follow' },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://muslimdailytools.com/pedalprompt/privacy',
      },
    ],
  }),
  component: PedalPromptPrivacyPolicy,
})

function PedalPromptPrivacyPolicy() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
      <header className="mb-12 border-b border-border pb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          PedalPrompt Teleprompter
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Effective date: August 4, 2026
        </p>
      </header>

      <div className="space-y-10 text-base leading-7 text-muted-foreground">
        <p className="text-lg leading-8 text-foreground">
          PedalPrompt is a local teleprompter application. We designed it so
          that your scripts and settings remain on your Android device.
        </p>

        <PolicySection title="Information we collect">
          <p>
            PedalPrompt does not collect personal information, usage analytics,
            advertising identifiers, location, contacts, or account information.
            The app does not include advertising or third-party analytics SDKs.
          </p>
        </PolicySection>

        <PolicySection title="Local app data">
          <p>
            Scripts, archive status, presenter preferences, and pedal mappings
            are stored locally on your device. Files placed in the app-specific
            Script Inbox may be read and imported into the local script library.
          </p>
        </PolicySection>

        <PolicySection title="Bluetooth pedal and keyboard input">
          <p>
            PedalPrompt can open Android&apos;s Bluetooth settings and respond
            to compatible pedal or keyboard key events. The app does not request
            Bluetooth scanning permission and does not transmit pedal input to
            our servers.
          </p>
        </PolicySection>

        <PolicySection title="Data sharing and network access">
          <p>
            PedalPrompt does not send app data to us or share app data with
            third parties. The current app does not request Android internet
            permission.
          </p>
        </PolicySection>

        <PolicySection title="Backups">
          <p>
            Depending on your Android device and backup settings, Android may
            include eligible app data in your device backup. You control device
            backup through Android system settings.
          </p>
        </PolicySection>

        <PolicySection title="Deleting your data">
          <p>
            You can delete scripts inside PedalPrompt. Uninstalling the app
            removes its local app data from the device, subject to any backups
            controlled by your Android account and device settings.
          </p>
        </PolicySection>

        <PolicySection title="Children's privacy">
          <p>
            PedalPrompt is a general productivity tool and is not directed
            specifically to children. Because the app does not collect personal
            data, it does not knowingly collect personal data from children.
          </p>
        </PolicySection>

        <PolicySection title="Third-party hardware">
          <p>
            AirTurn and Feelworld are trademarks of their respective owners.
            PedalPrompt is an independent app and is not affiliated with or
            endorsed by either company.
          </p>
        </PolicySection>

        <PolicySection title="Changes to this policy">
          <p>
            If the app&apos;s data practices change, this policy and the Google
            Play Data safety disclosure will be updated before the affected
            release.
          </p>
        </PolicySection>

        <PolicySection title="Contact">
          <p>
            Developer: Mohamed Ahmed Abusrea
            <br />
            Email:{' '}
            <a
              className="font-medium text-primary underline-offset-4 hover:underline"
              href="mailto:the.quran.tab@gmail.com"
            >
              the.quran.tab@gmail.com
            </a>
          </p>
        </PolicySection>

        <aside className="rounded-2xl border border-primary/30 bg-primary/5 px-6 py-5 text-foreground">
          This policy applies to PedalPrompt Teleprompter for Android.
        </aside>
      </div>
    </article>
  )
}

function PolicySection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {children}
    </section>
  )
}
