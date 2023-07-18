import React, {
  useEffect, useState
} from "react";

import { useLoaderData } from "react-router-dom";

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
import { getUser } from "../../../../packages/authentication/src/apis";



export default function UserProfile() {
  const [userData, setUserData] = useState<{ [key: string]: string }>({});

  //for style
  const Edit = bundleIcon(PersonEdit24Filled, PersonEdit24Regular);

  //router things
  const loaderData = useLoaderData();
  console.log('userProfile data: ', loaderData);

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

  return <>
    <div className={styles.infoContainer}>
      {Object.entries(userData).map(([key, value]) => (
        <>
          <div key={key} className={styles.infoDetail}>
            <p className={styles.detailLeft}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            <p className={styles.detailCenter}>{value}</p>
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