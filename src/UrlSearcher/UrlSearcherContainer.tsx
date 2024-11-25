import React, { ChangeEvent, FormEvent, useState } from "react";

function UrlSearcherContainer() {
  // Define the type of the input value as a string
  const [url, setUrl] = useState<string>("");

  // Handle input change with a typed event
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  // Handle form submission with a typed event
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Input value submitted:", url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter something:
          <input type="text" value={url} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>Current input: {url}</p>
    </div>
  );
}

export default UrlSearcherContainer;
