html: \<!DOCTYPE html>
\<html lang="en">

\<head>

    \<meta charset="UTF-8">

    \<meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    \>

    \<title>RUTTO — places worth getting lost in\</title>

    \<meta
        name="description"
        content="RUTTO is an archive of places worth getting lost in — unclassified places, roadside stops, cafés, bars, restaurants and other places around the world."
    \>

    \<meta
        name="robots"
        content="index, follow"
    \>

    \<link
        rel="canonical"
        href="[https://rutterrimo.github.io/Rutto/](https://rutterrimo.github.io/Rutto/)"
    \>

    \<link
        rel="stylesheet"
        href="style.css"
    \>

    \<link
        rel="stylesheet"
        href="[https://unpkg.com/leaflet@1.9.4/dist/leaflet.css](https://unpkg.com/leaflet@1.9.4/dist/leaflet.css)"
    \>

\</head>


\<body>

    \<main
        class="intro"
        id="home"
    \>

        \<div class="intro-content">

            \<h1>RUTTO\</h1>

            \<p>
                places worth getting lost in
            \</p>

            \<button
                id="enter-map"
                class="enter-button"
            \>
                ENTER THE MAP
            \</button>

        \</div>

    \</main>


    \<section id="map">

        \<button id="home-button">
            HOME
        \</button>

        \<button id="index-button">
            INDEX
        \</button>


        \<aside id="index-panel">

            \<div class="index-header">

                \<span>
                    INDEX
                \</span>

                \<button id="close-index">
                    CLOSE
                \</button>

            \</div>

            \<div id="index-list">\</div>

        \</aside>


        \<div id="map-container">\</div>

    \</section>


    \<script
        src="[https://unpkg.com/leaflet@1.9.4/dist/leaflet.js](https://unpkg.com/leaflet@1.9.4/dist/leaflet.js)"
    \>\</script>

    \<script src="script.js">\</script>

\</body>

\</html>
