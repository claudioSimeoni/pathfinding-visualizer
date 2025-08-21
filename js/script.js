"use strict"

function initialize(){
    let canvas = document.getElementById("board-canvas"); 
    let canvas_wrapper = document.getElementById("board-wrapper"); 

    canvas.addEventListener("click", (e) => handleCanvasClick(e)); 

    boardX = canvas.width = canvas_wrapper.clientWidth; 
    boardY = canvas.height = canvas_wrapper.clientHeight; 

    cellSize = Math.floor(boardX / cols); 
    rows = Math.floor(boardY / boardX * cols); 

    let slider = document.getElementById("speed"); 
    slider.addEventListener("input", () => {canvasSleep = 500 - slider.value; console.log(canvasSleep)}); 

    canvasSleep = 500 - slider.value; 


    initCanvas(); 
}

window.addEventListener("load", () => {
   initialize();
});