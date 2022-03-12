const userData = {
  uid: 1234,
  displayName: "Brian K",
};

const spendingData = {
  dateStart: "2021-11-20", // monthDayYear format or potentially use epoch
  dateEnd: "2021-11-27", // weekly buckets/collection
  data: [
    {
      vendor: "Taco Bell",
      total: 10.98,
      transactionDate: "2021-11-21",
      paymentMethod: "credit/debit",
      category: "Food",
      description: "",
    },
    {
      vendor: "ARCO",
      total: 40,
      transactionDate: "2021-11-21",
      paymentMethod: "credit/debit",
      category: "Gas",
      description: "gas gas gas",
    },
    {
      vendor: "Wal-Mart",
      total: 104.1,
      transactionDate: "2021-11-25",
      paymentMethod: "cash",
      category: "Groceries",
      description: "Bi-weekly groceries",
    },
    {
      vendor: "Wal-Mart",
      total: 69.99,
      transactionDate: "2021-10-02",
      paymentMethod: "credit/debit",
      category: "Games",
      description: "Endwalker",
    },
    {
      vendor: "Wal-Mart",
      total: 69.99,
      transactionDate: "2021-10-23",
      paymentMethod: "credit/debit",
      category: "Games",
      description: "Battlefield 2042",
    },
    {
      vendor: "Wal-Mart",
      total: 59.99,
      transactionDate: "2021-10-22",
      paymentMethod: "credit/debit",
      category: "Games",
      description: "Pokemon Brilliant Diamond",
    },
    {
      vendor: "Wal-Mart",
      total: 0.99,
      transactionDate: "2021-10-24",
      paymentMethod: "credit/debit",
      category: "Groceries",
      description: "Snickers",
    },
    {
      vendor: "McRonalds",
      total: 2.99,
      transactionDate: "2021-12-24",
      paymentMethod: "credit/debit",
      category: "Food",
      description: "Big Snac",
    },
    {
      vendor: "Borgir King",
      total: 4.99,
      transactionDate: "2021-12-24",
      paymentMethod: "credit/debit",
      category: "Food",
      description: "Pitsa",
    },
    {
      vendor: "Mr. BBQ",
      total: 24.87,
      transactionDate: "2022-01-24",
      paymentMethod: "credit/debit",
      category: "Food",
      description: "korean bbq",
    },
    {
      vendor: "Target",
      total: 23.54,
      transactionDate: "2022-01-02",
      paymentMethod: "credit/debit",
      category: "Groceries",
      description: "bath items",
    },
    {
      vendor: "Sips Co",
      total: 500.0,
      transactionDate: "2022-01-01",
      paymentMethod: "credit/debit",
      category: "Other",
      description: "big money, big women, big fun",
    },
    {
      vendor: "Borgir King",
      total: 5.99,
      transactionDate: "2022-02-02",
      paymentMethod: "cash",
      category: "Food",
      description: "ch-king",
    },
  ],
};

const payData = {
  dateStart: "2021-10-21",
  dateEnd: "2021-11-20",
  data: [
    {
      source: "Dees",
      total: 40,
      payDate: "2021-10-23",
      frequency: "one-time",
      description: "Dees lent me money to buy nuts",
    },
    {
      source: "Microsoft",
      total: 1935.76,
      payDate: "2021-10-30",
      frequency: "bi-weekly",
      description: "paycheck",
    },
    {
      source: "US Veterans Affairs",
      total: 1023.1,
      payDate: "2021-10-23",
      frequency: "monthly",
      description: "housing stipend",
    },
    {
      source: "DoorDash",
      total: 21,
      payDate: "2021-11-23",
      frequency: "one-time",
      description: "refund for incorrect order",
    },
    {
      source: "Microsoft",
      total: 1935.76,
      payDate: "2021-11-30",
      frequency: "bi-weekly",
      description: "paycheck",
    },
    {
      source: "Microsoft",
      total: 8.26,
      payDate: "2021-12-06",
      frequency: "quarterly",
      description: "Stock dividends",
    },
    {
      source: "RobinHood",
      total: 1576.89,
      payDate: "2021-12-11",
      frequency: "one-time",
      description: "Trade & withdrawal",
    },
    {
      source: "some bank",
      total: 2.0,
      payDate: "2022-01-12",
      frequency: "one-time",
      description: "coercion",
    },
    {
      source: "homeless guy",
      total: 5,
      payDate: "2022-02-03",
      frequency: "one-time",
      description: "said i could use it more",
    },
    {
      source: "Microsoft",
      total: 9.21,
      payDate: "2022-02-06",
      frequency: "quarterly",
      description: "dividends",
    },
    {
      source: "Steam",
      total: 19.99,
      payDate: "2022-02-03",
      frequency: "one-time",
      description: "refund for game",
    },

    // {
    //   startDate: "11-21-2021",
    //   endDate: "12-20-2021",
    //   data: [
    //     {
    //       id: 24,
    //       source: "DoorDash",
    //       total: 21,
    //       payDate: "11-23-2021",
    //       frequency: "one-time",
    //       description: "refund for incorrect order",
    //     },
    //     {
    //       id: 26,
    //       source: "Microsoft",
    //       total: 1935.76,
    //       payDate: "11-30-2021",
    //       frequency: "bi-weekly",
    //       description: "paycheck",
    //     },
    //     {
    //       id: 32,
    //       source: "Microsoft",
    //       total: 8.26,
    //       payDate: "12-06-2021",
    //       frequency: "quarterly",
    //       description: "Stock dividends",
    //     },
    //     {
    //       id: 34,
    //       source: "RobinHood",
    //       total: 8.26,
    //       payDate: "12-11-2021",
    //       frequency: "one-time",
    //       description: "Trade & withdrawal",
    //     },
    //   ],
    // },
  ],
};

module.exports = { userData, spendingData, payData };