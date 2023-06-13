import React, { useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";

//styles
import {
  Input,
  Button,
  Field,
} from "@fluentui/react-components";
import {
  Eye24Regular,
  EyeOff24Regular
} from "@fluentui/react-icons";

import { Alert } from "@fluentui/react-components/unstable";
import "../../styles/index.scss"
import styles from './styles.module.scss';

// APIs
import { ResetPassRequest, resetPassword } from "@mimo/authentication";

//form validation
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const schema = yup.object({
  oldPassword: yup.string()
    .min(6, 'Passsword must be at least 6 characters long')
    .max(12, 'Passsword must be below 12 characters')
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[^\w]/, getCharacterValidationError("symbol"))
    .required('Please Enter your Password'),
  newPassword: yup.string()
    .min(6, 'Passsword must be at least 6 characters long')
    .max(12, 'Passsword must be below 12 characters')
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[^\w]/, getCharacterValidationError("symbol"))
    .notOneOf([yup.ref("oldPassword")], 'New Password cannot be the same as Current Password')
    .required('Please Enter your Password'),
  confirmNewPassword: yup.string()
    .required("Please re-enter your new password")
    .oneOf([yup.ref("newPassword")], "New Password does not match"),
}).required();

export default function ResetPasswordForm() {
  //alert message
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  const [isError, setIsError] = useState<boolean>()

  //router things
  const data = useLoaderData();
  console.log('ResetPasswordForm data: ', data);

  // const [oldPassword, setOldPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");

  //for password style
  type InputTypes = {
    oldPassword: "password" | "text";
    newPassword: "password" | "text";
    confirmNewPassword: "password" | "text";
  };
  const [inputTypes, setInputTypes] = useState<InputTypes>({
    oldPassword: "password",
    newPassword: "password",
    confirmNewPassword: "password"
  });
  const togglePasswordVisibility = (fieldName: keyof InputTypes) => {
    setInputTypes((prevTypes) => ({
      ...prevTypes,
      [fieldName]: prevTypes[fieldName] === "password" ? "text" : "password"
    }));
  };

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

  const convertToResetRequest = (dataInput: FieldValues, username: string): ResetPassRequest => {
    const { oldPassword, newPassword, confirmNewPassword } = dataInput;
    return {
      username: username,
      oldPassword: oldPassword as string,
      newPassword: newPassword as string,
      confirmNewPassword: confirmNewPassword as string,
    };
  };

  // const handleChangeCurrentPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setOldPassword(event.target.value);
  // };

  // const handleChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewPassword(event.target.value);
  // };

  //handle submit
  const onSubmit: SubmitHandler<FieldValues> = async (dataInput, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();


    // // Call backend API for password change logic
    // const response = await fetch("/api/Authenticate/changePassword", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',

    //   },
    //   body: JSON.stringify({
    //     oldPassword,
    //     newPassword,
    //   }),
    // });
    const username = sessionStorage.getItem("user") ?? ""
    const resetRequest = convertToResetRequest(dataInput, username);
    const { data, error, errorMessage } = await resetPassword(resetRequest);

    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      setAlertMessage(errMessage.message);
      setIsError(true)
    }
    if (data) {
      const { message } = data;
      setAlertMessage(message);
      setIsError(false)
    }
    // if (dataInput) {
    //   // Password changed successfully, do something
    //   alert('Password changed successfully');
    // } else {
    //   // Handle error response from API
    //   alert('Failed to change password:');
    // }


    // Clear form fields after submission
    // setOldPassword("");
    // setNewPassword("");
  };

  //for alert animation
  useEffect(() => {
    let timeoutId: any;

    if (alertMessage) {
      timeoutId = setTimeout(() => {
        setAlertMessage('');
      }, 8000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [alertMessage]);

  return <>

    <div className={styles.alertSection}>
      {alertMessage && (
        <Alert intent={isError ? "error" : "success"}>
          {alertMessage}
        </Alert>
      )}
    </div>


    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Field
        size="large"
        label="Current Password"
        validationState={errors.oldPassword ? "error" : "none"}
        validationMessage={
          errors.oldPassword ? `${errors.oldPassword?.message}` : null}
        required
      >
        <Input
          size="large"
          type={inputTypes.oldPassword}
          contentAfter={inputTypes.oldPassword === "password" ?
            <EyeOff24Regular onClick={() => togglePasswordVisibility("oldPassword")} /> :
            <Eye24Regular onClick={() => togglePasswordVisibility("oldPassword")} />
          }
          {...register("oldPassword")}
          onBlur={() => handleInputBlur("oldPassword")}
        />
      </Field>

      <Field
        size="large"
        label="New Password"
        validationState={errors.newPassword ? "error" : "none"}
        validationMessage={
          errors.newPassword ? `${errors.newPassword?.message}` : null}
        required
      >
        <Input
          size="large"
          type={inputTypes.newPassword}
          contentAfter={inputTypes.newPassword === "password" ?
            <EyeOff24Regular onClick={() => togglePasswordVisibility("newPassword")} /> :
            <Eye24Regular onClick={() => togglePasswordVisibility("newPassword")} />
          }
          {...register("newPassword")}
          onBlur={() => handleInputBlur("newPassword")}
        />
      </Field>

      <Field
        size="large"
        label="Confirm New Password"
        validationState={errors.confirmNewPassword ? "error" : "none"}
        validationMessage={
          errors.confirmNewPassword ? `${errors.confirmNewPassword?.message}` : null}
        required
      >
        <Input
          size="large"
          type={inputTypes.confirmNewPassword}
          contentAfter={inputTypes.confirmNewPassword === "password" ?
            <EyeOff24Regular onClick={() => togglePasswordVisibility("confirmNewPassword")} /> :
            <Eye24Regular onClick={() => togglePasswordVisibility("confirmNewPassword")} />
          }
          {...register("confirmNewPassword")}
          onBlur={() => handleInputBlur("confirmNewPassword")}
        />
      </Field>

      <Button
        appearance="primary"
        type="submit"
        size="large"
        disabled={!isDirty && !isValid}
      >Change Password</Button>
    </form>

    {/* <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          value={oldPassword}
          onChange={handleChangeCurrentPassword}
        />
        <br />
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={handleChangeNewPassword}
        />
        <br />
        <button type="submit">Change Password</button>
      </form> */}

  </>
};