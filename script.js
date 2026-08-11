/* ALWAYS START FROM HOME */

if ("scrollRestoration" in history) {
history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
window.scrollTo(0, 0);
});

const map = L.map('map-container', {
worldCopyJump: false,
minZoom: 2,
maxBounds: [
[-85, -180],
[85, 180]
],
maxBoundsViscosity: 1.0,
zoomControl: false
}).setView([20, 0], 2);

/* ZOOM CONTROLS */

L.control.zoom({
position: 'bottomleft'
}).addTo(map);

/* MAP TILES */

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
noWrap: true,
attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);

/* KEEP THE WORLD FILLED WITH THE SCREEN */

function fitWorldToScreen() {
const width = window.innerWidth;
const height = window.innerHeight;

```
const worldWidth = 360;
const worldHeight = 170;

const zoomX = Math.log2(width / worldWidth);
const zoomY = Math.log2(height / worldHeight);

const idealZoom = Math.max(
    2,
    Math.ceil(Math.max(zoomX, zoomY))
);

map.setMinZoom(idealZoom);
map.setZoom(idealZoom);
```

}

fitWorldToScreen();

window.addEventListener("resize", fitWorldToScreen);

/* PLACES */

const places = [

```
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
    lat: 45.43148,
    lng: 14.90542,
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
    name: "Magická Jeskyně – Magical Cav
```
