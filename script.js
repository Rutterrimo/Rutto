const map = L.map('map-container', {
    worldCopyJump: false,
    minZoom: 2,
    maxBounds: [
        [-85, -180],
        [85, 180]
    ],
    maxBoundsViscosity: 1.0
}).setView([20, 0], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    noWrap: true,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
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


/* TEST PLACE */

const testPlace = {
    name: "Café Somewhere",
    lat: 41.3275,
    lng: 19.8187,

    smoking: "Yes",
    music: "Unknown",
    locals: "Yes",
    gambling: "No",

    toilets: "Downstairs. Surprisingly clean.",
    notes: "The owner starts singing around midnight."
};


const testMarker = L.circleMarker(
    [testPlace.lat, testPlace.lng],
    {
        radius: 5,
        color: "#171717",
        fillColor: "#171717",
        fillOpacity: 1,
        weight: 0
    }
).addTo(map);


const popupContent = `
    <div class="place-popup">

        <h3>${testPlace.name}</h3>

        <div class="categories">
            <div>
                <span>SMOKING INDOORS</span>
                <strong>${testPlace.smoking}</strong>
            </div>

            <div>
                <span>SPONTANEOUS MUSIC</span>
                <strong>${testPlace.music}</strong>
            </div>

            <div>
                <span>LOCALS</span>
                <strong>${testPlace.locals}</strong>
            </div>

            <div>
                <span>GAMBLING</span>
                <strong>${testPlace.gambling}</strong>
            </div>
        </div>

        <div class="popup-section">
            <span>TOILETS</span>
            <p>${testPlace.toilets}</p>
        </div>

        <div class="popup-section">
            <span>NOTES</span>
            <p>${testPlace.notes}</p>
        </div>

    </div>
`;

testMarker.bindTooltip(popupContent, {
    direction: "top",
    offset: [0, -6],
    opacity: 1,
    className: "rutto-tooltip"
});
