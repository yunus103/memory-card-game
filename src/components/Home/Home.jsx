import title from "../../assets/title.png"

export default function Home({ onDifficultyPick }) {
  const difficulties = ["easy", "medium", "hard"];

  return (
    <>
      <img src={title} alt="title" className="homeImage"/>
      <h3 className="outlined-text">Memory Game</h3>
      <div className="diffuculty-buttons">
        {difficulties.map((level) => (
          <button
            key={level}
            onClick={() => onDifficultyPick(level)}
            className="diffuculty-btn"
          >
            {level.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}
