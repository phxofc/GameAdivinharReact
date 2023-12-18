import { useState } from 'react'
//CSS
import './App.css'
//react


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
  console.log(words)

  return (
    <>
      <div>
      {gameStage == 'start' &&  <StartScreen/>}
      {gameStage == 'game' &&  <Game/>}
      {gameStage == 'end' &&  <GameOver/>}
      </div>
      
    </>
  )
}

export default App
