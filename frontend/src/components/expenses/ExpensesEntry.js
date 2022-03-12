import React from "react";
import { Icon } from "semantic-ui-react";
import { UTCToLocal } from "../../utilities/formatDate";

const ExpensesEntry = ({ data, expand }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 justify-center content-evenly items-stretch">
        <div className="mx-auto">
          <Icon name="calendar alternate" title="Transaction Date" />
          {UTCToLocal(data.transactionDate)}
        </div>
        <div className="mx-auto hidden sm:block">
          <Icon name="folder" title="Category" />
          {data.category}
        </div>
        <div className="mx-auto">
          <Icon name="building" title="Vendor" />
          {data.vendor}
        </div>
        <div className="mx-auto hidden sm:block">
          <Icon name="credit card" title="Payment Method" />
          {data.paymentMethod}
        </div>
      </div>
      <div className={`mx-auto ${expand ? "block" : "hidden"}`}>
        <Icon name="newspaper" title="Description" />
        {data.description}
      </div>
    </>
  );
};

export default ExpensesEntry;
