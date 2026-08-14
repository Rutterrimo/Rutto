/* RUTTO — MAP SCRIPT (touch & focus fixes) */

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

    L.control.zoom({ position: "bottomleft" }).addTo(map);

    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
            noWrap: true,
            attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
        }
    ).addTo(map);
} catch (err) {
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
    const idealZoom = Math.max(2, Math.ceil(Math.max(zoomX, zoomY)));
    const cappedZoom = Math.min(idealZoom, map.getMaxZoom ? map.getMaxZoom() : idealZoom);
    map.setMinZoom(cappedZoom);
    map.setZoom(cappedZoom, { animate: false });
    map.invalidateSize({ pan: false });
}

setTimeout(() => { fitWorldToScreen(); }, 100);

let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (!map) return;
        map.invalidateSize({ pan: false });
        fitWorldToScreen();
    }, 200);
});

window.addEventListener("orientationchange", () => {
    setTimeout(() => {
        if (!map) return;
        map.invalidateSize({ pan: false });
        fitWorldToScreen();
    }, 400);
});

/* PLACES data (unchanged) */
const places = [
  /* same array of places as before — keep this block identical to the previous version */
];

/* INDEX ELEMENTS */
const indexList = document.getElementById("index-list");
const indexButton = document.getElementById("index-button");
const indexPanel = document.getElementById("index-panel");
const closeIndexBtn = document.getElementById("close-index");
const mapContainer = document.getElementById("map-container");

/* MARKER REFERENCES */
const markerReferences = [];

function closeAllTooltips() {
    markerReferences.forEach(reference => {
        if (reference.marker && reference.marker.isTooltipOpen && reference.marker.isTooltipOpen()) {
            reference.marker.closeTooltip();
        }
    });
}

function getFocusable(container) {
    if (!container) return [];
    const selectors = [
        'a[href]','area[href]','input:not([disabled])','select:not([disabled])',
        'textarea:not([disabled])','button:not([disabled])','iframe','object','embed',
        '[contenteditable]','[tabindex]:not([tabindex="-1"])'
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
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    if (map) setTimeout(() => map.invalidateSize({ pan: false }), 50);
}
function handleIndexKeydown(e) {
    if (e.key === "Escape" || e.key === "Esc") { e.preventDefault(); closeIndex(); return; }
    if (e.key === "Tab") {
        const focusables = getFocusable(indexPanel);
        if (focusables.length === 0) { closeIndexBtn.focus(); e.preventDefault(); return; }
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first || document.activeElement === indexPanel) { last.focus(); e.preventDefault(); }
        } else {
            if (document.activeElement === last) { first.focus(); e.preventDefault(); }
        }
    }
}

/* CREATE MARKERS AND INDEX */
places.forEach(place => {
    if (!map) return;

    const visibleMarker = L.circleMarker([place.lat, place.lng], {
        radius: 3, color: "#3a3a38", fillColor: "#3a3a38", fillOpacity: 1, weight: 0, interactive: false
    }).addTo(map);

    const marker = L.circleMarker([place.lat, place.lng], {
        radius: 14, color: "#000000", opacity: 0, fillColor: "#000000", fillOpacity: 0, weight: 0, interactive: true
    }).addTo(map);

    const popupContent = `
        <div class="place-popup">
            <h3>${place.name}</h3>
            <div class="categories">
                <div><span>SMOKING INDOORS</span><strong>${place.smoking}</strong></div>
                <div><span>SPONTANEOUS MUSIC</span><strong>${place.music}</strong></div>
                <div><span>LOCALS</span><strong>${place.locals}</strong></div>
                <div><span>GAMBLING</span><strong>${place.gambling}</strong></div>
            </div>
            <div class="popup-section"><span>TOILETS</span><p>${place.toilets}</p></div>
            <div class="popup-section"><span>NOTES</span><p>${place.notes || ""}</p></div>
        </div>
    `;

    marker.bindTooltip(popupContent, {
        direction: "top", offset: [0, -10], opacity: 1, className: "rutto-tooltip", interactive: true, permanent: false
    });

    marker.on("mouseover", () => { if (!L.Browser.touch) marker.openTooltip(); });
    marker.on("mouseout", () => { if (!L.Browser.touch) marker.closeTooltip(); });

    // unified toggle logic for click/pointer/touch
    function toggleMarkerTooltip(e) {
        // stop propagation so map doesn't pan/close other interactions
        if (e && e.originalEvent && e.originalEvent.stopPropagation) e.originalEvent.stopPropagation();
        if (marker.isTooltipOpen && marker.isTooltipOpen()) {
            marker.closeTooltip();
        } else {
            closeAllTooltips();
            marker.openTooltip();
        }
    }

    marker.on("click", toggleMarkerTooltip);
    marker.on("pointerdown", toggleMarkerTooltip);
    marker.on("touchend", toggleMarkerTooltip);

    markerReferences.push({ place, marker, visibleMarker });

    // index item
    const indexItem = document.createElement("button");
    indexItem.type = "button";
    indexItem.className = "index-item";
    indexItem.innerHTML = `
        <span class="index-number">${String(place.id).padStart(2, "0")}</span>
        <span class="index-name">${place.name}</span>
        <span class="index-coordinates">${place.lat.toFixed(4)}, ${place.lng.toFixed(4)}</span>
        <span class="index-visited">VISITED · ${place.visitedDate} · ${place.visitedTime}</span>
    `;

    indexItem.addEventListener("click", event => {
        event.preventDefault(); event.stopPropagation();
        closeIndex();
        closeAllTooltips();
        let tooltipOpened = false;
        const openTooltipAfterMove = () => {
            if (tooltipOpened) return;
            tooltipOpened = true;
            map.off("moveend", openTooltipAfterMove);
            marker.openTooltip();
        };
        map.once("moveend", openTooltipAfterMove);
        map.setView([place.lat, place.lng], 8, { animate: true, duration: 0.6 });
        setTimeout(() => {
            if (!tooltipOpened) { tooltipOpened = true; map.off("moveend", openTooltipAfterMove); marker.openTooltip(); }
        }, 900);
    });

    indexList.appendChild(indexItem);
});

/* OPEN / CLOSE index toggle */
indexButton.addEventListener("click", (e) => {
    e.preventDefault(); e.stopPropagation();
    if (indexPanel.classList.contains("open")) closeIndex(); else openIndex(indexButton);
});

if (closeIndexBtn) closeIndexBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); closeIndex(); });

const enterMapButton = document.getElementById("enter-map");
if (enterMapButton) enterMapButton.addEventListener("click", (event) => {
    event.preventDefault(); event.stopPropagation();
    document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "start" });
    if (mapContainer) mapContainer.focus();
});

const homeButton = document.getElementById("home-button");
if (homeButton) homeButton.addEventListener("click", (event) => {
    event.preventDefault(); event.stopPropagation();
    closeIndex(); closeAllTooltips();
    document.getElementById("home").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.addEventListener("keydown", (event) => {
    if ((event.key === "Escape" || event.key === "Esc") && indexPanel.classList.contains("open")) closeIndex();
});

if (map) {
    map.on("click", event => {
        if (event.originalEvent && event.originalEvent.target && event.originalEvent.target.closest && event.originalEvent.target.closest(".leaflet-interactive")) return;
        closeAllTooltips();
    });
}

window.addEventListener("load", () => {
    setTimeout(() => { if (map) map.invalidateSize({ pan: false }); }, 300);
});
