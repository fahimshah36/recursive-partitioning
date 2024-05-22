import React, {useState} from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Single = ({initialColor, fullSize = false, removeSelf}) => {
  const [split, setSplit] = useState(null);
  const [childColors, setChildColors] = useState([]);

  const handleClick = (type) => {
    const newColor = getRandomColor();
    if (split) return; // Prevent further splitting
    const oldColor = initialColor;
    const colors = type === "V" ? [oldColor, newColor] : [newColor, oldColor];
    setChildColors(colors);
    setSplit(type);
  };

  const handleRemove = (indexToRemove) => {
    const newColors = childColors.filter((_, index) => index !== indexToRemove);
    setChildColors(newColors);
    if (newColors.length === 0 && removeSelf) {
      removeSelf();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: split === "H" ? "column" : "row",
        height: fullSize ? "100vh" : "100%",
        width: fullSize ? "100vw" : "100%",
        backgroundColor: initialColor,
        position: "relative",
      }}
    >
      {split ? (
        <>
          {childColors.map((color, index) => (
            <Single
              key={index}
              initialColor={color}
              removeSelf={() => handleRemove(index)}
            />
          ))}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            height: "100%",
            width: "100%",
          }}
        >
          <button
            onClick={() => handleClick("V")}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#A9A9A9",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#808080")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#A9A9A9")}
          >
            V
          </button>
          <button
            onClick={() => handleClick("H")}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#A9A9A9",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#808080")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#A9A9A9")}
          >
            H
          </button>
          {removeSelf && (
            <button
              onClick={removeSelf}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#FF0000",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                position: "absolute",
                top: 10,
                right: 10,
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#FF6347")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FF0000")}
            >
              -
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Single;
