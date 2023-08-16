///<reference types="react" />

type InventoriesToolProps = {
  count: number;
};

declare module "app_inventories/InventoriesTool" {
  const InventoriesTool: React.ComponentType<InventoriesToolProps>;
}
