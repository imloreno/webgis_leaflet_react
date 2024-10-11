import useLayerStore from "../store/index";

const Menu = () => {
  const { states, toggleLayer, disabledIds } = useLayerStore();
  const statesDisabled = disabledIds.states || [];
  const capitalsDisabled = disabledIds.capitals || [];

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleLayer("states", parseInt(e.target.id));
  };

  return (
    <ul style={{ userSelect: "none", overflowY: "auto", height: "100vh" }}>
      <h4 style={{ margin: "1rem" }}>Estados</h4>
      {states.length > 0 &&
        states.map((layer) => (
          <p
            style={{ padding: ".5rem 1rem", marginLeft: "1rem" }}
            key={layer.id}
          >
            <input
              type="checkbox"
              id={`${layer.id}`}
              style={{ marginRight: 7, cursor: "pointer" }}
              onChange={handleToggle}
              checked={!statesDisabled.includes(layer.id)}
            />
            <label htmlFor={`${layer.id}`} style={{ cursor: "pointer" }}>
              {layer.name}
            </label>
          </p>
        ))}

      <h4 style={{ margin: "1rem" }}>Capitales</h4>
      {states.length > 0 &&
        states.map((layer) => (
          <p
            style={{ padding: ".5rem 1rem", marginLeft: "1rem" }}
            key={layer.id}
          >
            <input
              type="checkbox"
              id={`${layer.id}`}
              style={{ marginRight: 7, cursor: "pointer" }}
              onChange={handleToggle}
              checked={!statesDisabled.includes(layer.id)}
            />
            <label htmlFor={`${layer.id}`} style={{ cursor: "pointer" }}>
              {layer.name}
            </label>
          </p>
        ))}
    </ul>
  );
};

export default Menu;
