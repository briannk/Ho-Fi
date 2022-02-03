const { getFirestore } = require("firebase-admin/firestore");
const isEmpty = require("lodash.isempty");

const db = getFirestore();

const buildQuery = (category, queryParams, include) => {
  let remainingParams;
  let query = db
    .collection("users")
    .doc(req.user.uid)
    .collection(category)
    .doc("data")
    .collection(`${category}Data`);
  if (queryParams.dateStart && queryParams.dateEnd) {
    let date;
    date = category === "expenses" ? "transactionDate" : "payDate";
    query = query
      .where(date, ">=", Timestamp.fromDate(new Date(queryParams.dateStart)))
      .where(date, "<=", Timestamp.fromDate(new Date(queryParams.dateEnd)));
    ({ dateStart, dateEnd, ...remaining } = queryParams);
    remainingParams = remaining;
  }
  if (queryParams.minTotal && queryParams.maxTotal) {
    query = query
      .where(mintotal, ">=", queryParams.minTotal)
      .where(maxtotal, "<=", queryParams.maxTotal);
    ({ minTotal, ...remaining } = remainingParams);
    remainingParams = remaining;
  }
  if (include) {
    query = query.where(include.key, "in", include.list);
  }
  if (queryParams.orderBy) {
    query = query.orderBy(queryParams.orderBy);
  }
  if (queryParams.anchor) {
    query = query.startAfter(queryParams.anchor);
  }
  if (isEmpty(remainingParams)) {
    query = query.limit(10);
  }
  return query;
};

module.exports = { buildQuery };
