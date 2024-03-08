import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const refPass = useRef(null); //reference leta hae kisi ka matlab 2 logo ko baat karwaata hae

  const passwordGenerator = useCallback(() => {
    //memmorise karta hae function ko
    let password = "";
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}`";

    for (let i = 0; i <= length; i++) {
      let charind = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(charind);
    }
    console.log(password);
    console.log("I am being called");
    setPassword(password);
  }, [length,  setPassword]);

  useEffect(() => {
    //start hote hi sabsepehle run karta hae ya kisi dependensies ko ched dia toh trigger ho jaat hae
    passwordGenerator();
  }, [passwordGenerator, length,numberAllowed, charAllowed,]);

  const copyToClipboard = useCallback(() => {
    refPass.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div
        style={{
          backgroundColor: "grey",
          borderRadius: "20px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#545454",
            borderRadius: "20px",
            height: "25px",
            display: "flex",
            alignContent: "center",
          }}
        >
          <input
            type="text"
            name=""
            id=""
            readOnly
            value={password}
            placeholder="Password"
            ref={refPass}
          />
          <button onClick={copyToClipboard}>Copy</button>
        </div>

        <div>
          <div>
            <label htmlFor="">Length {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />

            <input
              type="checkbox"
              defaultValue={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>

            <input
              type="checkbox"
              defaultValue={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Char</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
