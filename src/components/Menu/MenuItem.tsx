import { ChangeEvent } from "react";
import styles from "./menuItem.module.css";

interface MenuItemProps {
  id: number;
  name: string;
  statesDisabled: number[];
  handleToggle: (e: ChangeEvent<HTMLInputElement>, layerType: string) => void;
  category: "capitals" | "states";
}

const MenuItem = ({
  id,
  name,
  statesDisabled,
  handleToggle,
  category,
}: MenuItemProps) => {
  // Handle toggle function
  const toggleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    handleToggle(e, category);
  };

  return (
    <li className={styles.menuItemContainer} key={id}>
      <input
        type="checkbox"
        id={`${id}`}
        className={styles.checkItem}
        onChange={toggleHandler}
        checked={!statesDisabled.includes(id)}
      />
      <label htmlFor={`${id}`} className={styles.labelItem}>
        {name}
      </label>
    </li>
  );
};

export default MenuItem;
