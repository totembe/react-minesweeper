import { gameConstants } from '../constants/game.constants'
import {reveal, mark} from '../minesweeper'

export function game(state = {}, action) {
    switch(action.type) {
        case gameConstants.FIELD:
            return {...state, fieldData: action.fieldData}
        case gameConstants.REVEAL:
            return {...state, fieldData: reveal({...state.fieldData}, action.row, action.col)}
        case gameConstants.MARK:
            return {...state, fieldData: mark({...state.fieldData}, action.row, action.col)}
        default:
            return state
    }
}