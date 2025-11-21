import defeat from "../assets/defeat.webp";
import win from "../assets/win.webp";

export default function GameOver({ status, handleRestartClick }) {
  return (
    <>
      <div className="game-over-modal">
        <div className="game-over-title">
          {status === true ? "You Win!" : "You Lose!"}
        </div>

        {status === true ? (
          <img src={win} alt="Won the Game" />
        ) : (
          <img src={defeat} alt="Defeated" />
        )}

        <button type="button" className="restart" onClick={handleRestartClick}>
          Restart
        </button>
      </div>
    </>
  );
}
