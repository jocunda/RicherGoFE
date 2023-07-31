import React, {
  useState
} from "react";


//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
import {
  Button,
  CompoundButton,
  Input,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Field,
  Image,
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
  FolderAdd24Filled,
  FolderAdd24Regular,
  AddCircle24Regular,
  DismissCircle24Regular
} from "@fluentui/react-icons";


const DocumentAddIcon = bundleIcon(DocumentAdd24Filled, DocumentAdd24Regular);
const FolderAddIcon = bundleIcon(FolderAdd24Filled, FolderAdd24Regular);

//assets
import plus from "../../images/plusIcon.svg"

// APIs
import { addItem } from "@mimo/items";
// types
import type { AddItemRequest } from "@mimo/items";


//form validation
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  value: yup.string()
    .min(3, 'Item name must be at least 3 characters long')
    .max(40, 'Item name must be below 40 characters')
    .required('Please Enter Item Name'),
  code: yup.string()
    .min(4, 'Code must be at least 6 characters long')
    .required('Please Enter Item Code'),
  description: yup.string()
    .notRequired()
    .matches(/#[^\s#]/, 'Description must match "#...#..." format without space')
}).required();



export default function AppAddItems({ onItemAddSuccess }: { onItemAddSuccess: () => void }) {

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
      onItemAddSuccess();
    }
  }

  return <>
    <Toaster toasterId={toasterId} />

    <Dialog modalType="modal" open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button
          appearance="primary"
          icon={<DocumentAddIcon />}>Add Item</Button>
      </DialogTrigger>
      <DialogSurface>
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.dialogBodyContainer}
        >
          <DialogBody >
            <DialogTitle>Add Item</DialogTitle>
            <DialogContent className={styles.dialogContentContainer}>
              <Image
                className={styles.addImageIcon}
                alt="add Image"
                shape="circular"
                src={plus}
                height={200}
                width={200}
                onClick={() => console.log("clickable")}
              />
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
                  placeholder="LO-T5-00078-v1"
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
                icon={<AddCircle24Regular />}>Add</Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>

    <CompoundButton
      appearance="secondary"
      secondaryContent="From Folder"
      icon={<FolderAddIcon />}>Add Item</CompoundButton>
  </>;
}