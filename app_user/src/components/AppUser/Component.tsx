import React, { useEffect, useState } from "react";

import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";

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
  SelectTabData,
  SelectTabEvent,
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
import { Alert } from "@fluentui/react-components/unstable";
import "../../styles/index.scss"
import styles from './styles.module.scss';


// APIs
import { logoutUser } from "@mimo/authentication";


//other component
// import ResetPasswordForm from "../ResetPasswordForm/Component";

export default function AppUser() {
  const user = sessionStorage.getItem("user")

  //alert message
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  const [isError, setIsError] = useState<boolean>()

  //router things
  const data = useLoaderData();
  console.log('user: ', data);
  const navigate = useNavigate();
  const { tab } = useParams();

  const handleLogout = async () => {
    console.log("logout")
    sessionStorage.clear();
    const { data, error, errorMessage } = await logoutUser();
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
    navigate("/");
  }

  //for style
  const Person = bundleIcon(Person24Filled, Person24Regular);
  const Key = bundleIcon(Key24Filled, Key24Regular);
  const renderTabs = () => {
    return (
      <>
        <Tab icon={<Person />}
          value="profile">
          User Profile
        </Tab>
        <Tab icon={<Key />}
          value="reset">
          Change Password
        </Tab>
        <Tab icon={<Settings24Regular />}
          value="setting">
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

  const handleTabClick = (_event: SelectTabEvent, data: SelectTabData) => {
    navigate(`/user/${data.value}`);
  };

  // const [selectedValue, setSelectedValue] = useState<TabValue>("conditions");


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

    <div className={styles.alertSection}>
      {alertMessage && (
        <Alert intent={isError ? "error" : "success"}>
          {alertMessage}
        </Alert>
      )}
    </div>

    <div className={styles.userHeader}>
      <Image
        alt="Amanda's avatar"
        shape="rounded"
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
        height={200}
        width={200}
      />
      <p>{user}</p>
    </div>
    <div className={styles.container}>
      <TabList
        defaultSelectedValue="profile"
        vertical
        onTabSelect={handleTabClick}
        selectedValue={tab}>
        {renderTabs()}
      </TabList>

      <div className={styles.userContainer}>
        {/* <div >
          {tab === "user" && <h1>User profile</h1>}
          {tab === "key" && <ResetPasswordForm />}
          {tab === "setting" && <h1>Setting</h1>}
        </div> */}
        <Outlet />
      </div>
    </div>
  </>;
}; 