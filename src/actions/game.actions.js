import {gameConstants} from '../constants/game.constants'
import {generateField} from '../minesweeper'

export const gameActions = {
    resetGame,
    reveal,
    mark,
}

function resetGame(level) {
    const mineField = generateField(level)
    return {type: gameConstants.FIELD, fieldData: mineField}
}

function reveal(row, col) {
    return {type: gameConstants.REVEAL, row, col}
}

function mark(row, col) {
    return {type: gameConstants.MARK, row, col}
}