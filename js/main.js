// Функция фильтрации фильмов
document.addEventListener('DOMContentLoaded', function() {
  const filterForm = document.querySelector('.filters form');
  const movies = document.querySelectorAll('.movie-card');

  filterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const genre = document.querySelector('#genre').value;
    const year = document.querySelector('#year').value;

    movies.forEach(function(movie) {
      const movieGenre = movie.getAttribute('data-genre'); // предполагаем, что это есть на карточке
      const movieYear = movie.getAttribute('data-year'); // аналогично для года

      // Показываем/скрываем карточку на основе фильтров
      if ((genre === 'all' || genre === movieGenre) && (year === 'all' || year === movieYear)) {
        movie.style.display = 'block';
      } else {
        movie.style.display = 'none';
      }
    });
  });
});






document.addEventListener('DOMContentLoaded', function() {
  // Массив с данными о фильмах
  const moviesData = [
    {
      id: 1,
      title: "Фильм 1",
      genre: "Боевик, Драма",
      year: "2024",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor, purus eget tincidunt fermentum, nulla nisl egestas nunc, nec consequat metus sapien at orci.",
      rating: "8.5/10",
      trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      imageUrl: "images/movie1.jpg"
    },
    {
      id: 2,
      title: "Фильм 2",
      genre: "Комедия, Драма",
      year: "2023",
      description: "Vestibulum auctor velit ac dui suscipit, et sollicitudin erat pharetra. Curabitur non augue ut felis fringilla.",
      rating: "7.8/10",
      trailerUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
      imageUrl: "images/movie2.jpg"
    },
    {
      id: 3,
      title: "Фильм 3",
      genre: "Фантастика, Боевик",
      year: "2022",
      description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer ac felis metus.",
      rating: "9.0/10",
      trailerUrl: "https://www.youtube.com/embed/d1JopIQ7f7g",
      imageUrl: "images/movie3.jpg"
    },
    {
      id: 4,
      title: "Фильм 4",
      genre: "Ужасы, Триллер",
      year: "2021",
      description: "Fusce at augue et urna ullamcorper lobortis non eu lorem. Sed lacinia lorem vitae risus dignissim, sed semper justo vulputate.",
      rating: "7.2/10",
      trailerUrl: "https://www.youtube.com/embed/K0gK2DGBKYw",
      imageUrl: "images/movie4.jpg"
    }
  ];

  // Получаем movieId из URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = parseInt(urlParams.get('movieId'), 10);

  // Ищем фильм по ID
  const movie = moviesData.find(movie => movie.id === movieId);

  // Если фильм найден, обновляем страницу
  if (movie) {
    document.querySelector('.movie-poster').src = movie.imageUrl;
    document.querySelector('.movie-poster').alt = movie.title;
    document.querySelector('.movie-details h2').textContent = movie.title;
    document.querySelector('.movie-details .genre span').textContent = movie.genre;
    document.querySelector('.movie-details .year span').textContent = movie.year;
    document.querySelector('.movie-details .description').textContent = movie.description;
    document.querySelector('.movie-details .rating span').textContent = movie.rating;
    document.querySelector('.trailer iframe').src = movie.trailerUrl;
  }
});
