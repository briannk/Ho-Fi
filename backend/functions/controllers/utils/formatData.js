// groups data based on select value
const groupData = (data, selectValue) => {
  let groupedData = {};

  data.forEach((dataPoint) => {
    let matchingDataPoints = [];
    const group = dataPoint[selectValue];
    if (groupedData[group] && groupedData[group]["items"]) {
      matchingDataPoints = groupedData[group]["items"];
    }

    let newValue = dataPoint.total;
    if (groupedData[group]) {
      newValue += groupedData[group].value;
    }

    matchingDataPoints.push(dataPoint);

    groupedData[group] = {
      id: dataPoint[selectValue],
      items: matchingDataPoints,
      value: newValue,
    };
  });

  return Object.values(groupedData);
};

module.exports = { groupData };
