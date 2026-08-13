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

    maxBoundsViscosity: 1,

    zoomControl: false,

    touchZoom: true,

    tap: true

}).setView(
    [20, 0],
    2
);


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
   MAP SIZING
   ========================================================= */

function fitWorldToScreen() {

    map.invalidateSize({
        pan: false
    });


    /*
     * Leaflet itself is much better at calculating
     * the actual world scale than our previous
     * width / 360 and height / 170 approximation.
     *
     * We only make sure the map starts at a useful
     * world view and remains inside its limits.
     */

    const size = map.getSize();

    if (
        !size ||
        size.x <= 0 ||
        size.y <= 0
    ) {
        return;
    }


    const currentZoom = map.getZoom();


    if (
        !Number.isFinite(currentZoom) ||
        currentZoom < 2
    ) {
        map.setZoom(
            2,
            {
                animate: false
            }
        );
    }

}


/* =========================================================
   INITIAL MAP SIZING
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            fitWorldToScreen();

        }, 150);

    }
);


/* =========================================================
   RESIZE
   ========================================================= */

let resizeTimer = null;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);


        resizeTimer = setTimeout(() => {

            fitWorldToScreen();

        }, 150);

    }
);


/* =========================================================
   ORIENTATION CHANGE
   ========================================================= */

window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(() => {

            fitWorldToScreen();

        }, 400);

    }
);


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

        toilets:
            "Squat toilets, unisex, very dirty.",

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

        toilets:
            "Chemical toilets, extremely dirty, unisex.",

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

        toilets:
            "Normal. Men and women separated.",

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

        toilets:
            "Normal. Men and women separated.",

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

        toilets:
            "Normal. Men and women separated.",

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

        toilets:
            "Normal. Men and women separated.",

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

        toilets:
            "Unisex. Looks like a private laundry room.",

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

        toilets:
            "Unisex, extremely dirty.",

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

        toilets:
            "Normal. Men and women separated.",

        notes: ""
    }

];


/* =========================================================
   INDEX ELEMENTS
   ========================================================= */

const indexList =
    document.getElementById(
        "index-list"
    );


const indexButton =
    document.getElementById(
        "index-button"
    );


const indexPanel =
    document.getElementById(
        "index-panel"
    );


const closeIndex =
    document.getElementById(
        "close-index"
    );


/* =========================================================
   MARKER REFERENCES
   ========================================================= */

const markerReferences = [];


/* =========================================================
   CLOSE ALL TOOLTIPS
   ========================================================= */

function closeAllTooltips() {

    markerReferences.forEach(
        reference => {

            if (
                reference.marker &&
                reference.marker.isTooltipOpen()
            ) {
                reference.marker.closeTooltip();
            }

        }
    );

}


/* =========================================================
   REMOVE SVG FOCUS
   ========================================================= */

function removeMarkerFocus(marker) {

    const element =
        marker.getElement();

    if (!element) {
        return;
    }


    /*
     * This is important on mobile.
     *
     * Leaflet's interactive SVG path can become
     * focusable. Some browsers then draw a focus
     * rectangle/ring around it.
     *
     * The marker remains clickable without tabindex.
     */

    element.removeAttribute(
        "tabindex"
    );

    element.removeAttribute(
        "focusable"
    );

    element.style.outline =
        "none";

}


/* =========================================================
   OPEN / CLOSE MARKER TOOLTIP
   ========================================================= */

function toggleTooltip(marker) {

    if (
        marker.isTooltipOpen()
    ) {

        marker.closeTooltip();

        return;

    }


    closeAllTooltips();

    marker.openTooltip();

}


/* =========================================================
   CREATE MARKERS + INDEX
   ========================================================= */

