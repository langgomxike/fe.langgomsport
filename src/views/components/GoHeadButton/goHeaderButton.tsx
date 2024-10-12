import React, { useState, useEffect } from "react";
import "./goHeaderButton.css";
import { IoHomeOutline } from "react-icons/io5";

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
          <IoHomeOutline />
        </button>
      )}
    </>
  );
};

export default GoHeaderButton;
