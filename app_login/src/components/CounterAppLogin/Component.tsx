import React, { useEffect, useState } from "react";
import {
  useLoaderData,
  useNavigate
} from "react-router-dom";

//styles
import {
  useId,
  Input,
  Button,
  Field,
  Link,
  ToastTitle,
  Toast,
  useToastController,
  Toaster,
  ToastIntent,
} from "@fluentui/react-components";
import {
  PersonRegular,
  Eye24Regular,
  EyeOff24Regular
} from "@fluentui/react-icons";

import { Alert } from "@fluentui/react-components/unstable";
import "../../styles/index.scss"
import styles from './styles.module.scss';
import cx from 'classnames';

// APIs
import { login } from "@mimo/authentication";

// types
import type { LoginRequest } from "@mimo/authentication";

//form validation
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const schema = yup.object({
  username: yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(10, 'Username must be below 10 characters')
    .required('Please Enter your Username'),
  password: yup.string()
    .min(6, 'Passsword must be at least 6 characters long')
    .max(12, 'Passsword must be below 12 characters')
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[^\w]/, getCharacterValidationError("symbol"))
    .required('Please Enter your Password'),
}).required();


export default function Login() {
  //alert message
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  const [isError, setIsError] = useState<boolean>()

  //router things
  const data = useLoaderData();
  console.log(data, "data");
  const navigate = useNavigate();

  //for style
  const usernameId = useId("username");
  const passwordId = useId("password");
  const [type, setType] = useState<"password" | "text">("password");

  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  //toaster fluent
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const [intent, setIntent] = React.useState<
    ToastIntent | "progress" | "avatar"
  >("info");
  const notify = (message: string) => {
    switch (intent) {
      case "error":
      case "info":
      case "success":
      case "warning":
        dispatchToast(
          <Toast>
            <ToastTitle>{message}</ToastTitle>
          </Toast>,
          { position: "top-end", intent }
        );
        break;
    }
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

  const convertToLoginRequest = (dataInput: FieldValues): LoginRequest => {
    const { username, password } = dataInput;
    return {
      username: username as string,
      password: password as string,
    };
  };

  //handle submit
  // const onSubmit: React.FormEventHandler<HTMLFormElement> = async (
  //   e: React.FormEvent<HTMLFormElement>
  // ) => {
  const onSubmit: SubmitHandler<FieldValues> = async (dataInput, event?: React.BaseSyntheticEvent) => {
    // // Prevent the browser from reloading the page
    event?.preventDefault();
    // Read the form data
    // const form = event?.target as HTMLFormElement;
    // //e: React.FormEvent<HTMLFormElement>
    // const formData = new FormData(form);
    // // Or you can work with it as a plain object:
    // // const formJson = Object.fromEntries(formDataJson.entries()) as LoginRequest;

    // const formJson: LoginRequest = {
    //   username: formData.get("username") as string,
    //   password: formData.get("password") as string,
    // };
    // console.log(formJson)
    const loginRequest = convertToLoginRequest(dataInput);
    console.log(dataInput)
    const { data, error, errorMessage } = await login(loginRequest);

    //show alert
    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      setAlertMessage(errMessage.message);
      setIsError(true)
      setIntent("error")
      notify(errMessage.message)

    }

    if (data) {
      const { message, user } = data;
      setAlertMessage(`${message}, ${user}`);
      setIsError(false)
      setIntent("success")
      notify(`${message}, ${user}`)


      sessionStorage.setItem("user", data.user)

      //Store last visited page
      const lastVisitedPage = sessionStorage.getItem('lastVisitedPage');
      if (lastVisitedPage) {
        navigate(lastVisitedPage);
      } else {
        navigate("/");
      }
    }

  }

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

    <Toaster toasterId={toasterId} />

    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Field
        size="large"
        label="Username"
        validationState={errors.username ? "error" : "none"}
        validationMessage={
          errors.username ? `${errors.username?.message}` : null}
        required
      >
        <Input
          size="large"
          contentBefore={<PersonRegular />}
          id={usernameId}
          {...register("username")}
          onBlur={() => handleInputBlur("username")}
        />
      </Field>

      <Field
        size="large"
        label="Password"
        validationState={errors.password ? "error" : "none"}
        validationMessage={
          errors.password ? `${errors.password?.message}` : null}
        required
      >
        <Input
          size="large"
          type={type}
          contentAfter={type === "password" ? <EyeOff24Regular onClick={togglePasswordVisibility} /> : <Eye24Regular onClick={togglePasswordVisibility} />}
          id={passwordId}
          {...register("password")}
          onBlur={() => handleInputBlur("password")}
        />
      </Field>

      <Button
        appearance="primary"
        type="submit"
        size="large"
        disabled={!isDirty && !isValid}
      >Login</Button>
    </form>

    <div className={cx(styles.box, styles.register)}>
      <Link href="./login">
        Forgot Password?
      </Link>
      <Link href="./register">
        Register
      </Link>
    </div>

  </>;
}