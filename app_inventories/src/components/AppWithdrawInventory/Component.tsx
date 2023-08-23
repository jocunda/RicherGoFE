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
  Toaster,
  Toast,
  ToastTitle,
  useToastController,
  useId,
  Image
} from "@fluentui/react-components";
import {
  bundleIcon,
  DismissCircle24Regular,
  Cart24Regular,
  AddSquare24Regular,
  AddSquare24Filled,
  SubtractSquare24Regular,
  SubtractSquare24Filled,
  BoxMultipleArrowRight24Regular,
  BoxMultipleArrowRight24Filled
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
    .max(40, 'Item name must be below 40 characters')
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

const AddIcon = bundleIcon(AddSquare24Filled, AddSquare24Regular);
const SubstractIcon = bundleIcon(SubtractSquare24Filled, SubtractSquare24Regular);
const BoxMultipleArrowRightIcon = bundleIcon(BoxMultipleArrowRight24Filled, BoxMultipleArrowRight24Regular);

export default function AppWithdrawInventory({ onItemEditSuccess, inventoryId, itemDataForForm }: AppEditProps) {

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
          aria-label="Withdraw"
          icon={<Cart24Regular />} />
      </DialogTrigger>
      <DialogSurface>
        <form
          method="put"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.dialogBodyContainer}
        >
          <DialogBody >
            <DialogTitle>Withdraw</DialogTitle>
            <DialogContent className={styles.dialogContentContainer}>
              <Image
                alt="Erik's avatar"
                bordered
                shape="circular"
                src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
                height={200}
                width={200}
                className={styles.itemImageContainer}
              />
              <Field
                size="large"
                label="Item"
                orientation="horizontal"
              >
                <span>{itemDataForForm.itemValue}</span>
              </Field>

              <Field
                size="large"
                label="Withdraw From"
                orientation="horizontal"
              >
                <span>{itemDataForForm.no}</span>
              </Field>

              <Field
                size="large"
                label="Qty"
                validationState={errors.quantity ? "error" : "none"}
                validationMessage={
                  errors.quantity ? `${errors.quantity?.message}` : null}
              >
                <div className={styles.inputNumberContainer}>
                  <Button appearance="transparent" icon={<SubstractIcon />} />
                  <Input
                    size="large"
                    type="number"
                    {...register("quantity")}
                    onBlur={() => handleInputBlur("quantity")}

                  />
                  <Button appearance="transparent" icon={<AddIcon />} />
                </div>

              </Field>

            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary" icon={<DismissCircle24Regular />}>Close</Button>
              </DialogTrigger>
              <Button appearance="secondary" icon={<BoxMultipleArrowRightIcon />} >Withdraw All</Button>
              <Button
                appearance="primary"
                type="submit"
                disabled={!isDirty && !isValid}
                icon={<Cart24Regular />}>Withdraw</Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  </>;
}