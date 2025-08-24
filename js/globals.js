let rows = 32;
let cols = 48;
let boardX = 800;
let boardY = 800;

let cellSize = 30;

const INF = 1000; 

let start = null;
let end = null;

let algorithm = null;
let elem = null;

let grid = [];
let visited = [];
let parent = [];

let stop = 1;

let gameId = 1; 
let pathLength = 0; 
let nodesVisited = 0; 
let totalTime = 0; 

let canvasSleep = 1000;

function sleep(sleepingTime){
    return new Promise(resolve => setTimeout(resolve, sleepingTime)); 
}
