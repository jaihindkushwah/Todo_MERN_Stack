import { Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react'
import CustomInput from '../CustomInput';
import CreateTaskModal from './CreateTaskModal';
import { Formik } from 'formik';
import { taskSchema } from '../../utils/formValidationSchema';
import axios from 'axios';
import { TaskState } from '../../context/TaskProvider';
import { UserState } from '../../context/AuthProvider';

function UpdateTask({ task }) {

  const toast = useToast(); 
  const {user}=UserState();
  const disclosure=useDisclosure();
  const {onClose}=disclosure;

  const {taskData,setTaskData}=TaskState();
  const updateTaskHandler = async(taskInput) => {
    if(!task._id) return;
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/task/${task._id}`,
        taskInput,
        config
      );
      toast({
        title: "Task Updated Successfully",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      const newTaskData=taskData.map(task=>{
        if(task._id===data.task._id){
          return data.task
        }else{
          return task
        }
      });
      setTaskData(newTaskData);
      
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",  
      })
    }
  }

  return (
    <Formik
      validationSchema={taskSchema}
      initialValues={{
        name:task?.name ,
        description: task?.description,
        endDate: task?.endDate,
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

      onSubmit={(values, { setSubmitting }) => {
        updateTaskHandler(values).then(() => onClose()).finally(() => setSubmitting(false));
      }}
    >
      {({ errors, handleSubmit, handleChange, values, isSubmitting }) => (

          <CreateTaskModal
            colorScheme={"blue"}
            onSubmit={handleSubmit}
            title="Update Task"
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
      )}
    </Formik>
  )
}

export default UpdateTask