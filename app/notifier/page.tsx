/*

https://ably.com/blog/websockets-react-tutorial
https://www.npmjs.com/package/react-use-websocket

*/


"use client";


import { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket"

export default function Notifier (){
    const socket = "wss://echo.websocket.events";
    const didUnmount = useRef(false);
    
    const { sendMessage, lastMessage, readyState } = useWebSocket(
      socket,
      {
        shouldReconnect: (closeEvent) => {
          /*
          useWebSocket will handle unmounting for you, but this is an example of a 
          case in which you would not want it to automatically reconnect
        */
          return didUnmount.current === false;
        },
      }
    );
      
    const [inputMessage, setInputMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

    const sendNotification = useCallback(() => sendMessage(inputMessage), [inputMessage]);

    useEffect(() => {
        if (lastMessage !== null) {
          setMessageHistory((prev: any) => prev.concat(lastMessage));
          console.log(lastMessage);
        }
      }, [lastMessage]);
    
    useEffect(() => {
      return () => {
        didUnmount.current = true;
      };
    }, []);

    return(
        <>
        <h1>I am a notifier</h1>
        <div className="flex gap-2 items-center sm:items-start">
            <input className="bg-white text-black rounded-lg p-2" type="text" onChange={e => setInputMessage(e.target.value)}/>
            <button className="px-4 py-2 bg-white text-black rounded-lg" onClick={sendNotification}>Send notification</button>
            <ul>
              {messageHistory.map((item, idx) => (
                <li className="text-white" key={idx}>{item ? item.data : null}</li>
              ))}
            </ul>
        </div>
        </>
    );
}