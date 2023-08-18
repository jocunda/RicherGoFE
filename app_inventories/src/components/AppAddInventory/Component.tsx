import React, {
  useState
} from "react";

// Components
import {
  Button,
  Input,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Field,
  Textarea,
  Toaster,
  Toast,
  ToastTitle,
  useToastController,
  useId,
} from "@fluentui/react-components";
import {
  bundleIcon,
  DocumentAdd24Filled,
  DocumentAdd24Regular,
  AddCircle24Regular,
  DismissCircle24Regular
} from "@fluentui/react-icons";

const DocumentAddIcon = bundleIcon(DocumentAdd24Filled, DocumentAdd24Regular);

// APIs
import { addItem } from "@mimo/items";

// types
import type { AddItemRequest } from "@mimo/items";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';


//form validation
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  code: yup.string()
    .min(4, 'Code must be at least 6 characters long')
    .required('Please Enter Item Code'),
  quantity: yup.number()
    .min(1)
    .max(1000000),
  memo: yup.string()
    .notRequired()
}).required();



export default function AppAddInventory({ onInventoryAddSuccess }: { onInventoryAddSuccess: () => void }) {

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

  const convertToLoginRequest = (dataInput: FieldValues): AddItemRequest => {
    const { value, code, description } = dataInput;
    return {
      value: value as string,
      code: code as string,
      description: description as string,
    };
  };

  const onSubmit: SubmitHandler<FieldValues> = async (dataInput, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();

    const addItemRequest = convertToLoginRequest(dataInput);
    const { data, error, errorMessage } = await addItem(addItemRequest);

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
      onInventoryAddSuccess();
    }
  }

  return <>
    <Toaster toasterId={toasterId} />

    <Dialog modalType="modal" open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<DocumentAddIcon />}>Add Inventory</Button>
      </DialogTrigger>
      <DialogSurface>
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.dialogBodyContainer}
        >
          <DialogBody >
            <DialogTitle>Add Inventory</DialogTitle>
            <DialogContent className={styles.dialogContentContainer}>

              <Field
                size="large"
                label="Item"
                orientation="horizontal"
              >
                <span>Item Name from ItemId</span>
              </Field>
              <Field
                size="large"
                label="Position"
                orientation="horizontal"
              >
                <span>Position? How</span>
              </Field>

              <Field
                size="large"
                label="Code"
                validationState={errors.code ? "error" : "none"}
                validationMessage={
                  errors.code ? `${errors.code?.message}` : null}
                required
              >
                <Input
                  size="large"
                  {...register("code")}
                  onBlur={() => handleInputBlur("code")}
                />
              </Field>
              <Field
                size="large"
                label="Qty"
                validationState={errors.quantity ? "error" : "none"}
                validationMessage={
                  errors.quantity ? `${errors.quantity?.message}` : null}
              >
                <Input
                  size="large"
                  type="number"
                  {...register("quantity")}
                  onBlur={() => handleInputBlur("quantity")}
                />
              </Field>

              <Field
                size="large"
                label="Memo"
                validationState={errors.memo ? "error" : "none"}
                validationMessage={
                  errors.memo ? `${errors.memo?.message}` : null}
              >
                <Textarea
                  {...register("memo")}
                  onBlur={() => handleInputBlur("memo")}
                  resize="none" />
              </Field>

            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary" icon={<DismissCircle24Regular />}>Close</Button>
              </DialogTrigger>
              <Button
                appearance="primary"
                type="submit"
                disabled={!isDirty && !isValid}
                icon={<AddCircle24Regular />}>Add</Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  </>;
}