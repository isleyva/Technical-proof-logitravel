import { useContext } from "react";
import { ItemsContext } from "../context/ItemsContextDefinition";

export const useItemsContext = () => {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error("useItemsContext must be used within an ItemsProvider");
  }
  return context;
};
