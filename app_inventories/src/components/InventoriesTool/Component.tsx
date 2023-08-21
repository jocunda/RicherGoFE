import React from "react";

// Components
import {
  Button,
} from "@fluentui/react-components";
import {
  // Edit24Regular,
  AppsAddIn24Regular,
  DrawerAdd24Regular,
  Print24Regular,
  DocumentTableArrowRight24Regular,
  // DeleteDismiss24Regular,
} from "@fluentui/react-icons";
import AppAddIinventory from "../AppAddInventory/Component";

//styles
import "../../styles/index.scss"

// import styles from './styles.module.scss';

type InventoriesToolProps = {
  onInventorySuccess: () => void;
  count: number;
  itemWithId: string | undefined;
}

export function InventoriesTool({ onInventorySuccess, count, itemWithId }: InventoriesToolProps) {

  console.log(count);


  return <>
    {/* <Button icon={<Edit24Regular />}>Edit</Button> */}
    <Button icon={<AppsAddIn24Regular />}>Add Formula</Button>
    <AppAddIinventory onInventoryAddSuccess={onInventorySuccess} itemId={itemWithId} />
    <Button icon={<DrawerAdd24Regular />}>Bulk Add Inventory</Button>
    <Button icon={<Print24Regular />}>Print All Inventory</Button>
    <Button icon={<DocumentTableArrowRight24Regular />}>Export Result</Button>
    {/* <Button icon={<DeleteDismiss24Regular />}>Delete</Button> */}
  </>;
}