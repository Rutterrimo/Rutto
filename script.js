const map = L.map('map-container', {
    worldCopyJump: false,
    minZoom: 2
}).setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    noWrap: true,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
