import React from "react";
import TaskItemCard from "./task/TaskItemCard";
import { Reorder } from "framer-motion";
import { TaskState } from "../context/TaskProvider";


function TodoListRender() {
  // const [items, setItems] = React.useState(data);
  // console.log(items);
  const {taskData,setTaskData}=TaskState();
  return (
    <div className=" flex-1 bg-slate-100 rounded p-1 sm:p-5">
      <h1 className=" text-2xl sm:text-3xl font-bold text-center mb-4">
        Tasks
      </h1>
      
      <Reorder.Group className="flex flex-col justify-center items-center gap-4" axis="y" layoutScroll values={taskData} onReorder={setTaskData}>
        {taskData?.length===0 && <p className="text-center text-[16px] text-orange-500">No tasks found</p>}
        {taskData?.map((item) => (
          <Reorder.Item key={item._id} value={item}>
            <TaskItemCard key={item.email} task={item} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

export default TodoListRender;
