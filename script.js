/* =========================================================
   RUTTO — MAP SCRIPT (improved accessibility + robustness)
   ========================================================= */

/* SCROLL RESTORATION */
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

/* MAP INITIALIZATION */
let map;
try {
    map = L.map("map-container", {
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

    /* ZOOM CONTROLS */
    L.control.zoom({
        position: "bottomleft"
    }).addTo(map);

    /* MAP TILES */
    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
            noWrap: true,
            attribution:
                "&copy; OpenStreetMap contributors &copy; CARTO"
        }
    ).addTo(map);
} catch (err) {
    // If Leaflet failed to load, avoid breaking the rest of the JS.
    console.error("Leaflet failed to initialize:", err);
}

/* KEEP WORLD FILLED WITH SCREEN */
function fitWorldToScreen() {
    if (!map) return;
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

    // Ensure we don't set minZoom above maxZoom
    const cappedZoom = Math.min(idealZoom, map.getMaxZoom ? map.getMaxZoom() : idealZoom);

    map.setMinZoom(cappedZoom);

    map.setZoom(cappedZoom, {
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

/* RESIZE */
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (!map) return;
        map.invalidateSize({
            pan: false
        });
        fitWorldToScreen();
    }, 200);
});

/* ORIENTATION CHANGE */
window.addEventListener("orientationchange", () => {
    setTimeout(() => {
        if (!map) return;
        map.invalidateSize({
            pan: false
        });
        fitWorldToScreen();
    }, 400);
});

/* =========================================================
   PLACES (unchanged data)
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

/* INDEX ELEMENTS */
const indexList = document.getElementById("index-list");
const indexButton = document.getElementById("index-button");
const indexPanel = document.getElementById("index-panel");
const closeIndexBtn = document.getElementById("close-index");
const mapContainer = document.getElementById("map-container");

/* MARKER REFERENCES */
const markerReferences = [];

/* CLOSE ALL OPEN TOOLTIPS */
function closeAllTooltips() {
    markerReferences.forEach(reference => {
        if (reference.marker && reference.marker.isTooltipOpen && reference.marker.isTooltipOpen()) {
            reference.marker.closeTooltip();
        }
    });
}

/* Focus helper for trapping focus inside panel */
function getFocusable(container) {
    if (!container) return [];
    const selectors = [
        'a[href]',
        'area[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'iframe',
        'object',
        'embed',
        '[contenteditable]',
        '[tabindex]:not([tabindex="-1"])'
    ];
    return Array.from(container.querySelectorAll(selectors.join(',')))
        .filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
}

/* OPEN / CLOSE INDEX with ARIA + focus trap */
let lastFocused = null;

function openIndex(opener) {
    lastFocused = opener || document.activeElement;
    indexPanel.classList.add("open");
    indexPanel.setAttribute("aria-hidden", "false");
    indexButton.setAttribute("aria-expanded", "true");

    const focusables = getFocusable(indexPanel);
    (focusables[0] || closeIndexBtn).focus();

    document.addEventListener("keydown", handleIndexKeydown);
}

function closeIndex() {
    indexPanel.classList.remove("open");
    indexPanel.setAttribute("aria-hidden", "true");
    indexButton.setAttribute("aria-expanded", "false");

    document.removeEventListener("keydown", handleIndexKeydown);

    if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
    }

    // After closing, ensure map sizing if present
    if (map) {
        setTimeout(() => {
            map.invalidateSize({ pan: false });
        }, 50);
    }
}

function handleIndexKeydown(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        closeIndex();
        return;
    }
    if (e.key === "Tab") {
        const focusables = getFocusable(indexPanel);
        if (focusables.length === 0) {
            closeIndexBtn.focus();
            e.preventDefault();
            return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first || document.activeElement === indexPanel) {
                last.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    }
}

/* CREATE MARKERS AND INDEX */
places.forEach(place => {
    if (!map) return; // if map failed to initialize, skip marker creation

    /* visible dot */
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

    /* invisible touch target */
    const marker = L.circleMarker(
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

    /* tooltip content */
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

    /* desktop hover */
    marker.on("mouseover", () => {
        if (!L.Browser.touch) {
            marker.openTooltip();
        }
    });
    marker.on("mouseout", () => {
        if (!L.Browser.touch) {
            marker.closeTooltip();
        }
    });

    /* click / tap */
    marker.on("click", event => {
        if (event.originalEvent) {
            event.originalEvent.preventDefault();
            event.originalEvent.stopPropagation();
        }
        if (marker.isTooltipOpen()) {
            marker.closeTooltip();
        } else {
            closeAllTooltips();
            marker.openTooltip();
        }
    });

    /* touchstart - prevent propagation but do NOT call preventDefault so click can follow */
    marker.on("touchstart", event => {
        if (event.originalEvent) {
            // don't call preventDefault() here; calling it can prevent click on some devices
            event.originalEvent.stopPropagation();
        }
    });

    /* save reference */
    markerReferences.push({
        place: place,
        marker: marker,
        visibleMarker: visibleMarker
    });

    /* CREATE INDEX ITEM (button) */
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
            VISITED · ${place.visitedDate} · ${place.visitedTime}
        </span>
    `;

    /* index item -> map */
    indexItem.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        // close index properly (updates ARIA and restores focus)
        closeIndex();

        // Close other tooltips
        closeAllTooltips();

        let tooltipOpened = false;
        const openTooltipAfterMove = () => {
            if (tooltipOpened) return;
            tooltipOpened = true;
            map.off("moveend", openTooltipAfterMove);
            marker.openTooltip();
        };
        map.once("moveend", openTooltipAfterMove);

        // Move to selected place (zoom 8)
        map.setView(
            [place.lat, place.lng],
            8,
            {
                animate: true,
                duration: 0.6
            }
        );

        // Safety fallback
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

/* OPEN INDEX (toggle) */
indexButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (indexPanel.classList.contains("open")) {
        closeIndex();
    } else {
        openIndex(indexButton);
    }
});

/* CLOSE INDEX button */
if (closeIndexBtn) {
    closeIndexBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeIndex();
    });
}

/* ENTER THE MAP */
const enterMapButton = document.getElementById("enter-map");
if (enterMapButton) {
    enterMapButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        document.getElementById("map").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        if (mapContainer) mapContainer.focus();
    });
}

/* RETURN HOME */
const homeButton = document.getElementById("home-button");
if (homeButton) {
    homeButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeIndex();
        closeAllTooltips();
        document.getElementById("home").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}

/* ESCAPE → CLOSE INDEX (global as fallback) */
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
        if (indexPanel.classList.contains("open")) {
            closeIndex();
        }
    }
});

/* CLICK EMPTY MAP → CLOSE TOOLTIP */
if (map) {
    map.on("click", event => {
        if (
            event.originalEvent &&
            event.originalEvent.target &&
            event.originalEvent.target.closest &&
            event.originalEvent.target.closest(".leaflet-interactive")
        ) {
            return;
        }
        closeAllTooltips();
    });
}

/* FINAL MAP REFRESH */
window.addEventListener("load", () => {
    setTimeout(() => {
        if (map) {
            map.invalidateSize({
                pan: false
            });
        }
    }, 300);
});
