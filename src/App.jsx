import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import Footer from "./components/footer";
import Toast from "./components/Toast";
import { motion } from "framer-motion";

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
  };

  return (
    <>
      {difficulty === null ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }} // Başlangıçta yarım boyutta ve görünmez
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, duration: 1.0 }} // Yay (spring) efekti ekler
        >
          <Home onDifficultyPick={handleDifficultyChange}></Home>
        </motion.div>
      ) : (
        <Game
          difficulty={difficulty}
          allCards={allCards}
          onRestart={restartGame}
        ></Game>
      )}
      <motion.div
        initial={{ opacity: 0, bottom: -100 }} // Başlangıçta 50 piksel aşağıda ve görünmez
        animate={{ opacity: 1, bottom: 0 }} // Hedef: Kendi orijinal konumunda ve görünür
        transition={{ duration: 0.7 }}
      >
        <Footer></Footer>
      </motion.div>

      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={hideToast}
      />
    </>
  );
}

export default App;
