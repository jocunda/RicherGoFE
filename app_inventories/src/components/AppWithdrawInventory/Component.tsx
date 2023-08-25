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
  // Toaster,
  // Toast,
  // ToastTitle,
  // useToastController,
  // useId,
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


// // APIs
// import { editItem } from "@mimo/items";
// types
import type { Inventory, WithdrawInventoryRequest } from "@mimo/items";


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

type AppWithdrawProps = {
  // onItemEditSuccess: () => void;
  inventoryId: string;
  itemDataForForm: Inventory;
};

const AddIcon = bundleIcon(AddSquare24Filled, AddSquare24Regular);
const SubstractIcon = bundleIcon(SubtractSquare24Filled, SubtractSquare24Regular);
const BoxMultipleArrowRightIcon = bundleIcon(BoxMultipleArrowRight24Filled, BoxMultipleArrowRight24Regular);

export default function AppWithdrawInventory({
  // onItemEditSuccess,
  inventoryId,
  itemDataForForm }: AppWithdrawProps) {

  const [open, setOpen] = useState<boolean>(false);

  const [value, setValue] = useState<number>(0);

  function formatToFixed(value: number, decimalPlaces: number): string {
    return value.toFixed(decimalPlaces);
  }

  const handleIncrement = () => {
    setValue(parseFloat(formatToFixed(value + 1, 2)));
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(parseFloat(formatToFixed(value - 1, 2)));
    }
  };

  //toaster fluent
  // const toasterId = useId("toaster");
  // const { dispatchToast } = useToastController(toasterId);

  // const errorNotify = (message: string) => {
  //   dispatchToast(
  //     <Toast>
  //       <ToastTitle>{message}</ToastTitle>
  //     </Toast>,
  //     { position: "top-end", intent: "error" }
  //   );
  // };

  // const successNotify = (message: string) => {
  //   dispatchToast(
  //     <Toast>
  //       <ToastTitle>{message}</ToastTitle>
  //     </Toast>,
  //     { position: "top-end", intent: "success" }
  //   );
  // };

  //react-hook-form
  const { register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleInputBlur = async (fieldName: string) => {
    await trigger(fieldName);
  };

  const convertToEditRequest = (dataInput: FieldValues): WithdrawInventoryRequest => {
    const { quantity } = dataInput;
    return {
      quantity: quantity as number,
    };
  };


  const onSubmit: SubmitHandler<FieldValues> = (dataInput, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    const withdrawItemRequest = convertToEditRequest(dataInput);
    console.log(dataInput)
    debugger
    console.log(inventoryId)
    console.log(withdrawItemRequest)
    console.log("whtas?")
    setOpen(false);
    // const { data, error, errorMessage } = await editItem(inventoryId, withdrawItemRequest);

    // //show alert
    // if (error) {
    //   const obj = JSON.stringify(errorMessage);
    //   const errMessage = JSON.parse(obj)
    //   errorNotify(errMessage.message)
    // }

    // if (data) {
    //   const { message } = data;
    //   successNotify(message);
    //   setOpen(false);
    //   onItemEditSuccess();
    // }
  }

  return <>
    {/* <Toaster toasterId={toasterId} /> */}

    <Dialog modalType="modal" open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button
          aria-label="Withdraw"
          icon={<Cart24Regular />} />
      </DialogTrigger>
      <DialogSurface>
        <form
          method="post"
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
                  <Button appearance="transparent" icon={<SubstractIcon />} onClick={handleDecrement} />
                  <Input
                    size="large"
                    type="number"
                    {...register("quantity")}
                    onBlur={() => handleInputBlur("quantity")}
                    value={value?.toString()}
                  />
                  <Button appearance="transparent" icon={<AddIcon />} onClick={handleIncrement} />
                </div>

              </Field>

            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary" icon={<DismissCircle24Regular />}>Close</Button>
              </DialogTrigger>
              <Button
                onClick={() => setValue(parseFloat(itemDataForForm.qty.toString()))}
                appearance="secondary"
                icon={<BoxMultipleArrowRightIcon />} >Withdraw All</Button>
              <Button
                appearance="primary"
                type="submit"
                icon={<Cart24Regular />}>Withdraw</Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  </>;
}