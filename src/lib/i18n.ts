import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'

// Supported languages
export const supportedLanguages = ['en', 'ar'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

// Cookie name for language persistence
export const i18nCookieName = 'i18nextLng'

// RTL languages
export const rtlLanguages: Array<SupportedLanguage> = ['ar']

export const isRTL = (lang: string): boolean =>
  rtlLanguages.includes(lang as SupportedLanguage)

// Server-side function to set language before rendering
// This reads the cookie and sets i18n language on the server
export const setSSRLanguage = createIsomorphicFn().server(async () => {
  const language = getCookie(i18nCookieName)
  await i18n.changeLanguage(language || 'en')
})

// Language display names
export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  ar: 'العربية',
}

// Bundled translations for SSR compatibility
const resources = {
  en: {
    common: {
      nav: {
        resources: 'Resources',
        tools: 'Tools',
        testimonials: 'Testimonials',
        team: 'Team',
        changelog: 'Changelog',
        mindMaps: 'Mind Maps',
        donate: 'Share Thawab 🌱',
        theme: 'Theme',
      },
      footer: {
        copyright: 'Muslim Daily Tools',
      },
      accessibility: {
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
      },
      actions: {
        readMore: 'Read more',
        readLess: 'Read less',
      },
    },
    home: {
      hero: {
        headline: 'A World Organized Around',
        headlineLine2: 'Daily Worship',
        subtext:
          "Muslim Daily Tools helps you keep the Qur'an close, your prayers on time, and remembrance in rhythm with fast, minimalist tools that fit your day.",
        cta: 'Explore Our Tools',
      },
      about: {
        title: 'Who Are We',
        paragraph1:
          "Muslim Daily Tools is a purpose-driven initiative dedicated to helping Muslims weave worship into everyday life. We build lightweight browser extensions and micro-apps that are respectful, private, and beautifully simple. Whether you're reading, listening, or scheduling your day, our aim is to keep guidance near and distractions away.",
        paragraph2:
          'Rooted in authenticity and shaped by modern design, MDT bridges intention with technology to inspire consistency. We believe that',
        quote:
          'when faith meets flow, small habits compound into a life of remembrance',
      },
      tools: {
        title: 'Tools',
        comingSoon: 'Coming Soon',
        ratings: 'ratings',
        users: 'users',
        quranStation: {
          title: 'Quran Station',
          description:
            'Stream 100+ Quran radio stations from renowned reciters. One-click play, lightweight, and synced across your devices so your favourite station is always ready.',
        },
        quranTab: {
          title: 'Quran Tab',
          description:
            'A Quran-inspired new tab for your browser. Each tab greets you with an ayah, prayer times, and a calm space for reflection. Read translations in 40+ languages, listen to reciters, and save favourites.',
        },
        ayahFlow: {
          title: 'Ayah Flow',
          description:
            'A listening-first Quran app with synchronized ayah and word highlighting. Listen to renowned reciters, follow the English translation and word-by-word transliteration, build memorization playlists, and continue where you left off.',
        },
        prayerCal: {
          title: 'Pray On Time',
          description:
            'Never miss a prayer. Automatically sync accurate prayer times to your Google or Microsoft calendar, set smart reminders, and plan your day around Salah.',
        },
        nawaya: {
          title: 'Nawaya',
          description:
            'Transform everyday actions into worship through mindful Islamic intentions. Browse Quran and Hadith-based intentions for daily life, share beautiful cards, and build a habit of purposeful living.',
        },
        links: {
          website: 'Website',
          chrome: 'Chrome',
          firefox: 'Firefox',
          ios: 'iOS',
          iosAppStore: 'iOS App Store',
        },
      },
      testimonials: {
        title: 'Trusted by thousands of Muslims worldwide',
        reviewFor: 'Review for',
        stats: {
          activeUsers: 'Active Users',
          listeningSessions: 'Listening Sessions',
          downloads: 'Downloads',
          languages: 'Languages',
        },
      },
      donate: {
        title: 'Support Muslim Daily Tools 🌱',
        description:
          'We started with a simple idea: to bring the Quran closer every day. Today, thousands of Muslims use our tools and your support helps us continue building tools that serve the Ummah.',
        hadith:
          'The Prophet ﷺ said: "When a person dies, their deeds end except for three: ongoing charity (sadaqah jariyah), beneficial knowledge, or a righteous child who prays for them." — Sahih Muslim',
        oneTime: 'One-time',
        monthly: 'Monthly',
        custom: 'Custom',
        startMonthly: 'Start Monthly Support',
        oneTimeButton: 'Support Now',
        options: {
          patreon: 'Become a Patron',
          coffee: 'Buy Me a Coffee',
          paypal: 'Donate via PayPal',
        },
      },
      team: {
        title: 'Team',
        members: {
          ahmed: {
            name: 'Ahmed Fathy',
            title:
              'Senior Engineering Manager at Yassir | Founder of Almdrasa | CGO of HaramBlur',
            bio: "Ahmed Fathy is a seasoned technology leader and entrepreneur with over 18 years of experience building products, leading engineering teams, and scaling businesses. He has founded and co-founded 8 startups, including Almdrasa, an EdTech platform empowering learners across the Arab world, and currently serves as Chief Growth Officer at HaramBlur, an innovative tool protecting Muslims' digital experience.\n\nAlongside his entrepreneurial journey, Ahmed has held senior roles at global companies such as Yassir, Fivos Health, Crossover, and QbDVision, where he led high-performing teams and delivered mission-critical software at scale. His expertise spans engineering management, product strategy, and growth, with a track record of bridging business vision with technical execution.\n\nDriven by a passion for impact, innovation, and Islamic values, Ahmed continues to build tools and platforms that serve communities and shape the future of technology.",
          },
          mohamed: {
            name: 'Mohamed Abusrea',
            title:
              'Staff Frontend Engineer | Co-Founder of Almdrasa | Creator of Quran Tab & Quran Station',
            bio: 'Mohamed Abusrea is a Staff Frontend Engineer and entrepreneur with over 10 years of experience building scalable, user-focused web applications and digital products. He is the creator of Quran Tab and Quran Station, two widely adopted tools that help millions of Muslims stay connected to the Quran in their daily lives.\n\nOver the past decade, Mohamed has contributed to global companies such as Yassir, QbDVision, Nord Security, Delivery Hero, and Landmark Group, where he specialized in frontend architecture, performance optimization, and building seamless user experiences at scale.\n\nPassionate about the intersection of faith and technology, Mohamed continues to pioneer products that combine modern design, accessibility, and spiritual purpose, making Islamic tools available and delightful for users worldwide.',
          },
        },
      },
    },
    resources: {
      title: 'Resources & Tech Stack',
      subtitle:
        'A collection of APIs, libraries, and tools used to build our tools. We hope this helps developers who want to build similar Islamic applications.',
      toolSelectorLabel: 'Choose a tool',
      openLink: 'Open link',
      noResources: 'Resources coming soon',
      footerNote:
        'This list is maintained to help the Muslim developer community. If you find any issues or have suggestions, feel free to reach out.',
      categories: {
        apis: 'APIs & Services',
        libraries: 'Libraries & Frameworks',
        fonts: 'Fonts',
        data: 'Data Sources',
        tools: 'Development Tools',
      },
      items: {
        quranFoundation: {
          name: 'Quran Foundation Content API/QuranCDN',
          description:
            'Provides recitation metadata, verse- and word-level timestamps, and word audio for synchronized Quran playback.',
        },
        quranicAudio: {
          name: 'QuranicAudio',
          description:
            'High-quality full-surah recitations streamed for continuous Quran listening.',
        },
        reactNative: {
          name: 'React Native',
          description:
            'Cross-platform framework powering Ayah Flow’s native mobile interface.',
        },
        expo: {
          name: 'Expo',
          description:
            'React Native framework and native tooling used to build and ship the mobile app.',
        },
        reactNativeTrackPlayer: {
          name: 'React Native Track Player v4',
          description:
            'Background audio, lock-screen controls, and playlist queue management.',
        },
        nativeWind: {
          name: 'NativeWind',
          description:
            'Tailwind-style utility classes for styling React Native interfaces.',
        },
        flashList: {
          name: 'FlashList',
          description:
            'High-performance virtualized lists for rendering synchronized Quran verses.',
        },
        rubik: {
          name: 'Rubik',
          description:
            'Readable interface typeface used across the app’s English experience.',
        },
        qpcHafsFont: {
          name: 'QPC Hafs Font',
          description:
            'Uthmani Hafs typeface used to render Quran text and embedded ayah markers.',
        },
        qulRecitationSegments: {
          name: 'QUL Recitation Segments',
          description:
            'Recitation timing data used for synchronized ayah and word highlighting.',
        },
        saheehInternational: {
          name: 'Saheeh International',
          description:
            'Bundled English ayah-by-ayah translation for reading and Quran search.',
        },
        maestro: {
          name: 'Maestro',
          description: 'End-to-end mobile UI testing for critical iOS flows.',
        },
        quranenc: {
          name: 'QuranEnc API',
          description:
            'Provides 100+ Quran translations in various languages from quranenc.com',
        },
        tafsirApi: {
          name: 'Tafsir API',
          description:
            'Verse interpretations including Tafsir Al-Muyassar, hosted on jsDelivr CDN',
        },
        everyayah: {
          name: 'Every Ayah',
          description:
            'Audio recitations from renowned reciters with verse-by-verse playback',
        },
        nominatim: {
          name: 'OpenStreetMap Nominatim',
          description:
            'Geocoding service for worldwide location search to calculate prayer times',
        },
        react: {
          name: 'React 19',
          description:
            'Modern UI library for building interactive user interfaces',
        },
        zustand: {
          name: 'Zustand',
          description: 'Lightweight state management with persistence support.',
        },
        tanstackQuery: {
          name: 'TanStack Query',
          description:
            'Server state management with 24-hour caching for translations and tafseer',
        },
        adhanjs: {
          name: 'Adhan.js',
          description:
            'High precision prayer time calculations supporting multiple methods',
        },
        tailwind: {
          name: 'Tailwind CSS',
          description: 'Utility-first CSS framework for rapid UI development',
        },
        vite: {
          name: 'Vite',
          description:
            'Next-generation frontend tooling with fast HMR development',
        },
        crxjs: {
          name: 'CRXJS Vite Plugin',
          description:
            'Chrome extension development with Hot Module Replacement',
        },
        readexPro: {
          name: 'Readex Pro',
          description:
            'Variable Arabic-Latin font for UI text and modern Arabic typography',
        },
        uthmanicHafs: {
          name: 'Uthmanic Hafs V22',
          description:
            'Arabic Quran text with embedded verse numbers in authentic Uthmani script from Qul by Tarteel AI',
        },
        qcfSurahHeader: {
          name: 'QCF Surah Header',
          description:
            'Decorative font for surah name headers with beautiful ligatures from Qul by Tarteel AI',
        },
        qpcHafs: {
          name: 'QPC Hafs Script',
          description:
            'Complete Quran text data in Hafs narration from Qul by Tarteel AI',
        },
        quranMetadata: {
          name: 'Quran Metadata',
          description:
            'Comprehensive metadata including surah names, verse counts, and divisions (Juz, Hizb, Rub) from Qul by Tarteel AI',
        },
        recitersCatalog: {
          name: 'Reciters Catalog',
          description:
            'Complete catalog of Quran reciters with Arabic and English labels',
        },
        typescript: {
          name: 'TypeScript',
          description: 'Type-safe JavaScript for better developer experience',
        },
        playwright: {
          name: 'Playwright',
          description: 'End-to-end testing framework for cross-browser testing',
        },
        vitest: {
          name: 'Vitest',
          description: 'Fast unit testing framework powered by Vite',
        },
        mp3quran: {
          name: 'MP3Quran API',
          description:
            'Comprehensive API for Quran reciters, surahs, and audio streams',
        },
        posthog: {
          name: 'PostHog',
          description:
            'Open-source product analytics platform for user insights and event tracking',
        },
        nextjs: {
          name: 'Next.js 15',
          description:
            'React framework with server-side rendering, file-based routing, and optimizations',
        },
        nextIntl: {
          name: 'next-intl',
          description:
            'Internationalization library for Next.js with server component support',
        },
        radixUi: {
          name: 'Radix UI',
          description:
            'Unstyled, accessible UI primitives for building design systems',
        },
        surahMetadata: {
          name: 'Surah Metadata',
          description:
            'Complete mapping of all 114 surahs with verse counts and metadata',
        },
      },
    },
    changelog: {
      title: 'Changelog',
      subtitle: 'Stay updated with the latest improvements',
      noChanges: 'No changelog entries yet',
      categories: {
        new: 'New',
        improved: 'Improved',
        fixed: 'Fixed',
      },
      quranTab: {
        v4111: {
          fixed1:
            'Prayer alarms now work reliably on older Chrome versions and Firefox',
        },
        v4110: {
          new1: 'Repeat-range playback for focused Quran memorization and revision',
          improved1:
            'Range start and end controls can now be typed directly for faster setup',
          improved2:
            'Prayer settings are easier to scan with a compact, collapsible layout',
          fixed1:
            'Lowering the start of a repeat range now keeps playback anchored to the selected verse',
        },
        v4101: {
          improved1:
            'Verse recitation now flows seamlessly between verses at normal speed, with no audible gaps',
          improved2:
            'Adding a quick link now checks the address and shows a clear error message when something is off',
          fixed1:
            '"Chrome Tab" in Quick Links opens Chrome\'s default new tab page again',
          fixed2:
            'Quick links with capital letters in the address no longer break when saved',
        },
        v4100: {
          new1: 'Monthly prayer times calendar with Hijri dates',
          new2: 'Weekly Jumuʿah (Friday) reminder in Islamic events',
          new3: 'Audio playback for morning and evening adhkar',
          new4: 'Save favorite backgrounds and browse them as a collection',
          new5: 'Varied prayer reminder notifications instead of repeated messages',
          improved1: 'Much faster new tab opening with lower memory usage',
          improved2:
            'Adhkar texts reviewed for authenticity with a refined player design',
          improved3: 'Clearer prayer timeline at a glance',
          improved4: 'Date now shows the weekday',
        },
        v490: {
          new1: 'A larger, curated background collection that refreshes over time, with no extension update needed',
          improved1:
            'Backgrounds now cross-fade smoothly when they change, load faster, and pick a size that fits your screen',
          fixed1:
            'New tabs no longer briefly show a placeholder before your background loads',
          fixed2:
            'The background picker no longer stretches the settings panel',
        },
        v481: {
          fixed1:
            'Prayer settings footer now has edge arrows so hidden settings are easier to discover and open',
        },
        v480: {
          new1: 'Prayer times now use a visual sun-arc tracker that shows where you are in the day and highlights the next prayer',
          improved1:
            'Prayer settings now live directly under the prayer tracker, making location, calculation method, madhab, reminders, adhan voice, adjustments, DST, and labels easier to change',
          improved2:
            'Adhan volume now appears with prayer reminders, while verse volume now lives inside the verse player menu',
          fixed1:
            'Prayer label toggles now work correctly for users with older saved settings',
          fixed2:
            'Adhan voice preview buttons are clearer for screen readers, and focus rings are more consistent on glass surfaces',
        },
        v470: {
          new1: 'Islamic event reminders now highlight upcoming sunnah fasts and special days from the new tab',
          new2: 'A new Islamic Events Center lets you review upcoming reminders, event details, and source links',
          improved1:
            'Menus, modals, settings, favourites, and reciter selection now have a more polished frosted-glass design',
          improved2: 'The Share Thawab modal is clearer and easier to use',
          fixed1:
            'Settings import and app startup now restore missing nested settings safely for older backups',
          fixed2:
            'Adhkar progress no longer crashes when older saved data contains empty counter slots',
        },
        v460: {
          new1: 'System theme mode can now follow your browser or operating system automatically',
          new2: 'Quick Links can now be edited and reordered',
          improved1:
            'Morning and evening adhkar now open based on the time of day, with clearer localized counters',
          improved2:
            'Favorites and verse search are easier to use with quick add and remove controls',
        },
        v453: {
          improved1:
            'Prayer settings now open as a side panel on desktop, keeping prayer times visible while you adjust them',
          improved2:
            'Prayer settings now open full screen on mobile for easier reading and controls',
          fixed1: 'Restored the prayer settings slide-in animation',
        },
        v452: {
          improved1:
            'Mobile layouts now fit better across header, footer, popovers, modals, verse controls, and prayer times',
          improved2:
            'Audio playback mode and speed controls are easier to scan and adjust',
          fixed1: 'Prayer time settings are more reliable on smaller screens',
          fixed2:
            'Removed unused extension permissions to keep browser store review cleaner',
        },
        v450: {
          new1: 'Search, sort, and group reciters for easier selection',
          new2: 'Repeat current surah for continuous listening',
          improved1:
            'Seamless gapless audio playback with new Gapless-5 engine',
          improved2: 'Better audio error messages and memory management',
          fixed1: 'Audio playback stability improvements in background tabs',
        },
        v440: {
          new1: 'Prayer countdown badge on extension icon with color-coded indicators',
          new2: 'Manual location entry for precise prayer time calculations',
          new3: 'Regional prayer calculation methods for Morocco, Algeria, France, Russia, Indonesia, and Malaysia',
          new4: 'Tafseer modal with 7 renowned scholars and keyboard navigation',
          improved1: 'Unified modal design with better organization',
          improved2: 'Enhanced badge countdown display formatting',
          fixed1: 'Audio playback no longer stops when switching tabs',
          fixed2: 'Location search reliability improvements',
        },
        v430: {
          new1: 'Adjustable image quality options for verse copying',
          new2: 'Data management tab for exporting and importing settings',
          improved1: 'Changelog moved to Muslim Daily Tools website',
        },
        v421: {
          fixed1: 'Fixed verse image copy not working in Firefox',
        },
        v420: {
          new1: 'Share verses as beautiful images with customizable themes',
          new2: 'Include translation or tafseer in verse images',
          new3: 'Seamless audio playback with no gaps between verses',
          new4: 'Advanced verse search with minimum character requirement',
          improved1: 'Enhanced copy verse modal with theme and content options',
        },
        v413: {
          new1: 'Added favorite reciters feature with filtering capability',
          new2: 'Added verse search feature',
          improved1: 'Enhanced prayer times display with improved UI/UX',
        },
        v412: {
          fixed1: 'Fix adhan audio issue in Firefox',
          improved1: 'Show loading icon when loading a new verse',
        },
        v411: {
          fixed1: 'Fix broken audio for Ashuraym',
          improved1: 'General performance improvements and bug fixes',
        },
        v410: {
          new1: 'New islamic backgrounds',
          new2: 'Ability to choose the background type and the exact background image from the list',
          new3: 'Light and Dark theme',
          new4: 'New dropdown for reciters inside the verse box',
          new5: 'Added 24 new reciters',
          new6: 'Include Sunrise to prayer times',
          new7: 'New adhan sound for shiekh Mohamed bin Marwan Qasas',
          new8: 'Added more locations (countries/cities) to generate accurate prayer times',
          new9: 'Added calculation method property to generate accurate prayer times',
          new10: 'Ability to choose Indian or Arabic numeral type',
          new11: 'Increase prayer times box size',
        },
        v4: {
          new1: 'Firefox version now available with full feature support',
          improved1:
            'Refreshed user interface with improved visual design and usability',
          improved2:
            'Enhanced Quran display with new UthmanicHafs font for clearer Arabic text and integrated verse numbers',
          fixed1: 'General performance improvements and bug fixes',
        },
      },
    },
    mindMaps: {
      title: 'Mind Maps',
      subtitle:
        'Visual learning tools using Chunking, Semantic Grouping, Mnemonic Sentences, and other proven techniques.',
      reference: {
        text: 'Inspired by',
        linkText: 'Effective Learning Strategies',
        linkSuffix: 'course on Almdrasa',
        url: 'https://almdrasa.com/products/courses/effective-learning-strategies',
      },
      filter: {
        all: 'All',
      },
      comingSoon: 'Coming Soon',
      categories: {
        quran: 'Quran',
        seerah: 'Seerah',
        books: 'Books',
      },
      actions: {
        preview: 'Preview',
        download: 'Download PDF',
      },
      items: {
        prophetLineage: {
          title: "Prophet's Lineage",
          description: 'Memorize the lineage of Prophet Muhammad ﷺ',
        },
        juzAmmaNames: {
          title: 'Juz Amma Surah Names',
          description:
            'Mind map for memorizing the names of all surahs in Juz Amma (30th Juz)',
        },
        juzTabarakNames: {
          title: 'Juz Tabarak Surah Names',
          description:
            'Mind map for memorizing the names of all surahs in Juz Tabarak (29th Juz)',
        },
        surahAlMursalat: {
          title: 'Surah Al-Mursalat',
          description: 'Visual mind map for Surah Al-Mursalat (The Emissaries)',
        },
        surahAlInsan: {
          title: 'Surah Al-Insan',
          description: 'Visual mind map for Surah Al-Insan (Man)',
        },
        surahAlQiyamah: {
          title: 'Surah Al-Qiyamah',
          description:
            'Visual mind map for Surah Al-Qiyamah (The Resurrection)',
        },
        surahAlMuddathir: {
          title: 'Surah Al-Muddathir',
          description:
            'Visual mind map for Surah Al-Muddathir (The Cloaked One)',
        },
        surahAlMuzzammil: {
          title: 'Surah Al-Muzzammil',
          description:
            'Visual mind map for Surah Al-Muzzammil (The Enshrouded One)',
        },
        surahAlJinn: {
          title: 'Surah Al-Jinn',
          description: 'Visual mind map for Surah Al-Jinn (The Jinn)',
        },
        surahNuh: {
          title: 'Surah Nuh',
          description: 'Visual mind map for Surah Nuh (Noah)',
        },
        surahAlMaarij: {
          title: 'Surah Al-Maarij',
          description:
            'Visual mind map for Surah Al-Maarij (The Ascending Stairways)',
        },
        surahAlHaqqah: {
          title: 'Surah Al-Haqqah',
          description: 'Visual mind map for Surah Al-Haqqah (The Reality)',
        },
        surahAlQalam: {
          title: 'Surah Al-Qalam',
          description: 'Visual mind map for Surah Al-Qalam (The Pen)',
        },
        bookFindingFlow: {
          title: 'The Art of Finding Flow',
          description:
            'Book summary mind map for achieving flow state and productivity',
        },
        bookTodoFormula: {
          title: 'To-Do List Formula',
          description: 'Book summary mind map for effective task management',
        },
        bookSkilledSpeaker: {
          title: 'The Skilled Speaker',
          description: 'Book summary mind map for public speaking mastery',
        },
      },
    },
  },
  ar: {
    common: {
      nav: {
        resources: 'الموارد',
        tools: 'الأدوات',
        testimonials: 'التوصيات',
        team: 'الفريق',
        changelog: 'سجل التحديثات',
        mindMaps: 'الخرائط الذهنية',
        donate: 'شارك الثواب 🌱',
        theme: 'المظهر',
      },
      footer: {
        copyright: 'أدوات المسلم اليومية',
      },
      accessibility: {
        openMenu: 'افتح القائمة',
        closeMenu: 'أغلق القائمة',
      },
      actions: {
        readMore: 'اقرأ المزيد',
        readLess: 'اقرأ أقل',
      },
    },
    home: {
      hero: {
        headline: 'عالَم مُنظَّم حول',
        headlineLine2: 'العبادة اليومية',
        subtext:
          'أدوات المسلم اليومية تُساعدك على إبقاء القرآن قريبًا، وصلواتك في وقتها، وذكرك منتظمًا بأدوات سريعة وبسيطة تناسب يومك.',
        cta: 'استكشف أدواتنا',
      },
      about: {
        title: 'من نحن',
        paragraph1:
          'أدوات المسلم اليومية هي مبادرة هادفة مكرّسة لمساعدة المسلمين على دمج العبادة في حياتهم اليومية. نبني إضافات متصفح خفيفة وتطبيقات صغيرة تحترم خصوصيتك وتتميز بالبساطة والجمال. سواء كنت تقرأ أو تستمع أو تنظّم يومك، هدفنا هو إبقاء الهداية قريبة والمشتّتات بعيدة.',
        paragraph2:
          'مُتجذّرة في الأصالة ومصقولة بتصميم عصري، تربط MDT النية بالتكنولوجيا لإلهام الاستمرارية. نؤمن بأنه',
        quote:
          'حين يسير الإيمان مع إيقاع الحياة، تتحول العادات الصغيرة إلى حياة عامرة بالذكر',
      },
      tools: {
        title: 'الأدوات',
        comingSoon: 'قريبًا',
        ratings: 'تقييم',
        users: 'مستخدم',
        quranStation: {
          description:
            'استمع لأكثر من 100 محطة إذاعية للقرآن الكريم بأصوات قرّاء مشهورين. تشغيل بنقرة واحدة، خفيف الوزن، ومُزامن عبر أجهزتك لتكون محطتك المفضلة دائمًا.',
        },
        quranTab: {
          description:
            'تبويب جديد مُستوحى من القرآن لمتصفحك. كل تبويب يُرحّب بك بآية، ومواقيت الصلاة، ومساحة هادئة للتأمل. اقرأ الترجمات بأكثر من 40 لغة، واستمع للقرّاء، واحفظ المفضلات.',
        },
        ayahFlow: {
          title: 'Ayah Flow',
          description:
            'تطبيق قرآن يضع الاستماع أولًا، مع تمييز متزامن للآيات والكلمات. استمع إلى نخبة من القرّاء، وتابع الترجمة الإنجليزية والنطق بالحروف اللاتينية كلمةً بكلمة، وأنشئ قوائم تشغيل للحفظ، وواصل من حيث توقفت.',
        },
        prayerCal: {
          description:
            'لا تفوّت صلاة. زامن مواقيت الصلاة الدقيقة تلقائيًا مع تقويم Google أو Microsoft، واضبط تذكيرات ذكية، ونظّم يومك حول الصلاة.',
        },
        nawaya: {
          description:
            'حوّل أعمالك اليومية إلى عبادة من خلال النوايا الإسلامية. تصفّح نوايا مستندة إلى القرآن والحديث لحياتك اليومية، وشارك بطاقات جميلة، وابنِ عادة الحياة الهادفة.',
        },
        links: {
          website: 'الموقع',
          chrome: 'كروم',
          firefox: 'فايرفوكس',
          ios: 'آيفون',
          iosAppStore: 'متجر تطبيقات iOS',
        },
      },
      testimonials: {
        title: 'يثق به آلاف المسلمين حول العالم',
        reviewFor: 'تقييم لـ',
        stats: {
          activeUsers: 'مستخدم نشط',
          listeningSessions: 'جلسة استماع',
          downloads: 'تحميل',
          languages: 'لغة',
        },
      },
      donate: {
        label: 'شارك الثواب',
        title: 'شارك الثواب 🌱',
        description:
          'بدأنا بفكرة بسيطة: أن يكون القرآن أقرب في كل يوم. اليوم، يستخدم أدواتنا آلاف المسلمين و دعمك يُساعدنا على الاستمرار في بناء أدوات تخدم الأمة.',
        hadith:
          'قال ﷺ: «إذا مات ابن آدم انقطع عمله إلا من ثلاث: صدقة جارية، أو علم يُنتفع به، أو ولد صالح يدعو له» رواه مسلم',
        oneTime: 'مرة واحدة',
        monthly: 'شهري',
        custom: 'مخصص',
        startMonthly: 'ابدأ الدعم الشهري',
        oneTimeButton: 'ادعم الآن',
        options: {
          patreon: 'كن داعمًا على Patreon',
          coffee: 'اشترِ لنا قهوة',
          paypal: 'تبرّع عبر PayPal',
        },
      },
      team: {
        title: 'الفريق',
        members: {
          ahmed: {
            name: 'أحمد فتحي',
            bio: 'أحمد فتحي هو قائد تقني ورائد أعمال متمرس يمتلك أكثر من 18 عامًا من الخبرة في بناء المنتجات وقيادة فرق الهندسة وتوسيع الأعمال. أسس وشارك في تأسيس 8 شركات ناشئة، من بينها المدرسة، وهي منصة تعليمية تُمكّن المتعلمين في العالم العربي، ويشغل حاليًا منصب مسؤول النمو في HaramBlur، أداة مبتكرة لحماية تجربة المسلمين الرقمية.\n\nإلى جانب مسيرته الريادية، شغل أحمد مناصب قيادية في شركات عالمية مثل Yassir وFivos Health وCrossover وQbDVision، حيث قاد فرقًا عالية الأداء وأنجز برمجيات حيوية على نطاق واسع. تمتد خبرته لتشمل إدارة الهندسة واستراتيجية المنتجات والنمو، مع سجل حافل في الربط بين الرؤية التجارية والتنفيذ التقني.\n\nمدفوعًا بشغفه للتأثير والابتكار والقيم الإسلامية، يواصل أحمد بناء أدوات ومنصات تخدم المجتمعات وتُشكّل مستقبل التكنولوجيا.',
          },
          mohamed: {
            name: 'محمد أبوسريع',
            bio: 'محمد أبو سريع هو مهندس برمجيات ورائد أعمال يمتلك أكثر من 10 سنوات من الخبرة في بناء تطبيقات ويب قابلة للتوسع ومُركّزة على المستخدم ومنتجات رقمية متنوعة. هو مُبتكر Quran Tab و Quran Station، أداتان مُعتمدتان على نطاق واسع تُساعدان ملايين المسلمين على البقاء على اتصال بالقرآن في حياتهم اليومية.\n\nعلى مدار العقد الماضي، ساهم محمد في شركات عالمية مثل Yassir وQbDVision وNord Security وDelivery Hero وLandmark Group، حيث تخصص في بنية الواجهات الأمامية وتحسين الأداء وبناء تجارب مستخدم سلسة على نطاق واسع.\n\nشغوفًا بالتقاطع بين الإيمان والتكنولوجيا، يواصل محمد ريادة منتجات تجمع بين التصميم الحديث وسهولة الوصول والهدف الروحي، مما يجعل الأدوات الإسلامية متاحة وممتعة للمستخدمين في جميع أنحاء العالم.',
          },
        },
      },
    },
    resources: {
      title: 'الموارد والتقنيات',
      subtitle:
        'مجموعة من واجهات البرمجة والمكتبات والأدوات المستخدمة في بناء أدواتنا. نأمل أن تساعد المطورين الراغبين في بناء تطبيقات إسلامية مماثلة.',
      toolSelectorLabel: 'اختر الأداة',
      openLink: 'فتح الرابط',
      noResources: 'الموارد قريبًا',
      footerNote:
        'هذه القائمة مُعدّة لمساعدة مجتمع المطورين المسلمين. إذا وجدت أي مشكلة أو لديك اقتراحات، لا تتردد في التواصل معنا.',
      categories: {
        apis: 'واجهات البرمجة والخدمات',
        libraries: 'المكتبات وأُطر العمل',
        fonts: 'الخطوط',
        data: 'مصادر البيانات',
        tools: 'أدوات التطوير',
      },
      items: {
        quranFoundation: {
          name: 'Quran Foundation Content API/QuranCDN',
          description:
            'يوفّر بيانات التلاوات والتوقيتات على مستوى الآية والكلمة وصوت الكلمات لمزامنة تشغيل القرآن.',
        },
        quranicAudio: {
          name: 'QuranicAudio',
          description:
            'تلاوات عالية الجودة للسور كاملة للاستماع المتواصل إلى القرآن.',
        },
        reactNative: {
          name: 'React Native',
          description:
            'إطار عمل متعدد المنصات يشغّل واجهة Ayah Flow الأصلية على الهاتف.',
        },
        expo: {
          name: 'Expo',
          description:
            'إطار عمل وأدوات لمنصة React Native تُستخدم في تطوير التطبيق ونشره.',
        },
        reactNativeTrackPlayer: {
          name: 'React Native Track Player v4',
          description:
            'تشغيل الصوت في الخلفية، والتحكم من شاشة القفل، وإدارة قوائم التشغيل.',
        },
        nativeWind: {
          name: 'NativeWind',
          description: 'أدوات تنسيق بأسلوب Tailwind لواجهات React Native.',
        },
        flashList: {
          name: 'FlashList',
          description:
            'قوائم افتراضية عالية الأداء لعرض آيات القرآن المتزامنة.',
        },
        rubik: {
          name: 'Rubik',
          description: 'خط واضح يُستخدم في الواجهة الإنجليزية للتطبيق.',
        },
        qpcHafsFont: {
          name: 'خط QPC حفص',
          description:
            'خط عثماني برواية حفص لعرض نص القرآن وأرقام الآيات المدمجة.',
        },
        qulRecitationSegments: {
          name: 'مقاطع التلاوة من QUL',
          description:
            'بيانات توقيت التلاوات المستخدمة لمزامنة تمييز الآيات والكلمات.',
        },
        saheehInternational: {
          name: 'Saheeh International',
          description:
            'ترجمة إنجليزية مضمّنة آيةً بآية للقراءة والبحث في القرآن.',
        },
        maestro: {
          name: 'Maestro',
          description:
            'اختبارات شاملة لواجهات الهاتف في المسارات الأساسية على iOS.',
        },
        quranenc: {
          name: 'QuranEnc API',
          description:
            'يوفر أكثر من 100 ترجمة للقرآن بلغات مختلفة من موقع quranenc.com',
        },
        tafsirApi: {
          name: 'Tafsir API',
          description:
            'تفسير الآيات بما في ذلك التفسير الميسر، مستضاف على شبكة jsDelivr',
        },
        everyayah: {
          name: 'Every Ayah',
          description: 'تلاوات صوتية من قراء مشهورين مع تشغيل آية بآية',
        },
        nominatim: {
          name: 'OpenStreetMap Nominatim',
          description:
            'خدمة تحديد المواقع للبحث عن المدن حول العالم لحساب مواقيت الصلاة',
        },
        react: {
          name: 'React 19',
          description: 'مكتبة حديثة لبناء واجهات مستخدم تفاعلية',
        },
        zustand: {
          name: 'Zustand',
          description: 'إدارة حالة خفيفة مع دعم حفظ البيانات.',
        },
        tanstackQuery: {
          name: 'TanStack Query',
          description:
            'إدارة حالة الخادم مع تخزين مؤقت لمدة 24 ساعة للترجمات والتفسير',
        },
        adhanjs: {
          name: 'Adhan.js',
          description: 'حسابات دقيقة لمواقيت الصلاة تدعم طرق حساب متعددة',
        },
        tailwind: {
          name: 'Tailwind CSS',
          description: 'إطار عمل CSS للتطوير السريع للواجهات',
        },
        vite: {
          name: 'Vite',
          description: 'أداة تطوير حديثة مع تحديث فوري سريع',
        },
        crxjs: {
          name: 'CRXJS Vite Plugin',
          description: 'تطوير إضافات كروم مع التحديث الفوري',
        },
        readexPro: {
          name: 'Readex Pro',
          description:
            'خط متغير عربي-لاتيني لنصوص الواجهة والطباعة العربية الحديثة',
        },
        uthmanicHafs: {
          name: 'خط حفص العثماني V22',
          description:
            'نص القرآن العربي بأرقام الآيات المدمجة بالخط العثماني الأصيل من Qul by Tarteel AI',
        },
        qcfSurahHeader: {
          name: 'خط رأس السورة',
          description:
            'خط زخرفي لعناوين السور بحروف مزخرفة جميلة من Qul by Tarteel AI',
        },
        qpcHafs: {
          name: 'نص حفص',
          description:
            'بيانات نص القرآن الكامل برواية حفص من Qul by Tarteel AI',
        },
        quranMetadata: {
          name: 'بيانات القرآن الوصفية',
          description:
            'بيانات شاملة تشمل أسماء السور وعدد الآيات والتقسيمات (الجزء، الحزب، الربع) من Qul by Tarteel AI',
        },
        recitersCatalog: {
          name: 'فهرس القراء',
          description: 'فهرس كامل لقراء القرآن بالعربية والإنجليزية',
        },
        typescript: {
          name: 'TypeScript',
          description: 'جافاسكريبت مع أنواع البيانات لتجربة تطوير أفضل',
        },
        playwright: {
          name: 'Playwright',
          description: 'إطار اختبار شامل للمتصفحات المتعددة',
        },
        vitest: {
          name: 'Vitest',
          description: 'إطار اختبار وحدات سريع مدعوم من Vite',
        },
        mp3quran: {
          name: 'MP3Quran API',
          description: 'واجهة برمجة شاملة للقراء والسور والبث الصوتي للقرآن',
        },
        posthog: {
          name: 'PostHog',
          description: 'منصة تحليلات مفتوحة المصدر لرؤى المستخدم وتتبع الأحداث',
        },
        nextjs: {
          name: 'Next.js 15',
          description:
            'إطار عمل React مع العرض من جانب الخادم والتوجيه والتحسينات',
        },
        nextIntl: {
          name: 'next-intl',
          description: 'مكتبة تدويل لـ Next.js مع دعم مكونات الخادم',
        },
        radixUi: {
          name: 'Radix UI',
          description: 'مكونات UI بدون تنسيق وقابلة للوصول لبناء أنظمة التصميم',
        },
        surahMetadata: {
          name: 'بيانات السور',
          description:
            'قائمة كاملة لجميع السور الـ 114 مع عدد الآيات والبيانات',
        },
      },
    },
    changelog: {
      title: 'سجل التحديثات',
      subtitle: 'تابع آخر التحسينات والتحديثات',
      noChanges: 'لا توجد تحديثات بعد',
      categories: {
        new: 'جديد',
        improved: 'تحسينات',
        fixed: 'إصلاحات',
      },
      quranTab: {
        v4111: {
          fixed1:
            'أصبحت تنبيهات الصلاة تعمل بشكل موثوق على إصدارات كروم القديمة وفايرفوكس',
        },
        v4110: {
          new1: 'تشغيل تكرار نطاق محدد لمساعدتك على حفظ القرآن ومراجعته بتركيز',
          improved1:
            'يمكن الآن كتابة بداية ونهاية النطاق مباشرة لإعداده بسرعة أكبر',
          improved2:
            'أصبحت إعدادات الصلاة أسهل في القراءة بواجهة مختصرة قابلة للطي',
          fixed1:
            'عند تقليل بداية نطاق التكرار، يبقى التشغيل مرتبطًا بالآية المختارة',
        },
        v4101: {
          improved1:
            'أصبح الانتقال بين الآيات في التلاوة سلسًا دون انقطاع عند السرعة العادية',
          improved2:
            'عند إضافة رابط سريع يتم التحقق من العنوان وتظهر رسالة توضح الخطأ',
          fixed1:
            'يفتح رابط «صفحة كروم» في الروابط السريعة صفحة كروم الافتراضية من جديد',
          fixed2:
            'لم تعد الروابط السريعة ذات الأحرف الكبيرة في العنوان تتعطل عند الحفظ',
        },
        v4100: {
          new1: 'تقويم شهري لمواقيت الصلاة مع التاريخ الهجري',
          new2: 'تذكير أسبوعي بيوم الجمعة ضمن المناسبات الإسلامية',
          new3: 'تشغيل صوتي لأذكار الصباح والمساء',
          new4: 'حفظ الخلفيات المفضلة وتصفحها كمجموعة',
          new5: 'تنويع رسائل تذكيرات الصلاة بدلًا من تكرارها',
          improved1: 'فتح أسرع لعلامة التبويب الجديدة مع استهلاك أقل للذاكرة',
          improved2:
            'مراجعة نصوص الأذكار للتحقق من صحتها مع تصميم محسّن للمشغّل',
          improved3: 'خط زمني للصلوات أوضح في لمحة',
          improved4: 'عرض اسم اليوم مع التاريخ',
        },
        v490: {
          new1: 'مجموعة خلفيات أكبر ومنسّقة تتجدّد مع الوقت دون الحاجة إلى تحديث الإضافة',
          improved1:
            'أصبحت الخلفيات تتلاشى بسلاسة عند تغييرها، وتُحمّل أسرع، وتختار حجمًا يناسب شاشتك',
          fixed1: 'لم تعد الصفحات الجديدة تُظهر خلفية مؤقتة قبل تحميل خلفيتك',
          fixed2: 'لم يعد منتقي الخلفيات يُطيل لوحة الإعدادات',
        },
        v481: {
          fixed1:
            'أصبح شريط إعدادات الصلاة يحتوي على أسهم جانبية لتسهيل اكتشاف وفتح الإعدادات المخفية',
        },
        v480: {
          new1: 'مواقيت الصلاة تظهر الآن في مسار بصري للشمس يوضح تقدم اليوم ويبرز الصلاة القادمة',
          improved1:
            'أصبحت إعدادات الصلاة موجودة مباشرة أسفل مسار المواقيت لتعديل الموقع وطريقة الحساب والمذهب والتذكيرات وصوت الأذان والضبط اليدوي والتوقيت الصيفي والأسماء بسهولة',
          improved2:
            'أصبح مستوى صوت الأذان داخل إعدادات التذكير، ومستوى صوت التلاوة داخل قائمة مشغل الآيات',
          fixed1:
            'أصبح زر إظهار أسماء الصلوات يعمل بشكل صحيح لمن لديهم إعدادات محفوظة قديمة',
          fixed2:
            'أزرار معاينة أصوات الأذان أوضح لقارئات الشاشة، وحلقات التركيز أصبحت أنسب على الواجهات الزجاجية',
        },
        v470: {
          new1: 'تذكيرات المناسبات الإسلامية تعرض الآن صيام السنن والأيام الفاضلة القريبة من تبويبك الجديد',
          new2: 'مركز جديد للمناسبات الإسلامية يعرض التذكيرات القادمة والتفاصيل وروابط المصادر',
          improved1:
            'تحسين شكل القوائم والنوافذ والإعدادات والمفضلة واختيار القارئ بواجهة زجاجية أهدأ',
          improved2: 'نافذة شارك الثواب أصبحت أوضح وأسهل في الاستخدام',
          fixed1:
            'استيراد الإعدادات وبدء التطبيق يعيدان الحقول الداخلية الناقصة بأمان للنسخ الاحتياطية القديمة',
          fixed2:
            'تقدم أذكار الصباح والمساء لم يعد يتعطل عند وجود بيانات قديمة بها خانات عداد فارغة',
        },
        v460: {
          new1: 'يمكن لوضع المظهر الآن أن يتبع إعدادات المتصفح أو النظام تلقائيًا',
          new2: 'يمكن الآن تعديل الروابط السريعة وإعادة ترتيبها',
          improved1:
            'تفتح أذكار الصباح والمساء الآن حسب وقت اليوم، مع عدادات أوضح حسب اللغة',
          improved2:
            'أصبح استخدام المفضلة والبحث في الآيات أسهل مع أزرار سريعة للإضافة والإزالة',
        },
        v453: {
          improved1:
            'إعدادات الصلاة تفتح الآن كلوحة جانبية على الكمبيوتر حتى تبقى مواقيت الصلاة ظاهرة أثناء التعديل',
          improved2:
            'إعدادات الصلاة تفتح الآن بملء الشاشة على الهاتف لتكون القراءة والتحكم أسهل',
          fixed1: 'تمت إعادة حركة ظهور إعدادات الصلاة',
        },
        v452: {
          improved1:
            'أصبحت الواجهة على الهاتف أنسب في الهيدر والفوتر والنوافذ والقوائم وأدوات الآيات ومواقيت الصلاة',
          improved2:
            'أصبحت خيارات وضع التشغيل وسرعة الصوت أوضح وأسهل في التعديل',
          fixed1: 'تحسين موثوقية إعدادات مواقيت الصلاة على الشاشات الصغيرة',
          fixed2: 'إزالة صلاحيات غير مستخدمة لتسهيل مراجعة الإضافة في المتاجر',
        },
        v450: {
          new1: 'البحث والترتيب والتجميع للقراء لاختيار أسهل',
          new2: 'تكرار السورة الحالية للاستماع المتواصل',
          improved1: 'تشغيل صوتي سلس بدون انقطاع مع محرك Gapless-5 الجديد',
          improved2: 'رسائل خطأ صوتية أفضل وإدارة محسّنة للذاكرة',
          fixed1: 'تحسينات استقرار التشغيل الصوتي في علامات التبويب الخلفية',
        },
        v440: {
          new1: 'شارة العد التنازلي للصلاة على أيقونة الإضافة مع مؤشرات ملونة',
          new2: 'إدخال الموقع اليدوي لحسابات دقيقة لمواقيت الصلاة',
          new3: 'طرق حساب إقليمية للصلاة للمغرب والجزائر وفرنسا وروسيا وإندونيسيا وماليزيا',
          new4: 'نافذة التفسير مع 7 علماء مشهورين والتنقل بلوحة المفاتيح',
          improved1: 'تصميم نوافذ موحد مع تنظيم أفضل',
          improved2: 'تحسين تنسيق عرض العد التنازلي للشارة',
          fixed1: 'لم يعد التشغيل الصوتي يتوقف عند التبديل بين علامات التبويب',
          fixed2: 'تحسينات موثوقية البحث عن الموقع',
        },
        v430: {
          new1: 'خيارات جودة الصورة القابلة للتعديل لنسخ الآيات',
          new2: 'تبويب إدارة البيانات لتصدير واستيراد الإعدادات',
          improved1: 'نقل سجل التحديثات إلى موقع أدوات المسلم اليومية',
        },
        v421: {
          fixed1: 'إصلاح مشكلة نسخ صورة الآية في فايرفوكس',
        },
        v420: {
          new1: 'مشاركة الآيات كصور جميلة مع سمات قابلة للتخصيص',
          new2: 'إضافة الترجمة أو التفسير في صور الآيات',
          new3: 'تشغيل صوتي سلس بدون فجوات بين الآيات',
          new4: 'بحث متقدم في الآيات مع حد أدنى للأحرف',
          improved1: 'تحسين نافذة نسخ الآية مع خيارات السمات والمحتوى',
        },
        v413: {
          new1: 'إضافة ميزة القراء المفضلين مع إمكانية التصفية',
          new2: 'إضافة ميزة البحث في الآيات',
          improved1: 'تحسين عرض مواقيت الصلاة مع واجهة مستخدم محسّنة',
        },
        v412: {
          fixed1: 'إصلاح مشكلة صوت الأذان في فايرفوكس',
          improved1: 'إظهار أيقونة التحميل عند تحميل آية جديدة',
        },
        v411: {
          fixed1: 'إصلاح الصوت المعطل للقارئ الشريم',
          improved1: 'تحسينات عامة في الأداء وإصلاح الأخطاء',
        },
        v410: {
          new1: 'خلفيات إسلامية جديدة',
          new2: 'إمكانية اختيار نوع الخلفية والصورة المحددة من القائمة',
          new3: 'المظهر الفاتح والداكن',
          new4: 'قائمة منسدلة جديدة للقراء داخل مربع الآية',
          new5: 'إضافة 24 قارئًا جديدًا',
          new6: 'إضافة وقت الشروق لمواقيت الصلاة',
          new7: 'صوت أذان جديد للشيخ محمد بن مروان قصاص',
          new8: 'إضافة المزيد من المواقع (الدول/المدن) لتوليد مواقيت صلاة دقيقة',
          new9: 'إضافة خاصية طريقة الحساب لتوليد مواقيت صلاة دقيقة',
          new10: 'إمكانية اختيار نوع الأرقام الهندية أو العربية',
          new11: 'زيادة حجم مربع مواقيت الصلاة',
        },
        v4: {
          new1: 'إصدار فايرفوكس متاح الآن بدعم كامل للميزات',
          improved1:
            'تجديد واجهة المستخدم مع تحسين التصميم المرئي وسهولة الاستخدام',
          improved2:
            'تحسين عرض القرآن بخط حفص العثماني الجديد لنص عربي أوضح وأرقام الآيات المدمجة',
          fixed1: 'تحسينات عامة في الأداء وإصلاح الأخطاء',
        },
      },
    },
    mindMaps: {
      title: 'الخرائط الذهنية',
      subtitle:
        'أدوات تعلّم بصرية باستخدام التقطيع، التصنيف الدلالي، الجمل المُعينة، وتقنيات أخرى مُجرّبة.',
      reference: {
        text: 'مُستوحاة من كورس',
        linkText: 'التعلم الفعّال',
        linkSuffix: 'على منصة المدرسة',
        url: 'https://almdrasa.com/products/courses/effective-learning-strategies',
      },
      filter: {
        all: 'الكل',
      },
      comingSoon: 'قريبًا',
      categories: {
        quran: 'القرآن',
        seerah: 'السيرة',
        books: 'الكتب',
      },
      actions: {
        preview: 'معاينة',
        download: 'تحميل PDF',
      },
      items: {
        prophetLineage: {
          title: 'حفظ نسب النبي ﷺ',
          description: 'احفظ نسب النبي محمد ﷺ المتفق عليه',
        },
        juzAmmaNames: {
          title: 'حفظ أسماء سور جزء عم',
          description:
            'خريطة ذهنية لحفظ أسماء جميع سور جزء عم (الجزء الثلاثون)',
        },
        juzTabarakNames: {
          title: 'حفظ أسماء سور جزء تبارك',
          description:
            'خريطة ذهنية لحفظ أسماء جميع سور جزء تبارك (الجزء التاسع والعشرون)',
        },
        surahAlMursalat: {
          title: 'سورة المرسلات',
          description: 'خريطة ذهنية لسورة المرسلات',
        },
        surahAlInsan: {
          title: 'سورة الإنسان',
          description: 'خريطة ذهنية لسورة الإنسان',
        },
        surahAlQiyamah: {
          title: 'سورة القيامة',
          description: 'خريطة ذهنية لسورة القيامة',
        },
        surahAlMuddathir: {
          title: 'سورة المدثر',
          description: 'خريطة ذهنية لسورة المدثر',
        },
        surahAlMuzzammil: {
          title: 'سورة المزمل',
          description: 'خريطة ذهنية لسورة المزمل',
        },
        surahAlJinn: {
          title: 'سورة الجن',
          description: 'خريطة ذهنية لسورة الجن',
        },
        surahNuh: {
          title: 'سورة نوح',
          description: 'خريطة ذهنية لسورة نوح',
        },
        surahAlMaarij: {
          title: 'سورة المعارج',
          description: 'خريطة ذهنية لسورة المعارج',
        },
        surahAlHaqqah: {
          title: 'سورة الحاقة',
          description: 'خريطة ذهنية لسورة الحاقة',
        },
        surahAlQalam: {
          title: 'سورة القلم',
          description: 'خريطة ذهنية لسورة القلم',
        },
        bookFindingFlow: {
          title: 'The Art of Finding Flow',
          description: 'ملخص كتاب فن الدخول في حالة التدفق والإنتاجية',
        },
        bookTodoFormula: {
          title: 'To-Do List Formula',
          description: 'ملخص كتاب صيغة قائمة المهام لإدارة المهام بفعالية',
        },
        bookSkilledSpeaker: {
          title: 'المتحدث البارع',
          description: 'ملخص كتاب المتحدث البارع لإتقان فن الإلقاء',
        },
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    defaultNS: 'common',
    ns: ['common', 'home', 'changelog', 'resources', 'mindMaps'],

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Order of detection methods - use cookie for SSR compatibility
      order: ['querystring', 'cookie', 'navigator', 'htmlTag'],
      // Keys to look for
      lookupQuerystring: 'lang',
      lookupCookie: i18nCookieName,
      // Cache user language preference in cookie (accessible on server)
      caches: ['cookie'],
      cookieMinutes: 60 * 24 * 365, // 1 year
    },

    react: {
      useSuspense: false, // Disable suspense since translations are bundled
    },
  })

export default i18n
