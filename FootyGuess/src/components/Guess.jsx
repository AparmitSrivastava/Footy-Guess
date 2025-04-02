// import { useEffect, useState } from 'react'
// import { getClubsByComp } from '../api/Competitions';
// import { getPlayersByClub } from '../api/Clubs';
// import { getPlayerInfo, getMostValuablePlayers, getRecordValuePlayers } from '../api/Players';

// import PlayerCard from './PlayerCard';
// import Loading from './Loading';

// import * as stringSimilarity from 'string-similarity';
// import removeAccents from 'remove-accents';

// const competitionsIds = ["GB1", "L1", "ES1", "IT1", "FR1"];

// function Guess({ gameState, onTotalScoreChange, onNbGuessChange }) {

//   const [playerToGuess, setPlayerToGuess] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userGuessText, setUserGuessText] = useState("");
//   const [nbAttemps, setNbAttemps] = useState(0);
//   const [currentScore, setCurrentScore] = useState(10);
//   const [listPlayersIds, setListPlayersIds] = useState([]);
//   const [feedbackMessage, setFeedbackMessage] = useState("")


//   useEffect(() => {
//     setListPlayersIds([])

//   }, [gameState.step]);

//   useEffect(() => {
//     startGuess();

//   }, [gameState.guess_number, gameState.step]);

//   function addPlayerToList(idPlayer) {
//     let newList = listPlayersIds
//     newList.push(idPlayer);

//     setListPlayersIds(newList)
//   }

//   function startGuess() {
//     if (!isLoading) {
//       setIsLoading(true);

//       setUserGuessText("");
//       setNbAttemps(0);
//       setCurrentScore(10)

//       const fetchPlayerToGuess = async () => {
//         getGuessPlayer(gameState.difficulty, listPlayersIds).then(player => {
//           addPlayerToList(player.id);
//           setPlayerToGuess(player)
//           setIsLoading(false);
//         });
//       };

//       fetchPlayerToGuess()
//     }
//   }

//   function handleUserText(e) {
//     setUserGuessText(e.target.value);
//   }

//   function decrementScore(nb) {
//     let newScore = currentScore - nb;
//     if (newScore < 1) {
//       newScore = 1;
//     }

//     if (newScore != currentScore) {
//       setCurrentScore(newScore);
//     }
//   }

//   function verifyUserGuess() {
//     let compareName = stringSimilarity.compareTwoStrings(removeAccents(playerToGuess.name.toLowerCase()), removeAccents(userGuessText.toLowerCase()));
//     let compareFullName = stringSimilarity.compareTwoStrings(removeAccents(playerToGuess.fullName.toLowerCase()), removeAccents(userGuessText.toLowerCase()));

//     if (compareFullName >= 0.8 || compareName >= 0.8) {
//       setFeedbackMessage("✅ Correct! Well done! 🎉")
//       playerFound();
//     } else {
//       setFeedbackMessage("❌ Wrong answer! Try again.")
//       setNbAttemps(nbAttemps + 1);
//     }
//     setUserGuessText("");
//   }


//   function playerFound() {
//     onTotalScoreChange(currentScore);
//   }

//   function handleKeyDown(event, key, func) {
//     //On key down launch function
//     if (event.key == key) {
//       func();
//     }
//   }

//   if (isLoading) {
//     return (
//       <Loading />
//     );
//   } else if (nbAttemps < 3) {
//     return (
//       <div className='w-full overflow-auto'>
//         <div className='min-h-12 header flex items-center justify-between p-4 bg-purple-500 text-white rounded-t-lg'>
//           <span>Attemps: {nbAttemps}/3</span>
//           <span>Possible score : {currentScore}</span>
//         </div>

//         <PlayerCard player={playerToGuess} onDecrementScore={decrementScore} showAll={false} ></PlayerCard>

//         <div className='flex flex-row items-center justify-center mt-auto min-h-12 mb-2 gap-5'>

//           <input type="text" value={userGuessText} onChange={handleUserText} onKeyDown={(event) => handleKeyDown(event, "Enter", verifyUserGuess)} className="w-1/2 px-4 py-1 text-lg rounded-full border-2 border-purple-300 outline-purple-400 text-center" placeholder="Enter Your Answer" />
//           <button onClick={verifyUserGuess} className="inline-flex items-center justify-center w-28 h-8 text-black bg-purple-400 transition-colors duration-150 rounded-full font-semibold focus:shadow-outline border border-purple-400 hover:bg-purple-600 hover:border-transparent hover:text-white">
//             {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
//             </svg> */}
//             Submit
//           </button>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className='flex flex-col justify-between w-full overflow-auto'>
//         <div className='min-h-12 header flex items-center justify-between p-4 bg-purple-500 text-white rounded-t-lg'>
//           <span>Attemps: {nbAttemps}/3</span>
//           <span>Possible score : {currentScore}</span>
//         </div>
//         <PlayerCard player={playerToGuess} onDecrementScore={decrementScore} showAll={true} ></PlayerCard>

