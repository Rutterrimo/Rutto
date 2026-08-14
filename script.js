/* =========================================================
   RUTTO — MAP SCRIPT (restored + robust initialization)
   - waits for Leaflet (L) to be available
   - restores the full places[] dataset
   - creates visible dots and interactive touch targets
   - populates the index
   - handles click/pointer/touch consistently on mobile
   ========================================================= */

/* SCROLL RESTORATION */
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

/* PLACES — full dataset restored */
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

/* DOM elements */
const indexList = document.getElementById("index-list");
const indexButton = document.getElementById("index-button");
const indexPanel = document.getElementById("index-panel");
const closeIndexBtn = document.getElementById("close-index");
const mapContainer = document.getElementById("map-container");

const markerReferences = [];

/* Utility: focusable */
function getFocusable(container) {
    if (!container) return [];
    const selectors = [
        'a[href]','area[href]','input:not([disabled])','select:not([disabled])',
        'textarea:not([disabled])','button:not([disabled])','iframe','object','embed',
        '[contenteditable]','[tabindex]:not([tabindex="-1"])'
    ];
    return Array.from(container.querySelectorAll(selectors.join(',')))
        .filter(el => (el.offsetWidth > 0 || el.offsetHeight > 0) || el === document.activeElement);
}

/* Focus trap for index panel */
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
    // resize map after closing
    if (mapInstance) setTimeout(() => mapInstance.invalidateSize({ pan: false }), 50);
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

/* Close all tooltips */
function closeAllTooltips() {
    markerReferences.forEach(ref => {
        if (ref.marker && typeof ref.marker.isTooltipOpen === 'function' && ref.marker.isTooltipOpen()) {
            ref.marker.closeTooltip();
        }
    });
}

/* MAP / markers */
let mapInstance = null;

/* Create index items (always) and a placeholder click handler that will work when the map is ready */
function populateIndex() {
    indexList.innerHTML = ""; // clear
    places.forEach(place => {
        const indexItem = document.createElement("button");
        indexItem.type = "button";
        indexItem.className = "index-item";
        indexItem.innerHTML = `
            <span class="index-number">${String(place.id).padStart(2, "0")}</span>
            <span class="index-name">${place.name}</span>
            <span class="index-coordinates">${place.lat.toFixed(4)}, ${place.lng.toFixed(4)}</span>
            <span class="index-visited">VISITED · ${place.visitedDate} · ${place.visitedTime}</span>
        `;

        // handler will attempt to move the map if ready, otherwise just scroll to map
        indexItem.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            closeIndex();
            closeAllTooltips();

            if (!mapInstance) {
                // fallback: scroll to map container and focus
                document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "start" });
                if (mapContainer) mapContainer.focus();
                return;
            }

            const markerRef = markerReferences.find(r => r.place && r.place.id === place.id);
            let tooltipOpened = false;

            const openTooltipAfterMove = () => {
                if (tooltipOpened) return;
                tooltipOpened = true;
                mapInstance.off("moveend", openTooltipAfterMove);
                if (markerRef && markerRef.marker) markerRef.marker.openTooltip();
            };

            mapInstance.once("moveend", openTooltipAfterMove);

            mapInstance.setView([place.lat, place.lng], 8, { animate: true, duration: 0.6 });

            // safety fallback
            setTimeout(() => {
                if (!tooltipOpened) {
                    tooltipOpened = true;
                    mapInstance.off("moveend", openTooltipAfterMove);
                    if (markerRef && markerRef.marker) markerRef.marker.openTooltip();
                }
            }, 900);
        });

        indexList.appendChild(indexItem);
    });
}

/* Create markers once mapInstance is available */
function createMarkers() {
    markerReferences.length = 0;

    places.forEach(place => {
        // visible small dot
        const visibleMarker = L.circleMarker([place.lat, place.lng], {
            radius: 3,
            color: "#3a3a38",
            fillColor: "#3a3a38",
            fillOpacity: 1,
            weight: 0,
            interactive: false
        }).addTo(mapInstance);

        // larger invisible touch target
        const marker = L*`

