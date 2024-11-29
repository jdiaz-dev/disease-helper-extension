import React, { useState } from "react";

/* declare global {
  interface Window {
    X: number;
  }
}

window.X; */
function CommenterContainer() {
  const [firstId, setFirstId] = useState("reply-button-end");
  const [firstClass, setFirstClass] = useState(
    "yt-spec-touch-feedback-shape__fill"
  );
  const [secondClass, setSecondClass] = useState("contenteditable-root");
  const [thirdClass, setThirdTag] = useState("submit-button");
  const [message, setMessage] = useState("i");

  const activateRepplyButton = async (
    idForContainerRepplyButton: string,
    classForReppyButton: string
  ) => {
    const idsArr: any = document.querySelectorAll(
      `#${idForContainerRepplyButton}`
    );

    for (let x = 0; x < idsArr.length; x++) {
      await new Promise((resolve) =>
        setTimeout(() => {
          idsArr[x].getElementsByClassName(classForReppyButton)[0].click();
          resolve(undefined);
        }, 1000)
      );
    }
  };

  const writeComment = async (
    classForInputComment: string,
    message: string
  ) => {
    const commentBoxes = document.querySelectorAll<HTMLInputElement>(
      `#${classForInputComment}`
    );
    for (let x = 0; x < commentBoxes.length; x++) {
      const box = commentBoxes[x];

      // Focus on the comment box
      box.focus();

      // Simulate typing the message
      for (let i = 0; i < message.length; i++) {
        await new Promise(
          (resolve) =>
            setTimeout(() => {
              const event = new KeyboardEvent("keydown", {
                key: message[i],
                // char: message[i],
                keyCode: message[i].charCodeAt(0),
                bubbles: true,
                cancelable: true,
              });
              box.dispatchEvent(event);
              box.textContent += message[i]; // Update the content manually
              resolve(undefined);
            }, 100) // Simulate typing speed
        );
      }

      // Trigger any input events if necessary
      box.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };
  const activateResponseComment = async (idForResponseButton: string) => {
    const idsArr2: any = document.querySelectorAll(`#${idForResponseButton}`); //get as target id custom button of google

    for (let x = 0; x < idsArr2.length; x++) {
      await new Promise((resolve) =>
        setTimeout(() => {
          idsArr2[x].click();
          resolve(undefined);
        }, 1000)
      );
    }
  };
  //(window as any)
  const onclickHandler = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id as number },
        func: async (firstId, firstClass, secondClass, thirdClass, message) => {
          if (!(window as any)._scrollInterval) {
            // Start scrolling every 2 seconds
            (window as any)._scrollInterval = setInterval(() => {
              window.scrollTo({
                top: window.scrollY + 1000, // Scroll down by 150 pixels
                left: 0,
                behavior: "smooth", // Smooth scrolling animation
              });
  
              // Optional: Stop when reaching the bottom
              /* if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                clearInterval((window as any)._scrollInterval);
                delete (window as any)._scrollInterval;
              } */
            }, 3000);
          }
          // await activateRepplyButton(firstId, firstClass)
          // await writeComment(secondClass, message)
          // await activateResponseComment(thirdClass)
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

yt-spec-button-shape-next--filled
*/
// const idsArr: any = document.querySelectorAll(`#submit-button`)

// submit-button
