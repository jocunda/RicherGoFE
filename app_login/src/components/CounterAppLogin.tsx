import React from "react";

function Login() {
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
          debugger;
          return response.json();
        } else {
          throw new Error("Something went wrong on API server!");
        }
      })
      .then((response) => {
        console.debug(response);
        // …
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
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
  );
}

export default Login;
