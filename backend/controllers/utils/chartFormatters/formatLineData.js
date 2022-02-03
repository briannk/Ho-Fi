const round = (floatVal) => {
  return Number(floatVal.toFixed(2));
};

const formatData = (data) => {
  return data.map((dataGroup) => {
    let insertedPoints = {};

    dataGroup.items.forEach((dataPoint) => {
      let newTotal = dataPoint.total;
      if (insertedPoints[dataPoint.transactionDate || dataPoint.payDate]) {
        newTotal +=
          insertedPoints[dataPoint.transactionDate || dataPoint.payDate];
      }
      insertedPoints[dataPoint.transactionDate || dataPoint.payDate] =
        round(newTotal);
    });

    let dataPoints = [];

    for (const x in insertedPoints) {
      dataPoints.push({ x: x, y: insertedPoints[x] });
    }

    return {
      id: dataGroup.id,
      data: dataPoints.sort((a, b) => a.x.localeCompare(b.x)),
    };
  });
};

const sumData = (data) => {
  return data.map((dataGroup) => {
    return {
      ...dataGroup,
      data: dataGroup.data.map((dataPoint, index) => {
        return {
          ...dataPoint,
          y: dataGroup.data.slice(0, index + 1).reduce((prev, curr) => {
            return prev + curr.y;
          }, 0),
        };
      }),
    };
  });
};

const formatLineData = (data) => {
  const formattedData = formatData(data);
  return { summedData: sumData(formattedData), unsummedData: formattedData };
};

module.exports = { formatLineData };
