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


