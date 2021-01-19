import React, { useEffect } from "react";
import useKonamiCode from "./useKonamiCode";

function App() {
  const correctCodeEntered = useKonamiCode();

  // Show an alert dialog if the key sequence is completed
  useEffect(() => {
    if (correctCodeEntered) {
      alert("You entered the Konami code!");
    }
  }, [correctCodeEntered]);

  return (
    <div className="App">
      <p>
        <span>Enter the key sequence:</span>
        <code style={{ paddingLeft: 6 }}>
          up up down down left right left right B A
        </code>
      </p>
      <p>After a successful input of the sequence the hook will reset.</p>
      <p>
        Wait 3 seconds between attempts for the previous input to automatically
        clear.
      </p>
    </div>
  );
}

export default App;
