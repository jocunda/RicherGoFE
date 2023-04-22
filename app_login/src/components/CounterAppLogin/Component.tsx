import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function Login() {
  console.log("microfe component: Login");
  const data = useLoaderData();
  console.log('Login data: ', data);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());


    fetch("/api/Authenticate/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: form.method,
      body: JSON.stringify(formJson),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong on API server!");
        }
      })
      .then(({ token, expiration }) => {
        if (token && expiration) {
          // Convert expiration date to a Date object
          const expirationDate = new Date(expiration);

          // Convert expiration date to UTC string
          const expirationString = expirationDate.toUTCString();
          // Set cookie with token and expiration
          document.cookie = `token=${token}; expires=${expirationString}; path=/;`;
          alert("Welcome back in. Authenticating...");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return <>
    <form method="post" onSubmit={handleSubmit}>
      <label>
        UserName: <input name="UserName" />
      </label>
      <label>
        Password:
        <input name="Password" type="password" />
      </label>
      <hr />
      <button type="reset">Reset</button>
      <button type="submit">Login</button>
    </form>
    <Link to='/'>home</Link>

  </>;
}