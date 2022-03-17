const getTotal = (data) => {
  return data.reduce((prev, curr) => prev + curr.total, 0);
};

// sums data in each group
const sumSmall = (data) => {
  let summedData = [];
  let other = {
    id: "Other",
    value: 0,
    items: [],
  };
  const total = data
    .map((dataGroup) => getTotal(dataGroup.items))
    .reduce((prev, curr) => prev + curr);

  data.forEach((dataGroup) => {
    if (dataGroup.value < total / 10) {
      other.value += dataGroup.value;
      other.items.push(...dataGroup.items);
    } else {
      summedData.push(dataGroup);
    }
  });
  if (other.value > 0) {
    summedData.push(other);
  }
  return summedData;
};

const formatPieData = (data) => {
  const summedData = sumSmall(data);
  // remove the items property to reduce amount of data sent
  // unless needed otherwise
  return summedData.map((dataPoint) => {
    return { id: dataPoint.id, value: dataPoint.value };
  });
};

module.exports = { formatPieData };
