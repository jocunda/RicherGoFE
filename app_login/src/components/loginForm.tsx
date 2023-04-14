import React from "react"
import * as Yup from 'yup';
import { useFormik } from "formik";



const LoginForm = () => {

    const onSubmit = async (values: any) => {
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
        alert(JSON.stringify(values, null, 2));
    };


    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: Yup.object().shape({
            username: Yup.string()
                .min(2, 'Username must be at least 2 characters long')
                .required("Required"),
            password: Yup.string()
                .required("Required"),
        }),
    });


    return <>
        <form onSubmit={formik.handleSubmit}>
            <label>Username</label>
            <input
                type="text"
                placeholder="Username"
                {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username
                ? formik.errors.username
                : ""}
            <label>Password</label>
            <input
                type="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            <button
                disabled={!formik.isValid || !formik.dirty}
                type="submit">
                Login
            </button>
        </form>
    </>
}

export default LoginForm;