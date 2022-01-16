import React from "react";
import { Form, Input } from "semantic-ui-react";
import { useDataContext } from "../contexts/DataContext";

const DateSelect = ({ of, dataProp = {} }) => {
  const { getExpense, getIncome } = useDataContext();

  const dateRange = {
    dateStart: dataProp.dateStart,
    dateEnd: dataProp.dateStart,
  };

  const handleChange = (e, { name, value }) => {
    if (of === "Expenses") {
      getExpense({ ...dateRange, [name]: value });
    } else if (of === "Income") {
      getIncome({ ...dateRange, [name]: value });
    } else {
      console.log("No 'of' prop");
    }
  };

  return (
    <Form className="flex flex-col sm:flex-row gap-4 content-center items-center m-0">
      <Input
        name="dateStart"
        type="date"
        value={dataProp.dateStart}
        onChange={handleChange}
      />
      to
      <Input
        name="dateEnd"
        type="date"
        value={dataProp.dateEnd}
        onChange={handleChange}
      />
    </Form>
  );
};

export default DateSelect;
