/* =========================================================
   RUTTO — INTERACTIVE CAT
   cat.js
   ========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const cat =
        document.getElementById("rutto-cat");

    const canvas =
        document.getElementById("rutto-cat-canvas");

    const cigarette =
        document.getElementById("rutto-cigarette");

    const smoke =
        document.getElementById("rutto-smoke");

    const message =
        document.getElementById("rutto-message");


    if (
        !cat ||
        !canvas ||
        !cigarette ||
        !smoke ||
        !message
    ) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    /* =====================================================
       CONFIGURATION
       ===================================================== */

    const CAT_SIZE = 32;

    const CAT_SCREEN_MARGIN = 55;

    const ESCAPE_DISTANCE = 120;

    const CIGARETTE_CATCH_DISTANCE = 105;

    const SLEEP_AFTER_GREETING = 6000;

    const SLEEP_AFTER_ESCAPE = 2800;

    const SLEEP_AFTER_CIGARETTE = 1300;


    /* =====================================================
       STATE
       ===================================================== */

    let state = "greeting";

    let smoking = false;

    let draggingCigarette = false;

    let sleepTimer = null;

    let messageTimer = null;

    let animationFrame = null;

    let catX = 0;

    let catY = 0;

    let cigaretteHome = {
        left: 0,
        top: 0
    };


    /* =====================================================
       COLORS
       ===================================================== */

    const COLORS = {

        dark: "#242424",

        fur: "#a66d4d",

        furLight: "#b97955",

        pink: "#d4777d",

        white: "#f5f1e8"

    };


    /* =====================================================
       PIXEL DRAWING
       ===================================================== */

    function pixel(
        x,
        y,
        color
    ) {

        ctx.fillStyle = color;

        ctx.fillRect(
            x,
            y,
            1,
            1
        );

    }


    /* =====================================================
       DRAW CAT
       ===================================================== */

    function drawCat(
        pose = "idle"
    ) {

        ctx.clearRect(
            0,
            0,
            CAT_SIZE,
            CAT_SIZE
        );


        /*
         * BODY
         */

        for (
            let x = 9;
            x < 24;
            x++
        ) {

            for (
                let y = 15;
                y < 25;
                y++
            ) {

                pixel(
                    x,
                    y,
                    COLORS.furLight
                );

            }

        }


        /*
         * HEAD
         */

        for (
            let x = 8;
            x < 24;
            x++
        ) {

            for (
                let y = 7;
                y < 18;
                y++
            ) {

                pixel(
                    x,
                    y,
                    COLORS.furLight
                );

            }

        }


        /*
         * EARS
         */

        pixel(8, 7, COLORS.dark);
        pixel(9, 6, COLORS.dark);
        pixel(10, 7, COLORS.dark);

        pixel(22, 7, COLORS.dark);
        pixel(23, 6, COLORS.dark);
        pixel(24, 7, COLORS.dark);

        pixel(9, 7, COLORS.pink);
        pixel(23, 7, COLORS.pink);


        /*
         * EYES
         */

        if (
            pose === "sleeping"
        ) {

            pixel(11, 12, COLORS.dark);
            pixel(12, 12, COLORS.dark);

            pixel(19, 12, COLORS.dark);
            pixel(20, 12, COLORS.dark);

        }

        else if (
            pose === "angry"
        ) {

            pixel(11, 11, COLORS.dark);
            pixel(12, 12, COLORS.dark);

            pixel(19, 12, COLORS.dark);
            pixel(20, 11, COLORS.dark);

        }

        else {

            pixel(11, 11, COLORS.dark);
            pixel(12, 11, COLORS.dark);

            pixel(19, 11, COLORS.dark);
            pixel(20, 11, COLORS.dark);

            pixel(12, 12, COLORS.white);
            pixel(20, 12, COLORS.white);

        }


        /*
         * NOSE
         */

        pixel(
            15,
            14,
            COLORS.pink
        );

        pixel(
            16,
            14,
            COLORS.pink
        );


        /*
         * MOUTH
         */

        pixel(
            15,
            15,
            COLORS.dark
        );

        pixel(
            16,
            15,
            COLORS.dark
        );


        /*
         * FEET
         */

        pixel(
            10,
            24,
            COLORS.dark
        );

        pixel(
            11,
            24,
            COLORS.dark
        );

        pixel(
            20,
            24,
            COLORS.dark
        );

        pixel(
            21,
            24,
            COLORS.dark
        );


        /*
         * TAIL
         */

        pixel(
            23,
            20,
            COLORS.dark
        );

        pixel(
            24,
            19,
            COLORS.dark
        );

        pixel(
            25,
            18,
            COLORS.dark
        );

        pixel(
            25,
            17,
            COLORS.dark
        );


        /*
         * CIGARETTE IN MOUTH
         */

        if (
            pose === "smoking"
        ) {

            pixel(16, 18, COLORS.dark);
            pixel(17, 18, COLORS.dark);
            pixel(18, 18, COLORS.dark);
            pixel(19, 18, COLORS.dark);
            pixel(20, 18, COLORS.dark);

            pixel(
                21,
                18,
                "#d85b3d"
            );

        }

    }


    /* =====================================================
       POSITION CAT
       ===================================================== */

    function positionCat(
        x,
        y
    ) {

        catX = x;
        catY = y;

        cat.style.left =
            `${x}px`;

        cat.style.top =
            `${y}px`;

    }


    /* =====================================================
       CENTER CAT ON START
       ===================================================== */

    function centerCat() {

        positionCat(

            window.innerWidth / 2,

            window.innerHeight * 0.57

        );

    }


    /* =====================================================
       MESSAGE
       ===================================================== */

    function say(
        text,
        duration = 1000
    ) {

        clearTimeout(
            messageTimer
        );

        message.textContent =
            text;

        message.style.opacity =
            "1";

        messageTimer =
        setTimeout(() => {

            message.style.opacity =
                "0";

        }, duration);

    }


    /* =====================================================
       CLEAR SLEEP TIMER
       ===================================================== */

    function clearSleepTimer() {

        clearTimeout(
            sleepTimer
        );

    }


    /* =====================================================
       SLEEP
       ===================================================== */

    function sleep() {

        if (smoking) {
            return;
        }

        clearSleepTimer();

        state =
            "sleeping";

        drawCat(
            "sleeping"
        );

    }


    /* =====================================================
       WAKE
       ===================================================== */

    function wake() {

        clearSleepTimer();

        state =
            "idle";

        drawCat(
            "idle"
        );

    }


    /* =====================================================
       RANDOM ESCAPE TARGET
       ===================================================== */

    function getEscapeTarget() {

        const minX =
            CAT_SCREEN_MARGIN;

        const maxX =
            window.innerWidth -
            CAT_SCREEN_MARGIN;

        const minY =
            130;

        const maxY =
            window.innerHeight -
            100;


        let x =
            minX +
            Math.random() *
            (maxX - minX);


        let y =
            minY +
            Math.random() *
            (maxY - minY);


        /*
         * Make sure the cat actually moves
         * a reasonable distance.
         */

        let attempts = 0;

        while (
            Math.hypot(
                x - catX,
                y - catY
            ) < ESCAPE_DISTANCE &&
            attempts < 20
        ) {

            x =
                minX +
                Math.random() *
                (maxX - minX);

            y =
                minY +
                Math.random() *
                (maxY - minY);

            attempts++;

        }


        return {
            x,
            y
        };

    }


    /* =====================================================
       CAT RUNS AWAY
       ===================================================== */

    function runAway() {

        if (smoking) {
            return;
        }


        clearSleepTimer();

        state =
            "running";


        drawCat(
            "angry"
        );


        say(
            "hey!",
            650
        );


        const target =
            getEscapeTarget();


        const startX =
            catX;

        const startY =
            catY;


        const distance =
            Math.hypot(

                target.x -
                startX,

                target.y -
                startY

            );


        const duration =
            Math.max(
                350,
                Math.min(
                    950,
                    distance * 2
                )
            );


        const startTime =
            performance.now();


        function animate(
            now
        ) {

            const elapsed =
                now -
                startTime;


            const progress =
                Math.min(
                    1,
                    elapsed /
                    duration
                );


            /*
             * Ease out.
             */

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            positionCat(

                startX +
                (
                    target.x -
                    startX
                ) *
                eased,

                startY +
                (
                    target.y -
                    startY
                ) *
                eased

            );


            /*
             * Tiny running wobble.
             */

            const wobble =
                Math.sin(
                    progress * Math.PI * 10
                ) * 4;


            cat.style.transform =
                `translate(-50%, -50%)
                 rotate(${wobble}deg)`;


            if (
                progress < 1
            ) {

                animationFrame =
                    requestAnimationFrame(
                        animate
                    );

            }

            else {

                cat.style.transform =
                    "translate(-50%, -50%)";


                state =
                    "idle";


                sleepTimer =
                setTimeout(
                    sleep,
                    SLEEP_AFTER_ESCAPE
                );

            }

        }


        animationFrame =
        requestAnimationFrame(
            animate
        );

    }


    /* =====================================================
       CAT TOUCH
       ===================================================== */

    cat.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            event.stopPropagation();


            /*
             * If smoking, the cat doesn't run.
             * You have to take the cigarette.
             */

            if (smoking) {

                say(
                    "leave me alone.",
                    900
                );

                return;

            }


            runAway();

        }
    );


    /* =====================================================
       CIGARETTE HOME POSITION
       ===================================================== */

    function rememberCigarettePosition() {

        const rect =
            cigarette.getBoundingClientRect();


        cigaretteHome.left =
            rect.left;

        cigaretteHome.top =
            rect.top;

    }


    /* =====================================================
       CIGARETTE CENTER
       ===================================================== */

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


    /* =====================================================
       DISTANCE TO CAT
       ===================================================== */

    function cigaretteDistanceToCat() {

        const cigaretteCenter =
            getCigaretteCenter();


        return Math.hypot(

            cigaretteCenter.x -
            catX,

            cigaretteCenter.y -
            catY

        );

    }


    /* =====================================================
       PUT CIGARETTE BACK
       ===================================================== */

    function returnCigaretteHome() {

        cigarette.style.left =
            `${cigaretteHome.left}px`;

        cigarette.style.top =
            `${cigaretteHome.top}px`;

        cigarette.style.right =
            "auto";

        cigarette.style.bottom =
            "auto";

        cigarette.style.transform =
            "none";

    }


    /* =====================================================
       START SMOKING
       ===================================================== */

    function startSmoking() {

        if (smoking) {
            return;
        }


        clearSleepTimer();


        smoking =
            true;


        state =
            "smoking";


        drawCat(
            "smoking"
        );


        say(
            "thanks.",
            900
        );


        /*
         * Place cigarette in the cat's mouth.
         */

        cigarette.style.left =
            `${catX + 14}px`;

        cigarette.style.top =
            `${catY + 12}px`;

        cigarette.style.right =
            "auto";

        cigarette.style.bottom =
            "auto";

        cigarette.style.transform =
            "rotate(180deg)";


        positionSmoke();


        smoke.style.opacity =
            "1";

    }


    /* =====================================================
       STOP SMOKING
       ===================================================== */

    function stopSmoking() {

        if (!smoking) {
            return;
        }


        smoking =
            false;


        state =
            "idle";


        smoke.style.opacity =
            "0";


        drawCat(
            "idle"
        );


        say(
            "...",
            650
        );


        /*
         * The cigarette stays where
         * the user has taken it.
         */

        sleepTimer =
        setTimeout(
            sleep,
            SLEEP_AFTER_CIGARETTE
        );

    }


    /* =====================================================
       CIGARETTE POINTER DOWN
       ===================================================== */

    cigarette.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            event.stopPropagation();


            draggingCigarette =
                true;


            cigarette.setPointerCapture(
                event.pointerId
            );


            /*
             * Taking the cigarette from
             * the smoking cat immediately
             * stops the smoking state.
             */

            if (smoking) {

                stopSmoking();

            }

        }
    );


    /* =====================================================
       CIGARETTE POINTER MOVE
       ===================================================== */

    cigarette.addEventListener(
        "pointermove",
        event => {

            if (
                !draggingCigarette
            ) {
                return;
            }


            event.preventDefault();


            cigarette.style.left =
                `${event.clientX - 35}px`;

            cigarette.style.top =
                `${event.clientY - 10}px`;

            cigarette.style.right =
                "auto";

            cigarette.style.bottom =
                "auto";

            cigarette.style.transform =
                "none";


            /*
             * If the cigarette gets close enough
             * to the cat, highlight the possibility
             * of giving it.
             */

            if (
                !smoking &&
                cigaretteDistanceToCat()
                <
                CIGARETTE_CATCH_DISTANCE
            ) {

                cat.style.transform =
                    "translate(-50%, -50%) scale(1.04)";

            }

            else {

                cat.style.transform =
                    "translate(-50%, -50%)";

            }

        }
    );


    /* =====================================================
       CIGARETTE POINTER UP
       ===================================================== */

    cigarette.addEventListener(
        "pointerup",
        event => {

            if (
                !draggingCigarette
            ) {
                return;
            }


            draggingCigarette =
                false;


            try {

                cigarette.releasePointerCapture(
                    event.pointerId
                );

            }
            catch (
                error
            ) {
                /*
                 * Nothing to do.
                 */
            }


            cat.style.transform =
                "translate(-50%, -50%)";


            /*
             * If released close to the cat,
             * he takes the cigarette.
             */

            if (
                !smoking &&
                cigaretteDistanceToCat()
                <
                CIGARETTE_CATCH_DISTANCE
            ) {

                startSmoking();

            }

        }
    );


    /* =====================================================
       CIGARETTE POINTER CANCEL
       ===================================================== */

    cigarette.addEventListener(
        "pointercancel",
        event => {

            draggingCigarette =
                false;

            cat.style.transform =
                "translate(-50%, -50%)";

        }
    );


    /* =====================================================
       SMOKE POSITION
       ===================================================== */

    function positionSmoke() {

        smoke.style.left =
            `${catX + 9}px`;

        smoke.style.top =
            `${catY - 52}px`;

    }


    /* =====================================================
       SMOKE ANIMATION LOOP
       ===================================================== */

    function smokeLoop() {

        if (smoking) {

            positionSmoke();

        }


        requestAnimationFrame(
            smokeLoop
        );

    }


    /* =====================================================
       GREETING
       ===================================================== */

    function greeting() {

        state =
            "greeting";


        drawCat(
            "idle"
        );


        /*
         * Small wave.
         */

        let frame = 0;


        const wave =
        setInterval(
            () => {

                frame++;


                cat.style.transform =
                    `translate(-50%, -50%)
                     rotate(${frame % 2 ? -4 : 4}deg)`;


                if (
                    frame >= 8
                ) {

                    clearInterval(
                        wave
                    );


                    cat.style.transform =
                        "translate(-50%, -50%)";


                    state =
                        "idle";


                    say(
                        "hi.",
                        1100
                    );


                    sleepTimer =
                    setTimeout(
                        sleep,
                        SLEEP_AFTER_GREETING
                    );

                }

            },
            120
        );

    }


    /* =====================================================
       KEEP CAT INSIDE VIEWPORT
       ===================================================== */

    function keepCatInsideViewport() {

        const minX =
            CAT_SCREEN_MARGIN;

        const maxX =
            window.innerWidth -
            CAT_SCREEN_MARGIN;

        const minY =
            120;

        const maxY =
            window.innerHeight -
            90;


        catX =
            Math.max(
                minX,
                Math.min(
                    maxX,
                    catX
                )
            );


        catY =
            Math.max(
                minY,
                Math.min(
                    maxY,
                    catY
                )
            );


        positionCat(
            catX,
            catY
        );

    }


    /* =====================================================
       RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            keepCatInsideViewport();

            if (
                !smoking
            ) {

                rememberCigarettePosition();

            }

        }
    );


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    centerCat();

    rememberCigarettePosition();

    drawCat(
        "idle"
    );

    smokeLoop();

    /*
     * Small delay so the page has rendered first.
     */

    setTimeout(
        greeting,
        700
    );


})();
