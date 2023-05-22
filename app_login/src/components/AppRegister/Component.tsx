import React, { useState } from "react";
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
import "../../styles/index.scss"


export default function Register() {
  const data = useLoaderData();
  console.log(data);

  const [type, setType] = useState<"password" | "text">("password");
  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return <>
    <form method="post">
      <Field
        size="large"
        label="Username"

        validationState="success"
        validationMessage="This is a success message."
        required
      >
        <Input
          size="large"
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