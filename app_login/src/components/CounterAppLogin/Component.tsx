import React, { useState } from "react";
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
import "../../styles/index.scss"

// APIs
import { login } from "@mimo/authentication";

// types
import type { LoginRequest } from "@mimo/authentication";

export default function Login() {
  const data = useLoaderData();
  console.log(data);
  const navigate = useNavigate();

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
    const formJson = Object.fromEntries(formData.entries()) as LoginRequest;
    const { data, error, errorMessage } = await login(formJson);
    if (error) {
      alert(errorMessage);
    }


    if (data) {
      const { token, expiration } = data;
      const expirationDate = new Date(expiration);

      // Convert expiration date to UTC string
      const expirationString = expirationDate.toUTCString();
      // Set cookie with token and expiration
      document.cookie = `token=${token}; expires=${expirationString}; path=/;`;
      const lastVisitedPage = sessionStorage.getItem('lastVisitedPage');
      if (lastVisitedPage) {
        navigate(lastVisitedPage);
      } else {
        navigate("/");
      }
    }



  }

  const username = useId("username");
  const password = useId("password");
  const [type, setType] = useState<"password" | "text">("password");



  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return <>

    <form method="post" onSubmit={handleSubmit}>
      <Field
        size="large"
        label="Username"
        validationState="error"
        validationMessage="This is an error message.">
        <Input
          size="large"
          contentBefore={<PersonRegular />}
          id={username} />
      </Field>
      <Field
        size="large"
        label="Password"
        validationState="success"
        validationMessage="This is a success message."
      >
        <Input
          size="large"
          type={type}
          contentAfter={type === "password" ? <EyeOff24Regular onClick={togglePasswordVisibility} /> : <Eye24Regular onClick={togglePasswordVisibility} />}
          id={password}
        />
      </Field>

      <Button
        appearance="primary"
        type="submit"
        size="large"
        disabled
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