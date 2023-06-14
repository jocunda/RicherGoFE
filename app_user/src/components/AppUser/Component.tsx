import React from "react";

import { useLoaderData } from "react-router-dom";

//styles
import {
  Image,
  Tab,
  TabList,
  Button,
  Divider,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
} from "@fluentui/react-components";
import {
  bundleIcon,
  Person24Regular,
  Person24Filled,
  Key24Regular,
  Key24Filled,
  Settings24Regular,
  SignOut24Regular,
  Warning24Regular
} from "@fluentui/react-icons";
import "../../styles/index.scss"
import styles from './styles.module.scss';

export default function AppUser() {
  const user = sessionStorage.getItem("user")

  //router things
  const data = useLoaderData();
  console.log('user: ', data);

  const handleLogout = () => {
    console.log("logout")
  }

  //for style
  const Person = bundleIcon(Person24Filled, Person24Regular);
  const Key = bundleIcon(Key24Filled, Key24Regular);
  const renderTabs = () => {
    return (
      <>
        <Tab icon={<Person />} value="tab1">
          User Profile
        </Tab>
        <Tab icon={<Key />} value="tab2">
          Change Password
        </Tab>
        <Tab icon={<Settings24Regular />} value="tab3">
          Setting
        </Tab>
        <Divider />
        <Dialog modalType="alert">
          <DialogTrigger disableButtonEnhancement>
            <Button size="large"
              appearance="subtle"
              icon={<SignOut24Regular />}
            >Logout</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle><Warning24Regular /></DialogTitle>
              <DialogContent>
                Proceed to logout?
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Cancel</Button>
                </DialogTrigger>
                <Button appearance="primary" onClick={handleLogout}>Logout</Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </>
    );
  }

  return <>
    <div className={styles.userHeader}>
      <Image
        alt="Amanda's avatar"
        shape="rounded"
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
        height={200}
        width={200}
      />
      {user}
    </div>
    <div className={styles.container}>
      <TabList defaultSelectedValue="tab1" vertical>
        {renderTabs()}
      </TabList>
      <div className={styles.userContainer}>
        black
      </div>
    </div>



  </>;
}; 