import React from "react";
import CustomInput from "../CustomInput";
import { Button, Textarea } from "@chakra-ui/react";

function CreateTaskCard({
  className,
  handleInput,
  values,
  errors,
  isLoading,
  handleSubmit,
}) {
  return (
    <div className={className}>
      <div className="rounded  w-[340px] lg:w-[360px] bg-slate-300 p-4 pt-6 shadow-lg shadow-slate-500">
        <span className="text-[12px] font-semibold mb-1 ">Task Name:</span>
        <CustomInput
          onChange={handleInput}
          name="name"
          errorMessage={errors?.name}
          value={values?.name}
        />
        <span className="text-[12px] font-semibold mb-1 ">
          End Date and Time:
        </span>
        <CustomInput
          onChange={handleInput}
          value={values?.endDate}
          name="endDate"
          placeholder="Date and Time"
          type="datetime-local"
          errorMessage={errors?.endDate}
        />
        <Textarea
          rows={8}
          onChange={handleInput}
          value={values?.description}
          name="description"
          placeholder="Description"
          marginTop={"10px"}
          variant={""}
        />
        <p className="text-red-500 text-[12px]">&nbsp;{errors?.description}</p>
        <Button onClick={handleSubmit} isLoading={isLoading} colorScheme="green" borderRadius={"full"} >
          Create A Task
        </Button>
      </div>
    </div>
  );
}

export default CreateTaskCard;
