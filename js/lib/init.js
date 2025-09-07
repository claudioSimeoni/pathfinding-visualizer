/* this part reloads the page normally (not hard reload) for old versions of browsers that
didn't load the canvas properly */
if (!localStorage.getItem("canvas-refreshed")) {
      localStorage.setItem("canvas-refreshed", "yes");
      location.reload();
} else {
      /* clears the flag for next loading */
      localStorage.removeItem("canvas-refreshed");
}

window.onload = function() {
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