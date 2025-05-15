document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".favorite-btn");
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const title = button.dataset.title;
  
        // Получаем текущий список избранных фильмов
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
        if (!favorites.includes(title)) {
          favorites.push(title);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          alert(`"${title}" добавлен в избранное!`);
        } else {
          alert(`"${title}" уже в избранном.`);
        }
      });
    });
  });
  