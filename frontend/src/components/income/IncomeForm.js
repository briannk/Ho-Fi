import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Form } from "semantic-ui-react";
import { useDataContext } from "../../contexts/DataContext";
import { useMsgContext } from "../../contexts/MsgContext";

const IncomeForm = ({ dataProp }) => {
  const [income, setIncome] = useState({
    source: "",
    total: "",
    payDate: "",
    frequency: "",
  });
  const [inputErrors, setInputErrors] = useState({
    source: false,
    total: false,
    payDate: false,
    frequency: false,
  });

  const { uploadIncome } = useDataContext();
  const { setMessage, setShowMessage } = useMsgContext();

  const navigate = useNavigate();

  const containerStyles = `container mx-auto max-w-sm border-4
     rounded m-4 p-4`;

  const handleClick = async () => {
    if (
      income.total === "" ||
      income.payDate === "" ||
      income.frequency === "" ||
      income.source === ""
    ) {
      for (const property in income) {
        if (income[property] === "") {
          setInputErrors((prev) => {
            return { ...prev, [property]: true };
          });
        }
      }
      return;
    } else {
      try {
        uploadIncome(income);
        setMessage({
          type: "success",
          content: "Income successfully created!",
        });
      } catch (e) {
      } finally {
        setShowMessage(true);
        navigate("/");
      }
    }
  };

  const handleInputChange = (e, { name, type, value }) => {
    if (value !== "" && inputErrors[name]) {
      setInputErrors({ ...inputErrors, [name]: false });
    }
    if (type === "number") {
      setIncome({
        ...income,
        [name]: Math.round(Number(value) * 100) / 100,
      });
    } else {
      setIncome({ ...income, [name]: value });
    }
  };

  useEffect(() => {
    if (dataProp) {
      setIncome({ ...income, ...dataProp });
    }
  }, []);

  return (
    <div className={containerStyles}>
      <h3>Fill out every field:</h3>
      <Form className="my-4">
        <Form.Input
          name="source"
          label="Source"
          placeholder="Enter the source of income"
          icon="money bill alternate outline"
          error={
            inputErrors.source
              ? { content: "Please enter the source", pointing: "above" }
              : null
          }
          value={income.source}
          onChange={handleInputChange}
        />
        <Form.Input
          name="total"
          type="number"
          label="Total Income after Taxes"
          icon="dollar sign"
          placeholder="Enter an income"
          step="0.01"
          error={
            inputErrors.total
              ? { content: "Please enter an amount", pointing: "above" }
              : null
          }
          value={income.total}
          onChange={handleInputChange}
        />
        <Form.Input
          name="payDate"
          type="date"
          label="Pay Date"
          placeholder="Enter the date of pay"
          error={
            inputErrors.payDate
              ? {
                  content: "Please enter the date of pay",
                  pointing: "above",
                }
              : null
          }
          value={income.payDate}
          onChange={handleInputChange}
        />
        <Form.Select
          name="frequency"
          label="Frequency"
          options={[
            {
              key: "ot",
              value: "one-time",
              text: "One-Time",
            },
            {
              key: "dl",
              value: "daily",
              text: "Daily",
            },
            {
              key: "wk",
              value: "weekly",
              text: "Weekly",
            },
            {
              key: "bw",
              value: "bi-weekly",
              text: "Bi-Weekly",
            },
            {
              key: "mn",
              value: "monthly",
              text: "Monthly",
            },
            {
              key: "an",
              value: "annually",
              text: "Annually",
            },
            {
              key: "na",
              value: "other",
              text: "Other",
            },
          ]}
          placeholder="Select the frequency of this income"
          error={
            inputErrors.frequency
              ? {
                  content: "Please select a frequency",
                  pointing: "above",
                }
              : null
          }
          value={income.frequency}
          onChange={handleInputChange}
        />
        <Form.TextArea
          name="description"
          label="Description"
          icon="pencil"
          placeholder="Describe the expense"
          value={income.description}
          onChange={handleInputChange}
        />

        <Form.Button onClick={handleClick}>
          {dataProp ? "Edit Income" : "Add Income"}
        </Form.Button>
      </Form>
    </div>
  );
};

export default IncomeForm;