places.forEach(
    place => {


        /* =================================================
           VISIBLE BLACK DOT
           ================================================= */

        const visibleMarker =
            L.circleMarker(
                [
                    place.lat,
                    place.lng
                ],
                {

                    radius: 3,

                    color: "#3a3a38",

                    fillColor: "#3a3a38",

                    fillOpacity: 1,

                    weight: 0,

                    interactive: false

                }
            ).addTo(map);


        /* =================================================
           INVISIBLE TOUCH TARGET
           ================================================= */

        const marker =
            L.circleMarker(
                [
                    place.lat,
                    place.lng
                ],
                {

                    /*
                     * Large enough for a finger.
                     */

                    radius: 18,

                    color: "#171717",

                    opacity: 0,

                    fillColor: "#171717",

                    fillOpacity: 0,

                    weight: 0,

                    stroke: false,

                    interactive: true,

                    bubblingMouseEvents: false

                }
            ).addTo(map);


        /*
         * Immediately remove possible focusability.
         */

        removeMarkerFocus(marker);


        /* =================================================
           TOOLTIP CONTENT
           ================================================= */

        const popupContent = `

            <div class="place-popup">

                <h3>
                    ${place.name}
                </h3>


                <div class="categories">

                    <div>
                        <span>
                            SMOKING INDOORS
                        </span>

                        <strong>
                            ${place.smoking}
                        </strong>
                    </div>


                    <div>
                        <span>
                            SPONTANEOUS MUSIC
                        </span>

                        <strong>
                            ${place.music}
                        </strong>
                    </div>


                    <div>
                        <span>
                            LOCALS
                        </span>

                        <strong>
                            ${place.locals}
                        </strong>
                    </div>


                    <div>
                        <span>
                            GAMBLING
                        </span>

                        <strong>
                            ${place.gambling}
                        </strong>
                    </div>

                </div>


                <div class="popup-section">

                    <span>
                        TOILETS
                    </span>

                    <p>
                        ${place.toilets}
                    </p>

                </div>


                <div class="popup-section">

                    <span>
                        NOTES
                    </span>

                    <p>
                        ${place.notes || ""}
                    </p>

                </div>

            </div>

        `;


        /* =================================================
           TOOLTIP
           ================================================= */

        marker.bindTooltip(
            popupContent,
            {

                direction: "top",

                offset: [
                    0,
                    -10
                ],

                opacity: 1,

                className:
                    "rutto-tooltip",

                interactive: true,

                permanent: false,

                /*
                 * Do not steal focus.
                 */

                autoPan: false

            }
        );


        /* =================================================
           DESKTOP HOVER
           ================================================= */

        marker.on(
            "mouseover",
            () => {

                /*
                 * Only desktop gets true hover.
                 *
                 * On phones there is no hover,
                 * so mobile uses click/tap below.
                 */

                if (
                    !L.Browser.touch
                ) {

                    marker.openTooltip();

                }

            }
        );


        marker.on(
            "mouseout",
            () => {

                if (
                    !L.Browser.touch
                ) {

                    marker.closeTooltip();

                }

            }
        );


        /* =================================================
           CLICK / TAP
           ================================================= */

        marker.on(
            "click",
            event => {

                /*
                 * Stop the map itself from receiving
                 * this click.
                 */

                if (
                    event.originalEvent
                ) {

                    L.DomEvent.stopPropagation(
                        event.originalEvent
                    );

                }


                toggleTooltip(
                    marker
                );


                /*
                 * Make absolutely sure the SVG path
                 * does not remain focused after tap.
                 */

                setTimeout(
                    () => {

                        removeMarkerFocus(
                            marker
                        );

                    },
                    0
                );

            }
        );


        /* =================================================
           TOOLTIP OPEN
           ================================================= */

        marker.on(
            "tooltipopen",
            () => {

                removeMarkerFocus(
                    marker
                );

            }
        );


        /* =================================================
           SAVE REFERENCE
           ================================================= */

        markerReferences.push({

            place: place,

            marker: marker,

            visibleMarker:
                visibleMarker

        });


        /* =================================================
           CREATE INDEX ITEM
           ================================================= */

        const indexItem =
            document.createElement(
                "button"
            );


        indexItem.type =
            "button";


        indexItem.className =
            "index-item";


        indexItem.innerHTML = `

            <span class="index-number">
                ${String(place.id).padStart(2, "0")}
            </span>


            <span class="index-name">
                ${place.name}
            </span>


            <span class="index-coordinates">
                ${place.lat.toFixed(4)},
                ${place.lng.toFixed(4)}
            </span>


            <span class="index-visited">
                VISITED ·
                ${place.visitedDate}
                ·
                ${place.visitedTime}
            </span>

        `;


        /* =================================================
           INDEX ITEM → MAP
           ================================================= */

        indexItem.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();


                /*
                 * Close index.
                 */

                closeIndexPanel();


                /*
                 * Close existing tooltips.
                 */

                closeAllTooltips();


                let tooltipOpened =
                    false;


                const openTooltipAfterMove =
                    () => {

                        if (
                            tooltipOpened
                        ) {
                            return;
                        }


                        tooltipOpened =
                            true;


                        map.off(
                            "moveend",
                            openTooltipAfterMove
                        );


                        marker.openTooltip();

                        removeMarkerFocus(
                            marker
                        );

                    };


                map.once(
                    "moveend",
                    openTooltipAfterMove
                );


                /*
                 * Move map to place.
                 */

                map.setView(
                    [
                        place.lat,
                        place.lng
                    ],
                    8,
                    {

                        animate: true,

                        duration: 0.6

                    }
                );


                /*
                 * Safety fallback.
                 */

                setTimeout(
                    () => {

                        if (
                            !tooltipOpened
                        ) {

                            tooltipOpened =
                                true;


                            map.off(
                                "moveend",
                                openTooltipAfterMove
                            );


                            marker.openTooltip();

                            removeMarkerFocus(
                                marker
                            );

                        }

                    },
                    900
                );

            }
        );


        /* =================================================
           ADD ITEM
           ================================================= */

        indexList.appendChild(
            indexItem
        );

    }
);


/* =========================================================
   INDEX OPEN / CLOSE
   ========================================================= */

function openIndexPanel() {

    indexPanel.classList.add(
        "open"
    );

    indexPanel.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeIndexPanel() {

    indexPanel.classList.remove(
        "open"
    );

    indexPanel.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   OPEN INDEX
   ========================================================= */

indexButton.addEventListener(
    "click",
    event => {

        event.preventDefault();

        event.stopPropagation();

        openIndexPanel();

    }
);


/* =========================================================
   CLOSE INDEX
   ========================================================= */

closeIndex.addEventListener(
    "click",
    event => {

        event.preventDefault();

        event.stopPropagation();

        closeIndexPanel();

    }
);


/* =========================================================
   ENTER MAP
   ========================================================= */

const enterMapButton =
    document.getElementById(
        "enter-map"
    );


enterMapButton.addEventListener(
    "click",
    event => {

        event.preventDefault();

        event.stopPropagation();


        document
            .getElementById("map")
            .scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

    }
);


/* =========================================================
   HOME
   ========================================================= */

const homeButton =
    document.getElementById(
        "home-button"
    );


homeButton.addEventListener(
    "click",
    event => {

        event.preventDefault();

        event.stopPropagation();


        closeIndexPanel();

        closeAllTooltips();


        document
            .getElementById("home")
            .scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

    }
);


/* =========================================================
   ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeIndexPanel();

            closeAllTooltips();

        }

    }
);


/* =========================================================
   EMPTY MAP CLICK
   ========================================================= */

map.on(
    "click",
    event => {

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

    }
);


/* =========================================================
   FINAL MAP REFRESH
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                map.invalidateSize({
                    pan: false
                });

            },
            300
        );

    }
);
