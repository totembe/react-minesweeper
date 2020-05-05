import React from 'react';
import './App.css';
import { Game } from './components/Game'
import {store} from './helpers/store'
import {gameActions} from './actions/game.actions'
import {levels} from './minesweeper'


store.dispatch(gameActions.resetGame(levels.BEGINNER))

function App() {  
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
