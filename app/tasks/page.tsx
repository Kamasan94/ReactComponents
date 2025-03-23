// 💡 Obiettivo: Creare una semplice app di gestione task con TypeScript, dove ogni task ha:
"use client";
import { useEffect, useState } from "react";

// ✅ ID univoco
// 📝 Descrizione
// 📅 Data di creazione
// 🎯 Stato (completato o no)
interface Task {
    id : number;
    description : string;
    creationDate : string;
    status : boolean; 
}

export default function Tasks() {
    //Initial values
    const [tasks, setTasks] = useState<Task[]>([ {
        description: 'Joe', 
        creationDate: '11/11/2011',
        status: false, 
        id: 0,
      },
      {
        description: 'La', 
        creationDate: '11/11/2011',
        status: false, 
        id: 1,
      },
    
    ]);

    //Input task value
    const [insertTask, setInsertTask] = useState("");

    //Incremental id
    const [currentId, setCurrentId] = useState(1);

    //Add task function
    function addTask() {
        var newTask : Task = {
            description: insertTask,
            creationDate : String(new Date()),
            status: false,
            id: currentId + 1
        }
        setCurrentId(currentId + 1);
        setTasks([...tasks, newTask]);
        setInsertTask("");
    }

    useEffect(() => {
        //Key press management
        function handleKeyDown(e : KeyboardEvent){
            if(e.key === 'Enter'){
                addTask();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        //Always cleanup event listeners
        return function cleanup(){
            removeEventListener('keydown', handleKeyDown);
        };
    },[]);



    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-5x1 font-semibold tracking-tight text-balance sm:text-7xl">Tasks</h1>
            <input type="text" id="taskInput" className="bg-white text-black rounded-lg p-2" value={insertTask} onChange={e => setInsertTask(String(e.target.value))}/>
            <button className="px-4 py-2 bg-white text-black rounded-lg" onClick={addTask}>Add Task </button>
                {tasks.map((task : Task) => (
                    <div className="flex flex-row gap-2" key={task.id}>
                        <input type="checkbox" />
                        <label htmlFor={String(task.id)}>{task.description}</label>
                    </div>
                              
                                 
                ))}
        </div>
    )
}
