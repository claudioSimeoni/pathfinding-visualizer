/* the compression is simply a bit string where a wall is a 1 and everything else is a 0 */
const elemToId = {
    "empty": "0",
    "start": "0",
    "end": "0",
    "wall": "1"
};

const idToElem = {
    "0": "empty",
    "1": "wall"
}

function getRepr(grid) {
    str = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            str += elemToId[grid[i][j]];
        }
    }
    return str;
}

function setGrid(repr) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = idToElem[repr[i * cols + j]];
        }
    }
}