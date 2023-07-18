import { api } from "../../utilities";
import type { GetItemsResponse, Item } from "./types";

export async function getItem() {
  return api.get<GetItemsResponse>("/api/items/itemList");
}

export async function getItemSingle(itemId: string | undefined) {
  return api.get<Item>(`/api/items/${itemId}`);
}
