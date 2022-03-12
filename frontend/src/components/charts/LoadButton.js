import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useDataContext } from "../../contexts/DataContext";
import spinner from "../../assets/img/spinner.svg";

const LoadButton = ({ dataProp, selectValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getExpenses, getIncome } = useDataContext();

  const loadMore = async (getAll = false) => {
    if (dataProp.of === "expenses") {
      setIsLoading(true);
      await getExpenses(null, selectValue, getAll, false);
      setIsLoading(false);
    } else if (dataProp.of === "income") {
      setIsLoading(true);
      await getIncome(null, selectValue, getAll, false);
      setIsLoading(false);
    } else {
      console.log("No 'of' prop");
    }
  };

  return (
    <div className="w-full h-12 flex justify-around gap-2">
      <Button
        basic
        className="w-1/3"
        disabled={isLoading}
        onClick={() => loadMore(true)}
      >
        {isLoading && (
          <img
            src={spinner}
            alt="loading..."
            class="animate-spin h-6 object-cover inline mx-1 opacity-50"
          />
        )}
        Load All
      </Button>
      <Button
        basic
        className="w-2/3"
        disabled={isLoading}
        onClick={() => loadMore(false)}
      >
        {isLoading && (
          <img
            src={spinner}
            alt="loading..."
            class="animate-spin h-6 object-cover inline mx-1 opacity-50"
          />
        )}
        Load More
      </Button>
    </div>
  );
};

export default LoadButton;
