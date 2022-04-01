import React, { useState, useEffect } from "react";
import { Select, Icon } from "semantic-ui-react";
import { useDataContext } from "../../contexts/DataContext";
import keyToText from "../../utilities/keyToText";
import DateSelect from "./DateSelect";
import KEYS_TO_EXCLUDE from "../../constants/keysToExclude";
import { localToUTC } from "../../utilities/formatDate";

const containerStyles = `container pb-8`;

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
    if (dataProp.data) {
      setSortOptions(generateOptions(dataProp.data));
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
            <div className="w-fit bg-gray-700 border-t rounded-t border-gray-700 px-24 pt-8 pb-6 tracking-wider flex justify-end items-center gap-4">
              <span className="text-white text-4xl filter drop-shadow-lg">
                {dataProp.of[0].toUpperCase() + dataProp.of.slice(1)}
              </span>
              <Icon
                name={`${
                  dataProp.of === "expenses"
                    ? "angle double up"
                    : "angle double down"
                }`}
                size="big"
                className={`${
                  dataProp.of === "expenses" ? "text-expenses" : "text-income"
                }`}
              />
            </div>
            <div className="w-full flex justify-end items-center px-8 py-6">
              {/* Change gradient color based on whether expense exceeds limit if it is set */}

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
            </div>

            <div className="w-full flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between px-8">
              <span className="w-full md:flex justify-center md:justify-start text-6xl px-12 py-6 border-l rounded-l border-green-100 font-bold text-green-300 bg-gradient-to-r from-green-100">
                ${dataProp.total.toFixed(2)}
              </span>
              <div className="w-full flex justify-end items-center gap-2">
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
