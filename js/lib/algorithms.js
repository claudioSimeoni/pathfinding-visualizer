/* dfs used by random maze to check if a path exists */
function syncDFS(y, x) {
    if (stop) return;
    if (x < 0 || y < 0 || x >= cols || y >= rows || visited[y][x] || grid[y][x] == "wall") return;

    visited[y][x] = 1;

    if (end[0] == y && end[1] == x) {
        stop = 1;
        return;
    }

    syncDFS(y, x + 1);
    syncDFS(y + 1, x);
    syncDFS(y, x - 1);
    syncDFS(y - 1, x);
}

async function retrievePath() {
    stop = 0;
    let currCell = [end[0], end[1]];
    let stack = [];
    while (!(currCell[0] == start[0] && currCell[1] == start[1])) {
        stack.push(currCell);
        currCell = parent[currCell[0]][currCell[1]];
        pathLength += 1;
    }

    for (let i = stack.length - 1; i >= 0; i--) {
        visited[stack[i][0]][stack[i][1]] = 2;
        drawCanvas();
        await sleep(canvasSleep * 2);
    }
    stop = 1;
}

async function stepOn(y, x, prev) {
    parent[y][x] = prev;
    visited[y][x] = 1;
    drawCanvas();
    await sleep(canvasSleep);

    nodesVisited += 1;
    totalTime += canvasSleep;
}

async function aStar(y, x) {
    let dist = [];

    /* initializing dist */
    for (let i = 0; i < rows; i++) {
        dist[i] = [];
        for (let j = 0; j < cols; j++) {
            dist[i][j] = INF;
        }
    }

    dist[y][x] = 0;
    for (let k = 0; k < rows * cols; k++) {
        let minCouple = [-1, -1];
        let currMin = INF;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (visited[i][j]) continue;

                if (dist[i][j] + Math.abs(end[0] - i) + Math.abs(end[1] - j) < currMin) {
                    currMin = dist[i][j] + Math.abs(end[0] - i) + Math.abs(end[1] - j);
                    minCouple = [i, j];
                }
            }
        }
        let [curry, currx] = [minCouple[0], minCouple[1]];

        if (curry == end[0] && currx == end[1]) {
            stop = 1;
            await retrievePath();
        }

        if (stop) break;

        visited[curry][currx] = 1;
        drawCanvas();
        await sleep(canvasSleep);
        nodesVisited += 1;
        totalTime += canvasSleep;

        for (let d of directions) {
            let [nexty, nextx] = [curry + d[0], currx + d[1]];
            if (nexty < 0 || nextx < 0 || nexty >= rows || nextx >= cols || grid[nexty][nextx] == "wall" || visited[nexty][nextx]) continue;
            if (dist[curry][currx] + 1 < dist[nexty][nextx]) {
                dist[nexty][nextx] = dist[curry][currx] + 1;
                parent[nexty][nextx] = [curry, currx];
            }
        }
    }
}

async function dfs(y, x, prev) {
    if (stop) return;
    if (x < 0 || y < 0 || x >= cols || y >= rows || visited[y][x] || grid[y][x] == "wall") return;

    await stepOn(y, x, prev);

    if (end[0] == y && end[1] == x) {
        stop = 1;
        await retrievePath();
        return;
    }

    await dfs(y, x + 1, [y, x]);
    await dfs(y + 1, x, [y, x]);
    await dfs(y, x - 1, [y, x]);
    await dfs(y - 1, x, [y, x]);
}

async function bfs(y, x) {
    let queue = [[y, x]];
    let dist = [];

    /* initializing dist */
    for (let i = 0; i < rows; i++) {
        dist[i] = [];
        for (let j = 0; j < cols; j++) {
            dist[i][j] = INF;
        }
    }

    dist[y][x] = 0;
    visited[y][x] = 1;
    while (queue.length > 0) {
        let [curry, currx] = queue.shift();

        if (end[0] == curry && end[1] == currx) {
            stop = 1;
            await retrievePath();
        }

        if (stop) break;

        for (let d of directions) {
            let [nexty, nextx] = [curry + d[0], currx + d[1]];
            if (nexty < 0 || nextx < 0 || nexty >= rows || nextx >= cols || grid[nexty][nextx] == "wall" || visited[nexty][nextx]) continue;
            dist[nexty][nextx] = dist[curry][currx] + 1;

            queue.push([nexty, nextx]);

            await stepOn(nexty, nextx, [curry, currx]);
        }
    }
}

async function runAlgorithm() {
    /* if an alg is running return */
    if (!stop) {
        return;
    }

    if (start === null || end === null) {
        alert("Both an end and a starting point must be selected!");
        return;
    }

    /* resetting everything before running the alg */
    await clearPath();
    clearParent();

    stop = 0;
    pathLength = 0;
    nodesVisited = 0;
    totalTime = 0;

    /* running alg and updating log */
    algorithm = document.getElementById("alg-selector").value;

    if (algorithm == "dfs") await dfs(start[0], start[1]);
    else if (algorithm == "bfs") await bfs(start[0], start[1]);
    else if (algorithm == "a-star") await aStar(start[0], start[1]);

    if(!stop){
        stop = 1;
        alert("No path exists between start and end!");
    }


    if (pathLength > 0) {
        handleLog();
        gameId++;
    }
}

