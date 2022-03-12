import React, { useRef } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const FilterRange = ({ filters, keyProp, dispatch }) => {
  const { createSliderWithTooltip } = Slider;
  const Range = createSliderWithTooltip(Slider.Range);

  const rangeRef = useRef([
    filters["total"]["lowerBound"],
    filters["total"]["upperBound"],
  ]);

  return (
    <div className="w-1/2">
      <div className="flex justify-between">
        <label htmlFor="range">
          From <strong>${filters[keyProp]["lowerBound"]}</strong>
        </label>
        <label htmlFor="range">
          Up To <strong>${filters[keyProp]["upperBound"]}</strong>
        </label>
      </div>
      <Range
        ref={rangeRef}
        min={filters[keyProp]["minTotal"]}
        max={filters[keyProp]["maxTotal"]}
        defaultValue={[
          filters[keyProp]["lowerBound"],
          filters[keyProp]["upperBound"],
        ]}
        onChange={(e) => {
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
