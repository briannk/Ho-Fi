import React, { useState } from "react";
import { Form, Button, Modal } from "semantic-ui-react";
import { useDataContext } from "../contexts/DataContext";

const BudgetLimit = ({ showState, showDispatch }) => {
  const [inputErrors, setInputErrors] = useState({
    limit: "",
    date: "",
  });

  const { budget, setBudget } = useDataContext();

  const handleClick = () => {
    for (const property in budget) {
      if (
        !budget[property] ||
        (property === "date" && !isValidDate(budget.date))
      ) {
        setInputErrors((prev) => {
          return { ...prev, [property]: true };
        });
      }
    }
    showDispatch({ type: "SHOW_LIMIT", payload: false });
  };

  const handleInputChange = (e, { name, value, type }) => {
    if (value !== "" && inputErrors[name]) {
      setInputErrors({ ...inputErrors, [name]: false });
    }
    if (type === "number") {
      if (Number(value) > Number.MAX_SAFE_INTEGER) return;
      setBudget({
        ...budget,
        [name]: Math.round((Number(value) + Number.EPSILON) * 100) / 100,
      });

      console.log("number");
    } else {
      setBudget({ ...budget, [name]: value });
    }
  };

  const isValidDate = (value) => {
    const date = new Date(value);
    if (date <= Date.now()) {
      return false;
    }
    return true;
  };

  return (
    <Modal
      onClose={() => showDispatch({ type: "SHOW_LIMIT", payload: false })}
      onOpen={() => showDispatch({ type: "SHOW_LIMIT", payload: true })}
      open={showState.showLimitForm}
      trigger={<Button>Set Expense Limit</Button>}
      size="mini"
      closeIcon
    >
      <Form className="mx-auto max-w-sm border-4 rounded m-4 p-4">
        <Form.Input
          name="date"
          type="date"
          label="Enter a date to track up to"
          placeholder="04-20-2022"
          value={budget?.date}
          onChange={handleInputChange}
          error={
            inputErrors.date
              ? isValidDate(budget?.date)
                ? { content: "Please enter a valid date", pointing: "above" }
                : {
                    content: "The date must be in the future",
                    pointing: "above",
                  }
              : null
          }
        />
        <Form.Input
          name="limit"
          type="number"
          label="Enter a spending limit"
          icon="dollar sign"
          iconPosition="left"
          placeholder="ex. 1200.25"
          step="0.01"
          min="0"
          error={
            inputErrors.limit
              ? { content: "Please enter an amount", pointing: "above" }
              : null
          }
          value={budget?.limit}
          onChange={handleInputChange}
        />
        <Form.Button onClick={handleClick} content="Track" />
      </Form>
    </Modal>
  );
};

export default BudgetLimit;
