import { api } from "@mimo/utilities";
import type { GetItemsResponse } from "./types";

export async function getItem() {
  return api.get<GetItemsResponse>("/api/items/itemList");
}
