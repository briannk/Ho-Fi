import React from "react";
import { Input, Label } from "semantic-ui-react";

const FilterDate = ({ state, keyProp, dispatch }) => {
  return (
    <div className="flex flex-col justify-end w-1/2">
      <Label>From</Label>
      <Input
        type="date"
        value={state[keyProp]["dateStart"]}
        onChange={(e) =>
          dispatch({
            type: "SET_RANGE_DATE",
            payload: {
              key: keyProp,
              key2: "dateStart",
              value: e.target.value,
            },
          })
        }
      />
      <Label>To</Label>
      <Input
        type="date"
        value={state[keyProp]["dateEnd"]}
        onChange={(e) =>
          dispatch({
            type: "SET_RANGE_DATE",
            payload: {
              key: keyProp,
              key2: "dateEnd",
              value: e.target.value,
            },
          })
        }
      />
    </div>
  );
};

export default FilterDate;
