import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import Footer from "./components/footer";
import Toast from "./components/Toast";

function App() {
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [allCards, setAllCards] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          "https://api.scryfall.com/cards/search?q=set:tmt&unique=cards"
        );

        const data = await response.json();
        setAllCards(data.data);
      } catch (error) {
        console.error("Failed to fetch TMNT cards:", error);
        showToast("Failed to load cards. Try again.");
      }
    };
    fetchCards();
  }, []);

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const restartGame = () => {
    setDifficulty(null);
  }

  return (
    <>
      {difficulty === null ? (
        <Home onDifficultyPick={handleDifficultyChange}></Home>
      ) : (
        <Game difficulty={difficulty} allCards={allCards} onRestart={restartGame}></Game>
      )}
      <Footer></Footer>
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={hideToast}
      />
    </>
  );
}

export default App;
