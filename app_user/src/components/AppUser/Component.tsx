import React,
{
  // useEffect,
  // useState
} from "react";

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
  Text,
  useId,
  ToastTitle,
  Toast,
  useToastController,
  Toaster,
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
// import { Alert } from "@fluentui/react-components/unstable";
import "../../styles/index.scss"
import styles from './styles.module.scss';


// APIs
import { logoutUser } from "@mimo/authentication";


export default function AppUser() {
  const user = sessionStorage.getItem("user")

  //toaster fluent
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const errorNotify = (message: string) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { position: "top-end", intent: "error" }
    );
  };

  const successNotify = (message: string) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { position: "top-end", intent: "success" }
    );
  };

  //router things
  const data = useLoaderData();
  console.log('user: ', data);

  //routerDOM
  const navigate = useNavigate();
  const { tab } = useParams();

  const handleLogout = async () => {
    sessionStorage.clear();
    const { data, error, errorMessage } = await logoutUser();
    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      errorNotify(errMessage.message)
    }
    if (data) {
      const { message } = data;
      successNotify(message);
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
          value="">
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



  return <>
    <Toaster toasterId={toasterId} />

    <div className={styles.headerContainer} >
      <div className={styles.userHeader}>
        <Image
          alt="Amanda's avatar"
          shape="rounded"
          src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
          height={200}
          width={200}
        />
        <Text size={900}>{user}</Text>
      </div>
    </div>

    <div className={styles.userListContainer}>
      <TabList
        defaultSelectedValue=""
        vertical
        onTabSelect={handleTabClick}
        selectedValue={tab}>
        {renderTabs()}
      </TabList>

      <div className={styles.outletContainer}>
        <Outlet />
      </div>
    </div>
  </>;
}; 