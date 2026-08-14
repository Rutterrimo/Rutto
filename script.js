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


/*
   Do this before Leaflet starts.
*/

forceHomePosition();


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

/*
   Leaflet gives the map container a tabindex so that it can
   receive keyboard focus.

   That is useful on desktop, but unnecessary on touch devices
   and can cause mobile browsers to move the page to the map.

   On touch devices we remove the focusability completely.
*/

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
                dx * dx +
                dy * dy
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
   MAP TAP / CLICK
   ========================================================= */

/*
   MOBILE / TOUCH SYSTEM

   This remains exactly as before.

   The visible dots are not interactive Leaflet layers.
   Instead, a tap anywhere on the map searches for the
   closest place within 22px and opens its tooltip.
*/

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
   DESKTOP MOUSE HOVER
   ========================================================= */

let hoveredReference = null;


const mapContainer =
    map.getContainer();


/* =========================================================
   CUSTOM DESKTOP CURSOR
   ========================================================= */

const ruttoCursor =
    document.createElement("div");

ruttoCursor.id = "rutto-cursor";

ruttoCursor.innerHTML = `
    <span class="rutto-cigarette"></span>
    <span class="rutto-smoke"></span>
`;

document.body.appendChild(ruttoCursor);


/*
   Custom cursor exists only for fine pointers.
   Touch behaviour is completely untouched.
*/

const hasFinePointer =
    window.matchMedia("(pointer: fine)").matches;


if (hasFinePointer) {

    mapContainer.classList.add(
        "rutto-cursor-active"
    );

}


/* =========================================================
   DESKTOP MOUSE MOVE
   ========================================================= */

function handleDesktopMouseMove(event) {

    if (event.pointerType && event.pointerType !== "mouse") {
        return;
    }


    /*
       If the map is currently being dragged,
       Leaflet owns the cursor.
    */

    if (
        mapContainer.classList.contains(
            "rutto-cursor-dragging"
        )
    ) {

        ruttoCursor.classList.remove("visible");

        return;

    }


    /*
       Move the cigarette cursor.
    */

    if (hasFinePointer) {

        ruttoCursor.style.left =
            `${event.clientX}px`;

        ruttoCursor.style.top =
            `${event.clientY}px`;

        ruttoCursor.classList.add("visible");

    }


    /*
       Convert browser mouse position into Leaflet LatLng.
    */

    const latlng =
        map.mouseEventToLatLng(event);


    const reference =
        findPlaceFromMapTap({
            latlng: latlng
        });


    /*
       Nothing changed.
    */

    if (reference === hoveredReference) {
        return;
    }


    /*
       Close previous hover tooltip.
    */

    if (hoveredReference) {

        hoveredReference.marker.closeTooltip();

    }


    hoveredReference = reference;


    /*
       Near a place:
       hide cigarette and restore normal arrow.
    */

    if (hoveredReference) {

        ruttoCursor.classList.remove("visible");

        mapContainer.classList.add(
            "rutto-cursor-place"
        );

        hoveredReference.marker.openTooltip();

        return;
    }


    /*
       Back to normal map:
       cigarette returns.
    */

    mapContainer.classList.remove(
        "rutto-cursor-place"
    );

}


/* =========================================================
   DESKTOP MOUSE LEAVE
   ========================================================= */

function handleDesktopMouseLeave() {

    if (hoveredReference) {

        hoveredReference.marker.closeTooltip();

        hoveredReference = null;

    }


    ruttoCursor.classList.remove("visible");

}


/* =========================================================
   DESKTOP MOUSE DOWN
   ========================================================= */

function handleDesktopMouseDown(event) {

    if (!hasFinePointer) {
        return;
    }

    if (event.button !== 0) {
        return;
    }


    ruttoCursor.classList.remove("visible");

    mapContainer.classList.remove(
        "rutto-cursor-place"
    );

    mapContainer.classList.add(
        "rutto-cursor-dragging"
    );

}


/* =========================================================
   DESKTOP MOUSE UP
   ========================================================= */

function handleDesktopMouseUp() {

    if (!hasFinePointer) {
        return;
    }


    mapContainer.classList.remove(
        "rutto-cursor-dragging"
    );


    /*
       If the mouse is still over a place,
       keep the normal arrow.

       Otherwise restore the cigarette.
    */

    if (hoveredReference) {

        ruttoCursor.classList.remove("visible");

        mapContainer.classList.add(
            "rutto-cursor-place"
        );

    } else {

        ruttoCursor.classList.add("visible");

        mapContainer.classList.remove(
            "rutto-cursor-place"
        );

    }

}


/* =========================================================
   DESKTOP CURSOR EVENTS
   ========================================================= */

mapContainer.addEventListener(
    "mousemove",
    handleDesktopMouseMove
);


mapContainer.addEventListener(
    "mouseleave",
    handleDesktopMouseLeave
);


mapContainer.addEventListener(
    "mousedown",
    handleDesktopMouseDown
);


window.addEventListener(
    "mouseup",
    handleDesktopMouseUp
);


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

    /*
       Give the browser one last explicit instruction:
       the page starts at HOME, not at the map.
    */

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


    /*
       Extra mobile safeguard after Leaflet and tiles have
       finished their first layout pass.
    */

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
