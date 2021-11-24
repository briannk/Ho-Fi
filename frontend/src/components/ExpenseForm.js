import React, { useState } from "react";
import { Button, Form, Message, Icon } from "semantic-ui-react";

const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    vendor: "",
    total: "",
    transactionDate: "",
    paymentMethod: "",
    category: "",
  });
  const [inputErrors, setInputErrors] = useState({
    vendor: false,
    total: false,
    transactionDate: false,
    paymentMethod: false,
    category: false,
  });

  const containerStyles = `container mx-auto max-w-sm border-4
     rounded m-4 p-4`;

  const handleClick = async () => {
    if (
      expense.vendor === "" ||
      expense.total === "" ||
      expense.transactionDate === "" ||
      expense.paymentMethod === "" ||
      expense.category === ""
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
      //submit
      console.log("success");
      console.log(expense);
      // send expense data to backend

      //   console.log(resp);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value !== "" && inputErrors[e.target.name] === true) {
      setInputErrors({ ...inputErrors, [e.target.name]: false });
    }
    if (e.target.type === "number") {
      setExpense({
        ...expense,
        [e.target.name]: Math.round(e.target.value * 100) / 100,
      });
    } else {
      setExpense({ ...expense, [e.target.name]: e.target.value });
    }

    console.log("expense: ", expense);
  };

  return (
    <div className={containerStyles}>
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
        {/* <Form.Select
          name="paymentMethod"
          label="Payment Method"
          placeholder="Enter the payment method."
          options={[
            { key: "cc", value: "creditCard", text: "Credit Card" },
            { key: "ca", value: "cash", text: "Cash" },
            { key: "ep", value: "ele", text: "Credit Card" },
            { key: "dw", value: "digitalWallet", text: "Credit Card" },
            { key: "gf", value: "giftCard", text: "Gift Card" },
            { key: "other", value: "other", text: "Other" },
          ]}
          error={
            inputErrors.pw2
              ? { content: "Please enter a date.", pointing: "above" }
              : null
          }
          value={userInfo.pw2}
          onChange={handleInputChange}
        /> */}
        <Form.Button onClick={handleClick}>Add Expense</Form.Button>
      </Form>
    </div>
  );
};

export default ExpenseForm;
