import React, { useState } from "react";
import DetailedFeedEntry from "./DetailedFeedEntry";
import { useDataContext } from "../contexts/DataContext";

const DetailedFeed = ({ dataProp = {}, selectValue }) => {
  const [message, setMessage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [expand, setExpand] = useState(false);

  const { expensesGroup } = useDataContext();

  const showMore = (index) => {
    setActiveIndex(index);
  };

  const Feed = () => {
    let index = 0;
    return dataProp.data.map((dataGroup) => {
      return dataGroup.items.map((dataPoint) => {
        let feedEntry = (
          <DetailedFeedEntry
            key={dataPoint.id}
            data={dataPoint}
            // entry={entry}
            index={index}
            group={selectValue}
            activeIndex={activeIndex}
            // handleShowMore={showMore}
          />
        );
        index++;
        return feedEntry;
      });
    });
  };
  return (
    <div
      className={`container flex flex-col w-5/6 mx-auto gap-y-2 overflow-auto ${
        expand ? "h-full" : "h-1/2"
      }`}
    >
      {message}
      <Feed />
    </div>
  );
};

export default DetailedFeed;
