import React, { useRef } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const FilterRange = ({ state, keyProp, dispatch }) => {
  const { createSliderWithTooltip } = Slider;
  const Range = createSliderWithTooltip(Slider.Range);

  const rangeRef = useRef([
    state["total"]["lowerBound"],
    state["total"]["upperBound"],
  ]);

  return (
    <div className="w-1/2">
      <div className="flex justify-between">
        <label htmlFor="range">
          From <strong>${state[keyProp]["lowerBound"]}</strong>
        </label>
        <label htmlFor="range">
          Up To <strong>${state[keyProp]["upperBound"]}</strong>
        </label>
      </div>
      <Range
        ref={rangeRef}
        min={state[keyProp]["minTotal"]}
        max={state[keyProp]["maxTotal"]}
        defaultValue={[
          state[keyProp]["lowerBound"],
          state[keyProp]["upperBound"],
        ]}
        onChange={(e) => {
          console.log(rangeRef.current);
          rangeRef.current = e;
        }}
        onAfterChange={(e) => {
          dispatch({
            type: "SET_RANGE_TOTAL",
            payload: {
              key: keyProp,
              value: e,
            },
          });
        }}
        tipFormatter={(value) => `$${value}`}
      />
    </div>
  );
};

export default FilterRange;
