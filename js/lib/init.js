function initialize() {
    /* initializing canvas */
    let canvas = document.getElementById("board-canvas");
    let canvas_wrapper = document.getElementById("board-wrapper");

    canvas.addEventListener("click", (e) => handleCanvasClick(e));

    boardX = canvas.width = canvas_wrapper.clientWidth;
    boardY = canvas.height = canvas_wrapper.clientHeight;

    cellX = boardX / cols;
    cellY = boardY / rows;

    /* initializing speed slider */
    let slider = document.getElementById("speed");
    slider.addEventListener("input", () => { canvasSleep = 504 - slider.value; console.log(canvasSleep) });
    canvasSleep = 504 - slider.value;

    /* initializing the slide to set walls */
    canvas.addEventListener("mousedown", (e) => handleMouseDown(e));
    window.addEventListener("mouseup", (e) => handleMouseUp(e));
    canvas.addEventListener("mousemove", (e) => handleCanvasSliding(e));

    initCanvas();
}

window.addEventListener("load", () => {
    initialize();
});