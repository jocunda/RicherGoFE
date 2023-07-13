import React, { useEffect, useState } from "react";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
import { useNavigate, useParams } from "react-router-dom";
import {
  bundleIcon,
  CalendarMonthFilled,
  CalendarMonthRegular,
} from "@fluentui/react-icons";

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);


// APIs
import { getItemSingle } from "@mimo/items";
// types
import type { Item } from "@mimo/items";
import { Button } from "@fluentui/react-components";



export default function AppItem() {
  const { itemId } = useParams();
  let navigate = useNavigate();

  function handleBack() {
    navigate("/items")
  }

  const [itemData, setItemData] = useState<Item>();

  //retrieve item data
  useEffect(() => {
    itemDataGet();
  }, []);

  const itemDataGet = async () => {
    const { data, error, errorMessage } = await getItemSingle(itemId);

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
    <div className={styles.itemContainer}>
      <Button onClick={handleBack} appearance="outline" icon={<CalendarMonth />}>
        Back
      </Button>
      <h1>Item?</h1>
      {itemData &&
        <>
          <h1>{itemData.value}</h1>
          <h1>{itemData.description}</h1>
          <h1>{itemData.value}</h1>
          <h1>{itemData.value}</h1>
          <h1>{itemData.value}</h1>
        </>
      }
    </div>
  </>;
}