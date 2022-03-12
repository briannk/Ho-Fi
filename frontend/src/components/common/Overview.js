import React, { useState, useEffect } from "react";
import { Select } from "semantic-ui-react";
import { useDataContext } from "../../contexts/DataContext";
import keyToText from "../../utilities/keyToText";
import DateSelect from "./DateSelect";
import KEYS_TO_EXCLUDE from "../../constants/keysToExclude";
import { localToUTC } from "../../utilities/formatDate";

const containerStyles = `container 
    p-4 mx-1`;

const Overview = ({ dataProp, selectValue, handleSelect }) => {
  const [sortOptions, setSortOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getExpenses, getIncome } = useDataContext();

  const generateOptions = (data) => {
    return Object.keys(data[0].items[0])
      .filter((key) => !KEYS_TO_EXCLUDE[dataProp.of].includes(key))
      .map((key) => {
        return { key: key, text: keyToText(key), value: key };
      });
  };

  const dateRange = {
    dateStart: dataProp.dateStart,
    dateEnd: dataProp.dateEnd,
  };

  useEffect(() => {
    console.log("useeffect");
    if (dataProp.data) {
      setSortOptions(generateOptions(dataProp.data));
      console.log("setting options");
    }
    setIsLoading(false);
  }, [dataProp, selectValue]);

  return (
    <>
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <>
          <div className={`${containerStyles}`}>
            <h1 className="flex flex-col xl:flex-row gap-4 justify-between items-center">
              {dataProp.of[0].toUpperCase() + dataProp.of.slice(1)}

              <DateSelect
                dataProp={dataProp}
                handleChange={(e, { name, value }) => {
                  if (dataProp.of === "expenses") {
                    getExpenses(
                      { ...dateRange, [name]: localToUTC(value) },
                      selectValue,
                      false,
                      true
                    );
                  } else if (dataProp.of === "income") {
                    getIncome(
                      { ...dateRange, [name]: localToUTC(value) },
                      selectValue,
                      false,
                      true
                    );
                  } else {
                    console.log("No 'of' prop");
                  }
                }}
              />
            </h1>
            <div className="flex-wrap sm:flex justify-between items-end my-2 ">
              <span className="text-6xl font-bold text-green-300">
                ${dataProp.total.toFixed(2)}
              </span>
              <div>
                <span className="mx-2">Sort by:</span>
                <Select
                  value={selectValue}
                  options={sortOptions}
                  onChange={(e, { value }) => {
                    handleSelect(value);
                    if (dataProp.of === "expenses") {
                      getExpenses(dateRange, value, false, true);
                    } else if (dataProp.of === "income") {
                      getIncome(dateRange, value, false, true);
                    } else {
                      console.log("No 'of' prop");
                    }
                  }}
                  disabled={!dataProp.data}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Overview;
