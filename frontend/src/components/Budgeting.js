import React, { useState, useEffect, useReducer } from "react";
import { Radio, Label } from "semantic-ui-react";
import { spendingData, payData } from "../data/data";
import keyToText from "../utilities/keyToText";
import getTotal from "../utilities/total";
import Checkboxes from "./Checkboxes";
import CountUp from "react-countup";

import LineViz from "./LineViz";
import FilterReducer from "./FilterReducer";
import BudgetLimit from "./BudgetLimit";
// import { isCompositeComponent } from "react-dom/cjs/react-dom-test-utils.production.min";
import BudgetVisual from "./BudgetVisual";
import DataTable from "./DataTable";

const containerStyles = `container mx-auto max-h-full border-4
     rounded p-4 mx-1`;

function reducer(state = {}, { type, payload }) {
  switch (type) {
    // handle state change through payload or case?
    case "SHOW_LIMIT":
      return { ...state, showLimitForm: payload };
    case "SHOW_ACCORDION":
      return { ...state, showAccordion: payload ? false : true };
    case "SHOW_INCOME":
      return { ...state, showIncome: payload };
    default:
      return state;
  }
}

const Budgeting = () => {
  const [expenseData, setExpenseData] = useState({ data: [{}] });
  const [incomeData, setIncomeData] = useState(null);
  const [message, setMessage] = useState({ content: "", color: "" });

  const [showState, showDispatch] = useReducer(reducer, {
    showLimitForm: false,
    showAccordion: false,
    showIncome: true,
  });

  const keys = Object.keys(expenseData.data && expenseData.data[0]);

  // expenseData
  //   ? Object.keys(expenseData.data && expenseData.data[0])
  //   : [];

  const initializeState = () => {
    let state = {};
    expenseData.data.forEach((dataPoint) => {
      keys.forEach((key) => {
        if (key === "description") return;

        if (state[key] && key !== "total" && key !== "transactionDate") {
          // keeps track of parent attribute
          if (!state[key]["parent"]) {
            state[key]["parent"] = true;
          }
          if (state[key][dataPoint[key]]) {
            return;
          } else {
            state[key][dataPoint[key]] = true;
            return;
          }
        } else {
          state[key] = {};

          if (key === "total") {
            state[key]["minTotal"] = state[key]["lowerBound"] = Math.floor(
              Math.min(...expenseData.data.map((dataPoint) => dataPoint.total))
            );
            state[key]["maxTotal"] = state[key]["upperBound"] = Math.floor(
              Math.max(
                ...expenseData.data.map((dataPoint) => dataPoint.total)
              ) + 1
            );
          } else if (key === "transactionDate") {
            let minDate = new Date(
              Math.min(
                ...expenseData.data
                  .map((dataPoint) => dataPoint.transactionDate)
                  .map((date) => new Date(date))
              )
            );

            minDate = `${minDate.getUTCFullYear()}-${
              minDate.getUTCMonth() + 1
            }-${
              minDate.getUTCDate() < 10
                ? "0" + minDate.getUTCDate()
                : minDate.getUTCDate()
            }`;

            let maxDate = new Date(
              Math.max(
                ...expenseData.data
                  .map((dataPoint) => dataPoint.transactionDate)
                  .map((date) => new Date(date))
              )
            );

            maxDate = `${maxDate.getUTCFullYear()}-${
              maxDate.getUTCMonth() + 1
            }-${
              maxDate.getUTCDate() < 10
                ? "0" + maxDate.getUTCDate()
                : maxDate.getUTCDate()
            }`;
            state[key]["dateStart"] = minDate;
            state[key]["dateEnd"] = maxDate;
          } else {
            state[key][dataPoint[key]] = true;
          }
          state[key]["parent"] = true;
        }
      });
    });
    return state;
  };

  // filter modifies both table and graph, whereas table can
  // also modify graph

  const [state, dispatch] = useReducer(FilterReducer, {});
  // to conform with LineViz requirements, unmodified by DataTable
  const [formattedData, setFormattedData] = useState({
    id: "Total Expenses",
    items: [],
  });

  console.log(state);

  // modified data from DataTable
  const [filteredFormattedData, setFilteredFormattedData] = useState({
    id: "Total Expenses",
    items: [],
  });

  const [temp, setTemp] = useState({
    data: [],
  });

  console.log(filteredFormattedData, temp);
  const formatData = () => {
    let _formattedData = expenseData.data;

    for (const property in state) {
      if (state[property]["parent"]) {
        if (property === "transactionDate") {
          _formattedData = _formattedData.filter(
            (dataPoint) =>
              new Date(dataPoint.transactionDate) >=
                new Date(state.transactionDate.dateStart) &&
              new Date(dataPoint.transactionDate) <=
                new Date(state.transactionDate.dateEnd)
          );
        } else if (property === "total") {
          _formattedData = _formattedData.filter(
            (dataPoint) =>
              dataPoint.total >= state.total.lowerBound &&
              dataPoint.total <= state.total.upperBound
          );
        } else {
          _formattedData = _formattedData.filter((dataPoint) => {
            return state[property][dataPoint[property]];
          });
        }
      }
    }
    setFormattedData((prev) => {
      return { ...prev, items: _formattedData };
    });
    setFilteredFormattedData((prev) => {
      return { ...prev, items: _formattedData };
    });
    setTemp({
      data: [{ id: "Total Expenses", items: _formattedData }],
    });
  };

  const [total, setTotal] = useState({ start: 0, end: 0 });

  useEffect(() => {
    setExpenseData(spendingData);
    setIncomeData(payData);
  }, []);

  useEffect(() => {
    dispatch({ type: "INITIALIZE", payload: initializeState() });
  }, [expenseData]);

  useEffect(() => {
    console.log("Current state: ", state);
    if (Object.keys(state).length === 0) return;
    formatData();
  }, [state]);

  // useEffect(
  //   () =>
  //     setTotal((prev) => {
  //       return { start: prev.end, end: getTotal(filteredFormattedData.items) };
  //     }),
  //   [filteredFormattedData]
  // );

  return keys.length ? (
    <div>
      <h1>Budgeting</h1>
      <div className={containerStyles}>
        {/* Reserve predicted expenditures for future feature,
            as additional statistics knowledge is required
            i.e. Given a time frame and some data points, predict
            spending habits for the next month to establish a
            goal to budget towards */}
        {/* Select what to include:{" "}
        {expenseData && (
          <Checkboxes
            expenseData={expenseData.data}
            keys={Object.keys(expenseData.data[0])}
          />
        )} */}
        {/* <Message content={message?.content} color={message?.color} /> */}

        <div>
          <span className="text-6xl font-bold text-green-300">
            ${getTotal(filteredFormattedData.items).toFixed(2)}
          </span>

          {/* { This component causes the graph animations to lag } */}
          {/* <span className="text-6xl font-bold text-green-300">
            <CountUp
              delay={0}
              // decimal=","
              decimals={2}
              duration={0.5}
              prefix="$"
              start={total.start}
              end={total.end}
            />
          </span> */}
        </div>

        <Radio
          toggle
          label="Show Income"
          onChange={(e, { checked }) => {
            console.log(checked, showState.showIncome);
            showDispatch({ type: "SHOW_INCOME", payload: checked });
          }}
          checked={showState.showIncome}
        />
        <BudgetVisual
          state={state}
          dataProp={expenseData}
          dispatch={dispatch}
          formattedData={
            showState.showIncome
              ? {
                  data: [
                    filteredFormattedData,
                    {
                      id: "Total Income",
                      items: incomeData && incomeData.data,
                    },
                  ],
                }
              : { data: [filteredFormattedData] }
          }
          showState={showState}
          showDispatch={showDispatch}
        />
        {formattedData.items.length && (
          <div className="flex flex-col 2xl:flex-row gap-4 items-start">
            <div className="w-full 2xl:w-1/2 flex flex-col justify-center gap-2">
              <Label size="massive">Expenses</Label>
              <DataTable
                dataProp={temp}
                state={state}
                setData={(data) => {
                  setFilteredFormattedData(data);
                }}
                toggleable
              />
            </div>
            <div className="w-full 2xl:w-1/2 flex flex-col justify-center gap-2">
              <Label size="massive">Income</Label>
              <DataTable
                dataProp={{
                  data: [
                    {
                      id: "Total Income",
                      items: incomeData && incomeData.data,
                    },
                  ],
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Budgeting;
