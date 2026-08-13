/* =========================================================
   RUTTO — INTERACTIVE PIXEL CAT
   ========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const cat = document.getElementById("rutto-cat");

    const canvas = document.getElementById("rutto-cat-canvas");

    const cigarette = document.getElementById("rutto-cigarette");

    const smoke = document.getElementById("rutto-smoke");

    const message = document.getElementById("rutto-message");


    if (!cat || !canvas || !cigarette) {
        return;
    }


    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;


    /* =====================================================
       STATE
       ===================================================== */

    let catState = "sleeping";

    let cigaretteDragging = false;

    let cigaretteHeld = false;

    let cigarettePointerId = null;

    let fleeTimer = null;

    let returnTimer = null;

    let messageTimer = null;


    /* =====================================================
       PIXEL DRAWING
       ===================================================== */

    const SCALE = 4;


    function pixel(x, y, color) {

        ctx.fillStyle = color;

        ctx.fillRect(
            x * SCALE,
            y * SCALE,
            SCALE,
            SCALE
        );

    }


    function clearCanvas() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }


    /* =====================================================
       DRAW CAT
       ===================================================== */

    function drawCat(options = {}) {

        const sleeping =
            options.sleeping === true;

        const smoking =
            options.smoking === true;

        clearCanvas();


        /*
         * Pixel cat palette
         */

        const fur = "#171717";

        const dark = "#0b0b0b";

        const light = "#e8e6df";

        const nose = "#8d4c45";


        /*
         * BODY
         */

        pixel(8, 17, fur);
        pixel(9, 16, fur);
        pixel(10, 15, fur);
        pixel(11, 15, fur);

        pixel(12, 14, fur);
        pixel(13, 14, fur);
        pixel(14, 14, fur);
        pixel(15, 14, fur);

        pixel(16, 14, fur);
        pixel(17, 15, fur);
        pixel(18, 15, fur);

        pixel(19, 16, fur);
        pixel(20, 17, fur);

        pixel(21, 18, fur);
        pixel(21, 19, fur);

        pixel(20, 20, fur);
        pixel(19, 21, fur);

        pixel(18, 22, fur);
        pixel(17, 23, fur);

        pixel(16, 23, fur);
        pixel(15, 23, fur);

        pixel(14, 22, fur);
        pixel(13, 22, fur);

        pixel(12, 23, fur);
        pixel(11, 23, fur);

        pixel(10, 22, fur);
        pixel(9, 22, fur);

        pixel(8, 21, fur);
        pixel(8, 20, fur);


        /*
         * HEAD
         */

        pixel(9, 7, fur);
        pixel(10, 6, fur);

        pixel(11, 5, fur);
        pixel(12, 4, fur);

        pixel(13, 5, fur);
        pixel(14, 6, fur);

        pixel(15, 6, fur);
        pixel(16, 5, fur);

        pixel(17, 4, fur);
        pixel(18, 5, fur);

        pixel(19, 6, fur);
        pixel(20, 7, fur);

        pixel(21, 8, fur);
        pixel(21, 9, fur);

        pixel(22, 10, fur);
        pixel(22, 11, fur);

        pixel(21, 12, fur);
        pixel(20, 13, fur);

        pixel(19, 14, fur);
        pixel(18, 14, fur);

        pixel(17, 15, fur);
        pixel(16, 15, fur);

        pixel(15, 14, fur);
        pixel(14, 14, fur);

        pixel(13, 13, fur);
        pixel(12, 13, fur);

        pixel(11, 12, fur);
        pixel(10, 11, fur);


        /*
         * EARS
         */

        pixel(10, 6, dark);
        pixel(11, 5, dark);
        pixel(12, 4, dark);

        pixel(17, 4, dark);
        pixel(18, 5, dark);
        pixel(19, 6, dark);


        /*
         * FACE
         */

        if (sleeping) {

            /*
             * Closed eyes
             */

            pixel(12, 9, light);
            pixel(13, 9, light);

            pixel(17, 9, light);
            pixel(18, 9, light);

        } else {

            /*
             * Open eyes
             */

            pixel(12, 9, light);
            pixel(13, 9, light);

            pixel(17, 9, light);
            pixel(18, 9, light);

            pixel(13, 9, dark);
            pixel(18, 9, dark);

        }


        /*
         * NOSE
         */

        pixel(15, 11, nose);


        /*
         * LEGS
         */

        pixel(10, 22, fur);
        pixel(10, 23, fur);

        pixel(14, 22, fur);
        pixel(14, 23, fur);

        pixel(18, 22, fur);
        pixel(18, 23, fur);


        /*
         * TAIL
         */

        pixel(7, 19, fur);
        pixel(6, 18, fur);
        pixel(5, 18, fur);
        pixel(4, 17, fur);

        pixel(4, 16, fur);
        pixel(5, 15, fur);


        /*
         * LITTLE SLEEP Z
         */

        if (sleeping) {

            pixel(22, 6, fur);
            pixel(23, 6, fur);
            pixel(22, 7, fur);
            pixel(21, 8, fur);
            pixel(22, 8, fur);
            pixel(23, 8, fur);

        }


        /*
         * CIGARETTE IN MOUTH
         */

        if (smoking) {

            ctx.fillStyle = "#f1eee5";

            ctx.fillRect(
                21 * SCALE,
                11 * SCALE,
                6 * SCALE,
                2 * SCALE
            );

            ctx.fillStyle = "#b43a26";

            ctx.fillRect(
                27 * SCALE,
                11 * SCALE,
                2 * SCALE,
                2 * SCALE
            );

        }

    }


    /* =====================================================
       INITIAL CAT
       ===================================================== */

    drawCat({
        sleeping: true,
        smoking: false
    });

    cat.classList.add("cat-sleeping");


    /* =====================================================
       MESSAGE
       ===================================================== */

    function showMessage(text, duration = 1000) {

        if (!message) {
            return;
        }

        clearTimeout(messageTimer);

        message.textContent = text;

        message.classList.add("visible");

        messageTimer = setTimeout(() => {

            message.classList.remove("visible");

        }, duration);

    }


    /* =====================================================
       CAT POSITION
       ===================================================== */

    function getCatRect() {

        return cat.getBoundingClientRect();

    }


    /* =====================================================
       CIGARETTE POSITION
       ===================================================== */

    function getCigaretteRect() {

        return cigarette.getBoundingClientRect();

    }


    /* =====================================================
       DISTANCE BETWEEN CAT AND CIGARETTE
       ===================================================== */

    function cigaretteIsNearCat() {

        const catRect = getCatRect();

        const cigRect = getCigaretteRect();


        const catX =
            catRect.left +
            catRect.width / 2;

        const catY =
            catRect.top +
            catRect.height / 2;


        const cigX =
            cigRect.left +
            cigRect.width / 2;

        const cigY =
            cigRect.top +
            cigRect.height / 2;


        const dx = catX - cigX;

        const dy = catY - cigY;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        return distance < 100;

    }


    /* =====================================================
       SMOKING
       ===================================================== */

    function startSmoking() {

        if (cigaretteHeld) {
            return;
        }


        if (catState === "fleeing") {
            return;
        }


        cigaretteHeld = true;

        catState = "smoking";


        cigarette.classList.add("burning");

        smoke.classList.add("smoking");

        cat.classList.remove("cat-sleeping");

        drawCat({
            sleeping: false,
            smoking: true
        });


        showMessage(
            "..."
        );

    }


    /* =====================================================
       STOP SMOKING
       ===================================================== */

    function stopSmoking() {

        if (!cigaretteHeld) {
            return;
        }


        cigaretteHeld = false;

        cigarette.classList.remove("burning");

        smoke.classList.remove("smoking");


        if (catState !== "fleeing") {

            catState = "sleeping";

            cat.classList.remove("cat-waking");

            cat.classList.add("cat-sleeping");

            drawCat({
                sleeping: true,
                smoking: false
            });

        } else {

            drawCat({
                sleeping: false,
                smoking: false
            });

        }

    }


    /* =====================================================
       RETURN CIGARETTE TO NORMAL POSITION
       ===================================================== */

    function resetCigarette() {

        cigarette.style.left = "";

        cigarette.style.top = "";

        cigarette.style.transform = "rotate(-12deg)";

    }


    /* =====================================================
       CAT FLEES
       ===================================================== */

    function flee() {

        if (catState === "fleeing") {
            return;
        }


        stopSmoking();


        catState = "fleeing";


        cat.classList.remove("cat-sleeping");

        cat.classList.add("cat-fleeing");


        drawCat({
            sleeping: false,
            smoking: false
        });


        /*
         * Move the cat away from its normal position.
         */

        const direction =
            Math.random() > 0.5
                ? 1
                : -1;


        cat.style.transition =
            "transform 0.45s cubic-bezier(.2,.8,.2,1)";


        cat.style.transform =
            `translate(
                calc(-50% + ${direction * 180}px),
                -50%
            )`;


        showMessage(
            "HEY!",
            700
        );


        clearTimeout(fleeTimer);

        fleeTimer = setTimeout(() => {

            cat.style.transition =
                "transform 0.7s cubic-bezier(.2,.8,.2,1)";

            cat.style.transform =
                "translate(-50%, -50%)";


            clearTimeout(returnTimer);

            returnTimer = setTimeout(() => {

                cat.classList.remove("cat-fleeing");

                cat.classList.add("cat-sleeping");

                catState = "sleeping";


                drawCat({
                    sleeping: true,
                    smoking: false
                });


            }, 750);

        }, 1200);

    }


    /* =====================================================
       CAT CLICK / TOUCH
       ===================================================== */

    cat.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            event.stopPropagation();


            /*
             * A smoking cat also runs away.
             */

            flee();

        }
    );


    /* =====================================================
       CIGARETTE DRAG START
       ===================================================== */

    cigarette.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            event.stopPropagation();


            cigaretteDragging = true;

            cigarettePointerId = event.pointerId;


            cigarette.classList.add("dragging");


            cigarette.setPointerCapture(
                event.pointerId
            );

        }
    );


    /* =====================================================
       CIGARETTE DRAG MOVE
       ===================================================== */

    cigarette.addEventListener(
        "pointermove",
        event => {

            if (
                !cigaretteDragging ||
                event.pointerId !== cigarettePointerId
            ) {
                return;
            }


            event.preventDefault();


            /*
             * Position relative to the intro.
             */

            const intro =
                document.getElementById("home");


            const introRect =
                intro.getBoundingClientRect();


            const x =
                event.clientX -
                introRect.left -
                22;


            const y =
                event.clientY -
                introRect.top -
                5;


            cigarette.style.left =
                `${x}px`;

            cigarette.style.top =
                `${y}px`;

            cigarette.style.transform =
                "rotate(-12deg)";


            /*
             * The moment the cigarette gets close,
             * the cat takes it.
             */

            if (
                !cigaretteHeld &&
                cigaretteIsNearCat()
            ) {

                startSmoking();

            }

        }
    );


    /* =====================================================
       CIGARETTE DRAG END
       ===================================================== */

    function endCigaretteDrag(event) {

        if (
            !cigaretteDragging ||
            (
                cigarettePointerId !== null &&
                event.pointerId !== cigarettePointerId
            )
        ) {
            return;
        }


        cigaretteDragging = false;

        cigarettePointerId = null;


        cigarette.classList.remove("dragging");


        /*
         * If the cigarette is close enough when released,
         * the cat keeps smoking.
         */

        if (
            cigaretteIsNearCat() &&
            catState !== "fleeing"
        ) {

            startSmoking();

            /*
             * Put cigarette visually near mouth.
             */

            cigarette.style.left = "calc(72% + 35px)";

            cigarette.style.top = "calc(64% + 7px)";

            cigarette.style.transform =
                "rotate(-12deg)";


        } else {

            /*
             * If it was already being smoked and the user
             * dragged it away, smoking stops.
             */

            if (cigaretteHeld) {
                stopSmoking();
            }

        }

    }


    cigarette.addEventListener(
        "pointerup",
        endCigaretteDrag
    );


    cigarette.addEventListener(
        "pointercancel",
        endCigaretteDrag
    );


    /* =====================================================
       PREVENT NATIVE DRAG
       ===================================================== */

    cigarette.addEventListener(
        "dragstart",
        event => {

            event.preventDefault();

        }
    );


    /* =====================================================
       KEEP CAT / CIGARETTE INSIDE HOME
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            /*
             * Don't modify anything while the user is
             * actively dragging the cigarette.
             */

            if (!cigaretteDragging) {

                if (!cigaretteHeld) {

                    resetCigarette();

                }

            }

        }
    );


    /* =====================================================
       FIRST ARRIVAL
       ===================================================== */

    setTimeout(() => {

        if (catState !== "sleeping") {
            return;
        }


        cat.classList.remove("cat-sleeping");

        cat.classList.add("cat-waking");


        drawCat({
            sleeping: false,
            smoking: false
        });


        setTimeout(() => {

            if (catState !== "sleeping") {
                return;
            }


            cat.classList.remove("cat-waking");

            cat.classList.add("cat-sleeping");


            drawCat({
                sleeping: true,
                smoking: false
            });

        }, 900);

    }, 700);


})();
