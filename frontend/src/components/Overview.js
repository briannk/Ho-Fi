import React, { useState, useEffect } from "react";
import { Select } from "semantic-ui-react";
import { useDataContext } from "../contexts/DataContext";
import keyToText from "../utilities/keyToText";
import getTotal from "../utilities/total";
import DateSelect from "./DateSelect";
import keysToExclude from "../constants/keysToExclude";

const containerStyles = `container border-4
     rounded p-4 mx-1`;

const Overview = ({ dataProp, selectValue, handleSelect }) => {
  const [sortOptions, setSortOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ? In order to keep components reusable, is it best to pass in
  // variables that characterize the component as props or as a context
  // variable? Ex. In the case of this prop, would it be better
  // to pass in keysToExclude as a prop or conditionally
  // determine it via the "of" prop? What if a component is nested
  // deeply and must determine out of 5 different sets of keys?
  // I can potentially keep an object of arrays, each containing
  // an of:keysToExclude pairing and accessing the appropriate
  // array through the value of "of"

  const generateOptions = (data) => {
    return Object.keys(data[0].items[0])
      .filter((key) => !keysToExclude[dataProp.of].includes(key))
      .map((key) => {
        return { key: key, text: keyToText(key), value: key };
      });
  };

  console.log(keysToExclude, selectValue);

  // const { expensesData, expensesGroup, setExpensesGroup } = useDataContext();

  // store colors in an object to ensure uniqueness
  // possible method to generate colors:
  // select the 10 hues (tbd) and for any additional groups,
  // use a randomly determined value within a range of tints
  // consider edge cases? it is possible for every combination
  // to be used eventually, however the colors would not be an
  // issue compared to how unreadable the graph would be

  // const generateThemes = (_formattedData) => {
  //   _formattedData.forEach((data) => {
  //     data["color"] = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
  //       Math.random() * 255
  //     )}, ${Math.floor(Math.random() * 255)}, 0.6)`;
  //   });
  //   handleData("data", _formattedData);
  // };

  // const sortData = (
  //   e,
  //   { value } = {
  //     value: dataProp?.data?.[0].category ? "category" : "source",
  //   }
  // ) => {
  //   handleData("sortBy", value);

  //   let _formattedData = {};

  //   dataProp.data.forEach((dataPoint) => {
  //     console.log(dataProp);
  //     let matchingDataPoints = [];
  //     const categoryLabel = dataPoint[value];
  //     if (_formattedData[categoryLabel]?.["items"]) {
  //       matchingDataPoints = _formattedData[categoryLabel]["items"];
  //     }

  //     let newValue = dataPoint.total;
  //     if (_formattedData[categoryLabel]) {
  //       newValue += _formattedData[categoryLabel].value;
  //     }

  //     matchingDataPoints.push(dataPoint);

  //     _formattedData[categoryLabel] = {
  //       id: dataPoint[value],
  //       items: matchingDataPoints,
  //       value: newValue,
  //     };
  //   });
  //   generateThemes(Object.values(_formattedData));
  //   console.log(_formattedData);
  // };

  // useEffect(() => {
  //   if (dataProp.data.length > 0) {
  //     setSortOptions(generateOptions(dataProp.data));
  //     sortData();
  //   }
  //   setIsLoading(false);
  // }, [dataProp]);

  useEffect(() => {
    if (dataProp.data) {
      console.log(dataProp.data);
      setSortOptions(generateOptions(dataProp.data));
    }
    setIsLoading(false);
  }, [dataProp]);

  return (
    <>
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <>
          <div className={`${containerStyles}`}>
            <h1 className="flex flex-col xl:flex-row gap-4 justify-around items-center">
              {dataProp.of[0].toUpperCase() + dataProp.of.slice(1)}
              <DateSelect dataProp={dataProp} selectValue={selectValue} />
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
                    console.log(value);
                    handleSelect(value);
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
