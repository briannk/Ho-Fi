const getTotal = (data) => {
  return data.reduce((prev, curr) => prev + curr.total, 0);
};

export default getTotal;
