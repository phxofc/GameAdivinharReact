
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

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState("")

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory=() =>{
    //pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
  
    console.log(category)

    //pick a random category
    const word = wordList[category][Math.floor(Math.random() * wordList[category].length)]
    console.log(word)

    return {word, category}
  }

  //start game
  const startGame = () =>{
    //pick word and pick category
    const {word, category} =pickWordAndCategory();
    
    //create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase()) 
    
    console.log(category, word)
    console.log(wordLetters)

    // fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

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
      {gameStage == 'game' &&  <Game 
      
      verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses= {guesses}
      score={score}

      />}
      {gameStage == 'end' &&  <GameOver retry={retry}/>}
      </div>
      
    </>
  )
}

export default App
