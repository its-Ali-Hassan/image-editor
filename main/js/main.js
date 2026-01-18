let filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" },
};

const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");
const filterContainer = document.querySelector(".filters");

let file = null;
let image = null;

// Helper to create filter UI elements
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
        applyFilters();
    });

    return div;
}

// Renders all filters to the sidebar
function createFilters() {
    filterContainer.innerHTML = ""; // Clear existing to prevent duplicates
    Object.keys(filters).forEach((key) => {
        const filterElement = createFilterElement(
            key, 
            filters[key].unit, 
            filters[key].value, 
            filters[key].min, 
            filters[key].max
        );
        filterContainer.appendChild(filterElement);
    });
}

createFilters();

// Image Upload Logic
imgInput.addEventListener("change", (event) => {
    file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    const placeholder = document.querySelector(".placeholder");
    const objectURL = URL.createObjectURL(file);

    img.src = objectURL;

    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        imageCanvas.style.display = "block";
        placeholder.style.display = "none";
        
        applyFilters();
        
        // Save raw image to localStorage (Note: Large images may exceed 5MB quota)
        try {
            localStorage.setItem("image", imageCanvas.toDataURL(file.type));
        } catch (e) {
            console.warn("Image too large for LocalStorage quota.");
        }

        // Clean up memory (Important for Linux/Debian systems)
        URL.revokeObjectURL(objectURL);
    };
});

// Apply filters to Canvas
function applyFilters() {
    if (!image) return;

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
    localStorage.setItem("filters", JSON.stringify(filters));
}

// Reset Logic
resetBtn.addEventListener("click", () => {
    // Reset the object to defaults
    filters = {
        brightness: { value: 100, min: 0, max: 200, unit: "%" },
        contrast: { value: 100, min: 0, max: 200, unit: "%" },
        saturation: { value: 100, min: 0, max: 200, unit: "%" },
        hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
        blur: { value: 0, min: 0, max: 20, unit: "px" },
        grayscale: { value: 0, min: 0, max: 100, unit: "%" },
        sepia: { value: 0, min: 0, max: 100, unit: "%" },
        opacity: { value: 100, min: 0, max: 100, unit: "%" },
        invert: { value: 0, min: 0, max: 100, unit: "%" },
    };

    applyFilters();
    createFilters();
});

downloadBtn.addEventListener("click", () => {
    if (!image) return;
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
});

// Presets Data
const Presets = {
    classicFilm: { brightness: "110", contrast: "110", saturation: "130", hueRotation: "0", blur: "0", grayscale: "0", sepia: "50", opacity: "100", invert: "0" },
    noir: { brightness: "90", contrast: "150", saturation: "100", hueRotation: "0", blur: "0", grayscale: "100", sepia: "10", opacity: "100", invert: "0" },
    cybercity: { brightness: "110", contrast: "120", saturation: "170", hueRotation: "180", blur: "0", grayscale: "0", sepia: "0", opacity: "100", invert: "0" },
    ethereal: { brightness: "120", contrast: "90", saturation: "80", hueRotation: "0", blur: "1", grayscale: "0", sepia: "0", opacity: "100", invert: "0" },
    specter: { brightness: "110", contrast: "120", saturation: "0", hueRotation: "0", blur: "0", grayscale: "100", sepia: "0", opacity: "100", invert: "100" },
    nordic: { brightness: "105", contrast: "110", saturation: "70", hueRotation: "190", blur: "0", grayscale: "0", sepia: "0", opacity: "100", invert: "0" },
    afternoonGlow: { brightness: "115", contrast: "110", saturation: "150", hueRotation: "0", blur: "0", grayscale: "0", sepia: "30", opacity: "100", invert: "0" },
    editorial: { brightness: "95", contrast: "160", saturation: "120", hueRotation: "0", blur: "0", grayscale: "5", sepia: "0", opacity: "100", invert: "0" },
    apparition: { brightness: "70", contrast: "130", saturation: "100", hueRotation: "0", blur: "2", grayscale: "80", sepia: "0", opacity: "90", invert: "0" },
    schematic: { brightness: "80", contrast: "140", saturation: "100", hueRotation: "180", blur: "0", grayscale: "0", sepia: "20", opacity: "100", invert: "100" }
};

// Initialize Preset Buttons
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
        createFilters(); // Refresh UI sliders to match preset
    });
});

// Load saved state from LocalStorage
window.addEventListener("load", () => {
    const savedImage = localStorage.getItem("image");
    const savedFilters = localStorage.getItem("filters");

    if (savedImage) {
        const img = new Image();
        img.src = savedImage;
        img.onload = () => {
            image = img;
            imageCanvas.width = img.width;
            imageCanvas.height = img.height;
            
            // Critical Fix: Only parse if savedFilters is NOT null
            if (savedFilters) {
                filters = JSON.parse(savedFilters);
            }
            
            applyFilters();
            createFilters();
            document.querySelector(".placeholder").style.display = "none";
            imageCanvas.style.display = "block";
        };
    }
});