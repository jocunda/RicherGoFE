import React, { useEffect, useState } from "react";

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

// APIs
import { getItemSingle } from "@mimo/items";
// types
import type { Item } from "@mimo/items";

type InventoriesToolProps = {
  onInventorySuccess: () => void;
  count: number;
  itemWithId: string | undefined;
}

export function InventoriesTool({ onInventorySuccess, count, itemWithId }: InventoriesToolProps) {

  console.log(count);

  const [itemData, setItemData] = useState<Item>();

  //retrieve item data
  useEffect(() => {
    itemDataGet();
  }, []);

  const itemDataGet = async () => {
    const { data, error, errorMessage } = await getItemSingle(itemWithId);

    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      console.log(errMessage);
    }
    if (data) {
      setItemData(data);
    }
  }

  return <>
    {/* <Button icon={<Edit24Regular />}>Edit</Button> */}
    <Button icon={<AppsAddIn24Regular />}>Add Formula</Button>
    <AppAddIinventory
      onInventoryAddSuccess={onInventorySuccess}
      itemId={itemData?.id}
      itemValue={itemData?.value} />
    <Button icon={<DrawerAdd24Regular />}>Bulk Add Inventory</Button>
    <Button icon={<Print24Regular />}>Print All Inventory</Button>
    <Button icon={<DocumentTableArrowRight24Regular />}>Export Result</Button>
    {/* <Button icon={<DeleteDismiss24Regular />}>Delete</Button> */}
  </>;
}