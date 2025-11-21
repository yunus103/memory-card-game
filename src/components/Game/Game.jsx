import { useEffect, useMemo, useState } from "react";
import title from "../../assets/title.png";
import Tilt from "react-parallax-tilt";
import shuffleCards from "../../utils/shuffle";
import GameOver from "../GameOver";

const difficultyMap = {
  easy: 3, // Cards to show in easy
  medium: 4, // Cards to show in medium
  hard: 5, // Cards to show in hard
  easyRounds: 5, // All cards in easy game(rounds)
  mediumRounds: 7, // All cards in medium game(rounds)
  hardRounds: 10, // All cards in hard game(rounds)
};


export default function Game({ difficulty, allCards, onRestart }) {
  const cardsToShowSize = difficultyMap[difficulty];
  const cardsToPlaySize = difficultyMap[difficulty + "Rounds"];
  const [restartSeed, setRestartSeed] = useState(0);

  const cardsForGame = useMemo(() => {
    return shuffleCards(allCards, cardsToPlaySize);
  }, [allCards, cardsToPlaySize, restartSeed]);

  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cardsForRound, setCardsForRound] = useState([]);
  const [isGameWon, setIsGameWon] = useState(false);
  

  useEffect(() => {
    if (cardsForGame.length > 0) {
      setCardsForRound(shuffleCards(cardsForGame, cardsToShowSize));
    }
  }, [cardsForGame, cardsToShowSize]);


  const playRound = (cardId) => {
    if (clickedCards.includes(cardId)) {
      setIsGameOver(true);
      return;
    }

    const updatedClicked = [...clickedCards, cardId];

    let unpicked = cardsForGame.filter(
      (card) => !updatedClicked.includes(card.id)
    );

    if(unpicked.length === 0) {
      setScore((prev) => prev +1);
      setBestScore((prev) => Math.max(prev, score + 1));
      setIsGameWon(true);
      setIsGameOver(true);
      return;
    }

    // Pick 1 fresh card
    const requiredFreshCard = shuffleCards(unpicked, 1)[0];

    const remainingPool = cardsForGame.filter(
      (card) => card.id !== requiredFreshCard.id
    );

    // Select N-1 cards from remaining pool
    const others = shuffleCards(remainingPool, cardsToShowSize - 1);
    const nextRound = [requiredFreshCard, ...others];

    setCardsForRound(shuffleCards(nextRound, nextRound.length));
    setClickedCards(updatedClicked);
    setScore((prevScore) => {
    const newScore = prevScore + 1;
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
    return newScore;
  });
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setIsGameWon(false);
    setScore(0);
    setClickedCards([]);
    setCardsForRound([]);
    setRestartSeed(prev => prev + 1);
  };

  return (
    <>
      <header>
        <img src={title} alt="logo" width="300px" onClick={onRestart} />
        <div className="score-info">
          <p className="score-text">Score: {score}</p>
          <p className="score-text">Best Score: {bestScore}</p>
        </div>
      </header>

      <main>
        <div className="cards">
          {cardsForRound.map((card) => (
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.8}
              glareColor="#ffffff"
              glarePosition="bottom"
              glareBorderRadius="15px"
              key={card.id}
            >
              <div className="card" onClick={() => playRound(card.id)}>
                <img src={card.image_uris.art_crop} alt="" />
                <p>{card.name.split(",")[0]}</p>
              </div>
            </Tilt>
          ))}
        </div>
        <p className="card-score">
          {score} / {cardsToPlaySize}
        </p>
      </main>
      {isGameOver && <GameOver status={isGameWon} handleRestartClick={handleRestart}></GameOver>}
    </>
  );
}
