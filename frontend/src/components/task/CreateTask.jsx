import React from "react";
import CreateTaskModal from "./CreateTaskModal";
import CustomInput from "../CustomInput";
import { Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { taskSchema } from "../../utils/formValidationSchema";
import { UserState } from "../../context/AuthProvider";
import CreateTaskCard from "./CreateTaskCard";
import axios from "axios";
import { TaskState } from "../../context/TaskProvider";

function CreateTask() {
  const { user } = UserState();
  const toast = useToast();
  const {setTaskData,taskData } = TaskState();
  const disclosure = useDisclosure();

  const { onClose } = disclosure;

  const createTaskHandler = async (taskInput) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/task", taskInput, config);
      const newTaskData=[...taskData,{...data.task}];
      // console.log(newTaskData);
      setTaskData(newTaskData);
      toast({
        title: "Task Created Successfully",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      // setGetTaskDataAgain(!getTaskDataAgain);
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
  };

  return (
    <Formik
      validationSchema={taskSchema}
      initialValues={{
        name: "",
        description: "",
        endDate: "",
      }}
      validate={(values) => {
        const errors = {};
        const time=new Date(values.endDate).getTime();
        const currentTime=new Date().getTime();
        if(time<currentTime){
          errors.endDate="Time must be greater than current time";
        }
        return errors;
      }}

      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        createTaskHandler(values)
          .then(() => {
            onClose();
            resetForm();
          })
          .finally(() => setSubmitting(false));
        // console.log(values);
      }}
    >
      {({ errors, handleSubmit, handleChange, values, isSubmitting }) => (
        <>
          <CreateTaskModal
            className={"block md:hidden "}
            onSubmit={handleSubmit}
            title="Create A Task"
            isLoading={isSubmitting}
            disclosure={disclosure}
          >
            <span className="text-[12px] font-semibold mb-1 ">Task Name</span>
            <CustomInput
              onChange={handleChange}
              value={values?.name}
              className={
                "outline-none border-slate-200 border-2 outline-2 focus:border-none focus:outline-blue-400"
              }
              errorMessage={errors.name}
              name="name"
            />
            {/* <div className="flex flex-col border-2 border-black rounded"> */}
            <span className="text-[12px] font-semibold mb-1">
              Task End Date and Time
            </span>
            <CustomInput
              value={values?.endDate}
              onChange={handleChange}
              name="endDate"
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}
              className={
                "outline-none border-slate-200 border-2 outline-2 focus:border-none focus:outline-blue-400"
              }
              errorMessage={errors.endDate}
            />
            {/* </div> */}

            <span className="text-[12px] font-semibold mb-1 ">
              Task Description
            </span>
            <Textarea
              name="description"
              value={values?.description}
              rows={5}
              onChange={handleChange}
            />
            <p className="text-red-500 text-[12px]">
              &nbsp;{errors.description}
            </p>
          </CreateTaskModal>
          <CreateTaskCard
            errors={errors}
            handleInput={handleChange}
            isLoading={isSubmitting}
            values={values}
            handleSubmit={handleSubmit}
            className={"hidden md:block sticky top-20 "}
          />
        </>
      )}
    </Formik>
  );
}

export default CreateTask;
