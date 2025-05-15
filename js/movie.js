// Массив фильмов
const movies = [
  {
    id: "1",
    title: "Мстители: Финал",
    genre: "Фантастика, боевик, приключения",
    description: "После разрушительных событий, вызванных Таносом...",
    image: "images/1.jpg",
    youtube: "https://youtu.be/6l8JT9S-REY?si=GKvoylU9KBAIUnHG"
  },
  {
    id: "2",
    title: "Название: Оно 2",
    genre: "Ужасы, триллер, драма",
    description: " 27 лет спустя, в городе Дерри, члены Клуба неудачников возвращаются, чтобы снова столкнуться с Пеннивайзом, который пробудился от долгого сна. Зло в лице клоуна стало еще опаснее, и они должны победить его раз и навсегда.",
    image: "images/2.webp",
    youtube: "https://youtu.be/02R6pQ3P9f4?si=xbhJtYj0ntFt7opW"
  },
  {
    id: "3",
    title: "Название: Судная Ночь 2025",
    genre: "Ужасы, триллер, драма",
    description: "В 2025 году в мире сохраняется традиция Судной ночи — одного дня в году, когда любые преступления, включая убийства, становятся законными. Главные герои пытаются выжить в эту ночь, сталкиваясь с жестокими и морально разрушительными выборами.",
    image: "images/3.jpg",
    youtube: "https://youtu.be/H1D7kdfNHOE?si=hEQUDkXo1KFl4CXG"
  }, 
  {
    id: "4",
    title: "Название: Кракен",
    genre: "Ужасы, приключения, фэнтези",
    description: "В этом фильме рассказывается о древнем морском чудовище — Кракене, которое просыпается после столетий сна и начинает терроризировать прибрежные города. Группа ученых и моряков отправляется на поиски способа остановить чудовище, но сталкивается с ужасными последствиями.",
    image: "images/4.jpg",
    youtube: "https://youtu.be/wap60odjC_g?si=5xJgKOQVj4QTRVGE"
  }
  // остальные фильмы...
];

// Получаем movieId из URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");

// Находим фильм по ID
const movie = movies.find(m => m.id === movieId);

// Если фильм найден — отображаем
if (movie) {
  document.title = `${movie.title} - Онлайн Кинотеатр`;
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-genre").textContent = movie.genre;
  document.getElementById("movie-description").textContent = movie.description;
  document.getElementById("movie-image").src = movie.image;
  document.getElementById("movie-image").alt = movie.title;

  const embedUrl = convertYoutubeToEmbed(movie.youtube);
  document.getElementById("movie-player").innerHTML = `
    <iframe id="youtubePlayer" width="100%" height="400" src="${embedUrl}?enablejsapi=1"
      frameborder="0" allowfullscreen></iframe>
  `;
} else {
  document.getElementById("movie-detail").innerHTML = "<p>Фильм не найден.</p>";
}

// Преобразуем YouTube-ссылку в embed
function convertYoutubeToEmbed(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
    }
    if (urlObj.hostname.includes("youtube.com")) {
      const videoId = urlObj.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return "";
  } catch (e) {
    return "";
  }
}

// ====== Реализация чата с привязкой ко времени YouTube-видео ======

// Загружаем YouTube API
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtubePlayer');
}
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

// Отправка сообщения
document.getElementById('sendBtn').onclick = () => {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message || !player) return;

  const seconds = player.getCurrentTime();
  const timestamp = formatTime(seconds);
  const username = localStorage.getItem('username') || 'Гость';
  const fullMessage = `[${timestamp}] ${username}: ${message}`;

  appendMessage(fullMessage);
  input.value = '';
};

function appendMessage(text) {
  const chatBox = document.getElementById('chatMessages');
  const p = document.createElement('p');
  p.textContent = text;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function formatTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${h}:${m}:${s}`;
}
