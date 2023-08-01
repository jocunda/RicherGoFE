export type Item = {
  id: string;
  value: string;
  code: string;
  description: string;
  photo?: string;
  deleteable: boolean;
};

export type GetItemsResponse = Item[];

export type Inventory = {
  id: string;
  no: string;
  memo?: string;
  qty: number;
  photoId?: string;
  itemId: string;
  itemValue: string;
  positionTargetId: string;
  positionCreatedById: string;
  employeeName: string;
  positionPreOwnerId: string;
  positionStartDate: string;
};

export type AddItemRequest = {
  value: string;
  code: string;
  description?: string;
};

export type AddItemResponse = {
  message: string;
};

export type DeleteItemResponse = {
  message: string;
};

export type EditItemRequest = {
  value: string;
  code: string;
  description?: string;
};

export type EditItemResponse = {
  message: string;
};
