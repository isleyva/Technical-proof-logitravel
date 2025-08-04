import React, { useState, useCallback } from "react";
import "./Modal.css";
import type { Item } from "../../../features/items";
import { useItemsContext } from "../../../features/items";
import Button from "../Button/Button";

type Props = {
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ onClose }) => {
  const { items, setItems, setHistory } = useItemsContext();
  const [input, setInput] = useState<string>("");

  const handleAdd = useCallback(() => {
    if (!input.trim()) return;

    setHistory((prev: Item[][]) => [...prev, items]);

    setItems((prev: Item[]) => [
      ...prev,
      {
        id: Date.now(),
        text: input.trim(),
        selected: false,
      },
    ]);

    setInput("");
    onClose();
  }, [input, items, setItems, setHistory, onClose]);

  return (
    <div id="modal" className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>Add item to list</p>
        <input
          type="text"
          id="modalInput"
          placeholder="Type the text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
        />
        <div className="modal-actions">
          <Button variant="primary" id="modalAddButton" onClick={handleAdd}>
            ADD
          </Button>
          <Button variant="outline" id="modalCancelButton" onClick={onClose}>
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
