import React, { useCallback } from "react";

import "./ButtonsBar.css";
import type { Item } from "../../../features/items";
import { useItemsContext } from "../../../features/items";
import { Button } from "../../ui";

type Props = {
  onOpenModal: () => void;
};

const UndoIcon: React.FC = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1 4 1 10 7 10"></polyline>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
  </svg>
));

const ButtonsBar: React.FC<Props> = ({ onOpenModal }) => {
  const { items, setItems, history, setHistory } = useItemsContext();
  const hasSelection = items.some((item: Item) => item.selected);
  const canUndo = history.length > 0;

  const handleDeleteSelected = useCallback(() => {
    if (!hasSelection) return;

    setHistory((prev: Item[][]) => [...prev, items]);
    setItems((prev: Item[]) => prev.filter((item: Item) => !item.selected));
  }, [hasSelection, items, setItems, setHistory]);

  const handleUndo = useCallback(() => {
    if (!canUndo) return;

    setHistory((prev: Item[][]) => {
      const clone = [...prev];
      const last = clone.pop() as Item[];
      setItems(last);
      return clone;
    });
  }, [canUndo, setItems, setHistory]);

  return (
    <div className="buttons-container">
      <div className="btn-group-left">
        <Button
          variant="outline"
          id="undoButton"
          onClick={handleUndo}
          disabled={!canUndo}
          ariaLabel="Undo last action"
        >
          <UndoIcon />
        </Button>
        <Button
          variant="outline"
          id="deleteButton"
          onClick={handleDeleteSelected}
          disabled={!hasSelection}
        >
          DELETE
        </Button>
      </div>
      <Button variant="primary" id="openModalButton" onClick={onOpenModal}>
        ADD
      </Button>
    </div>
  );
};

export default React.memo(ButtonsBar);
