import React, { useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { assignColors, generateThemes } from "../utilities/generateThemes";
import groupData from "../utilities/groupData";
import isEmpty from "lodash.isempty";
import merge from "lodash.merge";
import cloneDeep from "lodash.clonedeep";
import getCurrentDateRange from "../utilities/getCurrentDateRange";

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
  const [incomeData, setIncomeData] = useState({
    of: "income",
    dateStart: "",
    dateEnd: "",
    total: 0,
    data: null,
    anchor: null,
  });
  const [budget, setBudget] = useState({ limit: 0, date: "" });
  // colorThemes deals with the color-data mappings
  // colorTable records the currently used colors to avoid
  // reused colors
  const [colorThemes, setColorThemes] = useState({});
  const [colorTable, setColorTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [expensesGroup, setExpensesGroup] = useState("category");
  const [incomeGroup, setIncomeGroup] = useState("source");

  const { getToken } = useAuthContext();

  const getExpenses = async (
    dateRange,
    group = "category",
    getAll = false,
    isNew = true
  ) => {
    const dateEnd = dateRange ? dateRange.dateEnd : expensesData.dateEnd;
    const dateStart = dateRange ? dateRange.dateStart : expensesData.dateStart;

    let anchor = isNew ? null : expensesData.anchor;

    // look into methods to prevent abuse
    let data;
    let result;
    let resultData = [];
    let total = 0;
    let hasMore = false;
    try {
      const token = await getToken();
      do {
        const resp = await fetch(
          `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/expenses?&dateStart=${dateStart}&dateEnd=${dateEnd}&orderBy=${group}${
            anchor ? `&anchor=${anchor}` : ""
          }`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        result = await resp.json();
        total += result.payload.total;
        if (getAll) {
          resultData = [...resultData, ...result.payload.data];
          hasMore = anchor = result.payload.anchor;
        } else {
          resultData = result.payload.data;
          break;
        }
      } while (hasMore);

      let respData = groupData(resultData, group);
      const themeObj = await generateThemes(
        respData,
        "expenses",
        colorThemes,
        colorTable
      );

      if (!isEmpty(themeObj)) {
        setColorThemes((prev) => {
          const prevCopy = cloneDeep(prev);
          return merge(prevCopy, themeObj.themes);
        });
        setColorTable((prev) => {
          const prevCopy = cloneDeep(prev);
          return merge(prevCopy, themeObj.table);
        });
      }

      respData = assignColors(respData, group, themeObj.themes);

      data = {
        of: "expenses",
        group: group,
        dateStart: dateStart,
        dateEnd: dateEnd,
        data:
          isNew || isEmpty(expensesData.data)
            ? respData
            : [...expensesData.data, ...respData],
        total: isNew ? total : total + expensesData.total,
        anchor: result.payload.anchor,
      };
    } catch (e) {
      console.log(e);
      data = {
        of: "expenses",
        group: group,
        dateStart: dateStart,
        dateEnd: dateEnd,
        data: null,
        total: 0,
      };
      // throw e;
    } finally {
      setExpensesData(data);
    }
  };

  const getIncome = async (
    dateRange,
    group = "source",
    getAll = false,
    isNew = true
  ) => {
    const dateEnd = dateRange ? dateRange.dateEnd : incomeData.dateEnd;
    const dateStart = dateRange ? dateRange.dateStart : incomeData.dateStart;

    let anchor = isNew ? null : incomeData.anchor;

    let data;
    let result;
    let resultData = [];
    let total = 0;
    let hasMore = false;
    try {
      const token = await getToken();
      do {
        const resp = await fetch(
          `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/income?&dateStart=${dateStart}&dateEnd=${dateEnd}&orderBy=${group}${
            anchor ? `&anchor=${anchor}` : ""
          }`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        result = await resp.json();
        total += result.payload.total;
        if (getAll) {
          resultData = [...resultData, ...result.payload.data];
          hasMore = anchor = result.payload.anchor;
        } else {
          resultData = result.payload.data;
          break;
        }
      } while (hasMore);

      let respData = groupData(resultData, group);
      const themeObj = await generateThemes(
        respData,
        "income",
        colorThemes,
        colorTable
      );
      if (!isEmpty(themeObj)) {
        setColorThemes((prev) => {
          const prevCopy = cloneDeep(prev);
          return merge(prevCopy, themeObj.themes);
        });
        setColorTable((prev) => {
          const prevCopy = cloneDeep(prev);
          return merge(prevCopy, themeObj.table);
        });
      }

      respData = assignColors(respData, group, themeObj.themes);

      data = {
        of: "income",
        group: group,
        dateStart: dateStart,
        dateEnd: dateEnd,
        data: isNew ? respData : [...incomeData.data, ...respData],
        total: isNew ? total : total + incomeData.total,
        anchor: result.payload.anchor,
      };
    } catch (e) {
      console.log(e);
      data = {
        of: "income",
        group: group,
        dateStart: dateStart,
        dateEnd: dateEnd,
        data: null,
        total: 0,
      };
      // throw e;
    } finally {
      setIncomeData(data);
    }
  };

  const uploadExpense = async (expense) => {
    try {
      console.log(expense);
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
      const success = (await resp.json()).success;
      getExpenses(
        { dateStart: expensesData.dateStart, dateEnd: expensesData.dateEnd },
        expensesData.group,
        false,
        true
      );
      return success;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const deleteExpense = async (expense) => {
    try {
      const token = await getToken();
      const resp = await fetch(
        `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/expenses/${expense.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      getExpenses(
        { dateStart: expensesData.dateStart, dateEnd: expensesData.dateEnd },
        expensesData.group,
        false,
        true
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const uploadIncome = async (income) => {
    try {
      const token = await getToken();
      const resp = await fetch(
        `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/income`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(income),
        }
      );

      getIncome(
        { dateStart: incomeData.dateStart, dateEnd: incomeData.dateEnd },
        incomeData.group,
        false,
        true
      );

      return;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const deleteIncome = async (income) => {
    try {
      const token = await getToken();
      const resp = await fetch(
        `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/income/${income.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      getIncome(
        { dateStart: incomeData.dateStart, dateEnd: incomeData.dateEnd },
        incomeData.group,
        false,
        true
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const getBudget = async () => {
    try {
      const token = await getToken();
      const resp = await fetch(
        `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/expenses/budgeting/limit`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const result = await resp.json();
      setBudget((prev) => {
        return { ...prev, ...result.payload };
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const uploadBudget = async (budget) => {
    try {
      const token = await getToken();
      const resp = await fetch(
        `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/expenses/budgeting/limit`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(budget),
        }
      );

      await getBudget();
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  useEffect(() => {
    const dateRange = getCurrentDateRange();

    await getExpenses(dateRange);
    await getIncome(dateRange);
    await getBudget();
    setIsLoading(false);
  }, []);

  const providerValue = {
    expensesData,
    incomeData,
    getExpenses,
    getIncome,
    uploadExpense,
    deleteExpense,
    budget,
    getBudget,
    uploadBudget,
    colorThemes,
    expensesGroup,
    setExpensesGroup,
    incomeGroup,
    setIncomeGroup,
    uploadIncome,
    deleteIncome,
  };
  return (
    <DataContext.Provider value={providerValue}>
      {isLoading ? <div>Loading...</div> : children}
    </DataContext.Provider>
  );
};

export { DataProvider as default, useDataContext };
