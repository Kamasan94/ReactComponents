/*

https://ably.com/blog/websockets-react-tutorial
https://www.npmjs.com/package/react-use-websocket

*/
"use client";





import { useCallback, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useWebSocket, { ReadyState } from "react-use-websocket"
import { IoIosNotifications } from "react-icons/io";

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
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="mt-1 text-sm text-gray-500">
                      {lastMessage.data}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ))
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
            <ul className="w-100 h-100 overflow-hidden overflow-y-scroll flex gap-2 flex-col">
              {messageHistory.map((item, idx) => (
                <div key={idx}
                className={" w-90 bg-white  rounded-lg flex"}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="mt-1 text-sm text-gray-500">
                        {item ? item.data : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
                
              ))}
            </ul>
            <Toaster position="top-right" reverseOrder={false}/>
        </div>
        </>
    );
}