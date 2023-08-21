import React, {
  useState
} from "react";


//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
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
  DismissCircle24Regular,
  EditRegular,
} from "@fluentui/react-icons";


// APIs
import { editItem } from "@mimo/items";
// types
import type { Inventory, AddItemRequest } from "@mimo/items";


//form validation
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  value: yup.string()
    .min(3, 'Item name must be at least 3 characters long')
    .max(100, 'Item name must be below 100 characters')
    .required('Please Enter Item Name'),
  code: yup.string()
    .min(4, 'Code must be at least 6 characters long')
    .required('Please Enter Item Code'),
  description: yup.string()
    .notRequired()
    .matches(/#[^\s#]/, 'Description must match "#...#..." format without space')
}).required();

type AppEditProps = {
  onItemEditSuccess: () => void;
  inventoryId: string;
  itemDataForForm: Inventory;
};

export default function AppEditInventory({ onItemEditSuccess, inventoryId, itemDataForForm }: AppEditProps) {

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

  const convertToEditRequest = (dataInput: FieldValues): AddItemRequest => {
    const { value, code, description } = dataInput;
    return {
      value: value as string,
      code: code as string,
      description: description as string,
    };
  };

  const onSubmit: SubmitHandler<FieldValues> = async (dataInput, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();

    const editItemRequest = convertToEditRequest(dataInput);
    const { data, error, errorMessage } = await editItem(inventoryId, editItemRequest);

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
      onItemEditSuccess();
    }
  }

  return <>
    <Toaster toasterId={toasterId} />

    <Dialog modalType="modal" open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button
          aria-label="Edit"
          icon={<EditRegular />} />
      </DialogTrigger>
      <DialogSurface>
        <form
          method="put"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.dialogBodyContainer}
        >
          <DialogBody >
            <DialogTitle>Edit Inventory</DialogTitle>
            <DialogContent className={styles.dialogContentContainer}>

              <Field
                size="large"
                label="Item Name"
                validationState={errors.value ? "error" : "none"}
                validationMessage={
                  errors.value ? `${errors.value?.message}` : null}
                required
              >
                <Input
                  size="large"
                  {...register("value")}
                  onBlur={() => handleInputBlur("value")}
                  defaultValue={itemDataForForm.no}
                />
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
                  defaultValue={itemDataForForm.itemValue}
                />
              </Field>
              <Field
                size="large"
                label="Description"
                validationState={errors.description ? "error" : "none"}
                validationMessage={
                  errors.description ? `${errors.description?.message}` : null}
              >
                <Textarea
                  {...register("description")}
                  onBlur={() => handleInputBlur("description")}
                  resize="none"
                  defaultValue={itemDataForForm.memo}
                  placeholder="#...#..." />
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
                icon={<EditRegular />}>Update</Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  </>;
}