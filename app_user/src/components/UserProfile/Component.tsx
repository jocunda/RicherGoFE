import React, {
  useEffect, useState
} from "react";

// import { useLoaderData } from "react-router-dom";

// styles
import {
  Button,
  Divider,
} from "@fluentui/react-components";

import {
  bundleIcon,
  PersonEdit24Regular,
  PersonEdit24Filled
} from "@fluentui/react-icons";

import "../../styles/index.scss"
import styles from './styles.module.scss';

// APIs
import { GetUserResponse, getUser } from "@mimo/authentication";



export default function UserProfile() {
  const [userData, setUserData] = useState<GetUserResponse>({
    id: "",
    username: "",
    email: "",
    name: "",
    department: "",
    employmentDate: new Date(),
    role: "",
  });

  //for style
  const Edit = bundleIcon(PersonEdit24Filled, PersonEdit24Regular);

  //router things
  // const loaderData = useLoaderData();
  // console.log('userProfile data: ', loaderData);

  //retrieve user data
  useEffect(() => {
    userDataGet();
  }, []);

  const userDataGet = async () => {
    const { data, error, errorMessage } = await getUser();
    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      console.log(errMessage)
    }
    if (data) {
      setUserData(data);
    }
  }
  const iso8601Pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;
  const valueProcess = (value: string | Date) => {
    if (typeof value === 'string' && value.match(iso8601Pattern)) {
      return value.slice(0, 10);
    } else if (value instanceof Date) {
      return value.toISOString().slice(0, 10);
    } else {
      return value;
    }
  };


  return <>
    <div className={styles.infoContainer}>
      {Object.entries(userData)
        .slice(1) //to not render userId
        .map(([key, value]) => (
          <>
            <div key={key} className={styles.infoDetail}>
              <p className={styles.detailLeft}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
              <p className={styles.detailCenter}>
                {valueProcess(value)}
              </p>
              <Button
                className={styles.detailRight}
                appearance="transparent"
                icon={<Edit />}
                iconPosition="after">
                Edit
              </Button>
            </div >
            <Divider />
          </>
        ))}
    </div >
  </>
};