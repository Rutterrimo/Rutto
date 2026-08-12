/*
=========================================================
RUTTO — MAP SCRIPT
=========================================================
*/


/*
=========================================================
SCROLL RESTORATION
=========================================================
*/

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}


/*
=========================================================
ALWAYS START FROM HOME
=========================================================
*/

function forceHomePosition() {
    window.scrollTo(0, 0);
}

forceHomePosition();

window.addEventListener("load", () => {

    forceHomePosition();

    setTimeout(() => {
        forceHomePosition();
    }, 100);

});

window.addEventListener("pageshow", () => {
    forceHomePosition();
});


/*
=========================================================
MAP INITIALIZATION
=========================================================
*/

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

    touchZoom: true

}).setView([20, 0], 2);


/*
=========================================================
ZOOM CONTROLS
=========================================================
*/

L.control.zoom({
    position: "bottomleft"
}).addTo(map);


/*
=========================================================
MAP TILES
=========================================================
*/

L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
        noWrap: true,

        attribution:
            "&copy; OpenStreetMap contributors &copy; CARTO"
    }
).addTo(map);


/*
=========================================================
MAP REFRESH
=========================================================
*/

function refreshMap() {

    setTimeout(() => {

        map.invalidateSize({
            pan: false
        });

    }, 100);

}


/*
=========================================================
RESIZE
=========================================================
*/

let resizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

        refreshMap();

    }, 200);

});


/*
=========================================================
ORIENTATION CHANGE
=========================================================
*/

window.addEventListener("orientationchange", () => {

    setTimeout(() => {

        refreshMap();

    }, 400);

});


/*
=========================================================
PLACES
=========================================================
*/

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


/*
=========================================================
INDEX ELEMENTS
=========================================================
*/

const indexList = document.getElementById("index-list");
const indexButton = document.getElementById("index-button");
const indexPanel = document.getElementById("index-panel");
const closeIndex = document.getElementById("close-index");


/*
=========================================================
MARKER REFERENCES
=========================================================
*/

const markerReferences = [];


/*
=========================================================
CLOSE ALL OPEN TOOLTIPS
=========================================================
*/

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


/*
=========================================================
FIND PLACE NEAR TOUCH
=========================================================
*/

/*
    This is the important mobile fix.

    Instead of relying on the phone correctly touching
    the invisible SVG marker, we look at the actual
    position of the finger on the screen.

    If a place is within TOUCH_RADIUS pixels,
    we consider that place selected.
*/

const TOUCH_RADIUS = 30;

function findPlaceNearPoint(containerPoint) {

    let closestReference = null;
    let closestDistance = Infinity;

    markerReferences.forEach(reference => {

        const markerPoint =
            map.latLngToContainerPoint(
                reference.place
                    ? [
                        reference.place.lat,
                        reference.place.lng
                    ]
                    : reference.marker.getLatLng()
            );


        const dx =
            markerPoint.x - containerPoint.x;

        const dy =
            markerPoint.y - containerPoint.y;

        const distance =
            Math.sqrt(
                (dx * dx) +
                (dy * dy)
            );


        if (
            distance < TOUCH_RADIUS &&
            distance < closestDistance
        ) {

            closestDistance = distance;

            closestReference = reference;

        }

    });


    return closestReference;
}


/*
=========================================================
OPEN PLACE TOOLTIP
=========================================================
*/

function openPlaceTooltip(reference) {

    if (!reference || !reference.marker) {
        return;
    }

    closeAllTooltips();

    reference.marker.openTooltip();

}


/*
=========================================================
CREATE MARKERS AND INDEX
=========================================================
*/

places.forEach(place => {


    /*
    =====================================================
    VISIBLE DOT
    =====================================================
    */

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


    /*
    =====================================================
    INVISIBLE MARKER
    =====================================================
    */

    const marker = L.circleMarker(
        [place.lat, place.lng],
        {
            radius: 16,

            color: "#000000",

            opacity: 0,

            fillColor: "#000000",

            fillOpacity: 0,

            weight: 0,

            interactive: true
        }
    ).addTo(map);


    /*
    =====================================================
    TOOLTIP CONTENT
    =====================================================
    */

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


    /*
    =====================================================
    BIND TOOLTIP
    =====================================================
    */

    marker.bindTooltip(
        popupContent,
        {
            direction: "auto",

            offset: [0, -10],

            opacity: 1,

            className: "rutto-tooltip",

            interactive: true,

            permanent: false
        }
    );


    /*
    =====================================================
    DESKTOP HOVER
    =====================================================
    */

    marker.on("mouseover", () => {

        if (!L.Browser.touch) {

            closeAllTooltips();

            marker.openTooltip();

        }

    });


    marker.on("mouseout", () => {

        if (!L.Browser.touch) {

            marker.closeTooltip();

        }

    });


    /*
    =====================================================
    SAVE REFERENCE
    =====================================================
    */

    markerReferences.push({
        place: place,
        marker: marker,
        visibleMarker: visibleMarker
    });


    /*
    =====================================================
    INDEX ITEM
    =====================================================
    */

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


    /*
    =====================================================
    INDEX → MAP
    =====================================================
    */

    indexItem.addEventListener("click", event => {

        event.preventDefault();

        event.stopPropagation();

        closeAllTooltips();

        indexPanel.classList.remove("open");


        setTimeout(() => {

            map.invalidateSize({
                pan: false
            });


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

                marker.openTooltip();

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


            setTimeout(() => {

                if (!tooltipOpened) {

                    tooltipOpened = true;

                    map.off(
                        "moveend",
                        openTooltipAfterMove
                    );

                    marker.openTooltip();

                }

            }, 900);

        }, 250);

    });


    indexList.appendChild(indexItem);

});


/*
=========================================================
MOBILE TAP ON MAP
=========================================================
*/

/*
    Leaflet's map click event works reliably on mobile.

    We use the click position and compare it with all
    places.

    This means the user does not have to hit a tiny SVG
    element exactly.
*/

map.on("click", event => {

    const containerPoint =
        map.latLngToContainerPoint(
            event.latlng
        );


    const nearbyPlace =
        findPlaceNearPoint(
            containerPoint
        );


    if (nearbyPlace) {

        openPlaceTooltip(
            nearbyPlace
        );

        return;

    }


    /*
    No place nearby:
    close any open tooltip.
    */

    closeAllTooltips();

});


/*
=========================================================
OPEN INDEX
=========================================================
*/

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


/*
=========================================================
CLOSE INDEX
=========================================================
*/

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


/*
=========================================================
ENTER THE MAP
=========================================================
*/

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

        document.body.classList.add("map-active");

        map.invalidateSize({
            pan: false
        });

    }, 700);

});


/*
=========================================================
RETURN HOME
=========================================================
*/

const homeButton =
    document.getElementById("home-button");

homeButton.addEventListener("click", event => {

    event.preventDefault();

    event.stopPropagation();

    indexPanel.classList.remove("open");

    closeAllTooltips();

    document.body.classList.remove("map-active");

    document.getElementById("home").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/*
=========================================================
ESCAPE → CLOSE INDEX
=========================================================
*/

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        indexPanel.classList.remove("open");

    }

});


/*
=========================================================
FINAL MAP REFRESH
=========================================================
*/

window.addEventListener("load", () => {

    setTimeout(() => {

        map.invalidateSize({
            pan: false
        });

    }, 300);

});
