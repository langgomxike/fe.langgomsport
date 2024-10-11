import React, { useState, useEffect } from "react";
import "./goHeaderButton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const GoHeaderButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDelayedVisible, setIsDelayedVisible] = useState(false);
  const handleClick = () => {
    window.location.href = "#";
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const delay = setTimeout(() => {
        setIsDelayedVisible(true);
      }, 500);

      return () => clearTimeout(delay);
    } else {
      const delay = setTimeout(() => {
        setIsDelayedVisible(false);
      }, 500);

      return () => clearTimeout(delay);
    }
  }, [isVisible]);

  return (
    <>
      {isDelayedVisible && (
        <button className="button" onClick={handleClick}>
          <i className="bi bi-house-door icon"></i>
        </button>
      )}
    </>
  );
};

export default GoHeaderButton;
