import React from "react";
import { Icon } from "semantic-ui-react";
import { UTCToLocal } from "../../utilities/formatDate";

const IncomeEntry = ({ data, expand }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 justify-center content-evenly items-stretch">
        <div className="mx-auto">
          <Icon name="calendar alternate" title="Pay Date" />
          {UTCToLocal(data.payDate)}
        </div>
        <div className="mx-auto hidden sm:block">
          <Icon name="clock outline" title="Frequency" />
          {data.frequency}
        </div>
        <div className="mx-auto">
          <Icon name="money bill alternate outline" title="Source" />
          {data.source}
        </div>
        <div className={`mx-auto ${expand ? "block" : "hidden"}`}>
          <Icon name="newspaper" title="Description" />
          {data.description}
        </div>
      </div>
      <div className={`mx-auto ${expand ? "block" : "hidden"}`}>
        <Icon name="newspaper" title="Description" />
        {data.description}
      </div>
    </>
  );
};

export default IncomeEntry;
