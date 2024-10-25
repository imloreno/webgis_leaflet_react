import useLayerStore from "../../store";
import MenuItem from "./MenuItem";
import styles from "./menu.module.css";

const Menu = () => {
  const { states, capitals, toggleLayer, disabledIds } = useLayerStore();
  const statesDisabled = disabledIds.states || [];
  const capitalsDisabled = disabledIds.capitals || [];

  // Handle toggle function
  const handleToggle = (
    e: React.ChangeEvent<HTMLInputElement>,
    layerType: string
  ) => {
    toggleLayer(layerType, parseInt(e.target.id));
  };

  return (
    <ul className={styles.menu}>
      <h4 style={{ margin: "1rem" }}>Estados</h4>
      {states.length > 0 &&
        states.map(({ id, name }) => (
          <MenuItem
            key={id}
            id={id}
            name={name}
            statesDisabled={statesDisabled}
            handleToggle={handleToggle}
            category="states"
          />
        ))}

      <h4 style={{ margin: "1rem" }}>Capitales</h4>
      {capitals.length > 0 &&
        capitals.map(({ id, name }) => (
          <MenuItem
            key={id}
            id={id}
            name={name}
            statesDisabled={capitalsDisabled}
            handleToggle={handleToggle}
            category="capitals"
          />
        ))}
    </ul>
  );
};

export default Menu;
