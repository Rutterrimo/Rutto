const map = L.map('map-container', {

    worldCopyJump: false,

    minZoom: 2,

    maxBounds: [
        [-85, -180],
        [85, 180]
    ],

    maxBoundsViscosity: 1.0,

    zoomControl: false

}).setView([20, 0], 2);


/* ZOOM CONTROLS */

L.control.zoom({
    position: 'bottomleft'
}).addTo(map);


/* MAP TILES */

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {

    noWrap: true,

    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'

}).addTo(map);


/* KEEP THE WORLD FILLED WITH THE SCREEN */

function fitWorldToScreen() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    const worldWidth = 360;
    const worldHeight = 170;

    const zoomX = Math.log2(width / worldWidth);
    const zoomY = Math.log2(height / worldHeight);

    const idealZoom = Math.max(
        2,
        Math.ceil(Math.max(zoomX, zoomY))
    );

    map.setMinZoom(idealZoom);
    map.setZoom(idealZoom);
}

fitWorldToScreen();

window.addEventListener("resize", fitWorldToScreen);


/* PLACES */

const places = [

    {
        id: 1,

        name: "Café Somewhere",

        lat: 41.3275,
        lng: 19.8187,

        smoking: "Yes",
        music: "Unknown",
        locals: "Yes",
        gambling: "No",

        toilets: "Downstairs. Surprisingly clean.",

        notes: "The owner starts singing around midnight."
    }

];


/* CREATE MARKERS AND INDEX */

places.forEach(place => {

    const marker = L.circleMarker(

        [place.lat, place.lng],

        {
            radius: 3,

            color: "#3a3a38",

            fillColor: "#3a3a38",

            fillOpacity: 1,

            weight: 0
        }

    ).addTo(map);


    /* PLACE TOOLTIP */

    const popupContent = `

        <div class="place-popup">

            <h3>${place.name}</h3>


            <div class="categories">

                <div>
                    <span>SMOKING INDOORS</span>
                    <strong>${place.smoking}</strong>
                </div>


                <div>
                    <span>SPONTANEOUS MUSIC</span>
                    <strong>${place.music}</strong>
                </div>


                <div>
                    <span>LOCALS</span>
                    <strong>${place.locals}</strong>
                </div>


                <div>
                    <span>GAMBLING</span>
                    <strong>${place.gambling}</strong>
                </div>

            </div>


            <div class="popup-section">

                <span>TOILETS</span>

                <p>${place.toilets}</p>

            </div>


            <div class="popup-section">

                <span>NOTES</span>

                <p>${place.notes}</p>

            </div>

        </div>

    `;


    marker.bindTooltip(

        popupContent,

        {
            direction: "top",

            offset: [0, -6],

            opacity: 1,

            className: "rutto-tooltip",

            interactive: true
        }

    );


    /* DESKTOP + MOBILE */

    marker.on("click", () => {

        if (marker.isTooltipOpen()) {

            marker.closeTooltip();

        } else {

            marker.openTooltip();

        }

    });


    /* ADD PLACE TO INDEX */

    const indexList = document.getElementById("index-list");

    const indexItem = document.createElement("button");

    indexItem.className = "index-item";


    indexItem.innerHTML = `

        <span class="index-number">

            ${String(place.id).padStart(2, "0")}

        </span>


        <span class="index-name">

            ${place.name}

        </span>


        <span class="index-coordinates">

            ${place.lat.toFixed(4)}, ${place.lng.toFixed(4)}

        </span>

    `;


    /* CLICK INDEX ITEM */

    indexItem.addEventListener("click", () => {

        map.setView(

            [place.lat, place.lng],

            Math.max(map.getZoom(), 8),

            {
                animate: true
            }

        );


        setTimeout(() => {

            marker.openTooltip();

        }, 400);

    });


    indexList.appendChild(indexItem);

});


/* INDEX OPEN / CLOSE */

const indexButton = document.getElementById("index-button");

const indexPanel = document.getElementById("index-panel");

const closeIndex = document.getElementById("close-index");


indexButton.addEventListener("click", () => {

    indexPanel.classList.add("open");

});


closeIndex.addEventListener("click", () => {

    indexPanel.classList.remove("open");

});


/* ENTER THE MAP */

const enterMapButton = document.getElementById("enter-map");

const homeButton = document.getElementById("home-button");


enterMapButton.addEventListener("click", () => {

    document.getElementById("map").scrollIntoView({

        behavior: "smooth"

    });

});


/* RETURN HOME */

homeButton.addEventListener("click", () => {

    document.getElementById("home").scrollIntoView({

        behavior: "smooth"

    });

});
