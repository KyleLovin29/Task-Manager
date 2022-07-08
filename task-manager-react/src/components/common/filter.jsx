const Filter = ({
  items,
  onItemSelect,
  selectedItem,
  valueProperty,
  textProperty,
}) => {
  return (
    <ul className="list-group mt-4">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filter.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};
export default Filter;
