/* =========================================================
   BL4CK FYR3 MAGYR0N
   PROJECT 7 — PHYSIOLOGICAL SIGNAL INTELLIGENCE
   INTERACTION / SIGNAL VISUALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PROJECT 7 BOOT
    ===================================================== */

    document.body.classList.add("project-ready");


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetID = link.getAttribute("href");

            if (!targetID || targetID === "#") return;

            const target = document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".stage-card, .research-copy, .foundation-content, " +
        ".research-flow, .future-system, .research-state"
    );

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       STAGE CARD INTERACTION
    ===================================================== */

    const stageCards = document.querySelectorAll(".stage-card");

    stageCards.forEach((card, index) => {

        card.addEventListener("mouseenter", () => {

            stageCards.forEach(other => {

                if (other !== card) {
                    other.classList.add("stage-dim");
                }

            });

            card.classList.add("stage-active");

        });


        card.addEventListener("mouseleave", () => {

            stageCards.forEach(other => {

                other.classList.remove("stage-dim");

            });

            card.classList.remove("stage-active");

        });


        /*
         * Small sequential delay.
         * This gives the seven stages a controlled
         * laboratory-system feel when they enter view.
         */

        card.style.transitionDelay =
            `${index * 45}ms`;

    });


    /* =====================================================
       LIVE SIGNAL VISUALIZATION
    ===================================================== */

    createSignalVisualization();


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll("[data-year]");

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach(element => {

        element.textContent = currentYear;

    });

});


/* =========================================================
   ECG-STYLE SIGNAL VISUALIZATION
========================================================= */

