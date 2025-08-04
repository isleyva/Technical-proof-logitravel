import React, { useState } from "react";
import type { ReactNode } from "react";
import type { Item } from "../types/ItemType";
import { ItemsContext } from "./ItemsContextDefinition";

type ItemsProviderProps = {
  children: ReactNode;
};

export const ItemsProvider: React.FC<ItemsProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [history, setHistory] = useState<Item[][]>([]);

  const value = {
    items,
    setItems,
    history,
    setHistory,
  };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
