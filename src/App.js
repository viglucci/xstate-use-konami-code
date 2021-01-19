import React, { useEffect } from 'react';
import useKonamiCode from "./useKonamiCode";

function App() {
  const wasCodeEntered = useKonamiCode();

  useEffect(() => {
    if (wasCodeEntered) {
      alert("You entered the Konami code!")
    }
  }, [wasCodeEntered]);

  return (
    <div className="App">
      <span>Enter the key sequence:</span>
      <code style={{ paddingLeft: 6 }}>
        up up down down left right left right B A
      </code>
    </div>
  );
}

export default App;
