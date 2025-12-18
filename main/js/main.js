let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px",
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
};

const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");


let file = null;
let image = null;

const filterContainer = document.querySelector(".filters");

function createFilterElement(name, unit = "%", value, min, max) {

    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.name = name;
    input.id = name;

    const p = document.createElement("p");
    p.innerText = name;
    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", () => {
        filters[name].value = input.value;
        applyFilters()
    });

    return div;
}

function createFilters() {
    Object.keys(filters).forEach((keys) => {
        const filterElement = createFilterElement(keys, filters[keys].unit, filters[keys].value, filters[keys].min, filters[keys].max);
        filterContainer.appendChild(filterElement);
    })
}

createFilters()

imgInput.addEventListener("change", (event) => {
    file = event.target.files[0];
    const img = new Image();
    const placeholder = document.querySelector(".placeholder");
    imageCanvas.style.display = "block";
    placeholder.style.display = "none";

    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
    };
})

function applyFilters() {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `.trim();
    canvasCtx.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
    filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        hueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg",
        },
        blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px",
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%",
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
    };

    applyFilters();

    filterContainer.innerHTML = "";

    createFilters()

});

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
});

const Presets = {
    classicFilm: {
        brightness: "110",
        contrast: "110",
        saturation: "130",
        hueRotation: "0",
        blur: "0",
        grayscale: "0",
        sepia: "50",
        opacity: "100",
        invert: "0"
    },
    noir: {
        brightness: "90",
        contrast: "150",
        saturation: "100",
        hueRotation: "0",
        blur: "0",
        grayscale: "100",
        sepia: "10",
        opacity: "100",
        invert: "0"
    },
    cybercity: {
        brightness: "110",
        contrast: "120",
        saturation: "170",
        hueRotation: "180",
        blur: "0",
        grayscale: "0",
        sepia: "0",
        opacity: "100",
        invert: "0"
    },
    ethereal: {
        brightness: "120",
        contrast: "90",
        saturation: "80",
        hueRotation: "0",
        blur: "1",
        grayscale: "0",
        sepia: "0",
        opacity: "100",
        invert: "0"
    },
    specter: {
        brightness: "110",
        contrast: "120",
        saturation: "0",
        hueRotation: "0",
        blur: "0",
        grayscale: "100",
        sepia: "0",
        opacity: "100",
        invert: "100"
    },
    nordic: {
        brightness: "105",
        contrast: "110",
        saturation: "70",
        hueRotation: "190",
        blur: "0",
        grayscale: "0",
        sepia: "0",
        opacity: "100",
        invert: "0"
    },
    afternoonGlow: {
        brightness: "115",
        contrast: "110",
        saturation: "150",
        hueRotation: "0",
        blur: "0",
        grayscale: "0",
        sepia: "30",
        opacity: "100",
        invert: "0"
    },
    editorial: {
        brightness: "95",
        contrast: "160",
        saturation: "120",
        hueRotation: "0",
        blur: "0",
        grayscale: "5",
        sepia: "0",
        opacity: "100",
        invert: "0"
    },
    apparition: {
        brightness: "70",
        contrast: "130",
        saturation: "100",
        hueRotation: "0",
        blur: "2",
        grayscale: "80",
        sepia: "0",
        opacity: "90",
        invert: "0"
    },
    schematic: {
        brightness: "80",
        contrast: "140",
        saturation: "100",
        hueRotation: "180",
        blur: "0",
        grayscale: "0",
        sepia: "20",
        opacity: "100",
        invert: "100"
    }
};

Object.keys(Presets).forEach((presetName) => {
    const presetBtn = document.createElement("button");
    presetBtn.classList.add("btn");
    presetBtn.innerText = presetName;
    presetsContainer.appendChild(presetBtn);

    presetBtn.addEventListener("click", () => {
        const preset = Presets[presetName];
        
        Object.keys(preset).forEach((filterName) => {
            filters[filterName].value = preset[filterName];
        });

        applyFilters();
        filterContainer.innerHTML = "";
        createFilters()

    })

})