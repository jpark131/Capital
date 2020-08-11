import React from "react";
import { monthMap } from "./../../utils/monthMap";

const ListGroup = ({ items, onItemSelect, selectedItem }) => {
  return (
    <ul className="list-group">
      {items.map((item) => {
        const date = new Date(item);
        return (
          <li
            key={item}
            onClick={() => onItemSelect(item)}
            className={
              item === selectedItem
                ? "list-group-item ml-5 active"
                : "list-group-item ml-5"
            }
          >
            {monthMap[date.getMonth()]} - {date.getFullYear()}
          </li>
        );
      })}
    </ul>
  );
};

export default ListGroup;
