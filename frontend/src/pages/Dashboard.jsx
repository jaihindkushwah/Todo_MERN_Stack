import React, { useEffect, useState } from "react";
// import { UserState } from "../context/AuthProvider";
import TopBar from "../components/TopBar";
import TodoListRender from "../components/TodoListRender";
import CreateTask from "../components/task/CreateTask";
import axios from "axios";
import { UserState } from "../context/AuthProvider";
import { TaskState } from "../context/TaskProvider";


function Dashboard() {
  const { user } = UserState();
  const [searchInput, setSearchInput] = useState("");

  const {taskData,setTaskData}=TaskState();
  useEffect(() => {
    if(!user) return;
    const getAllTask = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const {data} = await axios.get("/api/task", config);
        setTaskData([ ...data.tasks]);
        console.log(data.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTask();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const searchHandler = () => {
    if (!searchInput) return;

    const searchedData=taskData.filter((task) => {
      return task.name.toLowerCase().includes(searchInput.toLowerCase()) || task.description.toLowerCase().includes(searchInput.toLowerCase());
    })
    setTaskData([...searchedData,...taskData.filter((task) => !searchedData.includes(task))]);
    setSearchInput("");
  };

  return (
    <>
      <TopBar
        searchInput={searchInput}
        searchHandler={searchHandler}
        setSearchInput={setSearchInput}
      />
      <div className="flex flex-row justify-between  flex-wrap-reverse p-1 pt-2 sm:p-4 mt-10 md:mt-16">
        <TodoListRender  />
        <div className="flex flex-col gap-4 mb-2 sm:ml-2 w-screen sm:w-fit  p-4 rounded">
          {/* Create a Task */}
          <CreateTask />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
