import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { authLogin } from "@mimo/api";

export default function Login() {
  console.log("microfe component: Login");
  const data = useLoaderData();
  console.log('Login data: ', data);
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    // Prevent the browser from reloading the page
    e.preventDefault();
    authLogin(e);

    // Read last visited page from sessionStorage
    const lastVisitedPage = sessionStorage.getItem('lastVisitedPage');

    // Redirect back to last visited page or a default page after successful login
    if (lastVisitedPage) {
      navigate(lastVisitedPage);
    } else {
      navigate("/");
    }

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