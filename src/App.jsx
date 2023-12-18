
//CSS
import './App.css'
//react
import {useEffect, useState } from 'react'

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

  const [gameStage, setGameStage]= useState(stages[0].name)
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory= () =>{
    //pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
  
   

    //pick a random category
    const word = wordList[category][Math.floor(Math.random() * wordList[category].length)]
    

    return {word, category}
  };

  //start game
  const startGame = () =>{
    //clear all letters
    clearLetterStates();
    //pick word and pick category
    const {word, category} =pickWordAndCategory();
    
    //create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase()) 
    
   

    // fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  };
  // processo de letter input
  const verifyLetter = (letter) =>{
    
    const normalizedLetter = letter.toLowerCase()

    //chek if letter has alredy been utilezed
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter))
    {
      return;
    }
    // push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    }else{  
         setWrongLetters((actualWrongLetters) => [
          ...actualWrongLetters,
          normalizedLetter
        ]);
        setGuesses((actualGuesses) => actualGuesses - 1)
        
    }
      

  }


const clearLetterStates = () =>{
  setGuessedLetters([]);
  setWrongLetters([]);
  
}

//chek if guesses end
  useEffect(()=> {

    if(guesses <=0){
      //reset all states
      clearLetterStates();


      setGameStage(stages[2].name)
    }

  }, [guesses])

  //chek win condition
  useEffect(()=>{

    const uniqueLetters =[...new Set(letters)]
    //win codintion
    if(guessedLetters.length == uniqueLetters.length){
      // add score
      setScore((actualScore) => actualScore +=100)
      //restar the game with new word
      startGame();
    }
   

  },[guessedLetters])


  //restart the game
  const retry =()=>{
    setScore(0)
    setGuesses(3)

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
      guesses={guesses}
      score={score}

      />}
      {gameStage == 'end' &&  <GameOver retry={retry} score={score}/>}
      </div>
      
    </>
  )
}

export default App
