"use client";
import { useState, useEffect } from "react"

export default function Counter() {
    //Main count variable, initialized with the localstorage or with 0
    const [count, setCount] = useState(() => { return Number(localStorage.getItem("counter")) || 0 });
    //For input value
    const [countInput, setCountInput] = useState(0);
    const [pariDispari, setPariDispari] = useState("Pari");
    //Value history
    const [history, setHistory] = useState([0]);
    //Indice della storia
    const [redoHistory, setRedoHistory] = useState([0]);

    /******************PROVA */
    const [arra, setArra] = useState([1, 2, 3]);

    function prova() {
      setArra(prev => [4, ...prev]);
    }
    /******************PROVA */


    function debugLocalStorage() {
      if (typeof window !== 'undefined') {
        console.log('localStorage keys:', Object.keys(localStorage));
      } else {
        console.log('localStorage is not available in this environment.');
      }
    }

    function add() {
      setCount((count) => {
        return count + 1 
      });
      setHistory([...history,count]);
      setRedoHistory([0]);
    }

    function sub() {
      if(count - 1 < 0)
        return;
      else
        setHistory([...history,count]);
        setCount(count - 1);
        setRedoHistory([]);
    }
    
    //Set the value to the input value
    function set() {
      if(countInput < 0)
        return;
      else{
        setCount(countInput);
        setHistory([...history,count]);
        setRedoHistory([]);
      }
    }

    function reset() {
      setHistory([...history, 0]);
      setCount(0);
      setPariDispari("Pari");
      setRedoHistory([]);
    }

    function undo() {
      if(history.length > 1){
        //setRedoHistory(redoHistory.length == 0 ? [count] : [...redoHistory, count]);
        setRedoHistory((prev) => [...prev, count]);
        if(history.length == 0)
          setHistory([...history, 0]);
        setCount(history[history.length - 1]);
        setHistory(history.slice(0,-1));
      }
    }

    function redo(){
      if(redoHistory.length > 0){
        setHistory((prev) => [...prev, count]); 
        setCount(redoHistory[redoHistory.length - 1]);
        setRedoHistory((prev) => prev.slice(0,-1));
      }
    }

    function returnToHistory(index: number) {
      setRedoHistory([]);
      var targetIndex: number;
      if(history.length < 5)
        targetIndex = index;
      else
        targetIndex= Math.max(history.length - 5 + index, 0);
      setCount(history[targetIndex]);
      setHistory((prev) => prev.slice(0,targetIndex + 1));
      
    }

    useEffect(() => {
      localStorage.setItem("counter", String(count));
      
      setPariDispari(count % 2 == 0 ? "Pari" : "Dispari");

      function handleKeyDown(e: KeyboardEvent) {
        if(e.key === "ArrowUp")
          add();
        if(e.key === "ArrowDown")
          sub();
      }

      document.addEventListener('keydown', handleKeyDown);

      return function cleanup() {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [count]);

    return (
      
      <div className="flex flex-col items-center gap-4 sm:items-start">
        <p>Il counter è {count}</p>
        <p>Il numero è {pariDispari}</p>
        <div className="flex gap-2 items-center sm:items-start">
          <button
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-black-400" onClick={add}>
              Add
          </button>
          <button
            className="px-4 py-2 bg-white text-black rounded-lg"
          onClick={sub}>Sub
          </button>
          <button
            className="px-4 py-2 bg-white text-black rounded-lg"
          onClick={set}
          disabled={countInput<0}>Set
          </button>
          <div className="flex flex-col">
            <p>Ultimi 5 valori</p>
            <div className="flex flex-row gap-4  justify-start">
            {history.slice(Math.max(history.length - 5, 0)).map((item, index) => (
                <p className="bg-gray-50 rounded-lg text-black p-1 cursor-pointer" key={`${item}-${index}`} onClick={() => returnToHistory(index)}>{item}</p>
            ))}
          </div>
          </div>
          
          
        </div>
          
        <div className="flex gap-2 items-center sm:items-start">
          <input className="bg-white text-black rounded-lg p-2" type="number"  onChange={e => setCountInput(Number(e.target.value))}/>
          <button
            className="px-4 py-2 bg-white text-black rounded-lg"
            onClick={reset}>Reset
          </button>
          <button
            className="px-4 py-2 bg-white text-black rounded-lg"
            onClick={undo}>Undo
          </button>
          <button
            className="px-4 py-2 bg-white text-black rounded-lg"
            onClick={redo}>Redo
          </button>
        </div>
      </div>
    )
  }
  