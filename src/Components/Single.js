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
        border: fullSize ? "none" : "1px solid black",
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
          <button onClick={() => handleClick("V")}>V</button>
          <button onClick={() => handleClick("H")}>H</button>
          {removeSelf && (
            <button
              onClick={removeSelf}
              style={{position: "absolute", top: 10, right: 10}}
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Single;
