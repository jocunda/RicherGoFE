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


const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const schema = yup.object({
  username: yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(10, 'Username must be below 10 characters')
    .required('Please Enter your Username'),
  email: yup.string()
    .email('Invalid email')
    .required('Please Enter your Email'),
  password: yup.string()
    .min(6, 'Passsword must be at least 6 characters long')
    .max(12, 'Passsword be below 12 characters')
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[^\w]/, getCharacterValidationError("symbol"))
    .required('Please Enter your Password'),
}).required();

export default function Register() {
  //alert message
  const [alertMessage, setAlertMessage] = useState<string | undefined>("");
  const [isError, setIsError] = useState<boolean>()

  //router things
  const data = useLoaderData();
  console.log(data);

  //for style
  const [type, setType] = useState<"password" | "text">("password");
  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  //react-hook-form
  const { register,
    handleSubmit,
    trigger,
    formState: { errors, isDirty, isValid }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleInputBlur = async (fieldName: string) => {
    await trigger(fieldName);
  };

  const convertToRegisterRequest = (dataInput: FieldValues): RegisterRequest => {
    const { username, email, password } = dataInput;
    return {
      username: username as string,
      email: email as string,
      password: password as string,
    };
  };

  const onSubmit: SubmitHandler<FieldValues> = async (dataInput, event?: React.BaseSyntheticEvent) => {
    // Prevent the browser from reloading the page
    event?.preventDefault();

    const registerRequest = convertToRegisterRequest(dataInput);
    const { data, error, errorMessage } = await registerUser(registerRequest);

    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      setAlertMessage(errMessage.message);
      setIsError(true)
    }

    if (data) {
      const { message } = data;
      setAlertMessage(message);
      setIsError(false)
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
        <Alert intent={isError ? "error" : "success"}>
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
          onBlur={() => handleInputBlur("username")}
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
          onBlur={() => handleInputBlur("email")}
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
          onBlur={() => handleInputBlur("password")}
        />
      </Field>

      <Button
        appearance="primary"
        type="submit"
        size="large"
        disabled={!isDirty && !isValid}
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