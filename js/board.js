// this should probabily be the handlers file
function handleSaveBoard(event) {
  event.preventDefault();

  if (!authContext.loggedIn) {
    alert("Please log in to save your board.");
    return;
  }

  const boardName = document.getElementById("boardNameInput").value;
  
  if(boardName === ""){
    alert("You must enter a name to assign to the board!"); 
    return; 
  }
  
  const repr = getRepr(grid); 

  apiContext.saveBoard(boardName, repr).then(({ data }) =>
    userDashboard.addBoard({
      name: boardName,
      repr,
      board_id: data.board_id,
      timestamp: data.timestamp,
    }),
  );
}

function handleDeleteBoard(board_id) {
  apiContext.deleteBoard(board_id);
  userDashboard.removeBoard(board_id);
}

function handleCanvasClick(event){
    if(elem === null){
        alert("Select one between WALL, start, end & ERASER");
        return; 
    }
    
    const canvas = document.getElementById("board-canvas"); 
    const ctx = canvas.getContext("2d");  

    let [x, y] = [Math.floor(event.offsetX / cellSize), Math.floor(event.offsetY / cellSize)];

    if(grid[y][x] === "start"){
        start = null; 
    }
    else if(grid[y][x] === "end"){
        end = null; 
    }
    
    if(elem === "start"){
        if(start !== null){
            grid[start[0]][start[1]] = "empty"; 
        }
        start = [y, x]; 
    }
    else if(elem === "end"){
        if(end !== null){
            grid[end[0]][end[1]] = "empty"; 
        }
        end = [y, x]; 
    }

    grid[y][x] = elem; 
    drawCanvas(); 
}

