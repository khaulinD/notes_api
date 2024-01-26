import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

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

  // const sendFeedBack = () =>{
  //
  // }

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
      <h2> React Ratings </h2>
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
      />

      <button style={styles.button} >Submit</button>
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
