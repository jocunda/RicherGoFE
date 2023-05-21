import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  useId,
  Input,
  Label,
  Button,
} from "@fluentui/react-components";
import { PersonRegular, Eye24Regular } from "@fluentui/react-icons";
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


  return <>
    <form method="post" onSubmit={handleSubmit}>

      <Label size="large" htmlFor={username}>Username</Label>
      <Input
        size="large"
        contentBefore={<PersonRegular />}
        id={username} />
      <Label size="large" htmlFor={password}>Password</Label>
      <Input
        size="large"
        type="password" defaultValue="password"
        contentAfter={<Eye24Regular />}
        id={password}
      />

      <hr />
      <Button type="reset" size="large" >Reset</Button>
      <Button type="submit" size="large" disabled>Login</Button>

    </form>
    <Link to='/'>home</Link>

  </>;
}