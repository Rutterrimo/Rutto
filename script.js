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

const cigaretteCursor =
    document.getElementById("rutto-cigarette-cursor");


const body =
    document.body;


const isTouchDevice =
    L.Browser.touch ||
    window.matchMedia("(pointer: coarse)").matches;


/*
   Cursor states:

   cigarette = custom cigarette
   arrow     = normal browser arrow
   dragging  = Leaflet grabbing hand
*/

function setCigaretteCursor() {

    if (isTouchDevice) {
        return;
    }

    body.classList.remove("rutto-arrow-cursor");
    body.classList.remove("rutto-dragging");

    body.classList.add("rutto-cigarette-mode");
}


function setArrowCursor() {

    if (isTouchDevice) {
        return;
    }

    body.classList.remove("rutto-cigarette-mode");
    body.classList.remove("rutto-dragging");

    body.classList.add("rutto-arrow-cursor");
}


function setDraggingCursor() {

    if (isTouchDevice) {
        return;
    }

    body.classList.remove("rutto-cigarette-mode");
    body.classList.remove("rutto-arrow-cursor");

    body.classList.add("rutto-dragging");
}


/*
   Start with cigarette on desktop.
*/

if (!isTouchDevice) {

    setCigaretteCursor();

}


/* =========================================================
   MOVE CUSTOM CIGARETTE
   ========================================================= */

if (!isTouchDevice) {

    document.addEventListener("mousemove", event => {

        cigaretteCursor.style.transform =
            `translate3d(
                ${event.clientX + 7}px,
                ${event.clientY + 7}px,
                0
            ) rotate(-38deg)`;

    });

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
       IMPORTANT:

       This is the SAME 22px detection used for opening
       the place tooltip.

       When a place is nearby:
       cigarette disappears completely
       normal arrow appears.

       When there is no place nearby:
       cigarette returns.
    */

    const reference =
        findPlaceFromMapTap(event);


    if (reference !== hoveredReference) {

        if (hoveredReference) {
            hoveredReference.marker.closeTooltip();
        }


        hoveredReference = reference;


        if (hoveredReference) {

            setArrowCursor();

            hoveredReference.marker.openTooltip();

        } else {

            setCigaretteCursor();

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


    setCigaretteCursor();

});


/* =========================================================
   DRAG CURSOR
   ========================================================= */

/*
   We deliberately let Leaflet handle the actual drag
   behaviour. We only hide the cigarette while dragging,
   so the normal Leaflet grabbing hand can be seen.
*/

map.on("dragstart", () => {

    if (isTouchDevice) {
        return;
    }

    setDraggingCursor();

});


map.on("dragend", () => {

    if (isTouchDevice) {
        return;
    }

    /*
       After dragging, go back to whichever state the mouse
       is actually over.

       Leaflet does not necessarily emit a mousemove at this
       exact moment, so we simply return to cigarette mode.
       The next mousemove will immediately switch to arrow
       if the pointer is close to a place.
    */

    setCigaretteCursor();

});


/* =========================================================
   OPEN INDEX
   ========================================================= */

indexButton.addEventListener("click", event => {

    event.preventDefault();

    event.stopPropagation();

    indexPanel.classList.add("open");

    setArrowCursor();

});


/* =========================================================
   CLOSE INDEX
   ========================================================= */

closeIndex.addEventListener("click", event => {

    event.preventDefault();

    event.stopPropagation();

    indexPanel.classList.remove("open");

    setArrowCursor();

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


    setArrowCursor();

});


/* =========================================================
   BUTTON HOVER → ARROW
   ========================================================= */

if (!isTouchDevice) {

    [
        enterMapButton,
        homeButton,
        indexButton,
        closeIndex
    ].forEach(button => {

        button.addEventListener("mouseenter", () => {

            setArrowCursor();

        });


        button.addEventListener("mouseleave", () => {

            setCigaretteCursor();

        });

    });

}


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
