
/* =========================================================
   RUTTO — MAP SCRIPT
   ========================================================= */


/* =========================================================
   PREVENT UNWANTED SCROLL RESTORATION
   ========================================================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}


/* =========================================================
   MAP INITIALIZATION
   ========================================================= */

const map = L.map("map-container", {
    worldCopyJump: false,

    minZoom: 2,
    maxZoom: 18,

    maxBounds: [
        [-85, -180],
        [85, 180]
    ],

    maxBoundsViscosity: 1.0,

    zoomControl: false,

    tap: true,

    touchZoom: true,

    dragging: true
}).setView([20, 0], 2);


/* =========================================================
   ZOOM CONTROLS
   ========================================================= */

L.control.zoom({
    position: "bottomleft"
}).addTo(map);


/* =========================================================
   MAP TILES
   ========================================================= */

L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
        noWrap: true,

        attribution:
            "&copy; OpenStreetMap contributors &copy; CARTO"
    }
).addTo(map);


/* =========================================================
   KEEP WORLD FILLED WITH SCREEN
   ========================================================= */

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

    map.setZoom(idealZoom, {
        animate: false
    });

    map.invalidateSize({
        pan: false
    });
}


/* Initial map sizing */
setTimeout(() => {
    fitWorldToScreen();
}, 100);


/* Resize */
let resizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        fitWorldToScreen();
    }, 150);
});


/* Orientation change */
window.addEventListener("orientationchange", () => {

    setTimeout(() => {
        map.invalidateSize({
            pan: false
        });

        fitWorldToScreen();
    }, 300);
});


/* =========================================================
   PLACES
   ========================================================= */

const places = [

    {
        id: 1,
        name: "Kafana Šindra",
        lat: 44.81394,
        lng: 20.45596,
        smoking: "Yes",
        music: "No",
        locals: "Yes",
        gambling: "No",
        toilets: "Squat toilets, unisex, very dirty.",
        notes: ""
    },

    {
        id: 2,
        name: "Langosi, mici, cafea",
        lat: 45.8642,
        lng: 22.9684,
        smoking: "No indoor area",
        music: "No",
        locals: "Yes",
        gambling: "No",
        toilets: "Chemical toilets, extremely dirty, unisex.",
        notes: ""
    },

    {
        id: 3,
        name: "Dabar",
        lat: 43.09365,
        lng: 18.15879,
        smoking: "Yes",
        music: "No",
        locals: "Yes",
        gambling: "Unknown",
        toilets: "Normal. Men and women separated.",
        notes: ""
    },

    {
        id: 4,
        name: "Pri Hladniku",
        lat: 45.926166,
        lng: 14.043124,
        smoking: "No",
        music: "No",
        locals: "Yes",
        gambling: "No",
        toilets: "Normal. Men and women separated.",
        notes: ""
    },

    {
        id: 5,
        name: "Restaurant Bastion La Strada",
        lat: 46.219019,
        lng: 24.791593,
        smoking: "Unknown",
        music: "Yes",
        locals: "No",
        gambling: "Unknown",
        toilets: "Normal. Men and women separated.",
        notes: ""
    },

    {
        id: 6,
        name: "Caffe Bar Milano",
        lat: 45.4278,
        lng: 14.9111,
        smoking: "Yes",
        music: "No",
        locals: "Yes",
        gambling: "No",
        toilets: "Unknown",
        notes: ""
    },

    {
        id: 7,
        name: "Caffe Bar Gold",
        lat: 45.32495,
        lng: 15.695158,
        smoking: "Yes",
        music: "No",
        locals: "Yes",
        gambling: "No",
        toilets: "Normal. Men and women separated.",
        notes: ""
    },

    {
        id: 8,
        name: "Magical Cavern",
        lat: 50.0814,
        lng: 14.4002,
        smoking: "No",
        music: "No",
        locals: "No",
        gambling: "No",
        toilets: "Unisex. Looks like a private laundry room.",
        notes: ""
    },

    {
        id: 9,
        name: "Birtija",
        lat: 43.86155,
        lng: 18.43528,
        smoking: "Yes",
        music: "No",
        locals: "Yes",
        gambling: "Unknown",
        toilets: "Unknown",
        notes: ""
    },

    {
        id: 10,
        name: "Lucky Bar",
        lat: 45.5159,
        lng: 9.8680,
        smoking: "No",
        music: "No",
        locals: "Yes",
        gambling: "Yes",
        toilets: "Unisex, extremely dirty.",
        notes: ""
    },

    {
        id: 11,
        name: "Sala Admiral",
        lat: 45.40830,
        lng: 9.93608,
        smoking: "Yes",
        music: "No",
        locals: "Yes",
        gambling: "Yes",
        toilets: "Unknown",
        notes: ""
    },

    {
        id: 12,
        name: "Bar 10 Damijana Kodelija",
        lat: 45.8836,
        lng: 14.0230,
        smoking: "No",
        music: "No",
        locals: "Yes",
        gambling: "No",
        toilets: "Normal. Men and women separated.",
        notes: ""
    }

];


/* =========================================================
   CREATE MARKERS + INDEX
   ========================================================= */

const indexList = document.getElementById("index-list");


