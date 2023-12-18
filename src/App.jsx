
//CSS
import './App.css'
//react
import { useState } from 'react'

//data
import { wordList } from './assets/data/words'

//components
import StartScreen from './assets/components/StartScreen'
import Game from './assets/components/Game'
import GameOver from './assets/components/GameOver'

const stages =[
  {id:1, name: "start"},
  {id:2, name: "game"},
  {id:3, name: "end"},
]


function App() {
  const [count, setCount] = useState(0)
  const [gameStage, setGameStage]= useState(stages[0].name)
  const [words] = useState(wordList);
  
  //start game
  const startGame = () =>{
    setGameStage(stages[1].name)
  }
  // processo de letter input
  const verifyLetter = () =>{
    setGameStage(stages[2].name)
  }
  //restart the game
  const retry =()=>{
    setGameStage(stages[0].name)
  }

  return (
    <>
      <div>
      {gameStage == 'start' &&  <StartScreen startGame={startGame}  />}
      {gameStage == 'game' &&  <Game verifyLetter={verifyLetter}/>}
      {gameStage == 'end' &&  <GameOver retry={retry}/>}
      </div>
      
    </>
  )
}

export default App
