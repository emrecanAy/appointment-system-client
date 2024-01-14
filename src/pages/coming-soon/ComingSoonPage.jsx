import React, { useEffect, useState } from "react";
import "./test.css";
import glowcutLogo from "../../global/gc1.png";
import { useNavigate } from "react-router-dom";

function ComingSoonPage() {
  const targetDate = new Date("2024-01-22T18:00:00");
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Temizleme işlemi
    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeRemaining() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      // Hedef tarih geçtiyse, sıfıra ayarla
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <header className="comingsoonheader">
      <div className="comingsooncontent">
        <img
          src={glowcutLogo}
          alt="Glowcut Logo"
          style={{ maxWidth: "250px" }}
        />
        <h2>YAKINDA GELECEK</h2>
        <div className="countdown">
          {" "}
          {`${timeRemaining.days} : ${timeRemaining.hours} : ${timeRemaining.minutes} : ${timeRemaining.seconds}`}
        </div>
        <br />
        <button
          style={{
            background: "transparent",
            border: "1px solid #ffffff",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "4px",
            opacity: "0.7",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Geri Dön
        </button>
      </div>
    </header>
  );
}

export default ComingSoonPage;
