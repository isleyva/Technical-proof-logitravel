import { createContext } from "react";
import type { Item } from "../types/ItemType";

type ItemsContextType = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  history: Item[][];
  setHistory: React.Dispatch<React.SetStateAction<Item[][]>>;
};

export const ItemsContext = createContext<ItemsContextType | undefined>(
  undefined
);
