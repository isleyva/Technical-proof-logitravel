import React from "react";
import ListItem from "./ListItem/ListItem";
import "./ItemList.css";
import { useItemsContext } from "../../../features/items";

const ItemList: React.FC = () => {
  const { items } = useItemsContext();

  return (
    <ul id="textList" className="list">
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default ItemList;
