document.addEventListener("DOMContentLoaded", function () {

    const data = {
        project: {
            code: "SYSTEM CORE",
            index: "P07",
            eyebrow: "PROJECT 07 / ONGOING RESEARCH",
            title: "PHYSIOLOGICAL SIGNAL INTELLIGENCE",
            text: "An ongoing research project founded by BL4CK FYR3 MAGYR0N. The system explores how physiological signals can be acquired, processed, measured and computationally analyzed.",
            status: "ONGOING RESEARCH",
            next: "01 ACQUIRE"
        },

        acquire: {
            code: "NODE 01",
            index: "01",
            eyebrow: "SIGNAL ACQUISITION",
            title: "ACQUIRE",
            text: "Capture physiological signals using appropriate instrumentation and controlled experimental procedures. Lab 07 established the EKG acquisition foundation for this research lineage.",
            status: "FOUNDATION",
            next: "02 CLEAN"
        },

        clean: {
            code: "NODE 02",
            index: "02",
            eyebrow: "SIGNAL PROCESSING",
            title: "CLEAN",
            text: "Identify noise, artifacts and signal-quality problems before extracting features. Reliable computational analysis depends on knowing whether a recorded signal is usable.",
            status: "RESEARCH DIRECTION",
            next: "03 DETECT"
        },

        detect: {
            code: "NODE 03",
            index: "03",
            eyebrow: "EVENT DETECTION",
            title: "DETECT",
            text: "Identify meaningful signal events within a physiological time series, including the waveform features needed to establish reliable beat-to-beat measurements.",
            status: "RESEARCH DIRECTION",
            next: "04 MEASURE"
        },

        measure: {
            code: "NODE 04",
            index: "04",
            eyebrow: "PHYSIOLOGICAL MEASUREMENT",
            title: "MEASURE",
            text: "Extract measurable features such as R-R intervals and heart-rate response. Lab 07 calculated heart rate from R-R intervals before and after exercise.",
            status: "LAB 07 FOUNDATION",
            next: "05 MODEL"
        },

        model: {
            code: "NODE 05",
            index: "05",
            eyebrow: "COMPUTATIONAL MODELING",
            title: "MODEL",
            text: "Transform signal measurements into computational representations that can be analyzed over time. This is where experimental measurement begins connecting to software and algorithmic research.",
            status: "FUTURE RESEARCH",
            next: "06 CLASSIFY"
        },

        classify: {
            code: "NODE 06",
            index: "06",
            eyebrow: "PATTERN ANALYSIS",
            title: "CLASSIFY",
            text: "Investigate whether computational methods can distinguish meaningful patterns within physiological signals. Any future classification system must be evaluated against appropriate data and validation procedures.",
            status: "FUTURE RESEARCH",
            next: "07 VALIDATE"
        },

        validate: {
            code: "NODE 07",
            index: "07",
            eyebrow: "RESEARCH VALIDATION",
            title: "VALIDATE",
            text: "Test reliability, repeatability, signal quality and model performance before advancing a research concept. Future applications require substantially more evidence than the original laboratory experiment.",
            status: "RESEARCH GATE",
            next: "FUTURE SYSTEMS"
        }
    };


    const panel = document.getElementById("detailPanel");
    const closeButton = document.getElementById("closeDetail");

    const detailCode = document.getElementById("detailCode");
    const detailIndex = document.getElementById("detailIndex");
    const detailEyebrow = document.getElementById("detailEyebrow");
    const detailTitle = document.getElementById("detailTitle");
    const detailText = document.getElementById("detailText");
    const detailStatus = document.getElementById("detailStatus");
    const detailNext = document.getElementById("detailNext");
    const signalDemo = document.getElementById("signalDemo");

    const nodes = document.querySelectorAll(".node");


    function openNode(nodeName) {

        const item = data[nodeName];

        if (!item) {
            console.error("Unknown Project 07 node:", nodeName);
            return;
        }

        detailCode.textContent = item.code;
        detailIndex.textContent = item.index;
        detailEyebrow.textContent = item.eyebrow;
        detailTitle.textContent = item.title;
        detailText.textContent = item.text;
        detailStatus.textContent = item.status;
        detailNext.textContent = item.next;

        if (signalDemo) {
            signalDemo.style.display =
                nodeName === "project" ? "none" : "block";
        }

        nodes.forEach(function (node) {
            node.classList.remove("active");

            if (node.dataset.node === nodeName) {
                node.classList.add("active");
            }
        });

        panel.classList.add("open");

        setTimeout(function () {
            panel.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }, 100);
    }


    nodes.forEach(function (node) {

        node.addEventListener("click", function (event) {

            event.preventDefault();

            const nodeName = node.getAttribute("data-node");

            console.log("Project 07 node clicked:", nodeName);

            openNode(nodeName);

        });

    });


    if (closeButton) {

        closeButton.addEventListener("click", function () {

            panel.classList.remove("open");

            nodes.forEach(function (node) {
                node.classList.remove("active");
            });

        });

    }


    console.log("PROJECT 07 SYSTEM MAP INITIALIZED");

});
