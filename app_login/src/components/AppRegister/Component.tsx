import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

//styles
import {
  Field,
  Input,
  Button,
  Link,
} from "@fluentui/react-components";
import {
  PersonRegular,
  Eye24Regular,
  EyeOff24Regular,
  Mail24Regular
} from "@fluentui/react-icons";
import { Alert } from "@fluentui/react-components/unstable";
import "../../styles/index.scss"

// APIs
import { register } from "@mimo/authentication";

// types
import type { RegisterRequest } from "@mimo/authentication";

export default function Register() {
  const [alertMessage, setAlertMessage] = useState<string | undefined>("");
  const data = useLoaderData();
  console.log(data);

  //for style
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

    const formJson: RegisterRequest = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { data, error, errorMessage } = await register(formJson);

    if (error) {
      const obj = JSON.parse(JSON.stringify(errorMessage));
      setAlertMessage(obj.message);
    }

    if (data) {
      const { message } = data;
      setAlertMessage(message);
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
        validationState="success"
        validationMessage="This is a success message."
        required
      >
        <Input
          size="large"
          name="username"
          contentBefore={<PersonRegular />}
        />
      </Field>

      <Field
        size="large"
        label="Email"
        validationState="success"
        validationMessage="This is a success message."
        required
      >
        <Input
          size="large"
          name="email"
          contentBefore={<Mail24Regular />}
        />
      </Field>

      <Field
        size="large"
        label="Password"
        validationState="success"
        validationMessage="This is a success message."
        required
      >
        <Input
          size="large"
          name="password"
          type={type}
          contentAfter={type === "password" ? <EyeOff24Regular onClick={togglePasswordVisibility} /> : <Eye24Regular onClick={togglePasswordVisibility} />}
        />
      </Field>

      <Button
        appearance="primary"
        type="submit"
        size="large"
      >Register</Button>
    </form>

    <div className="box">
      Have an account?{" "}
      <Link href="./login">
        Login
      </Link>
    </div>

  </>;
}