import React, { useState } from "react";

export default function TextForm(props) {
    const handleUpclick = () => {
        setText(text.toUpperCase());
    }
    const handleclearclick = (event) => {
      setText("");
  }
    const handleOnChange = (event) => {
        setText(event.target.value);
    }

  const [text, setText] = useState("Enter your text here");
  return (
    <>
      <div className="container" style={{color: props.mode === 'light' ? 'black' : 'white'}}>
        <h1>{props.heading}</h1>
        <textarea
          className="form-control mb-3"
          value={text}
          onChange = {handleOnChange}
          style={{backgroundColor: props.mode === 'light' ? 'white' : 'grey', color: props.mode === 'light' ? 'black' : 'white'}}
          id="exampleFormControlTextarea1"
          rows="8"
        ></textarea>
        <button className="btn btn-primary mx-3" onClick={handleUpclick} >convert to uppercase</button>
        <button className="btn btn-primary" onClick={handleclearclick} >Clear</button>

      </div>
      <div className="container my-4" style={{color: props.mode === 'light' ? 'black' : 'white'}}>
          <h1> Your text summary </h1>
          <p>{text.split(/\s+/).filter((element) => {return element.length !== 0}).length} {text.length} charcahters</p>
          <p>{text.length / text.split(" ").length} words per line</p>
          <h2>Previews</h2>
          <p>{text.length>0?"Enter your text here":text}</p>
      </div>
    </>
  );
}
