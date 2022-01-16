import React from "react";
import { Checkbox } from "semantic-ui-react";

const FilterCheckboxes = ({ keyProp, state, dispatch }) => {
  let checkList = {};
  let checkboxes = Object.keys(state[keyProp]).map((dataPoint) => {
    if (checkList[dataPoint] || dataPoint === "parent") {
      return;
    }
    checkList[dataPoint] = true;
    return (
      <Checkbox
        label={dataPoint}
        checked={state[keyProp][dataPoint]}
        onClick={() =>
          dispatch({
            type: "TOGGLE_CHECKBOX",
            payload: { key: keyProp, key2: dataPoint },
          })
        }
        disabled={!state[keyProp]["parent"]}
      />
    );
  });
  return (
    <div className="flex flex-col max-w-1/2 gap-1 px-4 max-h-28 overflow-auto">
      {checkboxes}
    </div>
  );
};

export default FilterCheckboxes;
