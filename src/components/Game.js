import React from 'react';
import {connect} from 'react-redux'
import Field from './Field'
import {gameActions} from '../actions/game.actions'
import {levelConfig} from '../minesweeper'

function Game({mineField, onClick, onMark, onLevelClick}) {  
  return (
    <div>
      <div>Level: {Object.values(levelConfig).map(
          level=>{
            return <button key={level.key} 
                           onClick={() => {onLevelClick(level.key)}}>
                             {level.level}
                   </button>
          })
        }</div>
      <div>Remaining: {mineField.level.mines - mineField.flagCount}</div>
      <div>
        <Field mineField={mineField} 
              onClick={onClick}
              onMark={onMark}/>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  mineField: state.game.fieldData
})
const mapActions = {
  onClick: gameActions.reveal,
  onMark: gameActions.mark,
  onLevelClick: gameActions.resetGame,
}

const connectedGame = connect(mapState, mapActions)(Game)

export {connectedGame as Game}