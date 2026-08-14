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
   FORCE INITIAL HOME POSITION
   ========================================================= */

function forceHomePosition() {

    window.scrollTo(0, 0);

}


forceHomePosition();


/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

const customCursor = document.createElement("div");

customCursor.id = "rutto-cursor";

customCursor.innerHTML = `

    <div class="cursor-cigarette">

        <span class="smoke smoke-1"></span>
        <span class="smoke smoke-2"></span>
        <span class="smoke smoke-3"></span>
        <span class="smoke smoke-4"></span>

        <span class="cig-ember"></span>
        <span class="cig-body"></span>
        <span class="cig-filter"></span>

    </div>


    <div class="cursor-arrow">

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >

            <path
                d="M4 2 L20 11 L13 13 L16 21 L12 22 L9 14 L4 18 Z"
                fill="#e8e6df"
                stroke="#171717"
                stroke-width="1.5"
                stroke-linejoin="miter"
            />

        </svg>

    </div>


    <div class="cursor-hand">

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >

            <path
                d="M7 11V6
                   C7 5 8 4 9 4
                   C10 4 11 5 11 6
                   V10
                   V4
                   C11 3 12 2 13 2
                   C14 2 15 3 15 4
                   V10
                   V5
                   C15 4 16 3 17 3
                   C18 3 19 4 19 5
                   V11
                   V8
                   C19 7 20 6 21 7
                   C22 8 22 9 22 10
                   V14
                   C22 19 19 22 14 22
                   H11
                   C8 22 6 20 5 18
                   L2 13
                   C1 12 1 11 2 10
                   C3 9 4 9 5 10
                   L7 12
                   Z"
                fill="#e8e6df"
                stroke="#171717"
                stroke-width="1.4"
                stroke-linejoin="round"
            />

        </svg>

    </div>

`;

document.body.appendChild(customCursor);


/* =========================================================
   CURSOR STATE
   ========================================================= */

function setCursorState(state) {

    customCursor.classList.remove(
        "is-cigarette",
        "is-arrow",
        "is-hand"
    );

    customCursor.classList.add(
        `is-${state}`
    );

}


setCursorState("cigarette");


/* =========================================================
   CURSOR POSITION
   ========================================================= */

let cursorX = -100;
let cursorY = -100;


document.addEventListener("mousemove", event => {

    cursorX = event.clientX;
    cursorY = event.clientY;

    customCursor.style.transform =
        `translate3d(${cursorX + 2}px, ${cursorY + 2}px, 0)`;

});


/* =========================================================
   MAP INITIALIZATION
   ========================================================= */

const isTouchDevice =
    L.Browser.touch ||
    window.matchMedia("(pointer: coarse)").matches;


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

    keyboard: !isTouchDevice

}).setView([20, 0], 2);


/* =========================================================
   MOBILE MAP FOCUS FIX
   ========================================================= */

if (isTouchDevice) {

    const mapContainer = map.getContainer();

    mapContainer.removeAttribute("tabindex");

    mapContainer.blur();

}


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


