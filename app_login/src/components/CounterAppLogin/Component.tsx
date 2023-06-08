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

// APIs
import { login } from "@mimo/authentication";

// types
import type { LoginRequest } from "@mimo/authentication";

export default function Login() {
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  const data = useLoaderData();
  console.log(data);
  const navigate = useNavigate();


  //for style
  const usernameId = useId("username");
  const passwordId = useId("password");
  const [type, setType] = useState<"password" | "text">("password");

  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target as HTMLFormElement;
    //e: React.FormEvent<HTMLFormElement>
    const formData = new FormData(form);
    // Or you can work with it as a plain object:
    // const formJson = Object.fromEntries(formData.entries()) as LoginRequest;

    const formJson: LoginRequest = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    console.log(formJson)

    const { data, error, errorMessage } = await login(formJson);


    if (error) {
      const obj = JSON.parse(JSON.stringify(errorMessage));
      setAlertMessage(obj.message);
    }

    if (data) {
      const { message, user } = data;
      // const expirationDate = new Date(expiration);
      setAlertMessage(`${message}, ${user}`);
      sessionStorage.setItem("user", data.user)
      // Convert expiration date to UTC string
      // const expirationString = expirationDate.toUTCString();
      // Set cookie with token and expiration
      // document.cookie = `token=${token}; expires=${expirationString}; path=/;`;
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
    <div className="alert-section">
      {alertMessage && (
        <Alert intent={!data ? "success" : "error"}>
          {alertMessage}
        </Alert>
      )}
    </div>
    <form method="post" onSubmit={handleSubmit}>
      <Field
        size="large"
        label="Username"
        validationState="error"
        validationMessage="This is an error message."
        required
      >
        <Input
          size="large"
          className={styles.input}
          contentBefore={<PersonRegular onClick={() => console.log('a')} />}
          id={usernameId}
          name="username"
        />
      </Field>
      <Field
        size="large"
        label="Password"
        validationState="error"
        validationMessage="This is a success message."
        required
      >
        <Input
          size="large"
          type={type}
          contentAfter={type === "password" ? <EyeOff24Regular onClick={togglePasswordVisibility} /> : <Eye24Regular onClick={togglePasswordVisibility} />}
          id={passwordId}
          name="password"
        />
      </Field>

      <Button
        appearance="primary"
        type="submit"
        size="large"
      >Login</Button>
    </form>

    <div className="box register">
      <Link href="./login">
        Forgot Password?
      </Link>
      <Link href="./register">
        Register
      </Link>
    </div>

  </>;
}