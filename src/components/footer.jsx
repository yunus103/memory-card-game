import { MdOutlineQuestionMark } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleHelp = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <footer>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="info-box"
            // Başlangıç: Görünmez ve 50px aşağıda (kendi konumuna göre)
            initial={{ opacity: 0, y: 50 }}
            // Giriş: Tamamen görünür ve y: 0 (orijinal konumu)
            animate={{ opacity: 1, y: 0 }}
            // Çıkış: Tekrar görünmez ve 50px aşağıya kayar
            exit={{ opacity: 0, y: 50 }}
            // Animasyon süresi
            transition={{ duration: 0.3 }}
          >
            <p className="info-text">Don’t click on the same card twice!</p>
            <p className="info-text">Click the logo to go back.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" onClick={handleHelp} className="info-button">
        {isOpen === true ? <IoMdClose /> : <MdOutlineQuestionMark />}
      </button>
    </footer>
  );
}