/* =========================================================
   INITIAL MAP SIZING
   ========================================================= */

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

        map.invalidateSize({
            pan: false
        });

        fitWorldToScreen();

    }, 200);

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
        lat: 44.813938,
        lng: 20.456848,

        visitedDate: "SEP 2025",
        visitedTime: "LATE EVENING / NIGHT",

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
        lat: 45.850244,
        lng: 22.980534,

        visitedDate: "FEB 2026",
        visitedTime: "MIDDAY",

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
        lat: 43.093869,
        lng: 18.158703,

        visitedDate: "AUG 2023",
        visitedTime: "SUNSET",

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
        lat: 45.926297,
        lng: 14.043176,

        visitedDate: "JUL 2025",
        visitedTime: "LATE AFTERNOON",

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
        lat: 46.219208,
        lng: 24.791609,

        visitedDate: "FEB 2026",
        visitedTime: "LATE EVENING / NIGHT",

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
        lat: 45.432485,
        lng: 14.905419,

        visitedDate: "AUG 2026",
        visitedTime: "MORNING / MIDDAY",

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
        lat: 45.325111,
        lng: 15.695395,

        visitedDate: "AUG 2026",
        visitedTime: "AFTERNOON",

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
        lat: 50.081553,
        lng: 14.400084,

        visitedDate: "AUG 2019",
        visitedTime: "AFTERNOON",

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
        lat: 43.860294,
        lng: 18.431862,

        visitedDate: "SEP 2024",
        visitedTime: "LATE EVENING",

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
        lat: 45.514442,
        lng: 9.869044,

        visitedDate: "DEC 2025",
        visitedTime: "BEFORE DINNER",

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
        lat: 45.409563,
        lng: 9.934405,

        visitedDate: "JUN 2026",
        visitedTime: "MORNING",

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
        lat: 45.881229,
        lng: 14.002382,

        visitedDate: "AUG 2026",
        visitedTime: "BEFORE LUNCH",

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

const indexList = document.getElementById("index-list");

const indexButton = document.getElementById("index-button");

const indexPanel = document.getElementById("index-panel");

const closeIndex = document.getElementById("close-index");


/* =========================================================
   MARKER REFERENCES
   ========================================================= */

const markerReferences = [];


/* =========================================================
   CLOSE ALL OPEN TOOLTIPS
   ========================================================= */

function closeAllTooltips() {

    markerReferences.forEach(reference => {

        if (
            reference.marker &&
            reference.marker.isTooltipOpen()
        ) {
            reference.marker.closeTooltip();
        }

    });

}


/* =========================================================
   CREATE MARKERS
   ========================================================= */

places.forEach(place => {


    /* =====================================================
       VISIBLE DOT
       ===================================================== */

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
       BIND TOOLTIP
       ===================================================== */

    marker.bindTooltip(
        popupContent,
        {
            direction: "top",

            offset: [0, -10],

            opacity: 1,

            className: "rutto-tooltip",

            interactive: true,

            permanent: false
        }
    );


    /* =====================================================
       SAVE REFERENCE
       ===================================================== */

    markerReferences.push({
        place: place,

        marker: marker
    });


    /* =====================================================
       CREATE INDEX ITEM
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

        <span class="index-visited">
            ${place.visitedDate} · ${place.visitedTime}
        </span>
    `;


    /* =====================================================
       INDEX ITEM → MAP
       ===================================================== */

    indexItem.addEventListener("click", event => {

        event.preventDefault();

        event.stopPropagation();


        indexPanel.classList.remove("open");


        setTimeout(() => {

            map.invalidateSize({
                pan: false
            });

        }, 50);


        closeAllTooltips();


        let tooltipOpened = false;


        const openTooltipAfterMove = () => {

            if (tooltipOpened) {
                return;
            }

            tooltipOpened = true;

            map.off("moveend", openTooltipAfterMove);

            marker.openTooltip();

        };


        map.once("moveend", openTooltipAfterMove);


        map.setView(
            [place.lat, place.lng],
            8,
            {
                animate: true,

                duration: 0.6
            }
        );


        setTimeout(() => {

            if (!tooltipOpened) {

                tooltipOpened = true;

                map.off("moveend", openTooltipAfterMove);

                marker.openTooltip();

            }

        }, 900);

    });


    /* Add item to INDEX */

    indexList.appendChild(indexItem);

});


/* =========================================================
   FIND NEAREST PLACE FROM MAP TAP
   ========================================================= */

function findPlaceFromMapTap(event) {

    const tapPoint =
        map.latLngToContainerPoint(event.latlng);


    let closestPlace = null;

    let closestDistance = Infinity;


    markerReferences.forEach(reference => {

        const markerPoint =
            map.latLngToContainerPoint(
                reference.marker.getLatLng()
            );


        const dx =
            tapPoint.x - markerPoint.x;

        const dy =
            tapPoint.y - markerPoint.y;


        const distance =
            Math.sqrt(
                dx * dx + dy * dy
            );


        if (
            distance < closestDistance &&
            distance <= 22
        ) {

            closestDistance = distance;

            closestPlace = reference;

        }

    });


    return closestPlace;

}


