import { api } from "@mimo/utilities";
import type {
  GetItemsResponse,
  Inventory,
  Item,
  AddItemRequest,
  AddItemResponse,
  DeleteItemResponse,
  EditItemRequest,
  EditItemResponse,
} from "./types";

export async function getItem() {
  return api.get<GetItemsResponse>("/api/items/itemList");
}

export async function getItemSingle(itemId: string | undefined) {
  return api.get<Item>(`/api/items/${itemId}`);
}

export async function addItem(payload: AddItemRequest) {
  return api.post<AddItemResponse>("/api/items/addItem", payload);
}

export async function deleteItem(itemId: string | undefined) {
  return api.delete<DeleteItemResponse>(`/api/items/delete/${itemId}`);
}

export async function editItem(
  itemId: string | undefined,
  payload: EditItemRequest
) {
  return api.put<EditItemResponse>(`/api/items/edit/${itemId}`, payload);
}

export async function getInventoryList(itemId: string | undefined) {
  return api.get<Inventory[]>(`/api/inventories/inventorieslist/${itemId}`);
}

//payload,
// anyLike: filter
// itemId: ec013409-5913-458b-958e-d5fca8034b67
// orderBy: positionTargetNo
// descending: false
// pageIndex: 1
// pageSize: 15
// listType: general
