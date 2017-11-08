'use strict'

const map = [
    [0 ,0 ,0 ,1 ,0 ,3]
    [0 ,2 ,0 ,1 ,0 ,0]
    [0 ,0 ,0 ,1 ,0 ,0]
    [0 ,0 ,0 ,1 ,0 ,0]
    [0 ,0 ,0 ,0 ,0 ,0]
]


module.export.a = (map) => {
    const currentPosition = undefined;
    map.forEach((line, lineIndex) => {
        line.forEach((column, colIndex) => {
            if (column == 2) {
                currentPosition = [colIndex, lineIndex]
            }
        })
    })
}