places.forEach(place => {

    /*
     * VISIBLE MARKER
     *
     * This stays visually small exactly like before.
     */
    const marker = L.circleMarker(
        [place.lat, place.lng],
        {
            radius: 3,

            color: "#3a3a38",
            fillColor: "#3a3a38",

            fillOpacity: 1,

            weight: 0,

            interactive: false
        }
    ).addTo(map);


    /*
     * INVISIBLE TOUCH TARGET
     *
     * This is deliberately much larger than the visible dot.
     *
     * Desktop:
     * the user still sees the same tiny dot.
     *
     * Mobile:
     * the user can tap around the dot much more easily.
     */
    const hitMarker = L.circleMarker(
        [place.lat, place.lng],
        {
            radius: 12,

            color: "#000000",

            opacity: 0,

            fillColor: "#000000",

            fillOpacity: 0,

            weight: 0,

            interactive: true
        }
    ).addTo(map);


    /* =====================================================
       TOOLTIP CONTENT
       ===================================================== */

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

                <p>${place.notes || ""}</p>

            </div>

        </div>
    `;


    /* =====================================================
       TOOLTIP
       ===================================================== */

    hitMarker.bindTooltip(
        popupContent,
        {
            direction: "top",

            offset: [0, -10],

            opacity: 1,

            className: "rutto-tooltip",

            interactive: true,

            sticky: false,

            permanent: false
        }
    );


    /* =====================================================
       DESKTOP HOVER
       ===================================================== */

    hitMarker.on("mouseover", () => {

        if (!L.Browser.touch) {
            hitMarker.openTooltip();
        }

    });


    hitMarker.on("mouseout", () => {

        if (!L.Browser.touch) {
            hitMarker.closeTooltip();
        }

    });


    /* =====================================================
       DESKTOP + MOBILE CLICK / TAP
       ===================================================== */

    hitMarker.on("click", event => {

        /*
         * Prevent the tap from being interpreted
         * as a map click/drag.
         */
        if (event.originalEvent) {
            event.originalEvent.preventDefault();
            event.originalEvent.stopPropagation();
        }


        if (hitMarker.isTooltipOpen()) {

            hitMarker.closeTooltip();

        } else {

            /*
             * Close other open tooltips first.
             */
            map.eachLayer(layer => {

                if (
                    layer instanceof L.CircleMarker &&
                    layer !== hitMarker &&
                    typeof layer.isTooltipOpen === "function" &&
                    layer.isTooltipOpen()
                ) {
                    layer.closeTooltip();
                }

            });

            hitMarker.openTooltip();
        }

    });


    /* =====================================================
       TOUCH
       ===================================================== */

    hitMarker.on("touchstart", event => {

        if (event.originalEvent) {
            event.originalEvent.stopPropagation();
        }

    });


    /* =====================================================
       ADD PLACE TO INDEX
       ===================================================== */

    const indexItem = document.createElement("button");

    indexItem.type = "button";

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


    /* =====================================================
       INDEX ITEM CLICK
       ===================================================== */

    indexItem.addEventListener("click", event => {

        event.preventDefault();
        event.stopPropagation();


        /*
         * Close the index first.
         */
        indexPanel.classList.remove("open");


        /*
         * Wait for the panel animation before moving
         * the map, especially on mobile.
         */
        setTimeout(() => {

            map.invalidateSize({
                pan: false
            });


            map.setView(
                [place.lat, place.lng],
                Math.max(map.getZoom(), 8),
                {
                    animate: true
                }
            );


            setTimeout(() => {

                hitMarker.openTooltip();

            }, 400);

        }, 280);

    });


    indexList.appendChild(indexItem);

});


/* =========================================================
   INDEX OPEN / CLOSE
   ========================================================= */

const indexButton = document.getElementById("index-button");

const indexPanel = document.getElementById("index-panel");

const closeIndex = document.getElementById("close-index");


/* OPEN INDEX */

indexButton.addEventListener("click", event => {

    event.preventDefault();
    event.stopPropagation();

    indexPanel.classList.add("open");


    /*
     * Important on mobile:
     * opening the panel must NOT scroll the page.
     */
    requestAnimationFrame(() => {

        map.invalidateSize({
            pan: false
        });

    });

});


/* CLOSE INDEX */

closeIndex.addEventListener("click", event => {

    event.preventDefault();
    event.stopPropagation();

    indexPanel.classList.remove("open");


    requestAnimationFrame(() => {

        map.invalidateSize({
            pan: false
        });

    });

});


/* =========================================================
   ENTER THE MAP
   ========================================================= */

const enterMapButton = document.getElementById("enter-map");


enterMapButton.addEventListener("click", event => {

    event.preventDefault();
    event.stopPropagation();


    document.getElementById("map").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* =========================================================
   RETURN HOME
   ========================================================= */

const homeButton = document.getElementById("home-button");


homeButton.addEventListener("click", event => {

    event.preventDefault();
    event.stopPropagation();


    /*
     * If INDEX is open, close it first.
     */
    indexPanel.classList.remove("open");


    document.getElementById("home").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* =========================================================
   CLOSE INDEX WITH ESC
   ========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        indexPanel.classList.remove("open");

    }

});


/* =========================================================
   CLOSE TOOLTIP WHEN CLICKING EMPTY MAP
   ========================================================= */

map.on("click", () => {

    map.eachLayer(layer => {

        if (
            layer instanceof L.CircleMarker &&
            typeof layer.isTooltipOpen === "function" &&
            layer.isTooltipOpen()
        ) {
            layer.closeTooltip();
        }

    });

});


/* =========================================================
   FINAL MAP REFRESH
   ========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        map.invalidateSize({
            pan: false
        });

    }, 300);

});
