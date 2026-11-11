# my-profile

Сайт-визитка разработчика: одностраничный статический сайт на Astro 7 + React 19,
двуязычный (RU/EN), хостинг на GitHub Pages. Стек: Astro 7, React 19 (остров
ProfileCard из React Bits), TypeScript 5.9, Vitest. Деплой идёт через GitHub
Actions (`withastro/action`) на GitHub Pages, `base: /my-profile`.

## Команды

```bash
npm install        # установка зависимостей
npm run dev        # dev-сервер на http://localhost:4321/my-profile/
npm run build      # продакшн-сборка в dist/ (+ валидация контента zod)
npm run preview    # превью сборки
npm run lint       # ESLint + Prettier check
npm test           # Vitest (схема контента, паритет локалей, подписи уровней)
npm run format     # автоформатирование Prettier
npm run icons      # перегенерация иконок Simple Icons → src/components/icons/
```

## Как обновить контент

Правятся только два JSON-файла:

- `src/content/profile/ru.json` — русская версия (`/`)
- `src/content/profile/en.json` — английская версия (`/en/`)

Нарушение любого правила ниже роняет сборку с ошибкой zod:

1. Паритет: набор `hardSkills[].name` и `contacts[].url` должен совпадать в
   обоих файлах; `softSkills` — одинаковое количество и порядок. Рассинхрон
   ловят тесты (`npm test`).
2. Уровни: `level` строго `basic` | `confident` | `advanced`; подписи для
   отображения берутся из `src/i18n/ui.ts`.
3. Контакты: минимум два, обязательны типы `email` и `github`.
4. Локализация: переводятся `summary`, `category`, `note` и имена софт-скилов;
   не переводятся `name`, `title`, названия технологий и контактов.
5. Иконки: `icon` — слаг Simple Icons (`^[a-z0-9-]+$`, напр. `typescript`).
   После добавления новых слагов запустите `npm run icons`. Навык без иконки
   просто отображается без неё.
6. Фото: опционально; `photo` — путь относительно `public/`
   (напр. `/images/avatar.webp`).

После правки соберите сайт и проверьте обе локали:

```bash
npm run build && npm run preview
```

## Структура

```text
src/
├── components/     # ProfileCard (React Bits), остров, секции, иконки
├── content/        # контент (ru.json, en.json) + zod-схема
├── i18n/           # строки интерфейса RU/EN
├── layouts/        # Base.astro (meta, hreflang, детект языка)
├── pages/          # index.astro (RU), en/index.astro, 404.astro
└── styles/         # дизайн-токены + глобальные стили
```
