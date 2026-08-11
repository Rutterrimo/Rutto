const map = L.map('map-container', {
    worldCopyJump: false,
    minZoom: 2
}).setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    noWrap: true,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function fitWorldToScreen() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const worldWidth = 360;
    const worldHeight = 170;

    const zoomX = Math.log2(width / worldWidth);
    const zoomY = Math.log2(height / worldHeight);

    const idealZoom = Math.max(2, Math.ceil(Math.max(zoomX, zoomY)));

    map.setMinZoom(idealZoom);
    map.setZoom(idealZoom);
}

fitWorldToScreen();

window.addEventListener('resize', fitWorldToScreen);
