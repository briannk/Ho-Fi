import React, { useState } from "react";

import DetailedFeedEntry from "./DetailedFeedEntry";

const DetailedFeed = ({ dataProp = {} }) => {
  const [message, setMessage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [expand, setExpand] = useState(false);

  const showMore = (index) => {
    setActiveIndex(index);
  };

  const Feed = () => {
    let index = 0;
    return dataProp.data.map((entry) => {
      return entry.items.map((expense) => {
        let feedEntry = (
          <DetailedFeedEntry
            key={index}
            data={expense}
            entry={entry}
            index={index}
            activeIndex={activeIndex}
            handleShowMore={showMore}
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
