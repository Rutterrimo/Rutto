/* =========================================================
   RUTTO — MAP SCRIPT
   ========================================================= */


/* =========================================================
   SCROLL RESTORATION
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


/* =========================================================
   RESIZE
   ========================================================= */

let resizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

        fitWorldToScreen();

    }, 150);

});


/* =========================================================
   ORIENTATION CHANGE
   ========================================================= */

window.addEventListener("orientationchange", () => {

    setTimeout(() => {

        map.invalidateSize({
            pan: false
        });

        fitWorldToScreen();

    }, 400);

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
   INDEX ELEMENTS
   ========================================================= */

const indexList =
    document.getElementById("index-list");

const indexButton =
    document.getElementById("index-button");

const indexPanel =
    document.getElementById("index-panel");

const closeIndex =
    document.getElementById("close-index");


/* =========================================================
   MARKER REFERENCES
   ========================================================= */

const markerReferences = [];


/* =========================================================
   CLOSE ALL TOOLTIPS
   ========================================================= */

function closeAllTooltips() {

    markerReferences.forEach(reference => {

        if (
            reference.hitMarker &&
            reference.hitMarker.isTooltipOpen()
        ) {

            reference.hitMarker.closeTooltip();

        }

    });

}


/* =========================================================
   CREATE MARKERS + INDEX
   ========================================================= */

places.forEach(place => {


    /* =====================================================
       VISIBLE DOT

       IMPORTANT:
       This remains visually 3px.
       ===================================================== */

    const visibleMarker = L.circleMarker(
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


    /* =====================================================
       INVISIBLE TOUCH TARGET

       IMPORTANT:
       This is the actual interactive marker.

       Visible dot = 3px
       Touch target = 14px

       The user therefore does NOT need to hit
       the tiny visible dot exactly on a phone.
       ===================================================== */

    const hitMarker = L.circleMarker(
        [place.lat, place.lng],
        {

            radius: 14,

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

            direction: "auto",

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

            closeAllTooltips();

            hitMarker.openTooltip();

        }

    });


    hitMarker.on("mouseout", () => {

        if (!L.Browser.touch) {

            hitMarker.closeTooltip();

        }

    });


    /* =====================================================
       MOBILE + DESKTOP CLICK / TAP
       ===================================================== */

    hitMarker.on("click", event => {

        /*
         * Prevent the same tap from becoming
         * a click on the map underneath.
         */

        if (event.originalEvent) {

            event.originalEvent.preventDefault();

            event.originalEvent.stopPropagation();

        }


        /*
         * Toggle current tooltip.
         */

        if (hitMarker.isTooltipOpen()) {

            hitMarker.closeTooltip();

        } else {

            closeAllTooltips();

            hitMarker.openTooltip();

        }

    });


    /* =====================================================
       TOUCHSTART
       ===================================================== */

    hitMarker.on("touchstart", event => {

        if (event.originalEvent) {

            event.originalEvent.stopPropagation();

        }

    });


    /* =====================================================
       SAVE REFERENCE
       ===================================================== */

    markerReferences.push({

        place: place,

        hitMarker: hitMarker,

        visibleMarker: visibleMarker

    });


    /* =====================================================
       CREATE INDEX ITEM
       ===================================================== */

    const indexItem =
        document.createElement("button");

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
       INDEX → MAP
       ===================================================== */

    indexItem.addEventListener("click", event => {

        event.preventDefault();

        event.stopPropagation();


        /*
         * Close INDEX immediately.
         */

        indexPanel.classList.remove("open");


        /*
         * Close existing tooltip.
         */

        closeAllTooltips();


        /*
         * Wait briefly for the panel to disappear.
         */

        setTimeout(() => {

            map.invalidateSize({
                pan: false
            });


            /*
             * Move to selected place.
             */

            let tooltipOpened = false;


            const openTooltipAfterMove = () => {

                if (tooltipOpened) {
                    return;
                }

                tooltipOpened = true;

                map.off(
                    "moveend",
                    openTooltipAfterMove
                );

                hitMarker.openTooltip();

            };


            map.once(
                "moveend",
                openTooltipAfterMove
            );


            map.setView(
                [place.lat, place.lng],
                8,
                {
                    animate: true,
                    duration: 0.6
                }
            );


            /*
             * Safety fallback.
             */

            setTimeout(() => {

                if (!tooltipOpened) {

                    tooltipOpened = true;

                    map.off(
                        "moveend",
                        openTooltipAfterMove
                    );

                    hitMarker.openTooltip();

                }

            }, 900);


        }, 250);

    });


    /* Add item to INDEX */

    indexList.appendChild(indexItem);

});


/* =========================================================
   OPEN INDEX
   ========================================================= */

indexButton.addEventListener("click", event => {

    event.preventDefault();

    event.stopPropagation();


    indexPanel.classList.add("open");


    setTimeout(() => {

        map.invalidateSize({
            pan: false
        });

    }, 250);

});


/* =========================================================
   CLOSE INDEX
   ========================================================= */

closeIndex.addEventListener("click", event => {

    event.preventDefault();

    event.stopPropagation();


    indexPanel.classList.remove("open");


    setTimeout(() => {

        map.invalidateSize({
            pan: false
        });

    }, 250);

});


/* =========================================================
   ENTER MAP
   ========================================================= */

const enterMapButton =
    document.getElementById("enter-map");


enterMapButton.addEventListener("click", event => {

    event.preventDefault();

    event.stopPropagation();


    document.getElementById("map").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    setTimeout(() => {

        map.invalidateSize({
            pan: false
        });

    }, 500);

});


/* =========================================================
   RETURN HOME
   ========================================================= */

const homeButton =
    document.getElementById("home-button");


homeButton.addEventListener("click", event => {

    event.preventDefault();

    event.stopPropagation();


    indexPanel.classList.remove("open");

    closeAllTooltips();


    document.getElementById("home").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* =========================================================
   ESCAPE → CLOSE INDEX
   ========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        indexPanel.classList.remove("open");

    }

});


/* =========================================================
   CLICK EMPTY MAP → CLOSE TOOLTIP
   ========================================================= */

map.on("click", event => {

    /*
     * If the event originated from an interactive
     * marker, leave its tooltip alone.
     */

    if (
        event.originalEvent &&
        event.originalEvent.target &&
        event.originalEvent.target.closest &&
        event.originalEvent.target.closest(
            ".leaflet-interactive"
        )
    ) {

        return;

    }


    closeAllTooltips();

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
