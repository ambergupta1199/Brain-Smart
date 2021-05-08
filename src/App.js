import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import { confirm } from "react-confirm";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import "./styles.css";
export default function App() {
  const [options, setOptions] = useState(null)
  const [highScore, setHighScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState({ m:0, s:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  useEffect(() => {
    const json = localStorage.getItem('memorygamehighscore')
    const savedScore = JSON.parse(json)
    if (savedScore) {
      setHighScore(savedScore)
    }
  }, [])

  
  var updatedS = time.s, updatedM = time.m;
  const start = () => {
    
    updatedS=0;
    updatedM=0;
   
    run();
    setStatus(1);
    setInterv(setInterval(run, 1000));
  };
  const run = () => {
    
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    
    updatedS++;
    return setTime({ m:updatedM, s:updatedS});
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
    setTime({ m:0, s:0})
    
    start();
  };
  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ m:0, s:0})
    
  };

  return (
    <div>
      <div className="container">
        <h1>Brain Smart</h1>
        <div>High Score: {highScore}</div>
        <div>Moves: {moves}</div>
        <div>Time: {time.m}:{time.s}</div>

        <div>
          {options === null ? (
            <>
              <button onClick={() => {setOptions(12); start()}}>Beginner</button>
              <button onClick={() => {setOptions(16); start()}}>Intermediate</button>
              <button onClick={() => {setOptions(20); start()}}>Expert</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  const prevOptions = options
                  setMoves(0)
                  setOptions(null)
                
                  stop()
                  setTimeout(() => {
                    setOptions(prevOptions)
                   
                  }, 5)
                }}
              >
                Restart
              </button>
              <button onClick={() => {setOptions(null); reset(); setMoves(0)} }>Back</button>
            </>
          )}
        </div>
      </div>

      {options ? (
        <MemoryGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
          moves={moves}
          setMoves={setMoves}
          status={status} reset={reset}
          start={start}
          stop={stop}
          reset={reset}
        />
      ) : (
        <h2>Select a Level to Play!</h2>
      )}
    </div>
    
  )
}

function MemoryGame({options, setOptions, highScore, setHighScore,moves,setMoves,stop,reset}) {
  const [game, setGame] = useState([])
  const [flippedCount, setFlippedCount] = useState(0)
  const [flippedIndexes, setFlippedIndexes] = useState([])
  
  const colors = [
   
    './star.png',
    './circle.png',
    './cube.png',
    './triangle.png',
    './pentagon.png',
    './square.png',
    './pyramid.png',
    './diamond.png',
    './cross.png',
    './star_9.png',
    './cylinder.png',
    './cuboid.png',

  ]
 useEffect(() => {
  

  
    const newGame = []
    for (let i = 0; i < options / 2; i++) {
      const firstOption = {
        id: 2 * i,
        colorId: i,
        color: colors[i],
        flipped: false,
      }
      const secondOption = {
        id: 2 * i + 1,
        colorId: i,
        color: colors[i],
        flipped: false,
      }

      newGame.push(firstOption)
      newGame.push(secondOption)
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5)
    setGame(shuffledGame)
  }, [])

  useEffect(() => {
    const finished = !game.some(card => !card.flipped)
    if (finished && game.length > 0) {
      setTimeout(() => {
        const bestPossible = game.length
        let multiplier
  
        if (options === 12) {
          multiplier = 5
        } else if (options === 16) {
          multiplier = 2.5
        } else if (options === 20) {
          multiplier = 1
        }
  
        const pointsLost = multiplier * (0.6 * flippedCount - bestPossible)
  
        let score
        if (pointsLost < 100) {
          score = 100 - pointsLost
          score=score.toPrecision(2);
        } else {
          score = 0
        }
  
        if (score > highScore) {
          setHighScore(score)
          const json = JSON.stringify(score)
          localStorage.setItem('memorygamehighscore', json)
        }
        
        confirmAlert({
          title: 'SCORE: '+ score + ' New Game?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                const gameLength = game.length
                setMoves(0)
                stop()
                setOptions(null)
                setTimeout(() => {
                  setOptions(gameLength)
                }, 5)
              }
            },
            {
              label: 'No',
              onClick: () => {
                setOptions(null)
                setMoves(0)
                reset()
              }
            }
          ],
          overlayClassName: "overlay"
        }
        );
       
      }, 500)
    }
  }, [game])

  if (flippedIndexes.length === 2) {
    const match = game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId
  
    if (match) {
      const newGame = [...game]
      newGame[flippedIndexes[0]].flipped = true
      newGame[flippedIndexes[1]].flipped = true
      setGame(newGame)
  
      const newIndexes = [...flippedIndexes]
      newIndexes.push(false)
      setFlippedIndexes(newIndexes)
    } else {
      const newIndexes = [...flippedIndexes]
      newIndexes.push(true)
      setFlippedIndexes(newIndexes)
    }
  }

  if (game.length === 0) return <div>loading...</div>
  else {
    return (
      <div id="cards">
        {game.map((card, index) => (
          <div className="card" key={index}>
            <Card
              id={index}
              color={card.color}
              game={game}
              flippedCount={flippedCount}
              setFlippedCount={setFlippedCount}
              flippedIndexes={flippedIndexes}
              setFlippedIndexes={setFlippedIndexes}
              moves={moves}
              setMoves={setMoves}
            />
          </div>
        ))}
      </div>
    )
  }
}

function Card({
  id,
  color,
  game,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
  moves,
  setMoves,
}) {
  const [flipped, set] = useState(false)
  const {transform, opacity} = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: {mass: 5, tension: 500, friction: 80},
  })

  useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        set(state => !state)
        setFlippedCount(flippedCount + 1)
        setFlippedIndexes([])
        setMoves(moves+1)
      }, 700)
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedCount(flippedCount + 1)
      setFlippedIndexes([])
      setMoves(moves+1)

    }
  }, [flippedIndexes])
  

  const onCardClick = () => {
    if (!game[id].flipped && flippedCount % 3 === 0) {
      set(state => !state)
      setFlippedCount(flippedCount + 1)
      const newIndexes = [...flippedIndexes]
      newIndexes.push(id)
      setFlippedIndexes(newIndexes)
      
    } else if (
      flippedCount % 3 === 1 &&
      !game[id].flipped &&
      flippedIndexes.indexOf(id) < 0
    ) {
      set(state => !state)
      setFlippedCount(flippedCount + 1)
      const newIndexes = [...flippedIndexes]
      newIndexes.push(id)
      setFlippedIndexes(newIndexes)
    }
  }

  return (
    
    <div onClick={onCardClick}>
    
      <a.div
        className="c back"
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      />
      <a.div
        className="c front"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          backgroundImage:`url(${color})`
         
        }}
      />
    </div>
  )
}
