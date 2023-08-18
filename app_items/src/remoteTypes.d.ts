///<reference types="react" />

type InventoriesToolProps = {
  count: number;
};

declare module "app_inventories/InventoriesTool" {
  const InventoriesTool: React.ComponentType<InventoriesToolProps>;
}

declare module "app_inventories/AppInventoryList" {
  const AppInventoryList: React.ComponentType;
}
