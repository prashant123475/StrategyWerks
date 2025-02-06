import React, { useEffect, useState } from "react";
import "../css/Toast.css";

const Toast = ({ message, type = "success" }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!visible) return null;

  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
