// src/components/AddToListButton/AddToListButton.tsx

import styles from "./AddToListButton.module.css";

interface AddToListButtonProps {
  selectedSymbols: string[];
  onAddToList: (selectedSymbols: string[]) => void;
}

function AddToListButton({
  selectedSymbols,
  onAddToList,
}: AddToListButtonProps) {
  const handleClick = () => {
    onAddToList(selectedSymbols);
  };

  return (
    <button className={styles["add-to-list-button"]} onClick={handleClick}>
      Add to List
    </button>
  );
}

export default AddToListButton;
