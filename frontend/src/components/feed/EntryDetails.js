import React from "react";
import KEYS_TO_EXCLUDE from "../../constants/keysToExclude";
import keyToText from "../../utilities/keyToText";

const EntryDetails = ({ data, of }) => {
  const Details = ({ data }) => {
    return Object.entries(data).map(([key, value]) => {
      // normally want to omit description but not in this case
      if (KEYS_TO_EXCLUDE[of].includes(key) && key !== "description") return;
      return (
        <span>
          <b>{keyToText(key)}: </b>
          {value}
        </span>
      );
    });
  };
  return (
    <div className="flex flex-col">
      <Details data={data} />
    </div>
  );
};

export default EntryDetails;
