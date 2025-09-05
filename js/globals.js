/* board dimentions */
let rows = 32;
let cols = 54;
let boardX = 800;
let boardY = 800;
let cellX = 30;
let cellY = 30; 

/* INF variables needed for bfs */
const INF = 1000; 

/* info variables */
let start = null;
let end = null;

let algorithm = null;
let elem = null;

/* matrices to control the canvas */
let grid = [];
let visited = [];
let parent = [];

let stop = 1;
let pressed = 0;

/* log infos */
let gameId = 1; 
let pathLength = 0; 
let nodesVisited = 0; 
let totalTime = 0; 

/* sleep utilities */
let canvasSleep = 1000;

function sleep(sleepingTime){
    return new Promise(resolve => setTimeout(resolve, sleepingTime)); 
}

/* server side control */
const userDashboard = new UserDashboard();
const authContext = new AuthContext();
const apiContext = new ApiContext();