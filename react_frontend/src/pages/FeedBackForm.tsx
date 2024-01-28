import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
// import axios from 'axios';

interface Styles {
  [key: string]: React.CSSProperties;
}

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

const FeedBackForm: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const stars = Array(5).fill(0);
  const [feedback, setFeedback] = useState('');
  const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(feedback!="") {
          try {
            const userInfoString = sessionStorage.getItem("userInfo")
            const userId = localStorage.getItem("user_id")
            if (userInfoString !== null && userId !== null) {

                // const userInfo = JSON.parse(userInfoString)
                // const user_email = userInfo.email;
              await axios.post('http://localhost:8000/api/feedback/', {message: feedback, sender:userId, stars: currentValue});
              alert('Feedback submitted successfully!');
              setFeedback('');
              setCurrentValue(0);
              } else {
                console.error('userInfo is not available in sessionStorage');
              }

          } catch (error) {
            console.error('Error submitting feedback:', error);
          }
        }else {
          alert('Feedback don`t be empty!');
        }
    };


  const handleClick = (value: number) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div style={styles.container}>
      <h2> Ratings </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={
              (hoverValue || currentValue) > index
                ? colors.orange
                : colors.grey
            }
            style={{
              marginRight: 10,
              cursor: "pointer"
            }}
          />
        ))}
      </div>
      <textarea
        placeholder="What's your experience?"
        style={styles.textarea}
        value={feedback} onChange={(e) => setFeedback(e.target.value)}

      />

      <button style={styles.button} onClick={handleSubmit} >Submit</button>
    </div>
  );
};

const styles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row"
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10
  }
};

export default FeedBackForm;
