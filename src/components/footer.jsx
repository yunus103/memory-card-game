import { MdOutlineQuestionMark } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleHelp = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <footer>
      {isOpen && (
        <div className="info-box">
          <p className="info-text">Don’t click on the same card twice!</p>
          <p className="info-text">Click the logo to go back.</p>
        </div>
      )}

      <button type="button" onClick={handleHelp} className="info-button">
        {isOpen === true ? <IoMdClose /> : <MdOutlineQuestionMark />}
      </button>
    </footer>
  );
}
