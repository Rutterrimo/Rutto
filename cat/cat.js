/* =========================================================
   RUTTO — INTERACTIVE CAT
   ========================================================= */

(() => {

    "use strict";


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initCat() {

        const home = document.getElementById("home");

        if (!home) {
            return;
        }


        /* =================================================
           IMPORTANT:
           REMOVE ANY OLD CAT ELEMENTS
           ================================================= */

        const oldCat =
            document.getElementById("rutto-cat");

        const oldCigarette =
            document.getElementById("rutto-cigarette");

        const oldMessage =
            document.getElementById("rutto-message");


        if (oldCat) {
            oldCat.remove();
        }

        if (oldCigarette) {
            oldCigarette.remove();
        }

        if (oldMessage) {
            oldMessage.remove();
        }


        /* =================================================
           CREATE CAT
           ================================================= */

        const cat =
            document.createElement("div");

        cat.id =
            "rutto-cat";


        cat.innerHTML = `

            <canvas
                id="rutto-cat-canvas"
                width="128"
                height="128"
            ></canvas>

            <div id="rutto-smoke">

                <span></span>
                <span></span>
                <span></span>

            </div>

        `;


        /* =================================================
           CREATE ONE SINGLE CIGARETTE
           ================================================= */

        const cigarette =
            document.createElement("div");


        cigarette.id =
            "rutto-cigarette";


        cigarette.innerHTML = `

            <div class="cig-paper"></div>

            <div class="cig-filter"></div>

            <div class="cig-ember"></div>

        `;


        /* =================================================
           ADD ELEMENTS
           ================================================= */

        home.appendChild(cat);

        home.appendChild(cigarette);


        /* =================================================
           ELEMENTS
           ================================================= */

        const canvas =
            document.getElementById(
                "rutto-cat-canvas"
            );


        const smoke =
            document.getElementById(
                "rutto-smoke"
            );


        const ctx =
            canvas.getContext("2d");


        ctx.imageSmoothingEnabled =
            false;


        /* =================================================
           STATE
           ================================================= */

        let catState =
            "sleeping";


        let dragging =
            false;


        let activePointerId =
            null;


        let cigaretteInMouth =
            false;


        /* =================================================
           PIXEL DRAWING
           ================================================= */

        const S = 4;


        function pixel(
            x,
            y,
            color
        ) {

            ctx.fillStyle =
                color;

            ctx.fillRect(
                x * S,
                y * S,
                S,
                S
            );

        }


        /* =================================================
           DRAW CAT
           ================================================= */

        function drawCat(
            sleeping
        ) {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            const fur =
                "#171717";

            const dark =
                "#0a0a0a";

            const background =
                "#e8e6df";

            const pink =
                "#9d5c58";


            /* BODY */

            const body = [

                [8,17],
                [9,16],
                [10,15],
                [11,14],
                [12,14],
                [13,14],
                [14,14],
                [15,14],
                [16,14],
                [17,15],
                [18,15],
                [19,16],
                [20,17],
                [21,18],
                [21,19],
                [20,20],
                [19,21],
                [18,22],
                [17,23],
                [16,23],
                [15,23],
                [14,22],
                [13,22],
                [12,23],
                [11,23],
                [10,22],
                [9,22],
                [8,21],
                [8,20]

            ];


            body.forEach(
                ([x, y]) => {

                    pixel(
                        x,
                        y,
                        fur
                    );

                }
            );


            /* HEAD */

            const head = [

                [10,7],
                [10,6],
                [11,5],
                [12,4],
                [13,5],
                [14,6],

                [15,6],
                [16,5],
                [17,4],
                [18,5],
                [19,6],
                [20,7],

                [21,8],
                [22,9],
                [22,10],
                [22,11],
                [21,12],
                [20,13],
                [19,14],
                [18,14],
                [17,15],
                [16,15],
                [15,14],
                [14,14],
                [13,13],
                [12,13],
                [11,12],
                [10,11]

            ];


            head.forEach(
                ([x, y]) => {

                    pixel(
                        x,
                        y,
                        fur
                    );

                }
            );


            /* EARS */

            pixel(11, 5, dark);
            pixel(12, 4, dark);

            pixel(17, 4, dark);
            pixel(18, 5, dark);


            /* EYES */

            if (sleeping) {

                pixel(
                    12,
                    9,
                    background
                );

                pixel(
                    13,
                    9,
                    background
                );

                pixel(
                    17,
                    9,
                    background
                );

                pixel(
                    18,
                    9,
                    background
                );

            } else {

                pixel(
                    12,
                    9,
                    background
                );

                pixel(
                    13,
                    9,
                    background
                );

                pixel(
                    17,
                    9,
                    background
                );

                pixel(
                    18,
                    9,
                    background
                );

                pixel(
                    13,
                    9,
                    dark
                );

                pixel(
                    18,
                    9,
                    dark
                );

            }


            /* NOSE */

            pixel(
                15,
                11,
                pink
            );


            /* LEGS */

            pixel(10,22,fur);
            pixel(10,23,fur);

            pixel(14,22,fur);
            pixel(14,23,fur);

            pixel(18,22,fur);
            pixel(18,23,fur);


            /* TAIL */

            pixel(7,19,fur);
            pixel(6,18,fur);
            pixel(5,18,fur);
            pixel(4,17,fur);
            pixel(4,16,fur);
            pixel(5,15,fur);


            /* ZZZ */

            if (sleeping) {

                pixel(23,6,fur);
                pixel(24,6,fur);

                pixel(23,7,fur);

                pixel(22,8,fur);

                pixel(23,8,fur);
                pixel(24,8,fur);

            }

        }


        /* =================================================
           CAT CENTER
           ================================================= */

        function getCatCenter() {

            const rect =
                cat.getBoundingClientRect();


            return {

                x:
                    rect.left +
                    rect.width / 2,

                y:
                    rect.top +
                    rect.height / 2

            };

        }


        /* =================================================
           CIGARETTE CENTER
           ================================================= */

        function getCigaretteCenter() {

            const rect =
                cigarette.getBoundingClientRect();


            return {

                x:
                    rect.left +
                    rect.width / 2,

                y:
                    rect.top +
                    rect.height / 2

            };

        }


        /* =================================================
           CHECK DISTANCE
           ================================================= */

        function cigaretteNearCat() {

            const catPosition =
                getCatCenter();


            const cigarettePosition =
                getCigaretteCenter();


            const dx =
                catPosition.x -
                cigarettePosition.x;


            const dy =
                catPosition.y -
                cigarettePosition.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            return distance < 100;

        }


        /* =================================================
           STOP SMOKING
           ================================================= */

        function stopSmoking() {

            cigaretteInMouth =
                false;


            cigarette.classList.remove(
                "burning"
            );


            smoke.classList.remove(
                "smoking"
            );


            catState =
                "sleeping";


            cat.classList.add(
                "cat-sleeping"
            );


            drawCat(true);

        }


        /* =================================================
           START SMOKING
           ================================================= */

        function startSmoking() {

            if (
                catState ===
                "fleeing"
            ) {
                return;
            }


            cigaretteInMouth =
                true;


            catState =
                "smoking";


            cigarette.classList.add(
                "burning"
            );


            smoke.classList.add(
                "smoking"
            );


            cat.classList.remove(
                "cat-sleeping"
            );


            drawCat(false);


            /* =============================================
               MOVE THE SAME CIGARETTE
               ============================================= */

            const homeRect =
                home.getBoundingClientRect();


            const catRect =
                cat.getBoundingClientRect();


            const mouthX =
                catRect.left -
                homeRect.left +
                catRect.width * 0.72;


            const mouthY =
                catRect.top -
                homeRect.top +
                catRect.height * 0.47;


            cigarette.style.left =
                `${mouthX}px`;


            cigarette.style.top =
                `${mouthY}px`;


            cigarette.style.transform =
                "rotate(-12deg)";

        }


        /* =================================================
           CAT RUNS AWAY
           ================================================= */

        function flee() {

            if (
                catState ===
                "fleeing"
            ) {
                return;
            }


            if (
                cigaretteInMouth
            ) {

                stopSmoking();

            }


            catState =
                "fleeing";


            cat.classList.remove(
                "cat-sleeping"
            );


            drawCat(false);


            const direction =
                Math.random() > 0.5
                    ? 1
                    : -1;


            cat.style.transition =
                "transform 0.5s cubic-bezier(.2,.8,.2,1)";


            cat.style.transform =
                `translate(
                    calc(-50% + ${direction * 170}px),
                    -50%
                )`;


            setTimeout(() => {

                cat.style.transform =
                    "translate(-50%, -50%)";


                setTimeout(() => {

                    catState =
                        "sleeping";


                    cat.classList.add(
                        "cat-sleeping"
                    );


                    drawCat(true);

                }, 650);

            }, 900);

        }


        /* =================================================
           CAT TOUCH
           ================================================= */

        cat.addEventListener(
            "pointerdown",
            event => {

                event.preventDefault();

                event.stopPropagation();

                flee();

            }
        );


        /* =================================================
           PICK UP CIGARETTE
           ================================================= */

        cigarette.addEventListener(
            "pointerdown",
            event => {

                event.preventDefault();

                event.stopPropagation();


                /*
                 * If it is currently in the cat's mouth,
                 * immediately stop smoking.
                 */

                if (
                    cigaretteInMouth
                ) {

                    stopSmoking();

                }


                dragging =
                    true;


                activePointerId =
                    event.pointerId;


                cigarette.classList.add(
                    "dragging"
                );


                cigarette.setPointerCapture(
                    event.pointerId
                );

            }
        );


        /* =================================================
           DRAG CIGARETTE
           ================================================= */

        cigarette.addEventListener(
            "pointermove",
            event => {

                if (
                    !dragging
                ) {
                    return;
                }


                if (
                    event.pointerId !==
                    activePointerId
                ) {
                    return;
                }


                event.preventDefault();


                const homeRect =
                    home.getBoundingClientRect();


                const x =
                    event.clientX -
                    homeRect.left -
                    cigarette.offsetWidth / 2;


                const y =
                    event.clientY -
                    homeRect.top -
                    cigarette.offsetHeight / 2;


                cigarette.style.left =
                    `${x}px`;


                cigarette.style.top =
                    `${y}px`;


                cigarette.style.transform =
                    "rotate(-12deg)";

            }
        );


        /* =================================================
           RELEASE CIGARETTE
           ================================================= */

        function releaseCigarette(
            event
        ) {

            if (
                !dragging
            ) {
                return;
            }


            if (
                event.pointerId !==
                activePointerId
            ) {
                return;
            }


            dragging =
                false;


            activePointerId =
                null;


            cigarette.classList.remove(
                "dragging"
            );


            /*
             * Only after RELEASE:
             * check whether it is near the cat.
             */

            if (
                cigaretteNearCat()
            ) {

                startSmoking();

            }

        }


        cigarette.addEventListener(
            "pointerup",
            releaseCigarette
        );


        cigarette.addEventListener(
            "pointercancel",
            releaseCigarette
        );


        cigarette.addEventListener(
            "lostpointercapture",
            event => {

                if (
                    dragging &&
                    activePointerId ===
                    event.pointerId
                ) {

                    dragging =
                        false;

                    activePointerId =
                        null;

                    cigarette.classList.remove(
                        "dragging"
                    );

                }

            }
        );


        /* =================================================
           PREVENT BROWSER DRAGGING
           ================================================= */

        cigarette.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );


        /* =================================================
           INITIAL STATE
           ================================================= */

        drawCat(true);


        cat.classList.add(
            "cat-sleeping"
        );

    }


    /* =====================================================
       START
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initCat
        );

    } else {

        initCat();

    }

})();
