import React, { useEffect, useState } from "react";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
import { useNavigate, useParams } from "react-router-dom";
import {
  bundleIcon,
  ArrowCircleLeft24Regular,
  ArrowCircleLeft24Filled,
  // DocumentBulletList24Regular
  Edit24Regular,
  AppsAddIn24Regular,
  DocumentAdd24Regular,
  DrawerAdd24Regular,
  Print24Regular,
  DocumentTableArrowRight24Regular,
  DeleteDismiss24Regular,
  // CalendarMonthRegular,
  // CalendarMonthFilled,
  BoxMultiple24Regular,
  BoxMultiple24Filled,
  History24Regular,
  History24Filled,
  Bookmark24Regular,
  Bookmark24Filled
} from "@fluentui/react-icons";

import {
  Badge,
  Image,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Body1,
  Button,
  Tab,
  TabList,
  SelectTabData,
  SelectTabEvent,
  TabValue,
  Caption1,
} from "@fluentui/react-components";


//component
import AppInventoryList from "../AppInventoryList/Component";

const ArrowCircleLeft = bundleIcon(ArrowCircleLeft24Filled, ArrowCircleLeft24Regular);
// const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const BoxMultiple24 = bundleIcon(BoxMultiple24Filled, BoxMultiple24Regular);
const History24 = bundleIcon(History24Filled, History24Regular);
const Bookmark24 = bundleIcon(Bookmark24Filled, Bookmark24Regular);

// APIs
import { getItemSingle } from "@mimo/items";
// types
import type { Item } from "@mimo/items";

export default function AppItem() {

  //react-router
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
  const arraySplit = itemData?.description.split("#").filter(Boolean)


  const [selectedValue, setSelectedValue] =
    React.useState<TabValue>("inventory");

  const onTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const renderTabs = () => {
    return (
      <>
        <Tab icon={<BoxMultiple24 />} value="inventory">
          Inventory
        </Tab>
        <Tab icon={<Bookmark24 />} value="attribute">
          Attribute
        </Tab>
        <Tab icon={<History24 />} value="history">
          History
        </Tab>
      </>
    );
  };


  return <>
    <div className={styles.itemContainer}>
      <Card className={styles.card}>
        <CardHeader
          image={
            <Image
              alt="Erik's avatar"
              bordered
              shape="circular"
              src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
              height={200}
              width={200}
            />
          }
          header={
            <Body1>
              <h1>{itemData?.value}</h1>
            </Body1>
          }
          description={
            < Caption1 >
              {arraySplit && arraySplit.map((classify: string) =>
                <Badge
                  size="extra-large"
                  appearance="tint"
                  className={styles.classBadge}>{classify}</Badge>
              )}
              <TabList
                className={styles.tabList}
                defaultSelectedValue=""
                onTabSelect={onTabSelect}
                selectedValue={selectedValue}>
                {renderTabs()}
              </TabList>
            </Caption1>
          }
          action={
            <Button onClick={handleBack} appearance="outline" icon={<ArrowCircleLeft />}>
              Back
            </Button>
          }
        />

        <CardPreview className={styles.previewContainer}>
          <div className={styles.panels}>
            {selectedValue === "inventory" && <AppInventoryList />}
            {selectedValue === "attribute" && "Attr"}
            {selectedValue === "history" && "History"}
          </div>
        </CardPreview>

        <CardFooter className={styles.buttonContainer}>
          <Button icon={<Edit24Regular />}>Edit</Button>
          <Button icon={<AppsAddIn24Regular />}>Add Formula</Button>
          <Button icon={<DocumentAdd24Regular />}>Add Inventory</Button>
          <Button icon={<DrawerAdd24Regular />}>Bulk Add Inventory</Button>
          <Button icon={<Print24Regular />}>Print All Inventory</Button>
          <Button icon={<DocumentTableArrowRight24Regular />}>Export Result</Button>
          <Button icon={<DeleteDismiss24Regular />}>Delete</Button>
        </CardFooter>
      </Card>
    </div >
  </>;
}