//         <div className='flex flex-col items-center justify-between mt-auto min-h-12'>

//           {/* <span className="text-3xl text-[#fcfcfd] font-medium mx-auto" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>{playerToGuess.fullName}</span> */}
//           <span className="text-4xl font-bold text-white mx-auto drop-shadow-[2px_2px_0px_black] drop-shadow-[-2px_-2px_0px_black] drop-shadow-[-2px_2px_0px_black] drop-shadow-[2px_-2px_0px_black]">{playerToGuess.fullName}</span>


//           <button onClick={onNbGuessChange} className="w-1/2 mx-auto my-2 px-3 py-1 transition-colors text-lg text-white bg-purple-500 font-bold rounded-full border border-purple-200 hover:bg-purple-700 hover:border-transparent">Next Player</button>
//         </div>
//       </div>
//     );
//   }


// }




// async function getGuessPlayer(difficulty, listPlayersIds) {

//   let page, players;

//   switch (difficulty) {
//     case "easy":
//       //page 1 à 8
//       page = Math.floor(Math.random() * (8) + 1);

//       players = await getRecordValuePlayers(page);
//       break;
//     case "medium":
//       //page 1 à 20
//       page = Math.floor(Math.random() * (20) + 1);

//       players = await getMostValuablePlayers(page);
//       break;
//     case "hard":
//       let competition_id = randomArrayElement(competitionsIds);

//       let clubs = await getClubsByComp(competition_id);
//       let club_guess = randomArrayElement(clubs);

//       players = await getPlayersByClub(club_guess.id);
//       break;
//   }

//   let player = randomArrayElement(players);

//   //Si le joueur a déjà été tiré, on relance la fonction
//   if (listPlayersIds.includes(player.id)) {
//     console.log("duplicate player, retry...")
//     return getGuessPlayer(difficulty, listPlayersIds);
//   } else {
//     let player_info = await getPlayerInfo(player.id);
//     player.fullName = player.name;
//     player = { ...player, ...player_info };

//     return player;
//   }
// }

// function randomArrayElement(array) {
//   let max = array.length;
//   let random_index = Math.floor(Math.random() * (max));

//   return array[random_index];
// }


// export default Guess;





















































import { useEffect, useState } from 'react'
import { getClubsByComp } from '../api/Competitions';
import { getPlayersByClub } from '../api/Clubs';
import { getPlayerInfo, getMostValuablePlayers, getRecordValuePlayers } from '../api/Players';

import PlayerCard from './PlayerCard';
import Loading from './Loading';

import * as stringSimilarity from 'string-similarity';
import removeAccents from 'remove-accents';

const competitionsIds = ["GB1", "L1", "ES1", "IT1", "FR1"];

