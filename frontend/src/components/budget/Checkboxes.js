import React from "react";
import { Checkbox } from "semantic-ui-react";
import keyToText from "../../utilities/keyToText";
import FilterRange from "./filter/FilterRange";
import FilterCheckboxes from "./filter/FilterCheckboxes";

const Checkboxes = ({ filters, dispatch }) => {
  const keys = Object.keys(filters);

  // having a function/component filters the parent component to re-render
  // and lose scroll position

  const CheckOptions = ({ filters, keys, dispatch }) => {
    return keys.map((key) => {
      let actionElem;
      if (key === "vendor" || key === "paymentMethod" || key === "category") {
        actionElem = (
          <FilterCheckboxes
            keyProp={key}
            filters={filters}
            dispatch={dispatch}
          />
        );
      } else if (key === "total") {
        actionElem = (
          <FilterRange keyProp={key} filters={filters} dispatch={dispatch} />
        );
      } else {
        return;
      }

      return (
        <div className="flex flex-wrap sm:flex-nowrap justify-evenly content-center items-center m-4">
          <Checkbox
            className="flex justify-evenly content-center items-center bg-gray-700/20"
            label={keyToText(key)}
            checked={filters[key]["parent"]}
            onClick={() =>
              dispatch({
                type: "TOGGLE_CHECKBOX",
                payload: { key: key, key2: "parent" },
              })
            }
          ></Checkbox>
          {filters[key]["parent"] && actionElem}
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols md:grid-cols xl:grid-cols-2 m-4">
      <CheckOptions filters={filters} keys={keys} dispatch={dispatch} />
    </div>
  );
};

export default Checkboxes;
