import { divide } from "lodash";
import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "semantic-ui-react";
import { useDataContext } from "../../contexts/DataContext";
import { useMsgContext } from "../../contexts/MsgContext";

const BudgetLimit = ({ showState, showDispatch }) => {
  const [budgetLimit, setBudgetLimit] = useState({
    limit: "",
    date: "",
  });
  const [inputErrors, setInputErrors] = useState({
    limit: "",
    date: "",
  });

  const { budget, uploadBudget } = useDataContext();

  const { setMessage, setShowMessage } = useMsgContext();

  const handleClick = async () => {
    for (const property in budgetLimit) {
      if (
        !budgetLimit[property] ||
        (property === "date" && !isValidDate(budgetLimit.date))
      ) {
        setInputErrors((prev) => {
          return { ...prev, [property]: true };
        });
        return;
      }
    }
    console.log(inputErrors);
    if (Object.values(inputErrors).includes(false)) return;
    try {
      await uploadBudget(budgetLimit);
      setMessage({
        type: "success",
        content: `A spending limit of ${budgetLimit.limit} has been set to track until ${budgetLimit.date}.`,
      });
      showDispatch({ type: "SHOW_LIMIT", payload: false });
      setShowMessage(true);
    } catch (e) {}
  };

  const handleInputChange = (e, { name, value, type }) => {
    if (value !== "" && inputErrors[name]) {
      setInputErrors({ ...inputErrors, [name]: false });
    }
    if (type === "number") {
      if (Number(value) > Number.MAX_SAFE_INTEGER) return;
      setBudgetLimit({
        ...budgetLimit,
        [name]: Math.round((Number(value) + Number.EPSILON) * 100) / 100,
      });
      return;
    }
    setBudgetLimit({ ...budgetLimit, [name]: value });
  };

  const isValidDate = (value) => {
    const date = new Date(value);
    if (date <= Date.now()) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (budget) {
      setBudgetLimit(budget);
    }
  }, [budget]);

  return (
    <div>
      <div></div>
      <Modal
        onClose={() => showDispatch({ type: "SHOW_LIMIT", payload: false })}
        onOpen={() => showDispatch({ type: "SHOW_LIMIT", payload: true })}
        open={showState.showLimitForm}
        trigger={
          <Button className="w-full md:w-64 p-4"> Set Expense Limit</Button>
        }
        size="mini"
        closeIcon
      >
        <Form className="mx-auto max-w-sm py-8 px-4">
          <Form.Input
            name="date"
            type="date"
            label="Enter a date to track up to"
            placeholder="04-20-2022"
            value={budgetLimit?.date}
            onChange={handleInputChange}
            error={
              inputErrors.date
                ? isValidDate(budgetLimit?.date)
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
            value={budgetLimit?.limit}
            onChange={handleInputChange}
          />
          <Form.Button onClick={handleClick} content="Track" />
        </Form>
      </Modal>
    </div>
  );
};

export default BudgetLimit;
