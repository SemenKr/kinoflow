# KinoFlow — Movie App SPA

🚀 SPA-приложение для поиска и просмотра фильмов с интеграцией TMDB API, фильтрацией и продуманным UX

👉 Демо: https://kinoflow-app.vercel.app/  
👉 Код: https://github.com/SemenKr/kinoflow  

---

## ⚡ Ключевые возможности

- Интеграция с внешним API (TMDB)  
- Поиск фильмов с синхронизацией query в URL  
- Фильтрация и сортировка (рейтинг, дата, популярность, жанры)  
- Пагинация и работа с большими списками данных  
- Детальная страница фильма (описание, актёры, похожие фильмы)  
- Избранное с сохранением в localStorage  
- Мультиязычность (i18n) и переключение темы (light / dark)  
- Глобальный layout с навигацией и состояниями приложения  
- Обработка loading / error / empty состояний  
- Skeleton loaders и индикаторы загрузки  

---

## 📈 Что реализовано

- Работа с внешним REST API и обработка асинхронных данных  
- Управление серверным состоянием через RTK Query  
- Валидация API-ответов с помощью Zod  
- Построение масштабируемой архитектуры (features / shared / pages)  
- Оптимизация UX (debounce, skeleton loaders, error handling)  

---

## 🛠 Стек

React · TypeScript · Redux Toolkit · RTK Query  
MUI · i18next · Zod  

---

## 📸 Скриншоты

![Login screen](docs/screenshots/login.png)  
![Dashboard screen](docs/screenshots/dashboard.png)  
![Mobile](docs/screenshots/mobile-sidebar.png)  

---

## 🧠 Архитектура

```text
src/
  app/                  # providers, store, global setup
  assets/               # static assets
  components/           # shared layout components
  features/             # domain features: movies, favorites
  hooks/                # reusable hooks
  pages/                # route-level pages
  router/               # router config
  shared/               # shared API, constants, UI, utilities
