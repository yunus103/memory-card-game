import { useEffect } from "react";

export default function Toast({ message, isVisible, onClose }) {
  // auto hide after 3 seconds
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast">
      <p>{message}</p>
    </div>
  );
}
