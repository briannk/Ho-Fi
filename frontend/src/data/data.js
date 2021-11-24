const userData = {
  uid: 1234,
  displayName: "Brian K",
};

const spendingData = {
  id: 1234, // db generated
  startDate: "11-20-2021", // monthDayYear format or potentially use epoch
  endDate: "11-27-2021", // weekly buckets/collection
  data: [
    {
      vendor: "Taco Bell",
      total: 10.98,
      transactionDate: "11-21-2021",
      paymentMethod: "credit/debit",
      category: "Food",
    },
    {
      vendor: "Wal-Mart",
      total: 104.1,
      transactionDate: "11-25-2021",
      paymentMethod: "cash",
      category: "Groceries",
    },
  ],
};

const incomeData = {
  id: 1234,
  startDate: "10-21-2021",
  endDate: "11-20-2021",
  data: [
    { total: 2104.2, payDate: "10-23-2021", frequency: "weekly" },
    { total: 1935.76, payDate: "10-30-2021", frequency: "weekly" },
    { total: 4023.1, payDate: "10-23-2021", frequency: "monthly" },
  ],
};

export { userData, spendingData, incomeData };
