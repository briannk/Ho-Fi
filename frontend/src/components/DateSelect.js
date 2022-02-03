import React from "react";
import { Form, Input } from "semantic-ui-react";
import { useDataContext } from "../contexts/DataContext";
import { localToUTC, UTCToLocal } from "../utilities/formatDate";

const DateSelect = ({ of, dataProp = {}, selectValue }) => {
  const { getExpenses, getIncome } = useDataContext();
  console.log(dataProp);

  const dateRange = {
    dateStart: dataProp.dateStart,
    dateEnd: dataProp.dateEnd,
  };

  const handleChange = (e, { name, value }) => {
    if (dataProp.of === "expenses") {
      getExpenses({ ...dateRange, [name]: localToUTC(value) }, selectValue);
    } else if (dataProp.of === "income") {
      getIncome({ ...dateRange, [name]: localToUTC(value) });
    } else {
      console.log("No 'of' prop");
    }
  };

  return (
    <Form className="flex flex-col sm:flex-row gap-4 content-center items-center m-0">
      <Input
        name="dateStart"
        type="date"
        value={UTCToLocal(dataProp.dateStart)}
        onChange={handleChange}
      />
      to
      <Input
        name="dateEnd"
        type="date"
        value={UTCToLocal(dataProp.dateEnd)}
        onChange={handleChange}
      />
    </Form>
  );
};

export default DateSelect;
