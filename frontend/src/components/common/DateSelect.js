import React from "react";
import { Form, Input } from "semantic-ui-react";

const DateSelect = ({ dataProp = {}, handleChange }) => {
  return (
    <Form className="flex flex-col sm:flex-row gap-1 sm:gap-4 content-center items-center m-0">
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
