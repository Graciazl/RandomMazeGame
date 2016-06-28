/**
 * Created by Gracia on 16/6/22.
 */

// Common lib


// Model
var maze = (function(){
    var cell = [];

    return {

        random: function(num) {
            return Math.floor(Math.random() * num);
        }


    }

}());





// Controller
(function(){
    var cell = [],
        cellWalls = [],
        currentCell = [],
        cellStack = [],
        cellPath = [],
        neighbourStack = [],
        rowCells = 20,
        columnCells = 20,
        cellWidth = 25,
        cellHeight = 25,
        mazeWidth = columnCells * cellWidth,
        mazeHeight = rowCells * cellHeight;

    var canvas = document.getElementById("maze");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = '#005F6B';
    ctx.fillStyle = '#00B4CC';
    ctx.lineWidth = 2;

    function mazeInit() {
        for (var row = 0; row < rowCells; row++) {
            cell[row] = [];
            cellWalls[row] = [];
            for (var col = 0; col < columnCells; col++) {
                cell[row][col] = 0;
                cellWalls[row][col] = [1, 1, 1, 1];
            }
        }
    }

    function cellStart() {
        var row = maze.random(rowCells),
            col = maze.random(columnCells);
        cell[row][col] = 1;
        currentCell = [row, col];
        cellStack.push(currentCell);
        return currentCell;
    }

    function checkCellVisited() {
        return cell.indexOf(0) !== -1;
    } // return false if every cell has been visited.

    function neighbourCells(position) {
        var row = position[0],
            col = position[1];
        neighbourStack = [];
        if (row - 1 >= 0 && cell[row - 1][col] === 0) {
            neighbourStack.push([row - 1, col, N]);
        }
        if (col + 1 < columnCells && cell[row][col + 1] === 0) {
            neighbourStack.push([row, col + 1, E]);
        }
        if (row + 1 < rowCells && cell[row + 1][col] === 0){
            neighbourStack.push([row + 1, col, S]);
        }
        if (col - 1 >= 0 && cell[row][col - 1] === 0){
            neighbourStack.push([row, col - 1, W]);
        }
        return neighbourStack;
    }

    function nextCell() {
        var neighbourNum,
            random,
            tempCell;
        if (checkCellVisited()) {
            neighbourCells(currentCell);
            neighbourNum = neighbourStack.length;
            if (neighbourNum !== 0) {
                random = maze.random(neighbourNum); // Random number from 0 to neighbourStack.length-1
                tempCell = neighbourStack[random];
                var row = tempCell[0],
                    col = tempCell[1],
                    direction = tempCell[2];
                nextDirection(direction, currentCell[0], currentCell[1], row, col);// Change the status of current and next cell wall when neighbour founded.
                cell[row][col] = 1;
                currentCell = [row, col];
                cellStack.push(currentCell);
            } else {
                cellStack.pop();
                var stackNum = cellStack.length;
                if (stackNum !== 0 ) {
                    currentCell = cellStack[stackNum-1];
                }
            }
        }
    }

    function wallValue(direc, x, y, i, j) {
        var currentWall = cellWalls[x][y],
            nextWall = cellWalls[i][j];
        switch (direc) {
            case N:
                currentWall[0] = 0;
                nextWall[2] = 0;
                break;
            case E:
                currentWall[1] = 0;
                nextWall[3] = 0;
                break;
            case S:
                currentWall[2] = 0;
                nextWall[0] = 0;
                break;
            case W:
                currentWall[3] = 0;
                nextWall[1] = 0;
                break;
        }
        cellWalls[x][y] = currentWall;
        cellWalls[i][j] = nextWall;
    }

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawAllLines() {
        for (var i = 0; i < rowCells + 1; i++) {
            drawLine(i*cellHeight, 0, i*cellHeight, mazeWidth);
        }
        for (var j = 0; j < columnCells + 1; j++) {
            drawLine(0, j*cellWidth, mazeHeight, j*cellWidth);
        }
    }

    function clearMaze() {
        ctx.clearRect(0, 0, mazeWidth, mazeHeight);
    }

    function drawWalls(wall, width, height) {
        for (var row = 0; row < rowCells; row++){
            for (var col = 0; col < columnCells; col++){
                var x = col * width,
                    y = row * height;
                if (wall[row][col][0] === 1) {
                    drawLine(x, y, x + width, y);
                }
                if (wall[row][col][1] === 1) {
                    drawLine(x + width, y, x + width, y + height);
                }
                if (wall[row][col][2] === 1){
                    drawLine(x, y + height, x + width, y + height);
                }
                if (wall[row][col][3] === 1){
                    drawLine(x, y, x, y + height);
                }
            }
        }
    }

    drawAllLines();


}());