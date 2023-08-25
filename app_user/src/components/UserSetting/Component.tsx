import React from "react";

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
  bundleIcon,
  DocumentAdd24Filled,
  DocumentAdd24Regular,
  AddCircle24Regular,
} from "@fluentui/react-icons";

// APIs
import { addInventory } from "@mimo/items";

// types
import type { AddInventoryRequest } from "@mimo/items";

//form validation
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const DocumentAddIcon = bundleIcon(DocumentAdd24Filled, DocumentAdd24Regular);


// const getCharacterValidationError = (str: string) => {
//   return `Your password must have at least 1 ${str} character`;
// };

const schema = yup.object({
  name: yup.string()
    .min(4, 'Code must be at least 6 characters long')
    .required('Please Enter Item Code'),
  department: yup.number()
    .min(1)
    .max(1000000),
  employmentDate: yup.string(),
  role: yup.string()
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

  type AddEmployeeRequest = {
    name: string;
    department: string;
    employmentDate: Date;
    role: string;
    userId: string;
  };

  const convertToAddEmployeeRequest = (dataInput: FieldValues): AddEmployeeRequest => {
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
    const { data, error, errorMessage } = await addInventory({ ...addEmployeeRequest, userId });

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
        label="Item"
        orientation="horizontal"
      >
        <span>value</span>
      </Field>
      <Field
        size="large"
        label="Position"
        orientation="horizontal"
      >
        <span><DocumentAddIcon /></span>
      </Field>

      <Field
        size="large"
        label="Code"
        validationState={errors.code ? "error" : "none"}
        validationMessage={
          errors.code ? `${errors.code?.message}` : null}
        required
      >
        <Input
          size="large"
          {...register("code")}
          onBlur={() => handleInputBlur("code")}
        />
      </Field>
      <Field
        size="large"
        label="Qty"
        validationState={errors.quantity ? "error" : "none"}
        validationMessage={
          errors.quantity ? `${errors.quantity?.message}` : null}
      >
        <Input
          size="large"
          type="number"
          {...register("quantity")}
          onBlur={() => handleInputBlur("quantity")}
        />
      </Field>

      <Button
        appearance="primary"
        type="submit"
        disabled={!isDirty && !isValid}
        icon={<AddCircle24Regular />}>Add</Button>
    </form>
  </>
}