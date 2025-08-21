function selectElem(event){
    let button = event.target; 
    elem = button.value; 

    let elem_buttons = document.querySelectorAll(".elem-button");  
    for(let current_button of elem_buttons) current_button.disabled = false; 

    button.disabled = true; 
}

function log(){
    let currentGameLog = "[" + gameId + "] " + algorithm + " visited " + nodesVisited + 
                         " nodes in " + totalTime + " ms. " + "Path length: " + pathLength + "!"; 
    let logElement = document.getElementById("log"); 
    let newPar = document.createElement("p"); 
    newPar.innerHTML = currentGameLog; 

    logElement.appendChild(newPar); 
}

async function runAlgorithm(){ 
    if(start == null || end == null){
        alert("Both an end and a starting point must be selected!"); 
        return; 
    }
    
    await clearPath(); 
    clearParent(); 

    stop = 0;
    pathLength = 0; 
    nodesVisited = 0; 

    algorithm = document.getElementById("alg-selector").value; 

    if(algorithm == "dfs") await dfs(start[0], start[1]); 
    else if(algorithm == "bfs") await bfs(start[0], start[1]); 
    
    if(pathLength > 0){
        log(); 
        gameId++; 
    }
}

function handleCanvasClick(event){
    if(elem == null){
        alert("Select one between WALL, start, end & ERASER");
        return; 
    }
    
    const canvas = document.getElementById("board-canvas"); 
    const ctx = canvas.getContext("2d");  

    let [x, y] = [Math.floor(event.offsetX / cellSize), Math.floor(event.offsetY / cellSize)];

    if(grid[y][x] == "start"){
        start = null; 
    }
    else if(grid[y][x] == "end"){
        end = null; 
    }
    
    if(elem == "start"){
        if(start != null){
            grid[start[0]][start[1]] = "empty"; 
        }
        start = [y, x]; 
    }
    else if(elem == "end"){
        if(end != null){
            grid[end[0]][end[1]] = "empty"; 
        }
        end = [y, x]; 
    }

    grid[y][x] = elem; 
    drawCanvas(); 
}
