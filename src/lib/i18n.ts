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
        prayerCal: {
          title: 'PrayerCal',
          description:
            'Add accurate prayer times directly to your calendar. Choose methods, set notifications, and plan around Salah without changing how you already work.',
        },
        links: {
          website: 'Website',
          chrome: 'Chrome',
          firefox: 'Firefox',
          ios: 'iOS',
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
          description:
            'Lightweight state management with localStorage persistence',
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
          description: "Memorize the lineage of Prophet Muhammad ﷺ",
        },
        juzAmmaNames: {
          title: "Juz Amma Surah Names",
          description:
            "Mind map for memorizing the names of all surahs in Juz Amma (30th Juz)",
        },
        juzTabarakNames: {
          title: "Juz Tabarak Surah Names",
          description:
            "Mind map for memorizing the names of all surahs in Juz Tabarak (29th Juz)",
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
          description: 'Visual mind map for Surah Al-Qiyamah (The Resurrection)',
        },
        surahAlMuddathir: {
          title: 'Surah Al-Muddathir',
          description: 'Visual mind map for Surah Al-Muddathir (The Cloaked One)',
        },
        surahAlMuzzammil: {
          title: 'Surah Al-Muzzammil',
          description: 'Visual mind map for Surah Al-Muzzammil (The Enshrouded One)',
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
          description: 'Visual mind map for Surah Al-Maarij (The Ascending Stairways)',
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
          description: 'Book summary mind map for achieving flow state and productivity',
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
        prayerCal: {
          description:
            'أضف مواقيت الصلاة الدقيقة مباشرة إلى تقويمك. اختر طرق الحساب، وعيّن الإشعارات، ونظّم يومك حول الصلاة دون تغيير طريقة عملك المعتادة.',
        },
        links: {
          website: 'الموقع',
          chrome: 'كروم',
          firefox: 'فايرفوكس',
          ios: 'آيفون',
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
          description: 'إدارة حالة خفيفة مع حفظ في التخزين المحلي',
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
          description:
            'منصة تحليلات مفتوحة المصدر لرؤى المستخدم وتتبع الأحداث',
        },
        nextjs: {
          name: 'Next.js 15',
          description:
            'إطار عمل React مع العرض من جانب الخادم والتوجيه والتحسينات',
        },
        nextIntl: {
          name: 'next-intl',
          description:
            'مكتبة تدويل لـ Next.js مع دعم مكونات الخادم',
        },
        radixUi: {
          name: 'Radix UI',
          description:
            'مكونات UI بدون تنسيق وقابلة للوصول لبناء أنظمة التصميم',
        },
        surahMetadata: {
          name: 'بيانات السور',
          description: 'قائمة كاملة لجميع السور الـ 114 مع عدد الآيات والبيانات',
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
