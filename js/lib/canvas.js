function drawLetter(letter, row, col, color, fontSize, ctx) {
    const x = col * cellX + cellX / 2;
    const y = row * cellY + cellY / 2;

    ctx.fillStyle = color;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, x, y);
}

function drawCanvas() {
    const canvas = document.getElementById("board-canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = BG2;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            switch (grid[i][j]) {
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
                    if (visited[i][j] == 1) {
                        ctx.fillStyle = ACCENT_PRIMARY;
                    }
                    else if (visited[i][j] == 2) ctx.fillStyle = ACCENT_SECONDARY;
                    else ctx.fillStyle = BG3;
            }

            ctx.fillRect(j * cellX, i * cellY, cellX, cellY);
            ctx.strokeRect(j * cellX, i * cellY, cellX, cellY);

            if (grid[i][j] === "start") {
                drawLetter("S", i, j, TEXT_PRIMARY, 20, ctx);
            }
            else if (grid[i][j] === "end") {
                drawLetter("E", i, j, TEXT_PRIMARY, 20, ctx);
            }
        }
    }
}

function loadNewRepr(repr) {
    setGrid(repr);
    start = null;
    end = null;
    clearVisited();
    drawCanvas();
}

function initCanvas() {
    initMatrices();
    clearGrid();
    clearVisited();
    clearParent();

    resetStartEnd();
    drawCanvas();
}

async function resetCanvas() {
    stop = 1;
    await sleep(10);

    clearGrid();
    clearVisited();
    clearParent();

    resetStartEnd();

    drawCanvas();
}

async function clearPath() {
    stop = 1;
    await sleep(10);

    clearVisited();
    drawCanvas();
}

async function randomMaze() {
    stop = 1; 
    await sleep(10); 
    
    let goodMaze = 0;
    let count = 0; 

    while (!goodMaze) {
        clearVisited();
        count++; 

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] == "start" || grid[i][j] == "end") continue;
                if (Math.random() < 0.45) grid[i][j] = "wall";
                else grid[i][j] = "empty";
            }
        }

        if(start === null){
            break;
        }

        stop = 0;
        syncDFS(start[0], start[1]);
        if (stop) goodMaze = 1;
    }

    console.log(count);  

    clearVisited();
    drawCanvas();
}

function resetStartEnd() {
    grid[0][0] = "start";
    grid[rows - 1][cols - 1] = "end";

    start = [0, 0];
    end = [rows - 1, cols - 1];
}

function initMatrices() {
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        visited[i] = [];
        parent[i] = [];
    }
}

function clearGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = "empty";
        }
    }
}

function clearParent() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            parent[i][j] = [-1, -1];
        }
    }
}

function clearVisited() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            visited[i][j] = 0;
        }
    }
}
