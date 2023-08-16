import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
import {
  bundleIcon,
  ArrowCircleLeft24Regular,
  ArrowCircleLeft24Filled,
  // DocumentBulletList24Regular
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
const BoxMultiple24 = bundleIcon(BoxMultiple24Filled, BoxMultiple24Regular);
const History24 = bundleIcon(History24Filled, History24Regular);
const Bookmark24 = bundleIcon(Bookmark24Filled, Bookmark24Regular);

// APIs
import { getItemSingle } from "@mimo/items";
// types
import type { Item } from "@mimo/items";



const InventoriesTool = React.lazy(
  () => import("app_inventories/InventoriesTool")
    .then(({ InventoriesTool }) => ({ default: InventoriesTool })));

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
          <React.Suspense fallback={<div>Loading...</div>}>
            <InventoriesTool count={0} />
          </React.Suspense>
        </CardFooter>
      </Card>
    </div >
  </>;
}