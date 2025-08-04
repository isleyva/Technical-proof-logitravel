const textList = document.getElementById("textList");
const deleteButton = document.getElementById("deleteButton");
const undoButton = document.getElementById("undoButton");
const openModalButton = document.getElementById("openModalButton");

const modal = document.getElementById("modal");
const modalInput = document.getElementById("modalInput");
const modalAddButton = document.getElementById("modalAddButton");
const modalCancelButton = document.getElementById("modalCancelButton");

let history = [];

deleteButton.disabled = true;
undoButton.disabled = true;

// Helper function to simplify event listeners
function addListener(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

// Open the Add Item modal
addListener(openModalButton, "click", () => {
  modal.classList.remove("hidden");
  modalInput.value = "";
  modalInput.focus();
});

// Close Add Item modal
addListener(modalCancelButton, "click", () => {
  modal.classList.add("hidden");
});

// Add new item from modal
addListener(modalAddButton, "click", () => {
  const value = modalInput.value.trim();
  if (!value) return;

  const li = document.createElement("li");
  li.textContent = value;

  addListener(li, "click", () => {
    li.classList.toggle("selected");
    updateDeleteState();
  });

  addListener(li, "dblclick", () => {
    saveState();
    li.remove();
    updateDeleteState();
    undoButton.disabled = false;
  });

  textList.appendChild(li);
  saveState();
  modal.classList.add("hidden");
  undoButton.disabled = false;
  updateDeleteState();
});

// Delete items button function
addListener(deleteButton, "click", () => {
  const selectedItems = document.querySelectorAll("#textList li.selected");
  if (selectedItems.length === 0) return;
  saveState();
  selectedItems.forEach((item) => item.remove());
  updateDeleteState();
  undoButton.disabled = false;
});

// Undo last change
addListener(undoButton, "click", () => {
  if (history.length === 0) return;
  const lastState = history.pop();
  textList.innerHTML = lastState;
  restoreClickEvents();
  undoButton.disabled = history.length === 0;
  updateDeleteState();
});

// Save current state
function saveState() {
  history.push(textList.innerHTML);
}

// Restore events after undo
function restoreClickEvents() {
  document.querySelectorAll("#textList li").forEach((li) => {
    addListener(li, "click", () => {
      li.classList.toggle("selected");
      updateDeleteState();
    });

    addListener(li, "dblclick", () => {
      saveState();
      li.remove();
      updateDeleteState();
      undoButton.disabled = false;
    });
  });
}

// Activate or deactivate the DELETE button
function updateDeleteState() {
  const selected =
    document.querySelectorAll("#textList li.selected").length > 0;
  deleteButton.disabled = !selected;
}