function createSignalVisualization() {

    const containers = document.querySelectorAll(
        ".signal-display, .ecg-display"
    );

    if (!containers.length) return;


    containers.forEach(container => {

        const canvas =
            document.createElement("canvas");

        canvas.className =
            "project7-signal-canvas";

        container.appendChild(canvas);

        const ctx =
            canvas.getContext("2d");

        let width = 0;
        let height = 0;

        let animationFrame;

        let signalOffset = 0;


        /* =================================================
           RESIZE
        ================================================= */

        function resizeCanvas() {

            const rect =
                container.getBoundingClientRect();

            const dpr =
                Math.min(window.devicePixelRatio || 1, 2);

            width = Math.max(rect.width, 300);
            height = Math.max(rect.height, 180);

            canvas.width =
                width * dpr;

            canvas.height =
                height * dpr;

            canvas.style.width =
                `${width}px`;

            canvas.style.height =
                `${height}px`;

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );

        }


        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas
        );


        /* =================================================
           SIGNAL MODEL
        ================================================= */

        function ecgSignal(x) {

            /*
             * Normalized repeating heartbeat-like waveform.
             *
             * This is a visual research interface element,
             * not physiological data and not a diagnostic model.
             */

            const period = 1;
            const t = ((x % period) + period) % period;

            let y = 0;


            /* Baseline */

            y +=
                0.015 *
                Math.sin(
                    t * Math.PI * 2
                );


            /* P wave */

            y +=
                0.08 *
                Math.exp(
                    -Math.pow(
                        (t - 0.20) / 0.045,
                        2
                    )
                );


            /* Q wave */

            y -=
                0.12 *
                Math.exp(
                    -Math.pow(
                        (t - 0.39) / 0.012,
                        2
                    )
                );


            /* R wave */

            y +=
                0.90 *
                Math.exp(
                    -Math.pow(
                        (t - 0.405) / 0.008,
                        2
                    )
                );


            /* S wave */

            y -=
                0.28 *
                Math.exp(
                    -Math.pow(
                        (t - 0.425) / 0.014,
                        2
                    )
                );


            /* T wave */

            y +=
                0.22 *
                Math.exp(
                    -Math.pow(
                        (t - 0.66) / 0.075,
                        2
                    )
                );


            return y;

        }


        /* =================================================
           DRAW GRID
        ================================================= */

        function drawGrid() {

            ctx.save();

            ctx.strokeStyle =
                "rgba(120, 170, 195, 0.08)";

            ctx.lineWidth = 1;


            const gridSize = 40;


            for (
                let x = 0;
                x <= width;
                x += gridSize
            ) {

                ctx.beginPath();

                ctx.moveTo(x, 0);

                ctx.lineTo(x, height);

                ctx.stroke();

            }


            for (
                let y = 0;
                y <= height;
                y += gridSize
            ) {

                ctx.beginPath();

                ctx.moveTo(0, y);

                ctx.lineTo(width, y);

                ctx.stroke();

            }

            ctx.restore();

        }


        /* =================================================
           DRAW SIGNAL
        ================================================= */

        function drawSignal() {

            ctx.clearRect(
                0,
                0,
                width,
                height
            );

            drawGrid();


            const centerY =
                height * 0.55;

            const amplitude =
                height * 0.30;


            /* Signal glow */

            ctx.save();

            ctx.shadowBlur = 16;

            ctx.shadowColor =
                "rgba(53, 231, 255, 0.75)";

            ctx.strokeStyle =
                "#35e7ff";

            ctx.lineWidth = 2;

            ctx.beginPath();


            const samples =
                Math.max(
                    Math.floor(width),
                    500
                );


            for (
                let i = 0;
                i <= samples;
                i++
            ) {

                const x =
                    (i / samples) * width;

                const normalized =
                    (i / samples) * 4
                    + signalOffset;

                const y =
                    centerY
                    - ecgSignal(normalized)
                    * amplitude;


                if (i === 0) {

                    ctx.moveTo(
                        x,
                        y
                    );

                } else {

                    ctx.lineTo(
                        x,
                        y
                    );

                }

            }

            ctx.stroke();

            ctx.restore();


            /* Baseline */

            ctx.save();

            ctx.strokeStyle =
                "rgba(139, 104, 255, 0.18)";

            ctx.lineWidth = 1;

            ctx.beginPath();

            ctx.moveTo(
                0,
                centerY
            );

            ctx.lineTo(
                width,
                centerY
            );

            ctx.stroke();

            ctx.restore();


            /* Scan line */

            const scanX =
                ((signalOffset * 70) % (width + 120))
                - 60;

            const gradient =
                ctx.createLinearGradient(
                    scanX - 60,
                    0,
                    scanX + 60,
                    0
                );

            gradient.addColorStop(
                0,
                "rgba(53, 231, 255, 0)"
            );

            gradient.addColorStop(
                0.5,
                "rgba(53, 231, 255, 0.35)"
            );

            gradient.addColorStop(
                1,
                "rgba(53, 231, 255, 0)"
            );


            ctx.fillStyle =
                gradient;

            ctx.fillRect(
                scanX - 60,
                0,
                120,
                height
            );


            signalOffset += 0.0025;

            animationFrame =
                requestAnimationFrame(
                    drawSignal
                );

        }


        /* =================================================
           START
        ================================================= */

        drawSignal();


        /* =================================================
           REDUCED MOTION
        ================================================= */

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );


        if (reducedMotion.matches) {

            cancelAnimationFrame(
                animationFrame
            );

        }

    });

}


/* =========================================================
   ACTIVE RESEARCH STATUS
========================================================= */

function activateResearchStatus() {

    const statusElements =
        document.querySelectorAll(
            ".research-status"
        );

    statusElements.forEach(element => {

        element.classList.add(
            "research-active"
        );

    });

}


/* =========================================================
   PROJECT 7 SYSTEM CLOCK
========================================================= */

function updateSystemClock() {

    const clocks =
        document.querySelectorAll(
            "[data-system-clock]"
        );

    if (!clocks.length) return;


    const now =
        new Date();


    const hours =
        String(now.getHours()).padStart(
            2,
            "0"
        );

    const minutes =
        String(now.getMinutes()).padStart(
            2,
            "0"
        );

    const seconds =
        String(now.getSeconds()).padStart(
            2,
            "0"
        );


    const time =
        `${hours}:${minutes}:${seconds}`;


    clocks.forEach(clock => {

        clock.textContent = time;

    });

}


updateSystemClock();

setInterval(
    updateSystemClock,
    1000
);
