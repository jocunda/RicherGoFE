export type Item = {
  id: string;
  value: string;
  code: string;
  description: string;
  photo?: string;
  deleteable: boolean;
};

export type GetItemsResponse = Item[];
