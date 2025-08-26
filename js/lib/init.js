"use strict"

function setTheme() {
    const themeSelector = document.getElementById("theme-selector");
    const theme = themeSelector.value;
    const html = document.documentElement;

    /* Remove previous theme */
    html.classList.remove('day', 'night');

    /* Add the new theme */
    html.classList.add(theme);
    updateColors();
    drawCanvas();
}

function initialize() {
    /* initializing canvas */
    let canvas = document.getElementById("board-canvas");
    let canvas_wrapper = document.getElementById("board-wrapper");

    canvas.addEventListener("click", (e) => handleCanvasClick(e));

    boardX = canvas.width = canvas_wrapper.clientWidth;
    boardY = canvas.height = canvas_wrapper.clientHeight;

    cellSize = Math.floor(boardX / cols);
    rows = Math.floor(boardY / boardX * cols);

    /* initializing speed slider */
    let slider = document.getElementById("speed");
    slider.addEventListener("input", () => { canvasSleep = 504 - slider.value; console.log(canvasSleep) });

    canvasSleep = 504 - slider.value;

    /* initializing theme */
    const themeSelector = document.getElementById("theme-selector");
    themeSelector.addEventListener('change', setTheme);

    initCanvas();
    setTheme();
}

window.addEventListener("load", () => {
    initialize();
});