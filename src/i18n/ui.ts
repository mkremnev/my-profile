export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';

const ui = {
  ru: {
    'skills.title': 'Хард-скилы',
    'softSkills.title': 'Софт-скилы',
    'contacts.title': 'Контакты',
    'level.basic': 'базовый',
    'level.confident': 'уверенный',
    'level.advanced': 'продвинутый',
    'lang.switch': 'Switch to English',
    'lang.switch.short': 'EN',
    'a11y.skip': 'Перейти к содержимому',
    'notfound.title': 'Страница не найдена',
    'notfound.body': 'Запрошенная страница не существует.',
    'notfound.home': 'На главную',
  },
  en: {
    'skills.title': 'Hard skills',
    'softSkills.title': 'Soft skills',
    'contacts.title': 'Contacts',
    'level.basic': 'basic',
    'level.confident': 'confident',
    'level.advanced': 'advanced',
    'lang.switch': 'Переключить на русский',
    'lang.switch.short': 'RU',
    'a11y.skip': 'Skip to content',
    'notfound.title': 'Page not found',
    'notfound.body': 'The requested page does not exist.',
    'notfound.home': 'Back to home',
  },
} as const;

export type UiKey = keyof (typeof ui)['ru'];

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key];
}

export const levelLabels: Record<'basic' | 'confident' | 'advanced', UiKey> = {
  basic: 'level.basic',
  confident: 'level.confident',
  advanced: 'level.advanced',
};
