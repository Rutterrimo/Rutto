/* =========================================================
   RUTTO — INTERACTIVE CAT
   ========================================================= */

(() => {

    "use strict";


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initCat() {

        const home =
            document.getElementById("home");


        if (!home) {
            return;
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
           MESSAGE
           ================================================= */

        const message =
            document.createElement("div");


        message.id =
            "rutto-message";


        /* =================================================
           ADD TO HOME
           ================================================= */

        home.appendChild(cat);

        home.appendChild(cigarette);

        home.appendChild(message);


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


        /*
         * Whether the cigarette is currently
         * in the cat's mouth.
         */

        let cigaretteInMouth =
            false;


        /*
         * Used to remember the cigarette's
         * exact position when it is picked up.
         */

        let cigaretteX = null;

        let cigaretteY = null;


        /* =================================================
           PIXEL DRAWING
           ================================================= */

        const S =
            4;


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


            /* =============================================
               BODY
               ============================================= */

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


            /* =============================================
               HEAD
               ============================================= */

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


            /* =============================================
               EARS
               ============================================= */

            pixel(11, 5, dark);

            pixel(12, 4, dark);

            pixel(17, 4, dark);

            pixel(18, 5, dark);


            /* =============================================
               EYES
               ============================================= */

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


            /* =============================================
               NOSE
               ============================================= */

            pixel(
                15,
                11,
                pink
            );


            /* =============================================
               LEGS
               ============================================= */

            pixel(
                10,
                22,
                fur
            );

            pixel(
                10,
                23,
                fur
            );


            pixel(
                14,
                22,
                fur
            );

            pixel(
                14,
                23,
                fur
            );


            pixel(
                18,
                22,
                fur
            );

            pixel(
                18,
                23,
                fur
            );


            /* =============================================
               TAIL
               ============================================= */

            pixel(7,19,fur);
            pixel(6,18,fur);
            pixel(5,18,fur);
            pixel(4,17,fur);
            pixel(4,16,fur);
            pixel(5,15,fur);


            /* =============================================
               ZZZ
               ============================================= */

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
           DISTANCE
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

            if (
                !cigaretteInMouth
            ) {
                return;
            }


            cigaretteInMouth =
                false;


            cigarette.classList.remove(
                "burning"
            );


            smoke.classList.remove(
                "smoking"
            );


            /*
             * The cigarette remains exactly
             * where it currently is.
             */

            drawCat(true);


            cat.classList.add(
                "cat-sleeping"
            );


            catState =
                "sleeping";

        }


        /* =================================================
           PUT CIGARETTE IN MOUTH
           ================================================= */

        function startSmoking() {

            if (
                catState === "fleeing"
            ) {
                return;
            }


            cigaretteInMouth =
                true;


            catState =
                "smoking";


            cigarette.classList.remove(
                "dragging"
            );


            cigarette.classList.add(
                "burning"
            );


            smoke.classList.add(
                "smoking"
            );


            /*
             * Put the EXISTING cigarette
             * next to the cat's mouth.
             */

            const homeRect =
                home.getBoundingClientRect();


            const catRect =
                cat.getBoundingClientRect();


            /*
             * Mouth is slightly to the
             * right of the cat's center.
             */

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


            drawCat(false);


            cat.classList.remove(
                "cat-sleeping"
            );

        }


        /* =================================================
           FLEE
           ================================================= */

        function flee() {

            if (
                catState === "fleeing"
            ) {
                return;
            }


            /*
             * If smoking, remove the cigarette
             * from the mouth before running.
             */

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


            cat.classList.add(
                "cat-fleeing"
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

                    cat.classList.remove(
                        "cat-fleeing"
                    );


                    cat.classList.add(
                        "cat-sleeping"
                    );


                    catState =
                        "sleeping";


                    drawCat(true);

                }, 650);

            }, 900);

        }


        /* =================================================
           CAT INTERACTION
           ================================================= */

        cat.addEventListener(
            "pointerdown",
            event => {

                event.preventDefault();

                event.stopPropagation();


                /*
                 * If the user touches the cat,
                 * it runs away.
                 */

                flee();

            }
        );


        /* =================================================
           CIGARETTE PICK UP
           ================================================= */

        cigarette.addEventListener(
            "pointerdown",
            event => {

                event.preventDefault();

                event.stopPropagation();


                /*
                 * If the cigarette was in the mouth,
                 * picking it up immediately stops smoking.
                 */

                if (
                    cigaretteInMouth
                ) {

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
           CIGARETTE MOVE
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
                    19;


                const y =
                    event.clientY -
                    homeRect.top -
                    4;


                cigarette.style.left =
                    `${x}px`;


                cigarette.style.top =
                    `${y}px`;


                cigarette.style.transform =
                    "rotate(-12deg)";

            }
        );


        /* =================================================
           CIGARETTE RELEASE
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
             * ONLY NOW, after releasing,
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


        /* =================================================
           PREVENT NATIVE DRAG
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


        /* =================================================
           SMALL WAKE-UP
           ================================================= */

        setTimeout(() => {

            if (
                catState !==
                "sleeping"
            ) {
                return;
            }


            cat.classList.remove(
                "cat-sleeping"
            );


            drawCat(false);


            setTimeout(() => {

                if (
                    catState !==
                    "sleeping"
                ) {
                    return;
                }


                cat.classList.add(
                    "cat-sleeping"
                );


                drawCat(true);

            }, 850);

        }, 600);

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
