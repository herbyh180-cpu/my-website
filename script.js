const games = [
  {
    name: "2048",
    url: "https://play2048.co/",
    image: "https://images.unsplash.com/photo-1526401281623-2a6b17d7c7f9?auto=format&fit=crop&w=900&q=80",
    tags: ["puzzle", "strategy"],
    blurb: "Merge tiles to reach 2048."
  },
  {
    name: "Hexa Puzzle",
    url: "https://hexapuzzle.online/",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    tags: ["puzzle"],
    blurb: "Relaxing hexagon matching." 
  },
  {
    name: "Slither",
    url: "https://slither.io/",
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=900&q=80",
    tags: ["arcade", "retro"],
    blurb: "Grow your snake and survive." 
  },
  {
    name: "Little Alchemy 2",
    url: "https://littlealchemy2.com/",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    tags: ["strategy", "puzzle"],
    blurb: "Combine elements to discover new ones." 
  },
  {
    name: "Agar",
    url: "https://agar.io/",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    tags: ["arcade"],
    blurb: "Absorb cells and get big." 
  },
  {
    name: "Tank Trouble",
    url: "https://tanktrouble.com/",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    tags: ["retro", "arcade"],
    blurb: "Battle in a maze with ricochet shots." 
  },
  {
    name: "Skribbl",
    url: "https://skribbl.io/",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    tags: ["party", "arcade"],
    blurb: "Guess the drawing with friends." 
  },
  {
    name: "Quick, Draw!",
    url: "https://quickdraw.withgoogle.com/",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80",
    tags: ["retro", "party"],
    blurb: "Doodle fast and teach the AI." 
  },
  {
    name: "FIFA Mobile Skill",
    url: "https://www.fifaplays.com/",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80",
    tags: ["sports"],
    blurb: "Football mini challenges." 
  },
  {
    name: "Chess",
    url: "https://www.chess.com/play/computer",
    image: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=900&q=80",
    tags: ["strategy"],
    blurb: "Play against the computer." 
  },
  {
    name: "GeoGuessr",
    url: "https://www.geoguessr.com/",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    tags: ["strategy", "puzzle"],
    blurb: "Guess the location from street view." 
  },
  {
    name: "PokéRogue",
    url: "https://pokerogue.net/",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
    tags: ["retro", "strategy"],
    blurb: "Roguelike adventures with monsters." 
  }
];

const gameGrid = document.getElementById("gameGrid");
const searchInput = document.getElementById("searchInput");
const chips = document.querySelectorAll(".chip");
const iframe = document.getElementById("gameFrame");
const playerMeta = document.getElementById("playerMeta");
const openNewTab = document.getElementById("openNewTab");
const copyLink = document.getElementById("copyLink");
const copyStatus = document.getElementById("copyStatus");
const featureBtn = document.querySelector("[data-feature]");

let activeFilter = "all";
let activeGameUrl = "";

function renderGames(){
  const query = searchInput.value.trim().toLowerCase();
  const filtered = games.filter(game => {
    const matchesFilter = activeFilter === "all" || game.tags.includes(activeFilter);
    const matchesQuery =
      game.name.toLowerCase().includes(query) ||
      game.tags.some(tag => tag.includes(query));
    return matchesFilter && matchesQuery;
  });

  gameGrid.innerHTML = "";
  filtered.forEach(game => {
    const card = document.createElement("article");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}" />
      <div class="game-info">
        <h3>${game.name}</h3>
        <p>${game.blurb}</p>
        <div class="game-tags">
          ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="card-actions">
          <button class="btn primary" data-play="${game.url}">Play</button>
          <button class="btn ghost" data-open="${game.url}">New tab</button>
        </div>
      </div>
    `;

    const playBtn = card.querySelector("[data-play]");
    const openBtn = card.querySelector("[data-open]");
    playBtn.addEventListener("click", () => loadGame(game));
    openBtn.addEventListener("click", () => window.open(game.url, "_blank"));

    gameGrid.appendChild(card);
  });
}

function loadGame(game){
  iframe.src = game.url;
  activeGameUrl = game.url;
  playerMeta.textContent = `Now playing: ${game.name}`;
  copyStatus.textContent = "";
  iframe.scrollIntoView({ behavior: "smooth" });
}

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(btn => btn.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    renderGames();
  });
});

searchInput.addEventListener("input", renderGames);

openNewTab.addEventListener("click", () => {
  if(activeGameUrl){
    window.open(activeGameUrl, "_blank");
  }
});

copyLink.addEventListener("click", async () => {
  if(!activeGameUrl){
    copyStatus.textContent = "Select a game first.";
    return;
  }
  try{
    await navigator.clipboard.writeText(activeGameUrl);
    copyStatus.textContent = "Link copied.";
  }catch{
    copyStatus.textContent = "Copy failed.";
  }
});

featureBtn.addEventListener("click", () => {
  const url = featureBtn.dataset.feature;
  const game = games.find(item => item.url === url) || games[0];
  loadGame(game);
});

renderGames();
