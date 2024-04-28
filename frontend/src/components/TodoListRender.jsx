import React, { useRef } from "react";
import TaskItemCard from "./task/TaskItemCard";


import { TaskState } from "../context/TaskProvider";

function TodoListRender() {
  // const [items, setItems] = React.useState(data);
  // console.log(items);
  const { taskData, setTaskData } = TaskState();
  const dragTask = useRef(0);
  const draggedOverTask = useRef(0);
  const handleSort = () => {
    const tasksClone = [...taskData];
    const temp = tasksClone[dragTask.current];
    tasksClone[dragTask.current] = tasksClone[draggedOverTask.current];
    tasksClone[draggedOverTask.current] = temp;
    setTaskData(tasksClone);
  };

  return (
    <div className=" flex-1 bg-slate-100 rounded p-1 sm:p-5">
      <h1 className=" text-2xl sm:text-3xl font-bold text-center mb-6">
        Tasks
      </h1>
      <div
        className="flex flex-wrap justify-around items-center ease-in delay-1000"
      >
        {taskData?.length === 0 && (
          <p className="text-center text-[16px] text-orange-500">
            No tasks found
          </p>
        )}
        {taskData?.map((item, index) => (
            <TaskItemCard
              draggable
              onDragStart={() => (dragTask.current = index)}
              onDragEnter={() => (draggedOverTask.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              key={item._id}
              task={item}
              className={"mb-5"}
            />
        ))}
      </div>
    </div>
  );
}

export default TodoListRender;
