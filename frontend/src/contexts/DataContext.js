import React, { useState, useEffect, useContext } from "react";
// temporary until db is up
import { spendingData, payData } from "../data/data";
import { useAuthContext } from "./AuthContext";
import { UTCToLocal, localToUTC, getWeekAgo } from "../utilities/formatDate";
import { generateThemes } from "../utilities/generateThemes";

const DataContext = React.createContext();

const useDataContext = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }) => {
  const [expensesData, setExpensesData] = useState({
    of: "expenses",
    dateStart: "",
    dateEnd: "",
    total: 0,
    data: null,
    anchor: null,
  });
  const [incomeData, setIncomeData] = useState(null);
  const [budget, setBudget] = useState({ limit: 0, date: "" });
  const [colorThemes, setColorThemes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [expensesGroup, setExpensesGroup] = useState("category");
  const [incomeGroup, setIncomeGroup] = useState("vendor");

  console.log(colorThemes);

  const { getToken } = useAuthContext();

  const getExpenses = async (dateRange, orderBy = "category") => {
    const dateEnd = dateRange ? dateRange.dateEnd : localToUTC();
    const dateStart = dateRange ? dateRange.dateStart : getWeekAgo(dateEnd);
    console.log(dateStart, dateEnd);

    // visualization data should represent all data in date range,
    // therefore all calculations should reside on the backend
    // for colors/themes, create an object (frontend) recording themes,
    // if an existing theme exists for a key, assign it,
    // otherwise create a new entry
    // feed data must be paginated and only be changed by select
    // or sort values
    // changes in select values should not make db calls (look into caching)
    // changes of select value should regenerate themes
    // only possibly sort changes to search all of data
    // keep the visual data and feed data separate but in the same response
    //
    // retrieve data based on time frame and sorting method,
    // calculate visualization data (and consider caching it
    // and retrieving if the data hasnt been altered to reduce
    // the need to compute the data on every call)
    // retrieve data in chunks of 10
    // group by select value for both sets of data
    // generate themes for both sets of data, and maintain an object
    // to keep track of themes
    // on the frontend simply append the new data to the old,
    // only if paginated
    // other cases start from chunk of 10

    // look into methods to prevent abuse
    let data;
    try {
      const token = await getToken();
      const resp = await fetch(
        `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/expenses?&dateStart=${dateStart}&dateEnd=${dateEnd}&orderBy=${orderBy}${
          expensesData.anchor ? `&anchor=${expensesData.anchor}` : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const result = await resp.json();

      console.log(orderBy);
      setColorThemes(generateThemes(...result.payload.data, orderBy));
      setExpensesGroup(orderBy);
      data = {
        of: "expenses",
        dateStart: dateStart,
        dateEnd: dateEnd,
        data: result.payload.data,
        total: result.payload.total || 0,
        anchor: result.payload.anchor,
      };
    } catch (e) {
      console.log(e);
      data = {
        of: "expenses",
        dateStart: dateStart,
        dateEnd: dateEnd,
        data: null,
        total: 0,
      };
    }

    console.log(data);
    setExpensesData(data);
  };

  const getSomeExpenses = async (dateRange) => {
    console.log(
      `fetching expenses for dates between ${dateRange.dateStart} to ${dateRange.dateEnd}`
    );
    let result;
    try {
      const token = await getToken();
      const resp = await fetch(
        `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/expenses/dateRange?dateStart=${dateRange.dateStart}&dateEnd=${dateRange.dateEnd}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      result = {
        dateStart: dateRange.dateStart,
        dateEnd: dateRange.dateEnd,
        data: await resp.json(),

        // console.log;
      };
    } catch (e) {
      console.log(e);
      result = {
        ...expensesData,
        dateStart: dateRange.dateStart,
        dateEnd: dateRange.dateEnd,
      };
    } finally {
      console.log(result);
      setExpensesData(result);
    }
  };
  const getIncome = (dateRange) => {
    console.log(
      `fetching income for dates between ${dateRange.dateStart} to ${dateRange.dateEnd}`
    );
  };
  const uploadExpense = async (expense) => {
    try {
      const token = await getToken();
      const resp = await fetch(
        `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/expenses`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(expense),
        }
      );

      getExpenses();
    } catch (e) {
      console.log(e);
    }
  };
  const setIncome = () => {};

  useEffect(() => {
    async function loadMockData() {
      try {
        const token = await getToken();
        await fetch(
          "http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/expenses/test",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
            // body: JSON.stringify({
            //   vendor: "Taco Bell",
            //   total: 10.98,
            //   transactionDate: "2021-11-21",
            //   paymentMethod: "credit/debit",
            //   category: "Food",
            //   description: "",
            // }),
          }
        );
        getExpenses();
      } catch (e) {
        console.log(e);
      }
    }
    loadMockData();
    // getExpenses();
    // setExpensesData(spendingData);
    setIncomeData(payData);
    setIsLoading(false);
  }, []);

  const providerValue = {
    expensesData,
    incomeData,
    getExpenses,
    getSomeExpenses,
    getIncome,
    uploadExpense,
    budget,
    setBudget,
    colorThemes,
    expensesGroup,
    setExpensesGroup,
    incomeGroup,
    setIncomeGroup,
  };
  return (
    <DataContext.Provider value={providerValue}>
      {isLoading ? <div>Loading...</div> : children}
    </DataContext.Provider>
  );
};

export { DataProvider as default, useDataContext };
