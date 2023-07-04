import React from "react";

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


export default function UserProfile() {

  //for style
  const Edit = bundleIcon(PersonEdit24Filled, PersonEdit24Regular);

  //router things
  const data = useLoaderData();
  console.log('userProfile data: ', data);


  return <>
    <div className={styles.infoContainer}>
      <h2>Basic Info</h2>
      <div className={styles.infoDetail}>
        <p>Name</p>
        <p>Tomato</p>
        <Button
          className={styles.editButton}
          appearance="transparent"
          icon={<Edit />}
          iconPosition="after"
        >
          Edit
        </Button>
      </div>
      <Divider />
      <div className={styles.infoDetail}>
        <p>Gender</p>
        <p>Female</p>
        <Button iconPosition="after" icon={<Edit />} className={styles.editButton} appearance="transparent">
          Edit
        </Button>
      </div>
      <Divider />
      <div className={styles.infoDetail}>
        <p>Email</p>
        <p>banana@corporation.com</p>
        <Button iconPosition="after" icon={<Edit />} className={styles.editButton} appearance="transparent">
          Edit
        </Button>
      </div>
      <Divider />
    </div>

  </>
};