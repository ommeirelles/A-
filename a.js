'use strict'

var map = [
    [1 ,0 ,0 ,0 ,0 ,3],
    [0 ,0 ,0 ,1 ,0 ,0],
    [0 ,0 ,0 ,1 ,0 ,0],
    [0 ,0 ,0 ,1 ,0 ,0],
    [2 ,0 ,0 ,1 ,0 ,0]
]

function a(map) {
    const currentPosition = {};
    const destination = {};
    const openMoves = [];

    map.forEach((line, lineIndex) => {
        line.forEach((column, columnIndex) => {
                switch (column) {
                    case 2: {
                        currentPosition["column"] = columnIndex;
                        currentPosition["line"] = lineIndex
                        break;
                    } case 3: {
                        destination["column"] = columnIndex;
                        destination["line"] = lineIndex
                        break;
                    } default:
                        break;
                }
        })
    })

    if (destination.hasOwnProperty('column') && destination.hasOwnProperty('line') && currentPosition.hasOwnProperty('column') && currentPosition.hasOwnProperty('line')) {
        // can move down?
        if (currentPosition.line > 0 && map[currentPosition.line - 1][currentPosition.column] == 0) {
            openMoves.push({
                line: currentPosition.line - 1,
                column: currentPosition.column
            });
            console.log('can up');
        }
        // can move up?
        if (currentPosition.line < map.length - 1 && map[currentPosition.line + 1][currentPosition.column] == 0) {
            openMoves.push({
                line: currentPosition.line + 1,
                column: currentPosition.column
            });
            console.log('can down');
        }
        // can move right?
        if (currentPosition.column < map[currentPosition.line].length - 1 && map[currentPosition.line][currentPosition.column + 1] == 0) {
            openMoves.push({
                line: currentPosition.line,
                column: currentPosition.column + 1
            });
            console.log('can right');
        }
        // can move left?
        if (currentPosition.column > 0  && map[currentPosition.line][currentPosition.column - 1] == 0) {
            openMoves.push({
                line: currentPosition.line,
                column: currentPosition.column - 1
            });
            console.log('can left');
        }

        const heuristic = Math.abs(currentPosition.line - destination.line) + Math.abs(currentPosition.column - destination.column);
    }
}
console.info('entrei');
a(map);