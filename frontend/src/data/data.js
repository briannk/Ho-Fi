const userData = {
  uid: 1234,
  displayName: "Brian K",
};

const spendingData = {
  dateStart: "2021-11-20", // monthDayYear format or potentially use epoch
  dateEnd: "2021-11-27", // weekly buckets/collection
  data: [
    {
      id: 41, // db generated
      vendor: "Taco Bell",
      total: 10.98,
      transactionDate: "2021-11-21",
      paymentMethod: "credit/debit",
      category: "Food",
      description: "",
    },
    {
      id: 43,
      vendor: "ARCO",
      total: 40,
      transactionDate: "2021-11-21",
      paymentMethod: "credit/debit",
      category: "Gas",
      description: "gas gas gas",
    },
    {
      id: 47,
      vendor: "Wal-Mart",
      total: 104.1,
      transactionDate: "2021-11-25",
      paymentMethod: "cash",
      category: "Groceries",
      description: "Bi-weekly groceries",
    },
    {
      id: 12,
      vendor: "Wal-Mart",
      total: 69.99,
      transactionDate: "2021-10-02",
      paymentMethod: "credit/debit",
      category: "Games",
      description: "Endwalker",
    },
    {
      id: 16,
      vendor: "Wal-Mart",
      total: 69.99,
      transactionDate: "2021-10-25",
      paymentMethod: "credit/debit",
      category: "Games",
      description: "Battlefield 2042",
    },
    {
      id: 13,
      vendor: "Wal-Mart",
      total: 59.99,
      transactionDate: "2021-10-24",
      paymentMethod: "credit/debit",
      category: "Games",
      description: "Pokemon Brilliant Diamond",
    },
    {
      id: 15,
      vendor: "Wal-Mart",
      total: 0.99,
      transactionDate: "2021-10-24",
      paymentMethod: "credit/debit",
      category: "Groceries",
      description: "Snickers",
    },
    {
      id: 18,
      vendor: "McRonalds",
      total: 2.99,
      transactionDate: "2021-12-24",
      paymentMethod: "credit/debit",
      category: "Food",
      description: "Big Snac",
    },
    {
      id: 21,
      vendor: "Borgir King",
      total: 4.99,
      transactionDate: "2021-12-24",
      paymentMethod: "credit/debit",
      category: "Food",
      description: "Pitsa",
    },
  ],
};

const payData = {
  dateStart: "2021-10-21",
  dateEnd: "2021-11-20",
  data: [
    {
      id: 11,
      source: "Dees",
      total: 40,
      payDate: "2021-10-23",
      frequency: "one-time",
      description: "Dees lent me money to buy nuts",
    },
    {
      id: 14,
      source: "Microsoft",
      total: 1935.76,
      payDate: "2021-10-30",
      frequency: "bi-weekly",
      description: "paycheck",
    },
    {
      id: 21,
      source: "US Veterans Affairs",
      total: 1023.1,
      payDate: "2021-10-23",
      frequency: "monthly",
      description: "housing stipend",
    },
    {
      id: 24,
      source: "DoorDash",
      total: 21,
      payDate: "2021-11-23",
      frequency: "one-time",
      description: "refund for incorrect order",
    },
    {
      id: 26,
      source: "Microsoft",
      total: 1935.76,
      payDate: "2021-11-30",
      frequency: "bi-weekly",
      description: "paycheck",
    },
    {
      id: 32,
      source: "Microsoft",
      total: 8.26,
      payDate: "2021-12-06",
      frequency: "quarterly",
      description: "Stock dividends",
    },
    {
      id: 34,
      source: "RobinHood",
      total: 1576.89,
      payDate: "2021-12-11",
      frequency: "one-time",
      description: "Trade & withdrawal",
    },
  ],
};

export { userData, spendingData, payData };
