// Convert pressure to Pascals
function toPascals(value, unit) {
    switch (unit) {
        case "bars":  return value * 1e5;
        case "kbars": return value * 1e8;
        case "GPa":   return value * 1e9;
        case "kPa":   return value * 1e3;
    }
}

// Convert density to kg/m³
function toKgPerM3(value, unit) {
    switch (unit) {
        case "g/cm3":  return value * 1e3;
        case "kg/cm3": return value * 1e6;
    }
}

function getGravity() {
    const select = document.getElementById("gravity-select");
    if (select.value === "custom") {
        return parseFloat(document.getElementById("gravity-custom").value);
    }
    return parseFloat(select.value);
}

// Show/hide custom gravity input
document.getElementById("gravity-select").addEventListener("change", (e) => {
    const customInput = document.getElementById("gravity-custom");
    if (e.target.value === "custom") {
        customInput.classList.remove("hidden");
        customInput.focus();
    } else {
        customInput.classList.add("hidden");
    }
});

function calculate() {
    const pressure = parseFloat(document.getElementById("pressure").value);
    const pUnit = document.getElementById("pressure-unit").value;
    const density = parseFloat(document.getElementById("density").value);
    const dUnit = document.getElementById("density-unit").value;
    const g = getGravity();
    const resultDiv = document.getElementById("result");

    if (isNaN(pressure) || isNaN(density) || density <= 0) {
        alert("Please enter valid positive numbers for pressure and density.");
        return;
    }

    if (isNaN(g) || g <= 0) {
        alert("Please enter a valid positive value for gravitational acceleration.");
        return;
    }

    const pPa = toPascals(pressure, pUnit);
    const rhoKgM3 = toKgPerM3(density, dUnit);

    // h = P / (ρ * g)
    const depthM = pPa / (rhoKgM3 * g);
    const depthKm = depthM / 1000;

    document.getElementById("depth-km").textContent = depthKm.toFixed(2);
    document.getElementById("depth-m").textContent = depthM.toFixed(2) + " m";

    resultDiv.classList.remove("hidden");
}

document.getElementById("calculate").addEventListener("click", calculate);

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") calculate();
});

// Docs page show/hide
function showDocs() {
    document.getElementById("main").classList.add("hidden");
    document.getElementById("docs").classList.add("visible");
}

function hideDocs() {
    document.getElementById("docs").classList.remove("visible");
    document.getElementById("main").classList.remove("hidden");
}
