import React, { useEffect, useState } from "react";

// import { useLoaderData } from "react-router-dom";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';

//component
import {
  Input,
  Button,
  Field,
  useId,
  ToastTitle,
  Toast,
  useToastController,
  Toaster,
} from "@fluentui/react-components";
import {
  // bundleIcon,
  // DocumentAdd24Filled,
  // DocumentAdd24Regular,
  AddCircle24Regular,
} from "@fluentui/react-icons";
import { DatePicker } from "@fluentui/react-datepicker-compat";

// APIs
import { getUser, addUserDetail } from "@mimo/authentication";
//type
import { AddUserDetailRequest, GetUserResponse } from "@mimo/authentication";


//form validation
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// const DocumentAddIcon = bundleIcon(DocumentAdd24Filled, DocumentAdd24Regular);


const onFormatDate = (date?: Date): string => {
  return !date
    ? ""
    : date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    (date.getFullYear() % 100);
};

const schema = yup.object({
  name: yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be below 50 characters')
    .required('Please Enter your Name'),
  department: yup.string()
    .min(3, 'Department must be at least 3 characters long')
    .max(50, 'Department must be below 50 characters')
    .required('Please Enter your Department'),
  employmentDate: yup.date()
    .required('Please Enter your Employment Date'),
  role: yup.string(),
}).required();

export default function UserSetting() {

  //date picker FluentUI
  const [value, setValue] = React.useState<Date | null | undefined>(null);
  const datePickerRef = React.useRef<HTMLInputElement>(null);

  const onClick = React.useCallback((): void => {
    setValue(null);
    datePickerRef.current?.focus();
  }, []);

  const onParseDateFromString = React.useCallback(
    (newValue: string): Date => {
      const previousValue = value || new Date();
      const newValueParts = (newValue || "").trim().split("/");
      const day =
        newValueParts.length > 0
          ? Math.max(1, Math.min(31, parseInt(newValueParts[0], 10)))
          : previousValue.getDate();
      const month =
        newValueParts.length > 1
          ? Math.max(1, Math.min(12, parseInt(newValueParts[1], 10))) - 1
          : previousValue.getMonth();
      let year =
        newValueParts.length > 2
          ? parseInt(newValueParts[2], 10)
          : previousValue.getFullYear();
      if (year < 100) {
        year +=
          previousValue.getFullYear() - (previousValue.getFullYear() % 100);
      }
      return new Date(year, month, day);
    },
    [value]
  );

  //toaster fluent
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const errorNotify = (message: string) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { position: "top-end", intent: "error" }
    );
  };

  const successNotify = (message: string) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { position: "top-end", intent: "success" }
    );
  }

  const [userData, setUserData] = useState<GetUserResponse>();

  //retrieve user data
  useEffect(() => {
    userDataGet();
  }, []);

  const userDataGet = async () => {
    const { data, error, errorMessage } = await getUser();
    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      errorNotify(errMessage.message)
    }
    if (data) {
      setUserData(data);
    }
  }

  //react-hook-form
  const { register,
    handleSubmit,
    trigger,
    formState: { errors, isDirty, isValid }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleInputBlur = async (fieldName: string) => {
    await trigger(fieldName);
  };


  const convertToAddEmployeeRequest = (dataInput: FieldValues): AddUserDetailRequest => {
    const { name, department, employmentDate, role, userId } = dataInput;
    return {
      name: name as string,
      department: department as string,
      employmentDate: employmentDate as Date,
      role: role as string,
      userId: userId as string,
    };
  };


  const onSubmit: SubmitHandler<FieldValues> = async (dataInput, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    const addEmployeeRequest = convertToAddEmployeeRequest(dataInput);
    const { data, error, errorMessage } = await addUserDetail({
      ...addEmployeeRequest,
      userId: userData?.id
    });

    //show alert
    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      errorNotify(errMessage.message)
    }

    if (data) {
      const { message } = data;
      successNotify(message);
    }
  }

  return <>
    <Toaster toasterId={toasterId} />
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.dialogBodyContainer}
    >
      <Field
        size="large"
        label="Name"
        orientation="horizontal"
        validationState={errors.name ? "error" : "none"}
        validationMessage={
          errors.name ? `${errors.name?.message}` : null}
      >
        <Input
          size="large"
          {...register("name")}
          onBlur={() => handleInputBlur("name")}
        />
      </Field>
      <Field
        size="large"
        label="Department"
        orientation="horizontal"
        validationState={errors.department ? "error" : "none"}
        validationMessage={
          errors.department ? `${errors.department?.message}` : null}
      >
        <Input
          size="large"
          {...register("department")}
          onBlur={() => handleInputBlur("department")}
        />
      </Field>
      <Field
        size="large"
        label="Employment Date"
        orientation="horizontal"
        validationState={errors.employmentDate ? "error" : "none"}
        validationMessage={
          errors.employmentDate ? `${errors.employmentDate?.message}` : null}
      >
        <Input
          size="large"
          {...register("employmentDate")}
          onBlur={() => handleInputBlur("employmentDate")}
        />
      </Field>

      <Field label="Select a date. Input format is day slash month slash year.">
        <DatePicker
          ref={datePickerRef}
          allowTextInput
          value={value}
          onSelectDate={setValue as (date?: Date | null) => void}
          formatDate={onFormatDate}
          parseDateFromString={onParseDateFromString}
          placeholder="Select a date..."
          className={styles.control}
        />
      </Field>
      <div>
        <Button onClick={onClick} className={styles.clearButton}>
          Clear
        </Button>
        <div>Selected date: {(value || "").toString()}</div>
      </div>

      <Field
        size="large"
        label="Role"
        orientation="horizontal"
        validationState={errors.role ? "error" : "none"}
        validationMessage={
          errors.role ? `${errors.role?.message}` : null}
      >
        <Input
          size="large"
          {...register("role")}
          onBlur={() => handleInputBlur("role")}
        />
      </Field>

      <Button
        appearance="primary"
        type="submit"
        disabled={!isDirty && !isValid}
        icon={<AddCircle24Regular />}>Update</Button>
    </form>
  </>
}