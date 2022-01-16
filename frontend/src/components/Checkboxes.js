import React, { useRef } from "react";
import { Checkbox } from "semantic-ui-react";

import keyToText from "../utilities/keyToText";

import FilterRange from "./FilterRange";
import FilterDate from "./FilterDate";
import FilterCheckboxes from "./FilterCheckboxes";

const Checkboxes = ({ dataProp = {}, state, dispatch }) => {
  const keys = Object.keys(state);

  // having a function/component causes the parent component to re-render
  // and lose scroll position

  const CheckOptions = ({ state, keys, dispatch }) => {
    return keys.map((key) => {
      // const checkOptions = keys.map((key) => {
      let actionElem;
      if (key === "vendor" || key === "paymentMethod" || key === "category") {
        actionElem = (
          <FilterCheckboxes keyProp={key} state={state} dispatch={dispatch} />
        );
      } else if (key === "transactionDate") {
        actionElem = (
          <FilterDate keyProp={key} state={state} dispatch={dispatch} />
        );
      } else if (key === "total") {
        actionElem = (
          <FilterRange keyProp={key} state={state} dispatch={dispatch} />
        );
      } else {
        return;
      }

      return (
        <div className="flex flex-wrap sm:flex-nowrap justify-evenly content-center items-center m-4">
          <Checkbox
            className="flex justify-evenly content-center items-center"
            label={keyToText(key)}
            checked={state[key]["parent"]}
            onClick={() =>
              dispatch({
                type: "TOGGLE_CHECKBOX",
                payload: { key: key, key2: "parent" },
              })
            }
          ></Checkbox>
          {state[key]["parent"] && actionElem}
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols lg:grid-cols-2 xl:grid-cols-3 m-4">
      <CheckOptions state={state} keys={keys} dispatch={dispatch} />
    </div>
  );
};

export default Checkboxes;
