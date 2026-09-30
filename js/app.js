// Sample Database
const initialGames = [
    {
        id: '1',
        title: 'Basketbol 3x3 Dostluq Matçı',
        sport: 'Basketball',
        time: '20:00',
        district: 'Nərimanov',
        currentPlayers: 4,
        maxPlayers: 6,
        price: 5
    },
    {
        id: '2',
        title: 'Mini-Futbol 5x5 Axşam Oyunu',
        sport: 'Football',
        time: '21:30',
        district: 'Yasamal',
        currentPlayers: 8,
        maxPlayers: 10,
        price: 8
    },
    {
        id: '3',
        title: 'Çimərlik Voleybolu',
        sport: 'Volleyball',
        time: '18:00',
        district: 'Səbail',
        currentPlayers: 6,
        maxPlayers: 6,
        price: 0
    }
];

let games = [...initialGames];

// Render Game Cards
function renderGames(filter = 'all') {
    const container = document.getElementById('games-container');
    container.innerHTML = '';

    const filteredGames = filter === 'all' 
        ? games 
        : games.filter(g => g.sport === filter);

    if (filteredGames.length === 0) {
        container.innerHTML = `<p style="color: var(--text-secondary); grid-column: 1/-1;">Bu kateqoriyada oyun tapılmadı.</p>`;
        return;
    }

    filteredGames.forEach(game => {
        const isFull = game.currentPlayers >= game.maxPlayers;
        
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <div>
                <div style="display: flex; justify-content: space-between;">
                    <span class="game-badge">${game.sport}</span>
                    <span style="font-size: 0.8rem; font-weight: bold;">${game.price === 0 ? 'Pulsuz' : game.price + ' AZN'}</span>
                </div>
                <h3 class="game-title">${game.title}</h3>
                <div class="game-meta">
                    <div class="game-meta-item"><i data-lucide="clock" style="width:14px;"></i> Bu gün, ${game.time}</div>
                    <div class="game-meta-item"><i data-lucide="map-pin" style="width:14px;"></i> ${game.district} rayonu</div>
                </div>
            </div>
            <div class="game-footer">
                <span style="font-size: 0.8rem; color: var(--text-secondary);">${game.currentPlayers}/${game.maxPlayers} oyunçu</span>
                <button class="btn ${isFull ? 'btn-outline' : 'btn-primary'}" ${isFull ? 'disabled' : ''} onclick="joinGame('${game.id}')">
                    ${isFull ? 'Dolu' : 'Qoşul'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    // Re-initialize SVG icons
    lucide.createIcons();
}

// Join Game Action
window.joinGame = function(id) {
    games = games.map(g => {
        if (g.id === id && g.currentPlayers < g.maxPlayers) {
            return { ...g, currentPlayers: g.currentPlayers + 1 };
        }
        return g;
    });
    renderGames();
};

// Filters Setup
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderGames(e.target.dataset.filter);
    });
});

// Modal Logic
const modal = document.getElementById('create-modal');
const openBtn = document.getElementById('open-create-modal');
const mobileOpenBtn = document.getElementById('mobile-create-btn');
const closeBtn = document.getElementById('close-modal');

const toggleModal = (show) => modal.classList.toggle('open', show);

openBtn.addEventListener('click', () => toggleModal(true));
mobileOpenBtn.addEventListener('click', () => toggleModal(true));
closeBtn.addEventListener('click', () => toggleModal(false));

// Form Submission
document.getElementById('create-game-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newGame = {
        id: Date.now().toString(),
        title: document.getElementById('game-title').value,
        sport: document.getElementById('game-sport').value,
        time: '20:00',
        district: document.getElementById('game-district').value,
        currentPlayers: 1,
        maxPlayers: parseInt(document.getElementById('game-max-players').value),
        price: parseInt(document.getElementById('game-price').value)
    };

    games.unshift(newGame);
    renderGames();
    toggleModal(false);
    e.target.reset();
});

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
});