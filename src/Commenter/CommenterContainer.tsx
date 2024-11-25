import React, { useState } from "react";

function CommenterContainer() {
  const [firstId, setFirstId] = useState("reply-button-end");
  const [firstClass, setFirstClass] = useState(
    "yt-spec-touch-feedback-shape__fill"
  );
  const [secondClass, setSecondClass] = useState("contenteditable-root");
  const [thirdClass, setThirdTag] = useState("");
  const [message, setMessage] = useState("");

  const onclickHandler = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id as number },
        func: async (firstId, firstClass, secondClass, thirdClass, message) => {
          console.log("--1", firstClass);
          console.log("--2", secondClass);
          console.log("--3", thirdClass);
          console.log("--4", message);
          const idsArr: any = document.querySelectorAll(`#${firstId}`);

          for (let x = 0; x < idsArr.length; x++) {
            await new Promise((resolve) =>
              setTimeout(() => {
                idsArr[x].getElementsByClassName(firstClass)[0].click();
                resolve(undefined);
              }, 1000)
            );
          }

          const commentBoxes: any = document.querySelectorAll(
            `#${secondClass}`
          );
          //contenteditable-textarea
          console.log("--commentBoxes 1", commentBoxes);
          for (let x = 0; x < commentBoxes.length; x++) {
            await new Promise((resolve) => {
              setTimeout(() => {
                commentBoxes[x].textContent = message;

                resolve(undefined);
              }, 1000);
            });
          }
          console.log("--commentBoxes 2", commentBoxes);

        },
        args: [firstId, firstClass, secondClass, thirdClass, message],
      });
    });
  };

  return (
    <div>
      <input
        placeholder="first id"
        type="text"
        value={firstId}
        onChange={(e) => setFirstId(e.target.value)}
      />
      <br />

      <input
        placeholder="first class"
        type="text"
        value={firstClass}
        onChange={(e) => setFirstClass(e.target.value)}
      />
      <br />

      <input
        placeholder="second class"
        type="text"
        value={secondClass}
        onChange={(e) => setSecondClass(e.target.value)}
      />
      <br />
      <input
        placeholder="third class"
        type="text"
        value={thirdClass}
        onChange={(e) => setThirdTag(e.target.value)}
      />
      <br />
      <textarea
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={onclickHandler}>START</button>
    </div>
  );
}

export default CommenterContainer;

/* 
reply-button-end
yt-spec-touch-feedback-shape__fill
yt-formatted-string


ytd-commentbox

*/
