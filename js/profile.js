// Пример данных пользователя (в будущем можно брать из сервера)
const user = {
    name: "Темирлан",
    email: "temirlan@example.com",
    subscription: "Премиум",
    avatar: "images/avatar.png",
    watched: ["Фильм 1", "Фильм 2", "Фильм 3"],
    favorites: ["Фильм 2", "Фильм 4"]
  };
  
  window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".profile-box h2").textContent = user.name;
    document.querySelector(".profile-box p:nth-of-type(1)").textContent = `Email: ${user.email}`;
    document.querySelector(".profile-box p:nth-of-type(2)").textContent = `Подписка: ${user.subscription}`;
    document.querySelector(".avatar").src = user.avatar;
  
    const watchedList = document.querySelector(".watched-movies ul");
    watchedList.innerHTML = "";
    user.watched.forEach(movie => {
      const li = document.createElement("li");
      li.textContent = movie;
      watchedList.appendChild(li);
    });
  
    // Добавим раздел избранного
    const favoritesSection = document.createElement("div");
    favoritesSection.className = "favorites-movies";
    favoritesSection.innerHTML = `
      <h3>Избранные фильмы</h3>
      <ul>${user.favorites.map(f => `<li>${f}</li>`).join("")}</ul>
    `;
    document.querySelector(".container").appendChild(favoritesSection);
  });
  

  const modal = document.getElementById("editModal");
const editBtn = document.querySelector(".edit-btn");
const closeBtn = document.querySelector(".close");
const form = document.getElementById("editForm");

editBtn.onclick = () => {
  form.name.value = user.name;
  form.email.value = user.email;
  form.avatar.value = user.avatar;
  modal.style.display = "block";
};

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

form.onsubmit = (e) => {
  e.preventDefault();
  user.name = form.name.value;
  user.email = form.email.value;
  user.avatar = form.avatar.value || "images/avatar.png";

  document.querySelector(".profile-box h2").textContent = user.name;
  document.querySelector(".profile-box p:nth-of-type(1)").textContent = `Email: ${user.email}`;
  document.querySelector(".avatar").src = user.avatar;

  modal.style.display = "none";
};


const favoritesSection = document.createElement("div");
favoritesSection.className = "favorites-movies";

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

favoritesSection.innerHTML = `
  <h3>Избранные фильмы</h3>
  <ul>
    ${favorites.length ? favorites.map(f => `<li>${f}</li>`).join("") : "<li>Нет избранных фильмов</li>"}
  </ul>
`;

document.querySelector(".container").appendChild(favoritesSection);


