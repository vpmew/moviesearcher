## Одностраничное приложение "Moviesercher" для поиска фильмов.

### Основные технологии:

React, Styled components, React router.
База данных: https://www.themoviedb.org

### Список изменений:

**1.0.0** Минимально рабочая версия.  
**1.0.1** Исправлена ошибка при загрузке дополнительных фильмов по фильтрам, информация о версии проекта перенесана в footer.  
**1.0.2** Оценка больше не отображается, если у фильма нет голосов. (Вместо оценки 0.0).  
**2.0.0** Добавлен sticky footer; добавлен scroll restoration при переходе на новую страницу; добавлена автоматическая подзагрузка в списках фильмов; в строке поиска кнопка закрытия заменена на кнопку очистки поля, результаты поиска закрываются при нажатии на Esc или клике на оверлей; проведена оптимизация кода и UI.  
**2.1.0** Добавлен функционал для уведомления пользователя об ошибках. Улучшен UX при загрузке страницы фильма.  
**2.1.1** Исправлен баг с перерисовкой страницы фильма при загрузке дополнительных результатов.

### Демонстационная версия на GitHub Pages:

https://vpmew.github.io/moviesearcher

### Режим разработки:

Скачать репозиторий, установить пакеты командой yarn из корневой директории, использовать стандартные команды react-scripts.
