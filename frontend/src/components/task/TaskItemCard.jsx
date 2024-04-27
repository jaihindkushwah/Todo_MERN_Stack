import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UpdateTask from "./UpdateTask";
import axios from "axios";
import { UserState } from "../../context/AuthProvider";
import { TaskState } from "../../context/TaskProvider";

function TaskItemCard({ task, className, ...props }) {
  const [isLoading, setIsLoading] = useState();
  const { name, description, endDate, status, createdAt } = task;
  const { user } = UserState();
  const toast = useToast();
  const { taskData, setTaskData } = TaskState();
  const [isDeleting, setIsDeleting] = useState(false);

  const updateTaskHandler = async (taskInput) => {
    if (!task._id) return;
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/task/${task._id}`,
        { ...taskInput, status: !status },
        config
      );
      toast({
        title: "Task Updated Successfully",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      const newTaskData = taskData.map((task) => {
        if (task._id === data.task._id) {
          return data.task;
        } else {
          return task;
        }
      });
      setTaskData(newTaskData);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    setIsLoading(false);
  };
  const deleteHandler = async (taskId) => {
    if (!taskId) return;
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    try {
      setIsDeleting(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          id: taskId,
        },
      };
      const { data } = await axios.delete(`/api/task/`, config);
      toast({
        title: "Task Deleted Successfully",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      const newTaskData = taskData.filter((task) => task._id !== taskId);
      setTaskData(newTaskData);
      setIsDeleting(false);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setIsDeleting(false);
  };

  return (
    <div
      className={
        " bg-slate-400 shadow-md cursor-pointer hover:shadow-lg hover:shadow-slate-500 shadow-slate-500  rounded-3xl " +
        className
      }
      {...props}
    >
      <Card width={{ base: "100%" }} className="p-1 sm:p-4">
        <CardBody width={{ base: "100%" }} padding={{ base: "1", md: "6" }}>
          <Stack mt="6" spacing="1">
            <Stack spacing={"3"} mb="3">
              <Heading size="md">{name}</Heading>
              <Text>{description}</Text>
            </Stack>
            <div className="flex gap-2">
              <>
                <Text fontWeight="bold">Created: </Text>{" "}
                <Text>{new Date(createdAt).toDateString()}</Text>
              </>
              <>
                <Text fontWeight="bold">Time: </Text>{" "}
                <Text>{new Date(createdAt).toLocaleTimeString()}</Text>
              </>
            </div>
            <div className="flex gap-2">
              <>
                <Text fontWeight="bold">Deadline: </Text>{" "}
                <Text>{new Date(endDate).toDateString()}</Text>
              </>
              <>
                <Text fontWeight="bold">Time: </Text>{" "}
                <Text>{new Date(endDate).toLocaleTimeString()}</Text>
              </>
            </div>
            <div className="flex gap-2">
              <>
                <Text fontWeight="bold">Status: </Text>{" "}
                <Text color={status ? "green" : "red"}>
                  {status ? "Completed" : "Not Completed"}
                </Text>
              </>
            </div>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter padding={{ base: "1", md: "6" }}>
          <ButtonGroup spacing="2">
            <UpdateTask task={task} />
            <Button
              onClick={() => updateTaskHandler(task)}
              isLoading={isLoading}
              variant="solid"
              colorScheme="green"
            >
              {!status ? "Done" : "Not Done"}
            </Button>
            <Button
              onClick={() => deleteHandler(task._id)}
              isLoading={isDeleting}
              variant="solid"
              colorScheme="red"
            >
              Delete
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}

export default TaskItemCard;
