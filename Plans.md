# Pagination: Minimal Working Plan

## Goal

Сделать единое и предсказуемое поведение pagination без лишнего рефакторинга.

## Scope

- `usePageSync`
- `SearchPage`
- `CategoryMoviesPage`
- `FilteredMoviesPage` (`search` + `useFiltersUrlSync`)

## Plan

1. Упростить и зафиксировать контракт `usePageSync`:
   - вход: `page`, `totalPages`, `enabled`, `onCorrectPage`
   - поведение: кламп в диапазон `1..totalPages`, коррекция только при расхождении
   - защита от повторного вызова `onCorrectPage` для одного и того же значения
2. Вынести общую работу с `page` в URL в один shared helper:
   - парсинг `page` из query (invalid -> `1`)
   - запись `page` в query (`page=1` удаляется)
3. Подключить helper и обновлённый `usePageSync` в 3 страницах:
   - единая логика `replace` для авто-коррекции
   - обычный push history для ручного переключения страницы
   - сброс на `page=1` при изменении поиска/фильтров/категории

## Done Criteria

- Нет дублирования логики parse/set `page` в страницах.
- Нет циклов или повторных автокоррекций страницы.
- Поведение одинаковое в `Search`, `Category`, `Filtered`.

## Check

1. `pnpm lint`
2. `pnpm build`
3. Smoke:
   - `?page=0`, `?page=foo`, `?page=999`
   - Back/Forward после нескольких переключений страниц
