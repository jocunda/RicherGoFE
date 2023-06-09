import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

//styles
import {
  useId,
  Input,
  Button,
  Field,
  Link,
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

const schema = yup.object({
  username: yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(10, 'Username must be below at 10 characters long')
    .required(),
  password: yup.string()
    .min(6, 'Passsword must be at least 6 characters long')
    .max(12, 'Username must be below at 12 characters long')
    .required(),
}).required();


export default function Login() {
  //alert message
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  //input value
  // const [value, setValue] = useState<string>("");

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

  //handle submit
  // const onSubmit: React.FormEventHandler<HTMLFormElement> = async (
  //   e: React.FormEvent<HTMLFormElement>
  // ) => {
  const onSubmit: SubmitHandler<FieldValues> = async (event) => {
    // Prevent the browser from reloading the page
    event.preventDefault();
    // Read the form data
    const form = event.target as HTMLFormElement;
    //e: React.FormEvent<HTMLFormElement>
    const formData = new FormData(form);
    // Or you can work with it as a plain object:
    // const formJson = Object.fromEntries(formData.entries()) as LoginRequest;

    const formJson: LoginRequest = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    const { data, error, errorMessage } = await login(formJson);

    //show alert
    if (error) {
      const obj = JSON.parse(JSON.stringify(errorMessage));
      setAlertMessage(obj.message);
    }

    if (data) {
      const { message, user } = data;
      setAlertMessage(`${message}, ${user}`);
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

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });


  return <>
    <div className={styles.alertSection}>
      {alertMessage && (
        <Alert intent={!data ? "success" : "error"}>
          {alertMessage}
        </Alert>
      )}
    </div>

    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Field
        size="large"
        label="Username"
        validationState={errors.username ? "error" : "none"}
        validationMessage={errors.username ? `${errors.username.message}` : null}
        required
      >
        <Input
          size="large"
          contentBefore={<PersonRegular />}
          id={usernameId}
          {...register("username")}
        />
      </Field>

      <Field
        size="large"
        label="Password"
        validationState={errors.password ? "error" : "none"}
        validationMessage={errors.password ? `${errors.password.message}` : null}
        required
      >
        <Input
          size="large"
          type={type}
          contentAfter={type === "password" ? <EyeOff24Regular onClick={togglePasswordVisibility} /> : <Eye24Regular onClick={togglePasswordVisibility} />}
          id={passwordId}
          {...register("password")}
        />
      </Field>

      <Button
        appearance="primary"
        type="submit"
        size="large"
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