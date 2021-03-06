import React from "react";
import DetailedFeedEntry from "./DetailedFeedEntry";
import LoadButton from "../charts/LoadButton";

const DetailedFeed = ({ dataProp = {}, selectValue }) => {
  const Feed = () => {
    let index = 0;
    return dataProp.data.map((dataGroup) => {
      return dataGroup.items.map((dataPoint) => {
        let feedEntry = (
          <DetailedFeedEntry
            key={dataPoint.id}
            data={dataPoint}
            of={dataProp.of}
            index={index}
            group={selectValue}
          />
        );
        index++;
        return feedEntry;
      });
    });
  };
  return (
    <div className="flex flex-col my-4 p-8 gap-4 overflow-auto">
      <div className={`container flex flex-col mx-auto gap-y-2`}>
        <Feed />
      </div>
      {dataProp.anchor && (
        <LoadButton dataProp={dataProp} selectValue={selectValue} />
      )}
    </div>
  );
};

export default DetailedFeed;
