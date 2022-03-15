import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { useDataContext } from "../../contexts/DataContext";
import { useMsgContext } from "../../contexts/MsgContext";
import { useNavigate } from "react-router";
import ImgParser from "../common/ImgParser";

const ExpenseForm = ({ dataProp }) => {
  const { uploadExpense } = useDataContext();
  const { setMessage, setShowMessage } = useMsgContext();

  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    vendor: "",
    total: "",
    transactionDate: "",
    paymentMethod: "",
    category: "",
    description: "",
  });
  const [inputErrors, setInputErrors] = useState({
    vendor: false,
    total: false,
    transactionDate: false,
    paymentMethod: false,
    category: false,
    description: false,
  });

  const containerStyles = `mx-auto max-w-sm border-4
     rounded m-4 p-4`;

  const handleClick = async () => {
    if (
      expense.vendor === "" ||
      expense.total === "" ||
      expense.transactionDate === "" ||
      expense.paymentMethod === "" ||
      expense.category === "" ||
      expense.description === ""
    ) {
      for (const property in expense) {
        if (expense[property] === "") {
          setInputErrors((prev) => {
            return { ...prev, [property]: true };
          });
        }
      }
      return;
    } else {
      try {
        uploadExpense(expense);
        setMessage({
          type: "success",
          content: "Expense successfully created!",
        });
      } catch (e) {
      } finally {
        setShowMessage(true);
        navigate("/");
      }
    }
  };

  const handleInputChange = (e, { name, value, type }) => {
    if (value !== "" && inputErrors[name]) {
      setInputErrors({ ...inputErrors, [name]: false });
    }
    if (type === "number") {
      setExpense({
        ...expense,
        [name]: Math.round(Number(value) * 100) / 100,
      });
    } else {
      setExpense({ ...expense, [name]: value });
    }
  };

  useEffect(() => {
    if (dataProp) {
      setExpense({ ...expense, ...dataProp });
    }
  }, []);

  return (
    <div className={containerStyles}>
      <ImgParser />
      <h3>Fill out every field:</h3>
      <Form className="my-4">
        <Form.Input
          name="vendor"
          label="Vendor"
          placeholder="Enter the vendor"
          icon="building outline"
          error={
            inputErrors.vendor
              ? { content: "Please enter a vendor", pointing: "above" }
              : null
          }
          value={expense.vendor}
          onChange={handleInputChange}
        />
        <Form.Input
          name="total"
          type="number"
          label="Total"
          icon="dollar sign"
          iconPosition="left"
          placeholder="Enter the total amount spent"
          step="0.01"
          error={
            inputErrors.total
              ? { content: "Please enter an amount", pointing: "above" }
              : null
          }
          value={expense.total}
          onChange={handleInputChange}
        />
        <Form.Input
          name="transactionDate"
          type="date"
          label="Transaction Date"
          placeholder="Enter the transaction date"
          error={
            inputErrors.transactionDate
              ? {
                  content: "Please enter the date of transaction",
                  pointing: "above",
                }
              : null
          }
          value={expense.transactionDate}
          onChange={handleInputChange}
        />
        <Form.Input
          name="paymentMethod"
          label="Payment Method"
          placeholder="Enter the payment method"
          icon="credit card outline"
          error={
            inputErrors.paymentMethod
              ? {
                  content: "Please enter the payment method",
                  pointing: "above",
                }
              : null
          }
          value={expense.paymentMethod}
          onChange={handleInputChange}
        />
        <Form.Input
          name="category"
          label="Category"
          placeholder="Enter the category (i.e. Food)"
          icon="folder outline"
          error={
            inputErrors.category
              ? { content: "Please enter a category", pointing: "above" }
              : null
          }
          value={expense.category}
          onChange={handleInputChange}
        />

        <Form.TextArea
          name="description"
          label="Description"
          icon="pencil"
          placeholder="Describe the expense"
          value={expense.description}
          onChange={handleInputChange}
        />

        <Form.Button onClick={handleClick}>
          {dataProp ? "Edit Expense" : "Add Expense"}
        </Form.Button>
      </Form>
    </div>
  );
};

export default ExpenseForm;