/* =========================================================
   CURSOR — MAP STATE
   ========================================================= */

function updateMapCursor(reference) {

    if (reference) {

        /*
           Vicino a un luogo:
           SOLO freccia.
        */

        setCursorState("arrow");

    } else {

        /*
           Mappa normale:
           torna alla sigaretta.
        */

        setCursorState("cigarette");

    }

}


/* =========================================================
   MAP TAP / CLICK
   ========================================================= */

map.on("click", event => {

    const reference =
        findPlaceFromMapTap(event);


    if (reference) {

        closeAllTooltips();

        reference.marker.openTooltip();

        return;
    }


    closeAllTooltips();

});


/* =========================================================
   DESKTOP HOVER
   ========================================================= */

let hoveredReference = null;


map.on("mousemove", event => {

    if (L.Browser.touch) {
        return;
    }


    /*
       CURSORE
    */

    const reference =
        findPlaceFromMapTap(event);


    updateMapCursor(reference);


    /*
       TOOLTIP
    */

    if (reference !== hoveredReference) {

        if (hoveredReference) {
            hoveredReference.marker.closeTooltip();
        }


        hoveredReference = reference;


        if (hoveredReference) {
            hoveredReference.marker.openTooltip();
        }

    }

});


map.on("mouseout", () => {

    if (L.Browser.touch) {
        return;
    }


    if (hoveredReference) {

        hoveredReference.marker.closeTooltip();

        hoveredReference = null;

    }


    setCursorState("cigarette");

});


/* =========================================================
   DESKTOP DRAG — HAND ONLY WHILE DRAGGING
   ========================================================= */

map.on("mousedown", () => {

    if (L.Browser.touch) {
        return;
    }


    setCursorState("hand");

});


map.on("mouseup", event => {

    if (L.Browser.touch) {
        return;
    }


    const reference =
        findPlaceFromMapTap(event);


    updateMapCursor(reference);

});


map.on("dragend", () => {

    if (L.Browser.touch) {
        return;
    }


    /*
       Dopo il trascinamento il cursore torna
       allo stato corretto in base alla posizione.
    */

    const containerPoint = map.mouseEventToContainerPoint({
        clientX: cursorX,
        clientY: cursorY
    });


    const latLng =
        map.containerPointToLatLng(containerPoint);


    const reference =
        findPlaceFromMapTap({
            latlng: latLng
        });


    updateMapCursor(reference);

});


/* =========================================================
   OPEN INDEX
   ========================================================= */

indexButton.addEventListener("click", event => {

    event.preventDefault();

    event.stopPropagation();

    indexPanel.classList.add("open");

});


/* =========================================================
   CLOSE INDEX
   ========================================================= */

closeIndex.addEventListener("click", event => {

    event.preventDefault();

    event.stopPropagation();

    indexPanel.classList.remove("open");

});


/* =========================================================
   ENTER THE MAP
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


    setCursorState("cigarette");

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
   FINAL MAP REFRESH
   ========================================================= */

window.addEventListener("load", () => {

    if (
        window.location.hash === "" &&
        window.scrollY > 0
    ) {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });

    }


    setTimeout(() => {

        map.invalidateSize({
            pan: false
        });

    }, 300);


    if (isTouchDevice) {

        setTimeout(() => {

            if (
                window.location.hash === "" &&
                !indexPanel.classList.contains("open")
            ) {

                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "auto"
                });

            }

        }, 600);

    }

});


/* =========================================================
   PAGE RESTORE
   ========================================================= */

window.addEventListener("pageshow", event => {

    if (event.persisted) {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });

    }

});
