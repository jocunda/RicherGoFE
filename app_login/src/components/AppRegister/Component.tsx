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
import { registerUser } from "@mimo/authentication";

// types
import type { RegisterRequest } from "@mimo/authentication";

//form validation
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  username: yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(10, 'Username must be below at 10 characters long')
    .required(),
  email: yup.string()
    .email('Invalid email')
    .required(),
  password: yup.string()
    .min(6, 'Passsword must be at least 6 characters long')
    .max(12, 'Username must be below at 12 characters long')
    .required(),
}).required();

export default function Register() {
  const [alertMessage, setAlertMessage] = useState<string | undefined>("");
  const data = useLoaderData();
  console.log(data);

  //for style
  const [type, setType] = useState<"password" | "text">("password");
  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const onSubmit: SubmitHandler<FieldValues> = async (event) => {
    // Prevent the browser from reloading the page
    event.preventDefault();
    // Read the form data
    const form = event.target as HTMLFormElement;
    //e: React.FormEvent<HTMLFormElement>
    const formData = new FormData(form);

    const formJson: RegisterRequest = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { data, error, errorMessage } = await registerUser(formJson);

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

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  return <>
    <div className="alert-section">
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
          {...register("username")}
        />
      </Field>

      <Field
        size="large"
        label="Email"
        validationState={errors.email ? "error" : "none"}
        validationMessage={errors.email ? `${errors.email.message}` : null}
        required
      >
        <Input
          size="large"
          contentBefore={<Mail24Regular />}
          {...register("email")}
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
          {...register("password")}
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