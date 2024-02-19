import './App.css';
import Board from './components/board'
import Menu from './components/menu'
import { useState } from 'react'


function App() {
  const DIFFICULTY_VALUES = [50, 300, 500];
  const [ gameState, setGameState ] = useState(0);
  let gameSettings = { difficulty: 50 };

  function setSettings(settings) {
    console.log(settings);
  }

  return (
    <div className="App">
      <Menu values={DIFFICULTY_VALUES} useSettings={setSettings}/>
      <Board settings={gameSettings}/>
    </div>
  );
}
export default App;
