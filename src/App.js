import axios from "axios";
import React from "react";
import "./App.css";
// import print from "./testPrint";
// import printer from "./testPrint";

function App() {
  const [count, setCount] = React.useState(0);

  // const increment = () => {
  //   setCount(count + 1);
  // };
  const print = async () => {
    console.log("here");
    await axios.get("http://localhost:8000/print");
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <>
      <p>{count} ffffff</p>
      <button onClick={print}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  );
}

export default App;
