import { useEffect, useMemo, useState } from "react";
import title from "../../assets/title.png";
import Tilt from "react-parallax-tilt";
import shuffleCards from "../../utils/shuffle";
import GameOver from "../GameOver";

const difficultyMap = {
  easy: 3,
  medium: 4,
  hard: 5,
  easyRounds: 5,
  mediumRounds: 7,
  hardRounds: 10,
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
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (cardsForGame.length > 0) {
      setCardsForRound(shuffleCards(cardsForGame, cardsToShowSize));
    }
  }, [cardsForGame, cardsToShowSize]);

  const playRound = (cardId) => {
    if (isFlipped) return;

    if (clickedCards.includes(cardId)) {
      setIsGameOver(true);
      return;
    }

    const updatedClicked = [...clickedCards, cardId];
    let unpicked = cardsForGame.filter(
      (card) => !updatedClicked.includes(card.id)
    );

    if (unpicked.length === 0) {
      setScore((prev) => prev + 1);
      setBestScore((prev) => Math.max(prev, score + 1));
      setIsGameWon(true);
      setIsGameOver(true);
      return;
    }

    setIsFlipped(true);

    setTimeout(() => {
      const requiredFreshCard = shuffleCards(unpicked, 1)[0];
      const remainingPool = cardsForGame.filter(
        (card) => card.id !== requiredFreshCard.id
      );
      const others = shuffleCards(remainingPool, cardsToShowSize - 1);
      const nextRound = [requiredFreshCard, ...others];
      setCardsForRound(shuffleCards(nextRound, nextRound.length));
    }, 1000);

    setTimeout(() => {
      setIsFlipped(false);
    }, 1200);

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
    setRestartSeed((prev) => prev + 1);
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
            <div
              key={card.id}
              className={isFlipped ? "card flipped" : "card"}
              onClick={() => playRound(card.id)}
            >
              <Tilt
                glareEnable={false}
                glareMaxOpacity={0.6}
                glareColor="#ffffff"
                glarePosition="bottom"
                glareBorderRadius="15px"
                className="tilt"
              >
                {/* NEW WRAPPER HERE */}
                <div className="inner-flip">
                  <div className="cardFace">
                    <img src={card.image_uris.art_crop} alt="" />
                    <p>{card.name.split(",")[0]}</p>
                  </div>
                  <div className="cardBack"></div>
                </div>
              </Tilt>
            </div>
          ))}
        </div>
        <p className="card-score">
          {score} / {cardsToPlaySize}
        </p>
      </main>
      {isGameOver && (
        <GameOver
          status={isGameWon}
          handleRestartClick={handleRestart}
        ></GameOver>
      )}
    </>
  );
}