// groups data based on select value
const groupData = (data, group) => {
  if (!data) return;
  let groupedData = {};

  data.forEach((dataPoint) => {
    let matchingDataPoints = [];
    let newValue = dataPoint.total;
    if (
      groupedData[dataPoint[group]] &&
      groupedData[dataPoint[group]]["items"]
    ) {
      matchingDataPoints = groupedData[dataPoint[group]]["items"];
      newValue += groupedData[dataPoint[group]].value;
    }

    matchingDataPoints.push(dataPoint);

    groupedData[dataPoint[group]] = {
      id: dataPoint[group],
      items: matchingDataPoints,
      value: newValue,
    };
  });

  return Object.values(groupedData);
};

export default groupData;
