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

// APIs
import { getUser, addUserDetail } from "@mimo/authentication";
//type
import { AddUserDetailRequest } from "@mimo/authentication";


//form validation
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// const DocumentAddIcon = bundleIcon(DocumentAdd24Filled, DocumentAdd24Regular);


// const getCharacterValidationError = (str: string) => {
//   return `Your password must have at least 1 ${str} character`;
// };

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

  const [userData, setUserData] = useState<{ [key: string]: string }>({});

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
      userId: userData.id
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