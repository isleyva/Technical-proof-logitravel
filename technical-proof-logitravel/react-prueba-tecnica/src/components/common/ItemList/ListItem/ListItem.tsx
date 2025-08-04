import React, { useCallback } from "react";
import "./ListItem.css";
import type { Item } from "../../../../features/items";
import { useItemsContext } from "../../../../features/items";

type Props = {
  item: Item;
};

const ListItem: React.FC<Props> = ({ item }) => {
  const { items, setItems, setHistory } = useItemsContext();
  const { id, text, selected } = item;

  const handleToggleSelect = useCallback(() => {
    setItems((prev) =>
      prev.map((currentItem) =>
        currentItem.id === id
          ? { ...currentItem, selected: !currentItem.selected }
          : currentItem
      )
    );
  }, [id, setItems]);

  const handleDeleteOne = useCallback(() => {
    setHistory((prev) => [...prev, items]);
    setItems((prev) => prev.filter((currentItem) => currentItem.id !== id));
  }, [id, items, setItems, setHistory]);

  return (
    <li
      className={selected ? "selected" : undefined}
      onClick={handleToggleSelect}
      onDoubleClick={handleDeleteOne}
    >
      {text}
    </li>
  );
};

export default React.memo(ListItem);
