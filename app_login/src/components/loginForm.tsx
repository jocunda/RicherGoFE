import React from "react";
// import * as Yup from "yup";
// import { useFormik } from "formik";

function LoginForm() {
  //const onSubmit = async (values: any) => {
  // setError(null);
  // const response = await axios
  //   .post("http://localhost:5000/api/v1/login", values, {
  //     withCredentials: true,
  //   })
  //   .catch((err) => {
  //     if (err && err.response) setError(err.response.data.message);
  //   });

  // if (response && response.data) {
  //   const { token, user } = response.data;
  //   storeAuthentication(token, user);
  //   alert("Welcome back in. Authenticating...");
  //   navigate("/dashboard");
  // }
  //alert(JSON.stringify(values, null, 2));
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     username: "",
  //     password: "",
  //   },
  //   validateOnBlur: true,
  //   onSubmit,
  //   validationSchema: Yup.object().shape({
  //     username: Yup.string()
  //       .min(2, "Username must be at least 2 characters long")
  //       .required("Required"),
  //     password: Yup.string().required("Required"),
  //   }),
  // });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    debugger;
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    // You can pass formData as a fetch body directly:
    fetch("/some-api", { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  return (
    <>
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
    </>
    // <form onSubmit={handleSubmit}>
    //   <label>Username</label>
    //   <input
    //     type="text"
    //     placeholder="Username"
    //     {...formik.getFieldProps("username")}
    //   />
    //   {formik.touched.username && formik.errors.username
    //     ? formik.errors.username
    //     : ""}
    //   <label>Password</label>
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     {...formik.getFieldProps("password")}
    //   />
    //   {formik.touched.password && formik.errors.password
    //     ? formik.errors.password
    //     : ""}
    //   <button disabled={!formik.isValid || !formik.dirty} type="submit">
    //     Login
    //   </button>
    // </form>
  );
}

export default LoginForm;
