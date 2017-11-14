'use strict'

const map = [
    [1 ,0 ,0 ,1 ,0 ,3],
    [0 ,0 ,0 ,1 ,0 ,0],
    [0 ,1 ,0 ,0 ,0 ,0],
    [0 ,1 ,1 ,1 ,0 ,0],
    [2 ,0 ,0 ,0 ,0 ,0]
]


function A(map, moves, paths) {
    let currentPosition = Object.assign({});
    let destination = Object.assign({});
    let openMoves = new Array();
    let closedMoves = moves.slice() || new Array();

    const positions = getCurrentPositions(map);
    [currentPosition, destination] = positions;

    if (Math.abs(currentPosition.line - destination.line) + Math.abs(currentPosition.column - destination.column) > 1) {
        closedMoves.push(currentPosition);
        openMoves = getAvaliableMoves(map, currentPosition);

        openMoves = openMoves.filter(move => {
            return !closedMoves.find(closedMove => closedMove.line == move.line && closedMove.column == move.column)
        })
        if (openMoves.length) {
            openMoves.forEach(item => {
                const heuristic = Math.abs(item.line - destination.line) + Math.abs(item.column - destination.column);
                item.result = closedMoves.length + heuristic;
            });

            const bestMove = openMoves.sort((a, b) => a.result - b.result)[0];
            openMoves.filter(i => i.result == bestMove.result).forEach((move) => {
                const newMap = cloneMatrix(map);
                newMap[currentPosition.line][currentPosition.column] = 0;
                newMap[move.line][move.column] = 2;
                A(newMap, closedMoves, paths);
            })
        }
    } else if (Math.abs(currentPosition.line - destination.line) + Math.abs(currentPosition.column - destination.column) == 1) {
        closedMoves.push(destination)
        paths.push(closedMoves.slice());
    }
}

const paths = [];
A(map, [], paths);
console.log(paths)

function getCurrentPositions(map) {
    const currentPosition = {};
    const destination = {};

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
        return [currentPosition, destination];
    } else {
        throw new Error('Destino ou posicao atual nao definidos');
    }
}

function getAvaliableMoves(map, currentPosition) {
    const openMoves = [];
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

    return openMoves
}

function cloneMatrix(item) {
    return item.map(arr => arr.slice(0));
}