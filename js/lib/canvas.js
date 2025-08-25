function drawCanvas(){
    const canvas = document.getElementById("board-canvas");
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = BG1;
    
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            switch(grid[i][j]){
                case "wall": 
                    ctx.fillStyle = BG2; 
                    break; 
                case "start": 
                    ctx.fillStyle = ACCENT_START; 
                    break; 
                case "end": 
                    ctx.fillStyle = ACCENT_END; 
                    break; 
                default: 
                    if(visited[i][j] == 1){
                        ctx.fillStyle = ACCENT_PRIMARY; 
                    }
                    else if(visited[i][j] == 2) ctx.fillStyle = ACCENT_SECONDARY; 
                    else ctx.fillStyle = BG3; 
            }

            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize); 
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize); 
        }
    }
}

function initCanvas(){
    initMatrices();
    clearGrid(); 
    clearVisited();
    clearParent(); 

    resetStartEnd(); 
    drawCanvas(); 
}

async function resetCanvas(){
    stop = 1; 
    await sleep(10); 

    clearGrid(); 
    clearVisited();
    clearParent(); 

    resetStartEnd(); 

    drawCanvas(); 
}

async function clearPath(){
    stop = 1; 
    await sleep(10); 

    clearVisited(); 
    drawCanvas(); 
}

function resetStartEnd(){
    grid[0][0] = "start"; 
    grid[rows - 1][cols - 1] = "end"; 

    start = [0, 0]; 
    end = [rows - 1, cols - 1]; 
}

function initMatrices(){
    for(let i=0; i<rows; i++){
        grid[i] = []; 
        visited[i] = []; 
        parent[i] = []; 
    }
}

function clearGrid(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            grid[i][j] = "empty"; 
        }
    }
}

function clearParent(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            parent[i][j] = [-1, -1]; 
        }
    }
}

function clearVisited(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            visited[i][j] = 0; 
        }
    }
}
