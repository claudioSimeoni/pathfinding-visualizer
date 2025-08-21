function syncDFS(y, x){
    if(stop) return;
    if(x < 0 || y < 0 || x >= cols || y >= rows || visited[y][x] || grid[y][x] == "wall") return; 

    visited[y][x] = 1; 
    
    if(end[0] == y && end[1] == x){
        stop = 1; 
        return; 
    } 
    
    syncDFS(y, x + 1); 
    syncDFS(y + 1, x); 
    syncDFS(y, x - 1);    
    syncDFS(y - 1, x); 
}

function randomMaze(){
    let goodMaze = 0; 
    // let count = 0; 
    
    while(!goodMaze){
        clearVisited();
        // count++; 

        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                if(grid[i][j] == "start" || grid[i][j] == "end") continue; 
                if(Math.random() < 0.30) grid[i][j] = "wall"; 
                else grid[i][j] = "empty"; 
            }
        }
    
        stop = 0; 
        syncDFS(start[0], start[1]); 
        if(stop) goodMaze = 1; 
    }

    // console.log(count); 

    clearVisited(); 

    drawCanvas(); 
}

async function retrievePath(){
    let currCell = [end[0], end[1]]; 
    let stack = []; 
    while(!(currCell[0] == start[0] && currCell[1] == start[1])){
        stack.push(currCell); 
        currCell = parent[currCell[0]][currCell[1]]; 
        pathLength += 1; 
    }

    for(let i=stack.length - 1; i>= 0; i--){
        visited[stack[i][0]][stack[i][1]] = 2; 
        drawCanvas(); 
        await sleep(); 
    }
}

async function stepOn(y, x, prev){
    parent[y][x] = prev; 
    visited[y][x] = 1; 
    drawCanvas(); 
    await sleep(canvasSleep); 

    nodesVisited += 1; 
    totalTime += canvasSleep; 
}

async function dfs(y, x, prev){
    if(stop) return; 
    if(x < 0 || y < 0 || x >= cols || y >= rows || visited[y][x] || grid[y][x] == "wall") return; 

    await stepOn(y, x, prev); 

    if(end[0] == y && end[1] == x){
        stop = 1; 
        await retrievePath(); 
        return; 
    } 

    await dfs(y, x + 1, [y, x]); 
    await dfs(y + 1, x, [y, x]); 
    await dfs(y, x - 1, [y, x]);    
    await dfs(y - 1, x, [y, x]); 
}

async function bfs(y, x){
    let queue = [[y, x]]; 
    let dist = [];
    let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; 
    
    // init dist
    for(let i=0; i<rows; i++){
        dist[i] = []; 
        for(let j=0; j<cols; j++){
            dist[i][j] = INF; 
        }
    }

    dist[y][x] = 0; 
    visited[y][x] = 1; 
    while(queue.length > 0){
        let [curry, currx] = queue.shift(); 
        
        if(end[0] == curry && end[1] == currx){
            stop = 1; 
            await retrievePath(); 
        } 

        if(stop) break;
        
        for(let d of directions){
            let [nexty, nextx] = [curry + d[0], currx + d[1]]; 
            if(nexty < 0 || nextx < 0 || nexty >= rows || nextx >= cols || grid[nexty][nextx] == "wall" || visited[nexty][nextx]) continue; 
            dist[nexty][nextx] = dist[curry][currx] + 1; 
            
            queue.push([nexty, nextx]); 
            
            await stepOn(nexty, nextx, [curry, currx]); 
        }
    }
}
