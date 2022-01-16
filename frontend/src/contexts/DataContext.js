import React, { useState, useEffect, useContext } from "react";
// temporary until db is up
import { spendingData, payData } from "../data/data";

const DataContext = React.createContext();

const useDataContext = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }) => {
  const [expensesData, setExpensesData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [budget, setBudget] = useState({ limit: 0, date: "" });
  const [isLoading, setIsLoading] = useState(true);

  const getExpense = (dateRange) => {
    console.log(
      `fetching expenses for dates between ${dateRange.dateStart} to ${dateRange.dateEnd}`
    );
  };
  const getIncome = (dateRange) => {
    console.log(
      `fetching income for dates between ${dateRange.dateStart} to ${dateRange.dateEnd}`
    );
  };
  const setExpense = () => {};
  const setIncome = () => {};

  useEffect(() => {
    console.log(spendingData);
    setExpensesData(spendingData);
    setIncomeData(payData);
    setIsLoading(false);
  }, []);

  const providerValue = {
    expensesData,
    incomeData,
    getExpense,
    getIncome,
    budget,
    setBudget,
  };
  return (
    <DataContext.Provider value={providerValue}>
      {isLoading ? <div>Loading...</div> : children}
    </DataContext.Provider>
  );
};

export { DataProvider as default, useDataContext };
