import React, { useState, useEffect, useReducer } from "react";
import { Radio, Label } from "semantic-ui-react";
import getTotal from "../../utilities/total";
import FilterReducer from "./filter/FilterReducer";
import BudgetVisual from "./BudgetVisual";
import DataTable from "../charts/DataTable";
import { useDataContext } from "../../contexts/DataContext";
import isEmpty from "lodash.isempty";
import { localToUTC } from "../../utilities/formatDate";
import DateSelect from "../common/DateSelect";

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
  const [expensesItems, setExpensesItems] = useState([]);

  const [showState, showDispatch] = useReducer(reducer, {
    showLimitForm: false,
    showAccordion: false,
    showIncome: true,
  });

  const {
    expensesData,
    incomeData,
    expensesGroup,
    incomeGroup,
    getExpenses,
    getIncome,
  } = useDataContext();

  const keys = Object.keys(
    expensesData.data ? expensesData.data[0].items[0] : {}
  );

  const initializeState = (expenses) => {
    let filters = {};

    expenses.forEach((dataPoint) => {
      keys.forEach((key) => {
        if (key === "description" || key === "transactionDate") return;
        if (filters[key] && key !== "total") {
          // keeps track of parent attribute
          if (!filters[key]["parent"]) {
            filters[key]["parent"] = true;
          }
          if (filters[key][dataPoint[key]]) {
            return;
          } else {
            filters[key][dataPoint[key]] = true;
            return;
          }
        } else {
          filters[key] = {};

          if (key === "total") {
            filters[key]["minTotal"] = filters[key]["lowerBound"] = Math.floor(
              Math.min(...expenses.map((dataPoint) => dataPoint.total))
            );
            filters[key]["maxTotal"] = filters[key]["upperBound"] = Math.floor(
              Math.max(...expenses.map((dataPoint) => dataPoint.total)) + 1
            );
          } else {
            filters[key][dataPoint[key]] = true;
          }
          filters[key]["parent"] = true;
        }
      });
    });
    return filters;
  };

  // filter modifies both table and graph, whereas table can
  // also modify graph

  const [filters, dispatch] = useReducer(FilterReducer, {});
  // to conform with LineViz requirements, unmodified by DataTable
  const [formattedData, setFormattedData] = useState({
    id: "Total Expenses",
    items: [],
  });
  // modified data from DataTable
  const [filteredFormattedData, setFilteredFormattedData] = useState({
    id: "Total Expenses",
    items: [],
  });

  const updateData = () => {
    let _formattedData = [...expensesItems];
    console.log(_formattedData, filters);

    for (const property in filters) {
      if (filters[property]["parent"]) {
        console.log(_formattedData);
        if (property === "transactionDate") {
          _formattedData = _formattedData.filter(
            (dataPoint) =>
              new Date(dataPoint.transactionDate) >=
                new Date(filters.transactionDate.dateStart) &&
              new Date(dataPoint.transactionDate) <=
                new Date(filters.transactionDate.dateEnd)
          );
        } else if (property === "total") {
          _formattedData = _formattedData.filter(
            (dataPoint) =>
              dataPoint.total >= filters.total.lowerBound &&
              dataPoint.total <= filters.total.upperBound
          );
        } else {
          _formattedData = _formattedData.filter((dataPoint) => {
            console.log(filters[property][dataPoint[property]]);
            return filters[property][dataPoint[property]];
          });
        }
      }
    }
    setFormattedData({
      ...expensesData,
      data: [{ id: "Total Expenses", items: _formattedData }],
    });
    setFilteredFormattedData((prev) => {
      return { ...prev, items: _formattedData };
    });
  };

  useEffect(() => {
    if (!isEmpty(expensesData.data)) {
      const expenses = expensesData.data
        .map((dataGroup) => dataGroup.items)
        .flat();
      setExpensesItems(expenses);
      dispatch({ type: "INITIALIZE", payload: initializeState(expenses) });
    }
  }, [expensesData]);

  useEffect(() => {
    if (Object.keys(filters).length === 0) return;
    updateData();
  }, [filters]);

  return (
    <div className={containerStyles}>
      <h1>Budgeting</h1>
      <div className="mx-auto flex flex-col p-4 gap-4">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="w-full md:w-1/2 flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-3xl ">Expenses</span>
              <span className="text-6xl font-bold text-green-300">
                ${getTotal(filteredFormattedData.items).toFixed(2)}
              </span>
            </div>
            {showState.showIncome && (
              <div className="flex flex-col gap-2">
                <span className="text-3xl ">Income</span>
                <span className="text-6xl font-bold text-green-300">
                  ${incomeData.total.toFixed(2)}
                </span>
              </div>
            )}
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

          <DateSelect
            dataProp={expensesData}
            handleChange={async (e, { name, value }) => {
              await getExpenses({
                dateStart: expensesData.dateStart,
                dateEnd: expensesData.dateEnd,
                [name]: localToUTC(value),
              });
              await getIncome({
                dateStart: incomeData.dateStart,
                dateEnd: incomeData.dateEnd,
                [name]: localToUTC(value),
              });
            }}
          />
        </div>
        <Radio
          toggle
          label="Show Income"
          onChange={(e, { checked }) => {
            showDispatch({ type: "SHOW_INCOME", payload: checked });
          }}
          checked={showState.showIncome}
        />

        <BudgetVisual
          filters={filters}
          dataProp={expensesData}
          dispatch={dispatch}
          formattedData={
            showState.showIncome
              ? {
                  data: [
                    filteredFormattedData,
                    {
                      id: "Total Income",
                      items: !isEmpty(incomeData.data)
                        ? incomeData.data
                            .map((incomeGroup) => incomeGroup.items)
                            .flat()
                        : [],
                    },
                  ],
                }
              : { data: [filteredFormattedData] }
          }
          showState={showState}
          showDispatch={showDispatch}
          selectValue={expensesGroup}
        />
        <div className="flex flex-col 2xl:flex-row gap-4 items-start">
          <div className="w-full 2xl:w-1/2 flex flex-col justify-center gap-2">
            <Label size="massive">Expenses</Label>
            <DataTable
              dataProp={formattedData}
              setData={(data) => {
                setFilteredFormattedData(data);
              }}
              selectValue={expensesGroup}
              toggleable
            />
          </div>

          <div className="w-full 2xl:w-1/2 flex flex-col justify-center gap-2">
            <Label size="massive">Income</Label>
            <DataTable
              dataProp={{
                ...incomeData,
                data: [
                  {
                    id: "Total Income",
                    items: !isEmpty(incomeData.data)
                      ? incomeData.data
                          .map((incomeGroup) => incomeGroup.items)
                          .flat()
                      : [],
                  },
                ],
              }}
              selectValue={incomeGroup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budgeting;
