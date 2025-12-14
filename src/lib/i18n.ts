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
export const rtlLanguages: SupportedLanguage[] = ['ar']

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
        about: 'About',
        tools: 'Tools',
        testimonials: 'Testimonials',
        team: 'Team',
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
              'Staff Frontend Engineer | Founder of Quran Tab & Quran Station',
            bio: 'Mohamed Abusrea is a Staff Frontend Engineer and entrepreneur with over 10 years of experience building scalable, user-focused web applications and digital products. He is the creator of Quran Tab and Quran Station, two widely adopted tools that help millions of Muslims stay connected to the Quran in their daily lives.\n\nOver the past decade, Mohamed has contributed to global companies such as Yassir, QbDVision, Nord Security, Delivery Hero, and Landmark Group, where he specialized in frontend architecture, performance optimization, and building seamless user experiences at scale.\n\nPassionate about the intersection of faith and technology, Mohamed continues to pioneer products that combine modern design, accessibility, and spiritual purpose, making Islamic tools available and delightful for users worldwide.',
          },
        },
      },
    },
  },
  ar: {
    common: {
      nav: {
        about: 'من نحن',
        tools: 'الأدوات',
        testimonials: 'التوصيات',
        team: 'الفريق',
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
    ns: ['common', 'home'],

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
