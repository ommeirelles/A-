'use strict'

var map = [
    [1 ,0 ,0 ,1 ,0 ,3],
    [0 ,0 ,0 ,1 ,0 ,0],
    [0 ,1 ,0 ,1 ,0 ,0],
    [0 ,1 ,0 ,1 ,0 ,0],
    [2 ,1 ,0 ,0 ,0 ,0]
]

function A(map, moves) {
    const currentPosition = {};
    const destination = {};
    let openMoves = [];
    let closedMoves = moves || [];

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

    if (destination.hasOwnProperty('column') && destination.hasOwnProperty('line') && currentPosition.hasOwnProperty('column') && currentPosition.hasOwnProperty('line') && Math.abs(currentPosition.line - destination.line) + Math.abs(currentPosition.column - destination.column) > 1) {
        closedMoves.push(currentPosition);
        // can move down?
        if (currentPosition.line > 0 && map[currentPosition.line - 1][currentPosition.column] == 0) {
            openMoves.push({
                line: currentPosition.line - 1,
                column: currentPosition.column
            });
        }
        // can move up?
        if (currentPosition.line < map.length - 1 && map[currentPosition.line + 1][currentPosition.column] == 0) {
            openMoves.push({
                line: currentPosition.line + 1,
                column: currentPosition.column
            });
        }
        // can move right?
        if (currentPosition.column < map[currentPosition.line].length - 1 && map[currentPosition.line][currentPosition.column + 1] == 0) {
            openMoves.push({
                line: currentPosition.line,
                column: currentPosition.column + 1
            });
        }
        // can move left?
        if (currentPosition.column > 0  && map[currentPosition.line][currentPosition.column - 1] == 0) {
            openMoves.push({
                line: currentPosition.line,
                column: currentPosition.column - 1
            });
        }

        openMoves = openMoves.filter(move => {
            return !closedMoves.find(closedMove => closedMove.line == move.line && closedMove.column == move.column)
        })
        if (openMoves.length) {
            openMoves.forEach(item => {
                const heuristic = Math.abs(item.line - destination.line) + Math.abs(item.column - destination.column);
                item.result = closedMoves.length + heuristic;
            });

            const bestMove = openMoves.sort((a, b) => a.result - b.result)[0];
            map[currentPosition.line][currentPosition.column] = 0;
            map[bestMove.line][bestMove.column] = 2;
            closedMoves = A(map, closedMoves);
            return closedMoves;
        } else {
            throw new Error('Não ha caminho disponivel!!');
        }
    } else {
        if (Math.abs(currentPosition.line - destination.line) + Math.abs(currentPosition.column - destination.column) == 1) {
            closedMoves.push(destination);
            return closedMoves;
        } else {
            throw new Error('Não ha caminho disponivel!!');
        }
    }
}

const moves = A(map, []);
console.info(moves);
// A(map);