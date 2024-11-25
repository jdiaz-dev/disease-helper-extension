import React from "react";
import "./App.css";

function Helper() {
  const changeBackgroundColor = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id as number },
        func: () => {
          const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`;
          document.body.style.backgroundColor = randomColor;
        },
      });
    });
  };

  return (
    <div className="App">
      <h1>Change Background</h1>
      <button onClick={changeBackgroundColor}>Change Now</button>
    </div>
  );
}

export default Helper;
