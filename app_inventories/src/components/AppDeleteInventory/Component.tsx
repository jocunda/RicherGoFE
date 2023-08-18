import React, { useState } from "react";

//styles
import "../../styles/index.scss"
// import styles from './styles.module.scss';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Toaster,
  Toast,
  ToastTitle,
  useToastController,
  useId,
} from "@fluentui/react-components";
import {
  DeleteRegular,
  Delete24Regular,
  DeleteOff24Regular
} from "@fluentui/react-icons";

// APIs
import { deleteItem } from "@mimo/items";

type AppDeleteProps = {
  onItemDeleteSuccess: () => void;
  inventoryId: string;
};

export default function AppDeleteInventory({ onItemDeleteSuccess, inventoryId }: AppDeleteProps) {
  const [open, setOpen] = useState<boolean>(false);


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

  const deleteItemHandler = async (inventoryId: string) => {
    const { data, error, errorMessage } = await deleteItem(inventoryId);

    //show alert
    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      errorNotify(errMessage.message)
    }

    if (data) {
      const { message } = data;
      successNotify(message);
      setOpen(false);
      onItemDeleteSuccess();
    }
  }

  return <>
    <Toaster toasterId={toasterId} />

    <Dialog modalType="alert" open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button
          aria-label="Delete"
          icon={<DeleteRegular />} />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle><Delete24Regular /></DialogTitle>
          <DialogContent>
            You want to delete inventory?
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" icon={<DeleteOff24Regular />}>Cancel</Button>
            </DialogTrigger>
            <Button
              appearance="primary"
              onClick={() => deleteItemHandler(inventoryId)}
              icon={<Delete24Regular />}>Delete</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  </>;
}