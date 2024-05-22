import React, {useState, useEffect} from "react";
import "./App.css";
import Single from "./Components/Single";

// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function App() {
  const [initialColor, setInitialColor] = useState("");

  useEffect(() => {
    // Set initial random color when the component mounts
    const color = getRandomColor();
    setInitialColor(color);
  }, []);

  return (
    <div className="App">
      <Single initialColor={initialColor} fullSize={true} />
    </div>
  );
}

export default App;
