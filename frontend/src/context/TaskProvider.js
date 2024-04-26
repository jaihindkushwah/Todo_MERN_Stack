import React, { createContext, useState } from 'react'

const CreateTaskContext=createContext(null);
function TaskProvider({children}) {
    const [taskData,setTaskData]=useState([]);
  return (
    <CreateTaskContext.Provider value={{taskData,setTaskData}}>
        {children}
    </CreateTaskContext.Provider>
  )
}

export const TaskState=()=>{
    return React.useContext(CreateTaskContext);
}

export default TaskProvider