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