function Guess({ gameState, onTotalScoreChange, onNbGuessChange }) {

  const [playerToGuess, setPlayerToGuess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userGuessText, setUserGuessText] = useState("");
  const [nbAttemps, setNbAttemps] = useState(0);
  const [currentScore, setCurrentScore] = useState(10);
  const [listPlayersIds, setListPlayersIds] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // ✅ Feedback message state

  useEffect(() => {
    setListPlayersIds([]);
  }, [gameState.step]);

  useEffect(() => {
    startGuess();
  }, [gameState.guess_number, gameState.step]);

  function addPlayerToList(idPlayer) {
    setListPlayersIds([...listPlayersIds, idPlayer]); // ✅ Corrected list update
  }

  function startGuess() {
    if (!isLoading) {
      setIsLoading(true);
      setUserGuessText("");
      setNbAttemps(0);
      setCurrentScore(10);

      setTimeout(() => setFeedbackMessage(""), 500); // ✅ Prevents premature reset

      const fetchPlayerToGuess = async () => {
        getGuessPlayer(gameState.difficulty, listPlayersIds).then(player => {
          addPlayerToList(player.id);
          setPlayerToGuess(player);
          setIsLoading(false);
        });
      };

      fetchPlayerToGuess();
    }
  }

  function handleUserText(e) {
    setUserGuessText(e.target.value);
  }

  function decrementScore(nb) {
    setCurrentScore((prev) => Math.max(prev - nb, 1)); // ✅ Corrected score decrement logic
  }

  function verifyUserGuess() {
    let compareName = stringSimilarity.compareTwoStrings(removeAccents(playerToGuess.name.toLowerCase()), removeAccents(userGuessText.toLowerCase()));
    let compareFullName = stringSimilarity.compareTwoStrings(removeAccents(playerToGuess.fullName.toLowerCase()), removeAccents(userGuessText.toLowerCase()));

    if (compareFullName >= 0.8 || compareName >= 0.8) {
      setFeedbackMessage("✅ Correct! Well done! 🎉");
      setTimeout(() => {
        playerFound(); 
      }, 1500); 
      
    } else {
      setFeedbackMessage("❌ Wrong answer! Try again.");
      setNbAttemps((prev) => prev + 1);
    }

    // ✅ Ensure feedback message stays before clearing input
    setTimeout(() => setUserGuessText(""), 500);
  }

  function playerFound() {
    onTotalScoreChange(currentScore);
  }

  function handleKeyDown(event, key, func) {
    if (event.key === key) {
      func();
    }
  }

  useEffect(() => {
    console.log("Feedback Message Updated:", feedbackMessage);
  }, [feedbackMessage]);

  if (isLoading) {
    return <Loading />;
  } else if (nbAttemps < 3) {
    return (
      <div className='w-full overflow-auto'>
        <div className='min-h-12 header flex items-center justify-between p-4 bg-purple-500 text-white rounded-t-lg'>
          <span>Attempts: {nbAttemps}/3</span>
          <span>Possible score: {currentScore}</span>
        </div>

        <PlayerCard player={playerToGuess} onDecrementScore={decrementScore} showAll={false} />

        {feedbackMessage && (
          <p className="text-lg font-semibold text-white bg-purple-400 p-2 rounded-2xl text-center">
            {feedbackMessage}
          </p>
        )}

        <div className='flex flex-row items-center justify-center mt-auto min-h-12 mb-2 gap-5'>
          <input 
            type="text" 
            value={userGuessText} 
            onChange={handleUserText} 
            onKeyDown={(event) => handleKeyDown(event, "Enter", verifyUserGuess)} 
            className="w-1/2 px-4 py-1 text-lg rounded-full border-2 border-purple-300 outline-purple-400 text-center" 
            placeholder="Enter Your Answer" 
          />
          <button 
            onClick={verifyUserGuess} 
            className="inline-flex items-center justify-center w-28 h-8 text-black bg-purple-400 transition-colors duration-150 rounded-full font-semibold focus:shadow-outline border border-purple-400 hover:bg-purple-600 hover:border-transparent hover:text-white"
          >
            Submit
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col justify-between w-full overflow-auto'>
        <div className='min-h-12 header flex items-center justify-between p-4 bg-purple-500 text-white rounded-t-lg'>
          <span>Attempts: {nbAttemps}/3</span>
          <span>Possible score: {currentScore}</span>
        </div>
        <PlayerCard player={playerToGuess} onDecrementScore={decrementScore} showAll={true} />

        <div className='flex flex-col items-center justify-between mt-auto min-h-12'>
          <span className="text-4xl font-bold text-white mx-auto drop-shadow-[2px_2px_0px_black] drop-shadow-[-2px_-2px_0px_black] drop-shadow-[-2px_2px_0px_black] drop-shadow-[2px_-2px_0px_black]">
            {playerToGuess.fullName}
          </span>

          <button 
            onClick={onNbGuessChange} 
            className="w-1/2 mx-auto my-2 px-3 py-1 transition-colors text-lg text-white bg-purple-500 font-bold rounded-full border border-purple-200 hover:bg-purple-700 hover:border-transparent"
          >
            Next Player
          </button>
        </div>
      </div>
    );
  }
}

async function getGuessPlayer(difficulty, listPlayersIds) {
  let page, players;

  switch (difficulty) {
    case "easy":
      page = Math.floor(Math.random() * 8 + 1);
      players = await getRecordValuePlayers(page);
      break;
    case "medium":
      page = Math.floor(Math.random() * 20 + 1);
      players = await getMostValuablePlayers(page);
      break;
    case "hard":
      let competition_id = randomArrayElement(competitionsIds);
      let clubs = await getClubsByComp(competition_id);
      let club_guess = randomArrayElement(clubs);
      players = await getPlayersByClub(club_guess.id);
      break;
  }

  let player = randomArrayElement(players);

  if (listPlayersIds.includes(player.id)) {
    return getGuessPlayer(difficulty, listPlayersIds);
  } else {
    let player_info = await getPlayerInfo(player.id);
    player.fullName = player.name;
    return { ...player, ...player_info };
  }
}

function randomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export default Guess;
