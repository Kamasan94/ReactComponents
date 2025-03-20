// 💡 Obiettivo: Creare una semplice app di gestione task con TypeScript, dove ogni task ha:
"use client";
import { useState } from "react";

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


    return (
        <div className="flex flex-col gap-2">
                {tasks.map((task : Task) => (
                    <input type="checkbox" key={task.id} value={task.description}/>                   
                ))}
        </div>
    )
}
